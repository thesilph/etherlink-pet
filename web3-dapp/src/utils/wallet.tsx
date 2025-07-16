import { getDefaultConfig } from "connectkit";
import { http, createConfig } from 'wagmi'
import { etherlink, etherlinkTestnet } from 'wagmi/chains'

export const config = createConfig(
  getDefaultConfig({
   chains: [etherlink, etherlinkTestnet],
  transports: {
    [etherlink.id]: http(),
    [etherlinkTestnet.id]: http(),
  },

    // Required API Keys
    walletConnectProjectId: import.meta.env.VITE_WALLET_PROJECTID,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);