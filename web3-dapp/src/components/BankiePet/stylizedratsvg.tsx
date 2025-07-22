import md5 from 'md5';

export function StylizedRatSVG({id}) {
    const hash : string = md5(id.toString());
    const color1 = '#'+hash.slice(0,6);
    const color2 = '#'+hash.slice(6,12);
    const color3 = '#'+hash.slice(12,18);
    const color4 = '#'+hash.slice(18,24);
    const color5 = '#'+hash.slice(24,30);
    return (
    <svg width="200" height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="110" rx="60" ry="40" fill={color1} stroke={color3} strokeWidth="3" />
      {/* Head */}
      <ellipse cx="150" cy="70" rx="35" ry="28" fill={color2} stroke={color3} strokeWidth="3" />
      {/* Left Ear */}
      <ellipse cx="130" cy="40" rx="15" ry="18" fill={color4} stroke={color3} strokeWidth="2" />
      {/* Right Ear */}
      <ellipse cx="170" cy="40" rx="15" ry="18" fill={color4} stroke={color3} strokeWidth="2" />
      {/* Eyes */}
      <ellipse cx="140" cy="70" rx="5" ry="7" fill={color3} />
      <ellipse cx="160" cy="70" rx="5" ry="7" fill={color3} />
      {/* Nose */}
      <ellipse cx="150" cy="90" rx="6" ry="4" fill="#FF6F61" stroke={color3} strokeWidth="1" />
      {/* Whiskers */}
      <line x1="144" y1="90" x2="130" y2="95" stroke={color3} strokeWidth="2" />
      <line x1="156" y1="90" x2="170" y2="95" stroke={color3} strokeWidth="2" />
      {/* Tail */}
      <path d="M55 140 Q30 170, 100 175 Q160 180, 170 150" stroke={color3} strokeWidth="7" fill="none" />
      {/* Feet */}
      <ellipse cx="80" cy="150" rx="8" ry="4" fill={color5} stroke={color3} strokeWidth="1" />
      <ellipse cx="120" cy="150" rx="8" ry="4" fill={color5} stroke={color3} strokeWidth="1" />
    </svg>
  );
}
