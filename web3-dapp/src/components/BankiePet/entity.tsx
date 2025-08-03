import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import contract from '../../../../artifacts/contracts/Bankie.sol/Bankie.json'
import { useAccount, useEnsName } from 'wagmi'
import {Bankie$Type} from  '../../../../artifacts/contracts/Bankie.sol/Bankie'
import md5 from 'md5';
import { BankieVisual } from './bankievisual';
import { BankieBox } from './bankiebox';
import { etherlink, etherlinkTestnet, localhost } from 'wagmi/chains'
import { useEffect } from 'preact/hooks';
import { useQueryClient } from '@tanstack/react-query';

export function ReadBankieContract() {
    const { address, isConnected, isConnecting, isDisconnected} = useAccount();
    const bankieContract = contract as Bankie$Type;
    const bankieAddress = import.meta.env.VITE_BANKIE_ADDRESS;
    const currentChain = localhost;
    const queryClient = useQueryClient();

    const { writeContract, data: writeHash, isPending: isWritePending, error: writeError } = useWriteContract();
    
    // Wait for the transaction to be confirmed
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
        hash: writeHash 
    });


    useEffect(() => {
        // This effect runs whenever a transaction is confirmed
        // Invalidate the 'balanceOf' query to trigger a refetch
        if (isConfirmed) {
            console.log("Transaction confirmed! Refetching data.");
            queryClient.invalidateQueries({ 
                queryKey: ['readContract', { 
                    address: bankieAddress, 
                    abi: bankieContract.abi, 
                    functionName: 'balanceOf' 
                }] 
            });
        }
    }, [isConfirmed, queryClient, bankieAddress, bankieContract.abi]);


    function adopt(){
        const adoptionPrice = 27n; // TODO: 
        if(adoptionPrice){
                writeContract({
                        account: address,
                        chain: currentChain,
                        address: bankieAddress,
                        ...bankieContract,
                        functionName: 'adopt',
                        args: [],
                        value: adoptionPrice
                    })
        }

    }

    if(isConnecting){
        return <div>is connecting</div>
    }
    if(isDisconnected){
        return <div>is disconnected</div>
    }
    if(!address){
        return <div>!address</div>
    }
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
                        chain: currentChain,
                        address: bankieAddress,
                        ...bankieContract,
                        functionName: 'feedPet',
                        args: [tokenId],
                    })
                }

                function harvestFunction(){
                    writeContract({
                        account: address,
                        chain: currentChain,
                        address: bankieAddress,
                        ...bankieContract,
                        functionName: 'layGoldenEgg',
                        args: [tokenId],
                    })
                }
                if(pet)
                return (
                <>
                    <BankieBox id={tokenId} pet={pet} feedFunction={feedFunction} harvestFunction={harvestFunction}/>
                </>
            
            )
            }
        }
        else{
            return (
                    <div>
                        <label>It seems like you don't have a Bankie!</label>
                        <button onClick={() => adopt()}>Adopt</button>
                        {isWritePending && <div>Confirming transaction in wallet...</div>}
                        {isConfirming && <div>Adoption in progress. Please wait for confirmation...</div>}
                    </div>
                );
        }
    }    
    return (
    <div> 
        !isConnected
    </div> 
    )
}

