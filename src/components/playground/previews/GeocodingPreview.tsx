'use client';

import { MapPin } from 'lucide-react';

export function GeocodingPreview() {
	return (
		<div className="relative h-full w-full">
			{/* Map background */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-100 opacity-50" />
			{/* Address input */}
			<div className="absolute top-4 right-4 left-4 rounded-lg border border-purple-200 bg-white p-2 shadow-md">
				<div className="flex items-center gap-2">
					<MapPin className="h-4 w-4 text-purple-500" />
					<span className="text-[10px] text-gray-600">1 Đinh Tiên Hoàng, Hoàn Kiếm</span>
				</div>
			</div>
			{/* Result card */}
			<div className="absolute top-16 left-4 rounded-lg border border-purple-200 bg-white p-3 shadow-lg">
				<div className="mb-2 flex items-center gap-2">
					<div className="h-2 w-2 rounded-full bg-purple-500" />
					<span className="text-[9px] font-semibold text-gray-700">Result</span>
				</div>
				<div className="space-y-1">
					<p className="text-[8px] text-gray-500">
						Lat: <span className="font-mono text-purple-600">21.0285</span>
					</p>
					<p className="text-[8px] text-gray-500">
						Lng: <span className="font-mono text-purple-600">105.8542</span>
					</p>
				</div>
			</div>
			{/* Map marker */}
			<div className="absolute right-8 bottom-8">
				<div className="relative">
					<div className="absolute -inset-3 animate-ping rounded-full bg-purple-200 opacity-30" />
					<MapPin className="relative z-10 h-8 w-8 text-purple-500" />
				</div>
			</div>
		</div>
	);
}

export default GeocodingPreview;

