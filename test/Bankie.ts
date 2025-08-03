import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("Bankie", function () {
  // We define a fixture to reuse the same setup in every test.
  async function deployBankie() {
    const adoptionPrice = 27n;
    const protocolFee = 5n;
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const bankie_deploy = await hre.viem.deployContract(
      "Bankie",
      [adoptionPrice, protocolFee],
      {
        value: 0,
      },
    );
    const bankie = await hre.viem.getContractAt(
      "Bankie",
      bankie_deploy.address,
    );
    const publicClient = await hre.viem.getPublicClient();

    return {
      bankie,
      adoptionPrice,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right price", async function () {
      const { bankie, adoptionPrice } = await loadFixture(deployBankie);

      expect(await bankie.read.adoptionPrice()).to.equal(adoptionPrice);
    });

    it("Should set the right owner", async function () {
      const { bankie, owner } = await loadFixture(deployBankie);

      expect(await bankie.read.owner()).to.equal(
        getAddress(owner.account.address),
      );
    });   
  });

  describe("Adoption", function () {
    it("Should mint a new NFT and set the correct owner", async function () {
      const { owner, bankie, adoptionPrice, otherAccount } =
        await loadFixture(deployBankie);

      // Call adopt from otherAccount
      const tx = await bankie.write.adopt({
        account: otherAccount.account,
        value: adoptionPrice,
      });

      // Get the tokenId from the contract
      let tokenId = await bankie.read.tokenOfOwnerByIndex([otherAccount.account.address, 0n])
      console.log('token Id: ' + tokenId);
      
      // Check owner of tokenId
      const nftOwner = await bankie.read.ownerOf([tokenId]);
      expect(nftOwner.toLowerCase()).to.equal(
        otherAccount.account.address.toLowerCase(),
      );
    });
  });
});
