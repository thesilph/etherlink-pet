import md5 from 'md5';

export function StylizedRatSVG({id}) {
    const hash : string = md5(id.toString());
    const color1 = '#'+hash.slice(0,6);   // head
    const color2 = '#'+hash.slice(6,12);  // body
    const color3 = '#'+hash.slice(12,18); // tail
    const color4 = '#'+hash.slice(18,24); // ears
    const color5 = '#'+hash.slice(24,30); // feet

    return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
            {/* Ears */}
            <rect x="6" y="6" width="2" height="2" fill={color4}/>
            <rect x="10" y="6" width="2" height="2" fill={color4}/>

            {/* Head */}
            <rect x="6" y="8" width="2" height="2" fill={color2}/>
            <rect x="8" y="8" width="2" height="2" fill={color1}/>
            <rect x="10" y="8" width="2" height="2" fill={color2}/>
            <rect x="6" y="10" width="2" height="2" fill={color1}/>
            <rect x="8" y="10" width="2" height="2" fill={color1}/>
            <rect x="10" y="10" width="2" height="2" fill={color1}/>
            <rect x="12" y="10" width="2" height="2" fill={color1}/>

            {/* Body */}
            <rect x="12" y="12" width="2" height="2" fill={color2}/>
            <rect x="14" y="12" width="2" height="2" fill={color2}/>
            <rect x="16" y="12" width="2" height="2" fill={color2}/>
            <rect x="18" y="12" width="2" height="2" fill={color2}/>
            <rect x="20" y="12" width="2" height="2" fill={color2}/>
            <rect x="20" y="14" width="2" height="2" fill={color2}/>
            <rect x="18" y="14" width="2" height="2" fill={color2}/>
            <rect x="16" y="14" width="2" height="2" fill={color2}/>
            <rect x="14" y="14" width="2" height="2" fill={color2}/>
            <rect x="12" y="14" width="2" height="2" fill={color2}/>

            {/* Feet */}
            <rect x="14" y="16" width="2" height="2" fill={color5}/>
            <rect x="18" y="16" width="2" height="2" fill={color5}/>

            {/* Tail */}
            <rect x="22" y="14" width="2" height="2" fill={color3}/>
            <rect x="24" y="14" width="2" height="2" fill={color3}/>
            <rect x="26" y="14" width="2" height="2" fill={color3}/>
            <rect x="28" y="14" width="2" height="2" fill={color3}/>
            <rect x="30" y="14" width="2" height="2" fill={color3}/>
        </svg>
    )
}