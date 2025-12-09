'use client';

import { Check, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AutocompletePreview, ReversePreview, GeocodingPreview, RoutePreview } from './previews';

// Types
export interface ApiFeature {
	text: string;
}

export interface ApiCardData {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	iconBgColor: string;
	features: ApiFeature[];
	documentationUrl: string;
	exploreUrl: string;
	previewImage?: string;
}

// CheckIcon Component
function CheckIcon() {
	return (
		<div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[#D4EBFF] bg-[#E4F3FF]">
			<Check className="h-2.5 w-2.5 text-[#2B78DD]" />
		</div>
	);
}

// Get preview component by card id
function getPreviewComponent(id: string) {
	switch (id) {
		case 'autocomplete':
			return <AutocompletePreview />;
		case 'reverse':
			return <ReversePreview />;
		case 'geocoding':
			return <GeocodingPreview />;
		case 'route':
			return <RoutePreview />;
		default:
			return null;
	}
}

// API Card Component
export function ApiCard({ card }: { card: ApiCardData }) {
	return (
		<div className="relative pt-6 pb-2">
			{/* Icon Badge */}
			<div
				className="absolute top-1 left-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4EBFF] shadow-lg transition-transform duration-300 hover:scale-110"
				style={{ background: card.iconBgColor }}
			>
				{card.icon}
			</div>

			{/* Card */}
			<div className="group relative min-h-[320px] w-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
				{/* Preview Image Area - Hidden on mobile */}
				<div
					className="absolute inset-0 hidden md:block"
					style={{ marginLeft: '45%' }}
				>
					<div className="h-full w-full">{getPreviewComponent(card.id)}</div>
				</div>
				{/* Gradient overlay - Hidden on mobile */}
				<div
					className="absolute inset-0 hidden md:block"
					style={{
						marginLeft: '100px',
						background: 'linear-gradient(263deg, rgba(255, 255, 255, 0) 36.73%, rgb(255, 255, 255) 49.98%)'
					}}
				/>

				{/* Content */}
				<div className="relative z-10 flex min-h-[320px] w-full flex-col justify-between p-6 text-left md:w-[60%] lg:p-8">
					{/* Header */}
					<div className="mb-4">
						<h3 className="mb-2 text-xl leading-tight font-extrabold text-[#344054] lg:text-2xl">
							{card.title}
						</h3>
						<p className="text-sm leading-relaxed text-[#667085]">{card.description}</p>
					</div>

					{/* Features List */}
					<div className="mb-4 flex-grow">
						<ul className="space-y-2">
							{card.features.map((feature, index) => (
								<li
									key={index}
									className="flex items-start gap-3 text-left"
								>
									<CheckIcon />
									<span className="flex-1 text-xs leading-relaxed font-medium text-[#344054]">
										{feature.text}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Buttons */}
					<div className="mt-auto flex flex-col gap-4 sm:flex-row">
						<Link
							href={card.documentationUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[#E4E7EC] bg-[#F2F4F7] px-4 py-2 text-sm font-medium text-[#344054] transition-all duration-200 hover:border-[#D0D5DD] hover:bg-[#E4E7EC]"
						>
							<FileText className="h-4 w-4 flex-shrink-0" />
							<span>View Documentation</span>
						</Link>
						<Link
							href={card.exploreUrl}
							prefetch={true}
							className="inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md bg-[#2E90FA] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1570EF] hover:shadow-md"
						>
							<span>Explore API</span>
							<ArrowRight className="h-4 w-4 flex-shrink-0" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ApiCard;
