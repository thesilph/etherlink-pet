
import { BankieVisual } from './bankievisual';
import { BankieBubbleCard, CheckPetReturnType } from './bankiebubblecard';
import { StylizedRatSVG } from './stylizedratsvg';

interface BankieBoxProps {
  id: number | bigint;
  pet: CheckPetReturnType;
}

export function BankieBox({ id, pet }: BankieBoxProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '2rem',
      margin: '2rem 0',
    }}>
      <BankieBubbleCard pet={pet} />
      <BankieVisual id={id} />
      <StylizedRatSVG id={id} />
    </div>
  );
}
