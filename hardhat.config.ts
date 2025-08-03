require("dotenv").config();
import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const ETHERLINK_TESTNET_RPC_URL = process.env.ETHERLINK_TESTNET_RPC_URL || "https://rpc.ankr.com/etherlink_testnet";
const ETHERLINK_MAINNET_RPC_URL = process.env.ETHERLINK_MAINNET_RPC_URL || "https://node.mainnet.etherlink.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config : HardhatUserConfig = {
  solidity: "0.8.20", // or whatever version your contract uses
  networks: {
    hardhat: {
    chainId: 1337
  },
    etherlinkTestnet: {
      url: ETHERLINK_TESTNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    etherlinkMainnet: {
      url: ETHERLINK_MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
};
export default config;
