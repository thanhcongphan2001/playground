import { ReactNode } from 'react';

export const metadata = {
	title: 'API Playground',
	description: 'Test and explore API endpoints'
};

function PlaygroundLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

export default PlaygroundLayout;
