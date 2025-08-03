
import { BankieVisual } from './bankievisual';
import { BankieBubbleCard, CheckPetReturnType } from './bankiebubblecard';
import { StylizedRatSVG } from './8bitrat';
import { useState } from 'preact/hooks';
import { CountTooltip, LastFedTooltip } from '../InfoPopup/InfoPopup';

interface BankieBoxProps {
  id: number | bigint;
  pet: CheckPetReturnType;
  feedFunction?: Function;
  harvestFunction? : Function;
}

export function BankieBox({ id, pet, feedFunction, harvestFunction }: BankieBoxProps) {
    const [version, setversion] = useState(true);
    const hasGoldenEgg = pet.fedCount > 100;
            const hasFeed = (pet.lastFedTimestamp + 57600n) < Math.round(Date.now() / 1000) //only feeds every 16hrs max

  return (
    <div>
      <div>
        <button onClick={() => feedFunction()} disabled={!hasFeed}> Feed Pet :)</button>
        <LastFedTooltip/> 
        <br/>
        <button onClick={() => harvestFunction()} disabled={!hasGoldenEgg}> Harvest it's golden egg!</button>
        <CountTooltip/>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2rem',
        margin: '2rem 0',
      }}>
        <div className={'button'} onClick={()=> setversion(!version)}>| change version |</div>
        <BankieBubbleCard pet={pet} />
        {
          version ?  <StylizedRatSVG id={id} /> :<BankieVisual id={id} />
        }
      </div>
    </div>
  );
}
