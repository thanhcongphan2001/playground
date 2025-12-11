'use client';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { useState } from 'react';
import useNavigationItems from './hooks/useNavigationItems';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	const { variant, className } = props;
	const { flattenData: navigation } = useNavigationItems();
	const [userShortcuts, setUserShortcuts] = useState<string[]>([]);

	function handleShortcutsChange(newShortcuts: string[]) {
		setUserShortcuts(newShortcuts);
	}

	return (
		<FuseShortcuts
			className={className}
			variant={variant}
			navigation={navigation}
			shortcuts={userShortcuts}
			onChange={handleShortcutsChange}
		/>
	);
}

export default NavigationShortcuts;
