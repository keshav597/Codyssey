// Standard XP rewards across the platform
export const XP_REWARDS = {
  PER_QUESTION: 20,
  QUIZ_TARGET: 100,
  LESSON_COMPLETE: 20,
  QUEST_COMPLETE: 20,
  CHALLENGE_COMPLETE: 50,
  BADGE_UNLOCK: 25,
  STREAK_7DAY: 100,
};

// This function is used to calculate XP earned from correct answers in a quiz
export function calculateQuizXP(correctCount) {
  return Math.max(0, (correctCount || 0) * XP_REWARDS.PER_QUESTION);
}

// This function is used to safely add XP to the student total
export function addXP(currentXP, amount) {
  return Math.max(0, (currentXP || 0) + (amount || 0));
}
