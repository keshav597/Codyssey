import './learning.css';

export default function LessonProgressBar({ stepIndex, totalSteps}) {
  return (
    <div className="lesson-progress">
      <div className="lesson-progress__track">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`lesson-progress__seg ${i <= stepIndex ? 'lesson-progress__seg--active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
