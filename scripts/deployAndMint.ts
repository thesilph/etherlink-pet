import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

  async function deployBankie() {
    const adoptionPrice = 27n;
    const protocolFee = 5n;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const bankie_deploy = await hre.viem.deployContract("Bankie", [adoptionPrice, protocolFee], {
      value: 0,
    });
    console.log("Bankie deployed at:", bankie_deploy.address);
    const bankie = await hre.viem.getContractAt("Bankie", bankie_deploy.address)
    const publicClient = await hre.viem.getPublicClient();

    return {
      bankie,
      adoptionPrice,
      owner,
      otherAccount,
      publicClient,
    };
  }

async function deployAndMint(){
    const { bankie, adoptionPrice, otherAccount } = await loadFixture(deployBankie);

    // Call adopt from otherAccount
    const tx = await bankie.write.adopt(
      { account: otherAccount.account, value: adoptionPrice }
    );

    // Get the tokenId from the contract
    let tokenId = await bankie.read.tokenOfOwnerByIndex([otherAccount.account.address, 0n])
    console.log('token Id: ' + tokenId);

    // Check owner of tokenId
    const nftOwner = await bankie.read.ownerOf([tokenId]);

    console.log('NFT owner is: ' + nftOwner);
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployAndMint()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
