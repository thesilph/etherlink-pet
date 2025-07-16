import { JSX } from "preact/jsx-runtime";
import preactLogo from './../assets/preact.svg';
import header from './../assets/header.js'; 
import { ConnectKitButton } from "connectkit";

const buttonStyle: JSX.CSSProperties = {
	backgroundColor: '#4f46e5',
	color: 'white',
	padding: '0.5rem 1rem',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
	fontSize: '1rem',
};

export function Index(){
    return(
        		<div>
                    <h1>Hey, welcome to bankie's house :)</h1>
                    <pre>
                        {header}
                    </pre>
                    <ConnectKitButton showAvatar={false} showBalance={true}/>

		</div>
    )
}