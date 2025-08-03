import { render } from 'preact';
import './style.css';
import { Index } from './pages';
import { WagmiProvider } from 'wagmi';
import { config } from './utils/wallet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from './components/userprofile';
import { ConnectKitProvider } from 'connectkit';

const queryClient = new QueryClient()

export function App() {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider>
					<Index></Index>
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}


render(<App />, document.getElementById('app'));

