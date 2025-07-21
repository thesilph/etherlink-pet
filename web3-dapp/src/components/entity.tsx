import { useReadContract } from 'wagmi'
import contract from '../../../artifacts/contracts/Bankie.sol/Bankie.json'
import { useAccount, useEnsName } from 'wagmi'
import {Bankie$Type} from  '../../../artifacts/contracts/Bankie.sol/Bankie'

export function ReadBankieContract() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const BankieContract = contract as Bankie$Type;
  const bankieAddress = import.meta.env.VITE_BANKIE_ADDRESS;
  if(address) {
    console.log('calling balance')
    const { data: balance } = useReadContract({
        address: bankieAddress,
        ...contract,
        functionName: 'balanceOf',
        args: [address],
    })

    console.log(balance);

    if(true || balance){
        console.log('calling token')
        const { data: tokenId } = useReadContract({
            address: bankieAddress,
            ...contract,
            functionName: 'tokenOfOwnerByIndex',
            args: [address, 0n], // 0 we're just getting the first one
        })
        console.log(tokenId)
        const { data: pet } = useReadContract({
            address: bankieAddress,
            ...contract,
            functionName: 'checkPet',
            args: [tokenId],
        })

        return (
        <>
            <div>balanceOf: {(balance)?.toString()}</div>
            <div>tokenId: {(tokenId)?.toString()}</div>
            <div>Pet: {(pet)?.toString()}</div>
        </>
         
        )
    }
}    
  return <div>{}</div> 
}