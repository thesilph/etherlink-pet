
import { BankieVisual } from './bankievisual';
import { BankieBubbleCard, CheckPetReturnType } from './bankiebubblecard';
import { StylizedRatSVG } from './8bitrat';
import { useState } from 'preact/hooks';

interface BankieBoxProps {
  id: number | bigint;
  pet: CheckPetReturnType;
}

export function BankieBox({ id, pet }: BankieBoxProps) {
    const [version, setversion] = useState(true);
   
  return (
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
  );
}
