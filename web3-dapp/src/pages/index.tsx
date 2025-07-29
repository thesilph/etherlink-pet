import { JSX } from "preact/jsx-runtime";
import header from './../assets/header.js'; 
import { ConnectKitButton } from "connectkit";
import { ReadAppleContract } from "../components/applefarm";
import { ReadBankieContract } from "../components/BankiePet/entity";
import { useState } from "preact/hooks";
import { BankieBox } from "../components/BankiePet/bankiebox";

const showAvatarForDebug = import.meta.env.VITE_ISDEBUG;
const showAppleFarm = import.meta.env.VITE_SHOWAPPLEFARM;


export function Index(){
	const [debugId, setDebugId] = useState(0);

	return(
        		<div>
                    <h1>Hey, welcome to bankie's house :)</h1>
                    <pre style={{ border: '1px dotted #ccc', margin: '1rem 0'}}>
                        {header}
                    </pre>
					<div style={{ display: 'flex', justifyContent: 'center'}}>
						<ConnectKitButton showAvatar={false} showBalance={true}/>
					</div>
					{
						// This is just a test to see if the ConnectKitButton works
						showAppleFarm &&
						<div>
							{'APPLEFARM'}
							<div>
								<ReadAppleContract/>
							</div>
						</div>
					}
                    <div>
						{'BANKIE :)'}
						<div>
							<ReadBankieContract/>
						</div>
						{ showAvatarForDebug && 
							// This is just for debugging purposes, 
							// to see how the avatar changes
							<div onClick={() => {setDebugId(debugId+1);}}>
								Id : {debugId} - Click to change avatar
								<BankieBox id={debugId} pet={{
									fedAmount: BigInt(debugId) * 12300n,
									fedCount: BigInt(debugId) * 100n,
									lastFedTimestamp: BigInt(Math.floor(Date.now() / 1000))
								}}/>
							</div>
						}
					</div>
		</div>
    )
}