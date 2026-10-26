// The worlds a player travels through (same order as the roadmap in the app)
const WORLDS = [
  { icon: '🏡', name: 'HTML Village', text: 'Tags, links, forms and page structure.', state: 'open' },
  { icon: '🎨', name: 'CSS Kingdom', text: 'Colors, flexbox, grid and animations.', state: 'open' },
  { icon: '⚡', name: 'JavaScript Dungeon', text: 'Variables, functions, arrays and DOM.', state: 'locked' },
  { icon: '⚛️', name: 'React Galaxy', text: 'Components, props, state and routing.', state: 'locked' },
];

export default function QuestMap() {
  return (
    <div className="map">
      {WORLDS.map((world, i) => (
        <div className={`world world--${world.state}`} key={world.name}>
          <div className="world__num">LV {i + 1}</div>
          <div className="world__icon">{world.state === 'locked' ? '🔒' : world.icon}</div>
          <h3>{world.name}</h3>
          <p>{world.text}</p>
        </div>
      ))}
    </div>
  );
}
