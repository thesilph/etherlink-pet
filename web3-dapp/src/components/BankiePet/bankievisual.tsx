import md5 from 'md5';


export function BankieVisual({id}) {
    const hash : string = md5(id.toString());
    const color1 = '#'+hash.slice(0,6);
    const color2 = '#'+hash.slice(6,12);
    const color3 = '#'+hash.slice(12,18);
    const color4 = '#'+hash.slice(18,24);
    const color5 = '#'+hash.slice(24,30);
    const defaultcolor = "#FFD700";
    return (
        <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px"
        }}>
        {/* Head */}
        <div style={{
            width: "80px",
            height: "80px",
            background: color3,
            borderRadius: "50%",
            position: "relative",
            zIndex: 2
        }}>
            {/* Left Ear */}
            <div style={{
            width: "30px",
            height: "30px",
            background: color1,
            borderRadius: "50%",
            position: "absolute",
            left: "-20px",
            top: "-20px",
            zIndex: 1,
            border: "2px solid #333"
            }} />
            {/* Right Ear */}
            <div style={{
            width: "30px",
            height: "30px",
            background: color1,
            borderRadius: "50%",
            position: "absolute",
            right: "-20px",
            top: "-20px",
            zIndex: 1,
            border: "2px solid #333"
            }} />
            {/* Eyes */}
            <div style={{
            position: "absolute",
            top: "30px",
            left: "20px",
            width: "10px",
            height: "10px",
            background: color2,
            borderRadius: "50%"
            }} />
            <div style={{
            position: "absolute",
            top: "30px",
            right: "20px",
            width: "10px",
            height: "10px",
            background: color2,
            borderRadius: "50%"
            }} />
            {/* Nose */}
            <div style={{
            position: "absolute",
            top: "50px",
            left: "35px",
            width: "10px",
            height: "7px",
            background: "#333",
            borderRadius: "50%"
            }} />
        </div>
        {/* Body */}
        <div style={{
            width: "60px",
            height: "90px",
            background: color4,
            borderRadius: "30px",
            marginTop: "-10px",
            position: "relative",
            zIndex: 1
        }}>
            {/* Tail */}
            <div style={{
            width: "40px",
            height: "15px",
            background: color5,
            borderRadius: "20px",
            position: "absolute",
            right: "-35px",
            top: "60px",
            transform: "rotate(-30deg)",
            border: "2px solid #333"
            }} />
        </div>
        </div>
    );
};