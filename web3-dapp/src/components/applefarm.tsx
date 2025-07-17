import { useReadContract } from 'wagmi'
import { wagmiContractConfig } from '../assets/applefarm-contract'
import { useAccount, useEnsName } from 'wagmi'

export function ReadContract() {
  const { address, isConnecting, isDisconnected } = useAccount();
  if(address){
    const { data: decimals } = useReadContract({
        ...wagmiContractConfig,
        functionName: 'decimals',
    })

    const { data: balance } = useReadContract({
        ...wagmiContractConfig,
        functionName: 'balanceOf',
        args: [address],
    })

    return (
        <>
            <div>🍏 Balance: {(balance/10n**BigInt(decimals))?.toString()}</div>
        </>
         
    )
  }
  return <div>🍏</div>
  
}