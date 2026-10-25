// This function is used to calculate the completion percentage for a given skill
export function calculateSkillProgress(skill, completedLessonIds = []) {
  if (!skill || !skill.lessonIds || skill.lessonIds.length === 0) return 0;
  const done = skill.lessonIds.filter((id) => completedLessonIds.includes(id)).length;
  return Math.round((done / skill.lessonIds.length) * 100);
}

// This function is used to count how many lessons have been completed in a skill
export function completedLessonsCountForSkill(skill, completedLessonIds = []) {
  if (!skill || !skill.lessonIds) return 0;
  return skill.lessonIds.filter((id) => completedLessonIds.includes(id)).length;
}

// This function is used to determine if a skill is completed, current, available, or locked
export function getSkillStatus(skill, completedLessonIds, unlockedSkillIds) {
  const progress = calculateSkillProgress(skill, completedLessonIds);
  if (progress === 100) return 'completed';
  if (!unlockedSkillIds.includes(skill.id)) return 'locked';
  if (progress > 0) return 'current';
  return 'available';
}
