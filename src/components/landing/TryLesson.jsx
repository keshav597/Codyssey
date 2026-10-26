import { useState } from 'react';

const QUESTION = 'Which tag makes the BIGGEST heading?';
const OPTIONS = ['<h6>', '<h1>', '<head>', '<p>'];
const RIGHT = 1; // index of <h1>
const XP_REWARD = 50;

// Small playable demo so visitors can feel the game before signing up
export default function TryLesson() {
  const [picked, setPicked] = useState(null); // null = not answered yet

  const answered = picked !== null;
  const isCorrect = picked === RIGHT;
  const xp = isCorrect ? XP_REWARD : 0;

  function pick(index) {
    if (answered) return; // only one try at a time
    setPicked(index);
  }

  function buttonClass(index) {
    let cls = 'try__option';
    if (answered && index === RIGHT) cls += ' try__option--right';
    if (answered && index === picked && index !== RIGHT) cls += ' try__option--wrong';
    return cls;
  }

  return (
    <div className="try">
      <div className="try__top">
        <span>QUICK QUEST</span>
        <span className="try__xp">⭐ {xp} / {XP_REWARD} XP</span>
      </div>

      <div className="try__bar">
        <div className="try__bar-fill" style={{ width: `${(xp / XP_REWARD) * 100}%` }} />
      </div>

      <h3 className="try__question">{QUESTION}</h3>

      <div className="try__options">
        {OPTIONS.map((text, i) => (
          <button key={text} type="button" className={buttonClass(i)} onClick={() => pick(i)}>
            {text}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`try__msg ${isCorrect ? 'try__msg--good' : 'try__msg--bad'}`}>
          {isCorrect ? `🎉 Correct! +${XP_REWARD} XP. Level 2 is almost here!` : '💥 Oops! The answer was <h1>.'}
          <button type="button" className="try__again" onClick={() => setPicked(null)}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
