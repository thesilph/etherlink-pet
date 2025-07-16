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
    walletConnectProjectId: '818def9b2c94af699743434b04f15289',

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);