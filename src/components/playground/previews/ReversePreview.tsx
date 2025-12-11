'use client';

import { LocateFixed } from 'lucide-react';

export function ReversePreview() {
	return (
		<div className="relative h-full w-full">
			{/* Map background with grid */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50" />
			<svg
				className="absolute inset-0 h-full w-full opacity-20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<pattern
						id="grid-reverse"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 20 0 L 0 0 0 20"
							fill="none"
							stroke="#2E90FA"
							strokeWidth="0.5"
						/>
					</pattern>
				</defs>
				<rect
					width="100%"
					height="100%"
					fill="url(#grid-reverse)"
				/>
			</svg>
			{/* Pin with info card */}
			<div className="absolute top-1/3 left-1/2 -translate-x-1/2 transform">
				<div className="mb-1 min-w-[120px] rounded-lg border border-blue-200 bg-white p-2 shadow-lg">
					<p className="text-[9px] font-semibold text-gray-700">Hồ Chí Minh City</p>
					<p className="text-[8px] text-gray-500">10.762622, 106.660172</p>
				</div>
				<div className="flex justify-center">
					<LocateFixed className="h-6 w-6 text-blue-500" />
				</div>
			</div>
			{/* Coordinates display */}
			<div className="absolute right-4 bottom-4 rounded bg-white/80 px-2 py-1">
				<span className="font-mono text-[8px] text-blue-600">21.0285, 105.8542</span>
			</div>
		</div>
	);
}

export default ReversePreview;
