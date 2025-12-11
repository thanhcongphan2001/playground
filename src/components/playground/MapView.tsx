'use client';

import { useRef, useCallback, useState } from 'react';
import Map, { Marker, Popup, NavigationControl, ScaleControl, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// VietMap raster tiles configuration
const VIETMAP_TILES_URL =
	'https://maps.ots.vn/api/v1/tiles/basic/{z}/{x}/{y}/png?apikey=hSGqLq0OGhVLsMAnVIzsXcxo8nsVyyCNlu';

// Default map style using raster tiles
const mapStyle = {
	version: 8 as const,
	sources: {
		'raster-tiles': {
			type: 'raster' as const,
			tiles: [VIETMAP_TILES_URL],
			tileSize: 256
		}
	},
	layers: [
		{
			id: 'raster-layer',
			type: 'raster' as const,
			source: 'raster-tiles',
			minzoom: 0,
			maxzoom: 22
		}
	]
};

// Default center: Ho Chi Minh City
const DEFAULT_CENTER = {
	longitude: 106.660172,
	latitude: 10.762622,
	zoom: 14
};

export interface MarkerData {
	id: string;
	longitude: number;
	latitude: number;
	label?: string;
	color?: string;
	popup?: React.ReactNode;
}

export interface MapViewProps {
	// Initial view
	initialCenter?: { longitude: number; latitude: number };
	initialZoom?: number;
	// Markers
	markers?: MarkerData[];
	// Interaction
	onClick?: (event: { longitude: number; latitude: number }) => void;
	onMarkerClick?: (marker: MarkerData) => void;
	// Style
	className?: string;
	style?: React.CSSProperties;
	// Controls
	showNavigation?: boolean;
	showScale?: boolean;
	// Map ref for external control
	onMapLoad?: (map: MapRef) => void;
}

export function MapView({
	initialCenter,
	initialZoom = 14,
	markers = [],
	onClick,
	onMarkerClick,
	className = '',
	style,
	showNavigation = true,
	showScale = true,
	onMapLoad
}: MapViewProps) {
	const mapRef = useRef<MapRef>(null);
	const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

	const handleMapClick = useCallback(
		(event: mapboxgl.MapLayerMouseEvent) => {
			if (onClick) {
				onClick({
					longitude: event.lngLat.lng,
					latitude: event.lngLat.lat
				});
			}
		},
		[onClick]
	);

	const handleMarkerClick = useCallback(
		(marker: MarkerData) => {
			setSelectedMarker(marker);
			if (onMarkerClick) {
				onMarkerClick(marker);
			}
		},
		[onMarkerClick]
	);

	const handleMapLoad = useCallback(() => {
		if (onMapLoad && mapRef.current) {
			onMapLoad(mapRef.current);
		}
	}, [onMapLoad]);

	return (
		<Map
			ref={mapRef}
			initialViewState={{
				longitude: initialCenter?.longitude ?? DEFAULT_CENTER.longitude,
				latitude: initialCenter?.latitude ?? DEFAULT_CENTER.latitude,
				zoom: initialZoom
			}}
			style={{ width: '100%', height: '100%', ...style }}
			mapStyle={mapStyle}
			onClick={handleMapClick}
			onLoad={handleMapLoad}
			attributionControl={false}
		>
			{/* Navigation Controls */}
			{showNavigation && (
				<NavigationControl
					position="top-right"
					showCompass={true}
					showZoom={true}
				/>
			)}

			{/* Markers */}
			{markers.map((marker) => (
				<Marker
					key={marker.id}
					longitude={marker.longitude}
					latitude={marker.latitude}
					anchor="bottom"
					onClick={(e) => {
						e.originalEvent.stopPropagation();
						handleMarkerClick(marker);
					}}
				>
					<div
						className="flex cursor-pointer flex-col items-center transition-transform hover:scale-110"
						title={marker.label}
					>
						<svg
							width="32"
							height="40"
							viewBox="0 0 32 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16 0C7.164 0 0 7.164 0 16c0 12 16 24 16 24s16-12 16-24c0-8.836-7.164-16-16-16z"
								fill={marker.color || '#2E90FA'}
							/>
							<circle
								cx="16"
								cy="16"
								r="6"
								fill="white"
							/>
						</svg>
						{marker.label && (
							<span className="mt-1 max-w-[100px] truncate rounded bg-white px-1 text-xs font-medium text-gray-700 shadow">
								{marker.label}
							</span>
						)}
					</div>
				</Marker>
			))}

			{/* Popup for selected marker */}
			{selectedMarker && selectedMarker.popup && (
				<Popup
					longitude={selectedMarker.longitude}
					latitude={selectedMarker.latitude}
					anchor="bottom"
					offset={[0, -40]}
					closeOnClick={false}
					onClose={() => setSelectedMarker(null)}
				>
					{selectedMarker.popup}
				</Popup>
			)}
		</Map>
	);
}

export default MapView;
