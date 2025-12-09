'use client';

import { Search, MapPin } from 'lucide-react';

export function AutocompletePreview() {
	return (
		<div className="relative h-full w-full">
			{/* Search box */}
			<div className="absolute top-4 right-4 left-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-md">
				<Search className="h-4 w-4 text-gray-400" />
				<span className="text-xs text-gray-400">215 Trần Nhân Tôn</span>
				<div className="ml-auto h-4 w-4 rounded bg-blue-500" />
			</div>
			{/* Dropdown results */}
			<div className="absolute top-14 right-4 left-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
				{['215 Trần Nhân Tôn, P.2', '215 Trần Nhân Tôn, Q.10', '215 Trần Nhân Tôn, Tân Bình'].map((item, i) => (
					<div
						key={i}
						className={`flex items-center gap-2 border-b border-gray-100 px-3 py-2 last:border-0 ${i === 0 ? 'bg-blue-50' : ''}`}
					>
						<MapPin className="h-3 w-3 text-blue-500" />
						<span className="truncate text-[10px] text-gray-600">{item}</span>
					</div>
				))}
			</div>
			{/* Map background */}
			<div className="absolute right-0 bottom-0 h-2/3 w-3/4 rounded-tl-2xl bg-gradient-to-br from-blue-50 to-blue-100 opacity-50" />
			<div className="absolute right-4 bottom-4">
				<MapPin className="h-6 w-6 text-blue-500" />
			</div>
		</div>
	);
}

export default AutocompletePreview;

