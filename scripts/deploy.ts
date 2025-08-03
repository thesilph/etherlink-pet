const hre = require("hardhat");

const adoptionPrice = 27n;
const protocolFee = 5n;

async function main() {
  const [deployer] = await hre.viem.getWalletClients();
  console.log("Deploying contracts with the account:", deployer.account.address);

  const bankie_deploy = await hre.viem.deployContract("Bankie", [adoptionPrice, protocolFee], {
      account: deployer.account
    });

  const bankie = await hre.viem.getContractAt("Bankie", bankie_deploy.address)
  console.log("Bankie deployed to:", bankie_deploy.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});