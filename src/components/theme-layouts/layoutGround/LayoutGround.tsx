import { memo, ReactNode } from 'react';

type LayoutGroundProps = {
	children?: ReactNode;
};

/**
 * LayoutGround - A minimal layout for playground/GIS applications.
 * Only renders the children content without any UI chrome (navbar, toolbar, footer, side panels).
 */
function LayoutGround(props: LayoutGroundProps) {
	const { children } = props;

	return (
		<div
			id="fuse-layout"
			className="flex h-svh w-full flex-auto flex-col"
		>
			<main
				id="fuse-main"
				className="relative flex min-h-0 flex-auto flex-col"
			>
				{children}
			</main>
		</div>
	);
}

export default memo(LayoutGround);
