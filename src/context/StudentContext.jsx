import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import { skills, skillOrder } from '../data/skills';
import { badges as badgeData } from '../data/badges';
import { quests as questData } from '../data/quests';
import { XP_REWARDS, calculateQuizXP, addXP } from '../utils/calculateXP';
import { calculateLevel, calculateLevelProgress } from '../utils/calculateLevel';
import { calculateSkillProgress, getSkillStatus } from '../utils/calculateProgress';

export const StudentContext = createContext(null);

const DEFAULT_STATE = {
  xp: 0,
  lifetimeXP: 0,
  completedLessonIds: [],
  completedQuestIds: [],
  completedQuizIds: [],
  unlockedBadgeIds: [],
  quizHistory: [],
  skillScores: {},
  streak: { count: 0, lastActiveDate: null },
  settings: {
    displayName: 'Coder',
    learningPreference: 'Web Development',
    dailyGoalMinutes: 20,
  },
  onboarding: null,
};

// This function is used to get the current date as a YYYY-MM-DD string
function todayString() {
  return new Date().toISOString().slice(0, 10);
}

// This function is used to calculate the number of calendar days between two dates
function daysBetween(a, b) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function StudentProvider({ children }) {
  const { currentUser } = useAuth();

  const storageKey = currentUser?.id ? `codyssey_student_${currentUser.id}` : 'codyssey_student_guest';

  const [student, setStudent] = useLocalStorage(storageKey, DEFAULT_STATE);
  const [lastUnlockedBadge, setLastUnlockedBadge] = useState(null);
  const [lastLevelUp, setLastLevelUp] = useState(null);

  // This function is used to increment or reset the student daily streak
  function bumpStreak(draftStudent) {
    const today = todayString();
    const { lastActiveDate, count = 0 } = draftStudent.streak || {};
    if (lastActiveDate === today) return draftStudent;

    let newCount = 1;
    if (lastActiveDate) {
      const diff = daysBetween(lastActiveDate, today);
      newCount = diff === 1 ? count + 1 : 1;
    }
    return { ...draftStudent, streak: { count: newCount, lastActiveDate: today } };
  }

  // This function is used to check if the student unlocked any new achievement badges
  function checkNewBadges(draftStudent) {
    const newlyUnlocked = [];
    for (const badge of badgeData) {
      if (draftStudent.unlockedBadgeIds.includes(badge.id)) continue;
      let met = false;
      const c = badge.condition;
      if (c.type === 'skillMastery') {
        const score = draftStudent.skillScores?.[c.skillId] || 0;
        met = score >= (c.minXP || 100);
      } else if (c.type === 'xp') {
        met = (draftStudent.xp || 0) >= c.xp;
      } else if (c.type === 'perfectQuiz') {
        met = draftStudent.quizHistory.some((h) => h.correct === h.total && h.total >= 5);
      } else if (c.type === 'quizzesCompleted') {
        met = draftStudent.quizHistory.length >= c.count;
      } else if (c.type === 'streak') {
        met = draftStudent.streak.count >= c.days;
      } else if (c.type === 'skillComplete') {
        const skill = skills.find((s) => s.id === c.skillId);
        met = calculateSkillProgress(skill, draftStudent.completedLessonIds) === 100;
      } else if (c.type === 'level') {
        met = calculateLevel(draftStudent.xp).level >= c.level;
      }
      if (met) newlyUnlocked.push(badge);
    }
    return newlyUnlocked;
  }

  // This function is used to mark a lesson as completed and award XP
  function completeLesson(lessonId, xpAmount = XP_REWARDS.LESSON_COMPLETE) {
    setStudent((prev) => {
      const isNew = !prev.completedLessonIds.includes(lessonId);
      const updatedLessons = isNew ? [...prev.completedLessonIds, lessonId] : prev.completedLessonIds;

      const newQuests = [];
      questData.forEach((q) => {
        if (q.requiresLessonIds && q.requiresLessonIds.length > 0) {
          const done = q.requiresLessonIds.every((id) => updatedLessons.includes(id));
          if (done && !prev.completedQuestIds.includes(q.id)) {
            newQuests.push(q.id);
          }
        }
      });

      const updatedQuests = newQuests.length > 0 ? [...prev.completedQuestIds, ...newQuests] : prev.completedQuestIds;
      const awarded = isNew ? (xpAmount || 20) : 10;
      const newXP = addXP(prev.xp, awarded);
      const newLifetimeXP = addXP(prev.lifetimeXP || prev.xp, awarded);

      const oldLevel = calculateLevel(prev.xp).level;
      const newLevelObj = calculateLevel(newXP);
      if (newLevelObj.level > oldLevel) {
        setLastLevelUp(newLevelObj);
      }

      let updated = {
        ...prev,
        completedLessonIds: updatedLessons,
        completedQuestIds: updatedQuests,
        xp: newXP,
        lifetimeXP: newLifetimeXP,
      };

      updated = bumpStreak(updated);

      const newBadges = checkNewBadges(updated);
      if (newBadges.length > 0) {
        setLastUnlockedBadge(newBadges[newBadges.length - 1]);
        updated.unlockedBadgeIds = [...updated.unlockedBadgeIds, ...newBadges.map((b) => b.id)];
      }

      return updated;
    });
  }

  // This function is used to mark an engineering quest or challenge as completed
  function completeQuest(questId) {
    setStudent((prev) => {
      if (prev.completedQuestIds.includes(questId)) return prev;
      const quest = questData.find((q) => q.id === questId);
      const reward = quest ? quest.xp : XP_REWARDS.QUEST_COMPLETE;
      const newXP = addXP(prev.xp, reward);
      const newLifetimeXP = addXP(prev.lifetimeXP || prev.xp, reward);

      const oldLevel = calculateLevel(prev.xp).level;
      const newLevelObj = calculateLevel(newXP);
      if (newLevelObj.level > oldLevel) setLastLevelUp(newLevelObj);

      let updated = {
        ...prev,
        completedQuestIds: [...prev.completedQuestIds, questId],
        xp: newXP,
        lifetimeXP: newLifetimeXP,
      };

      updated = bumpStreak(updated);

      const newBadges = checkNewBadges(updated);
      if (newBadges.length > 0) {
        setLastUnlockedBadge(newBadges[newBadges.length - 1]);
        updated.unlockedBadgeIds = [...updated.unlockedBadgeIds, ...newBadges.map((b) => b.id)];
      }

      return updated;
    });
  }

  // This function is used to submit quiz answers, award XP, and record quiz history
  function submitQuizResult({ skillId, correct, total = 5, questId }) {
    const quizId = questId || `quiz-${skillId}`;
    const score = correct * XP_REWARDS.PER_QUESTION;
    const passed = score >= XP_REWARDS.QUIZ_TARGET;
    let awardedXP = 0;

    setStudent((prev) => {
      const prevSkillScores = prev.skillScores || {};
      const previousBest = prevSkillScores[skillId] || 0;

      // Always award XP for correct answers: full gain on new high, or practice XP on re-attempt
      let gain = 0;
      if (score > previousBest) {
        gain = score - previousBest;
      } else {
        gain = Math.max(10 * correct, 10);
      }
      awardedXP = gain;

      const newSkillXP = Math.max(previousBest, score);
      const newXP = addXP(prev.xp, gain);
      const newLifetimeXP = addXP(prev.lifetimeXP || prev.xp, gain);

      const oldLevel = calculateLevel(prev.xp).level;
      const newLevelObj = calculateLevel(newXP);
      if (newLevelObj.level > oldLevel && gain > 0) {
        setLastLevelUp(newLevelObj);
      }

      const updatedQuests = (questId && passed && !prev.completedQuestIds.includes(questId))
        ? [...prev.completedQuestIds, questId]
        : prev.completedQuestIds;

      const updatedQuizzes = (passed && !prev.completedQuizIds.includes(quizId))
        ? [...prev.completedQuizIds, quizId]
        : prev.completedQuizIds;

      let updated = {
        ...prev,
        completedQuestIds: updatedQuests,
        completedQuizIds: updatedQuizzes,
        skillScores: {
          ...prevSkillScores,
          [skillId]: newSkillXP,
        },
        xp: newXP,
        lifetimeXP: newLifetimeXP,
        quizHistory: [
          ...prev.quizHistory,
          {
            id: `quiz-${Date.now()}`,
            quizId,
            questId: questId || null,
            skillId,
            correct,
            total,
            score,
            xpAwarded: gain,
            passed,
            date: todayString(),
          },
        ],
      };

      updated = bumpStreak(updated);

      const newBadges = checkNewBadges(updated);
      if (newBadges.length > 0) {
        setLastUnlockedBadge(newBadges[newBadges.length - 1]);
        updated.unlockedBadgeIds = [...updated.unlockedBadgeIds, ...newBadges.map((b) => b.id)];
      }

      return updated;
    });

    return { awardedXP, score, passed };
  }

  // This function is used to deduct XP when spending in the perks store
  function spendXP(amount) {
    if (!amount || amount <= 0) return true;
    if ((student.xp || 0) < amount) {
      return false;
    }
    setStudent((prev) => ({
      ...prev,
      xp: Math.max(0, prev.xp - amount),
    }));
    return true;
  }

  // This function is used to update student settings
  function updateSettings(partialSettings) {
    setStudent((prev) => ({ ...prev, settings: { ...prev.settings, ...partialSettings } }));
  }

  // This function is used to save onboarding choices
  function setOnboarding(onboardingData) {
    setStudent((prev) => ({ ...prev, onboarding: onboardingData }));
  }

  // This function is used to reset all student progress
  function resetProgress() {
    setStudent(DEFAULT_STATE);
  }

  // Skills unlock progressively based on total lifetime XP milestones
  // (Purchasing items in the perks store does not re-lock previously unlocked skills)
  const currentThreshold = Math.max(student.lifetimeXP || 0, student.xp || 0);
  const unlockedSkillIds = skills
    .filter((skill) => currentThreshold >= (skill.requiredXP || 0))
    .map((skill) => skill.id);

  const levelInfo = calculateLevelProgress(student.xp);

  const skillsWithProgress = skills.map((skill) => ({
    ...skill,
    progress: calculateSkillProgress(skill, student.completedLessonIds),
    status: getSkillStatus(skill, student.completedLessonIds, unlockedSkillIds),
  }));

  const questsWithStatus = questData.map((quest) => {
    const completed = student.completedQuestIds.includes(quest.id);
    let status = 'available';
    if (completed) status = 'completed';
    else if (quest.type === 'daily') status = 'available';
    else if (quest.skillId && !unlockedSkillIds.includes(quest.skillId)) status = 'locked';
    else if (quest.requiresLessonIds) {
      const done = quest.requiresLessonIds.every((id) => student.completedLessonIds.includes(id));
      status = done ? 'completed' : 'available';
    }
    return { ...quest, status };
  });

  const value = {
    student,
    levelInfo,
    skillsWithProgress,
    questsWithStatus,
    unlockedSkillIds,
    badges: badgeData.map((b) => ({ ...b, unlocked: student.unlockedBadgeIds.includes(b.id) })),
    lastUnlockedBadge,
    lastLevelUp,
    completeLesson,
    completeQuest,
    submitQuizResult,
    spendXP,
    updateSettings,
    setOnboarding,
    resetProgress,
    clearBadgeToast: () => setLastUnlockedBadge(null),
    clearLevelUpToast: () => setLastLevelUp(null),
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}
