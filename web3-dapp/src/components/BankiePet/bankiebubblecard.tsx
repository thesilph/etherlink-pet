import { XTZ_digits } from "../../utils/digits";
import { CountTooltip, LastFedTooltip } from "../InfoPopup/InfoPopup";
import "./bankiebox.css"
export type CheckPetReturnType = {
  fedCount: bigint;
  fedAmount: bigint;
  lastFedTimestamp: bigint;
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '2rem',
    color: '#333'

  } as React.CSSProperties,
  bubble: {
    position: 'relative',
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    padding: '1.2rem 2rem',
    maxWidth: '260px',
    textAlign: 'left',
    marginLeft: '1rem',
  } as React.CSSProperties,
  pointer: {
    position: 'absolute',
    right: '-20px',
    top: '30px',
    width: '0',
    height: '0',
    borderTop: '15px solid transparent',
    borderBottom: '15px solid transparent',
    borderLeft: '20px solid rgb(220, 220, 220)',
  } as React.CSSProperties,
  heading: {
    marginTop: 0,
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  } as React.CSSProperties,
};

export function BankieBubbleCard({ pet }: { pet: CheckPetReturnType }) {
  return (
    <div style={styles.container}>
      <div style={styles.bubble}>
        <div style={styles.pointer} />
        <h4 style={styles.heading}>Bankie Stats</h4>
        <ul style={styles.list}>
          <li><strong>Fed Count <CountTooltip/>:</strong> {pet.fedCount.toString()}</li>
          <li><strong>Fed Amount:</strong> {Number(pet.fedAmount) / (10**XTZ_digits)} XTZ</li>
          <li><strong>Last Fed <LastFedTooltip/>:</strong> {new Date(Number(pet.lastFedTimestamp) * 1000).toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
}
