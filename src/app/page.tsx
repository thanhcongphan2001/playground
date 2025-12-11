import { redirect } from 'next/navigation';

function MainPage() {
	redirect(`/playground`);
	return null;
}

export default MainPage;
