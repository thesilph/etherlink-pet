import { useReadContract, useWriteContract } from 'wagmi'
import contract from '../../../../artifacts/contracts/Bankie.sol/Bankie.json'
import { useAccount, useEnsName } from 'wagmi'
import {Bankie$Type} from  '../../../../artifacts/contracts/Bankie.sol/Bankie'
import md5 from 'md5';
import { BankieVisual } from './bankievisual';
import { BankieBox } from './bankiebox';
import { etherlink, etherlinkTestnet, localhost } from 'wagmi/chains'

export function ReadBankieContract() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const bankieContract = contract as Bankie$Type;
  const bankieAddress = import.meta.env.VITE_BANKIE_ADDRESS;
  const {writeContract} = useWriteContract();

  if(address) {
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
        
        if(tokenId != undefined){
            const { data: pet } = useReadContract({
            address: bankieAddress,
            ...bankieContract,
            functionName: 'checkPet',
            args: [tokenId],
            })

            function feedFunction(){
                writeContract({
                    account: address,
                    chain: localhost,
                    address: bankieAddress,
                    ...bankieContract,
                    functionName: 'feedPet',
                    args: [tokenId],
                })
            }

            function harvestFunction(){
                writeContract({
                    account: address,
                    chain: localhost,
                    address: bankieAddress,
                    ...bankieContract,
                    functionName: 'layGoldenEgg',
                    args: [tokenId],
                })
            }
           
            return (
            <>
                <BankieBox id={tokenId} pet={pet} feedFunction={feedFunction} harvestFunction={harvestFunction}/>
            </>
         
        )
        }
    }
}    
  return <div>{}</div> 
}

