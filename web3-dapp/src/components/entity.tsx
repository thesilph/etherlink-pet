import { useReadContract } from 'wagmi'
import contract from '../../../artifacts/contracts/Bankie.sol/Bankie.json'
import { useAccount, useEnsName } from 'wagmi'
import {Bankie$Type} from  '../../../artifacts/contracts/Bankie.sol/Bankie'
import md5 from 'md5';

export function ReadBankieContract() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const bankieContract = contract as Bankie$Type;
  const bankieAddress = import.meta.env.VITE_BANKIE_ADDRESS;
  if(address) {
    console.log('calling pets')
    
    const { data: balance } = useReadContract({
        address: bankieAddress,
        ...bankieContract,
        functionName: 'balanceOf',
        args: [address],
    })
    if(balance){
        const { data: tokenId } = useReadContract({
            address: bankieAddress,
            ...bankieContract,
            functionName: 'tokenOfOwnerByIndex',
            args: [address, 0n], // 0 we're just getting the first one
        })

        const { data: pet } = useReadContract({
            address: bankieAddress,
            ...bankieContract,
            functionName: 'checkPet',
            args: [tokenId],
        })

        return (
        <>
            <div>balanceOf: {(balance)?.toString()}</div>
            <div>tokenId: {(tokenId)?.toString()}</div>
            <div>id md5: {md5(tokenId.toString())}</div>
            <div>Pet: {pet.fedAmount}  {pet.fedCount}  {pet.lastFedTimestamp}</div>
        </>
         
        )
    }
}    
  return <div>{}</div> 
}