'use client';

import { Navigation } from 'lucide-react';

export function RoutePreview() {
	return (
		<div className="relative h-full w-full overflow-hidden">
			{/* Map background */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50" />
			{/* Route line */}
			<svg
				className="absolute inset-0 h-full w-full"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M 30 140 Q 60 100 100 90 T 160 60 T 220 80"
					fill="none"
					stroke="#1570EF"
					strokeWidth="3"
					strokeLinecap="round"
					strokeDasharray="0"
					className="drop-shadow-md"
				/>
				<path
					d="M 30 140 Q 60 100 100 90 T 160 60 T 220 80"
					fill="none"
					stroke="#2E90FA"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
			{/* Start point */}
			<div className="absolute bottom-12 left-4">
				<div className="rounded-full border-2 border-blue-500 bg-white p-1 shadow-md">
					<div className="h-3 w-3 rounded-full bg-blue-500" />
				</div>
				<span className="ml-1 text-[8px] text-gray-600">Start</span>
			</div>
			{/* End point */}
			<div className="absolute top-8 right-4">
				<div className="rounded-full border-2 border-blue-500 bg-white p-1 shadow-md">
					<Navigation className="h-3 w-3 text-blue-500" />
				</div>
				<span className="text-[8px] text-gray-600">End</span>
			</div>
			{/* Info card */}
			<div className="absolute right-4 bottom-4 rounded-lg border border-blue-200 bg-white p-2 shadow-md">
				<div className="flex items-center gap-3">
					<div>
						<p className="text-[8px] text-gray-500">Distance</p>
						<p className="text-[10px] font-bold text-blue-600">12.5 km</p>
					</div>
					<div className="h-6 w-px bg-gray-200" />
					<div>
						<p className="text-[8px] text-gray-500">Duration</p>
						<p className="text-[10px] font-bold text-blue-600">30 min</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RoutePreview;
