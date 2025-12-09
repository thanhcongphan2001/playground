'use client';

import { useState, useCallback, useMemo } from 'react';
import {
	TextField,
	List,
	ListItemButton,
	ListItemText,
	IconButton,
	InputAdornment,
	Chip,
	CircularProgress,
	Tooltip,
	Button
} from '@mui/material';
import {
	Search,
	ArrowLeft,
	Copy,
	MapPin,
	Key,
	Settings,
	ChevronDown,
	ChevronUp,
	Navigation,
	Play,
	RotateCcw,
	LocateFixed
} from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { MapView, MarkerData } from '@/components/playground';

// Types
type ApiType = 'autocomplete' | 'reverse' | 'geocoding' | 'route';

interface SearchResult {
	id: string;
	name: string;
	address: string;
	lat: number;
	lng: number;
	type?: string;
}

interface ReverseResult {
	lat: number;
	lng: number;
	address: string;
	formattedAddress: string;
	district?: string;
	city?: string;
}

interface GeocodingResult {
	lat: number;
	lng: number;
	address: string;
	formattedAddress: string;
}

interface RouteResult {
	distance: number;
	duration: number;
	steps: { instruction: string; distance: number }[];
}

// Mock data
const mockSearchResults: SearchResult[] = [
	{
		id: '1',
		name: 'Hồ Hoàn Kiếm',
		address: 'Quận Hoàn Kiếm, Hà Nội',
		lat: 21.0285,
		lng: 105.8542,
		type: 'landmark'
	},
	{
		id: '2',
		name: 'Hồ Tây',
		address: 'Quận Tây Hồ, Hà Nội',
		lat: 21.0545,
		lng: 105.8238,
		type: 'landmark'
	},
	{
		id: '3',
		name: 'Hồ Gươm Plaza',
		address: '110 Trần Phú, Hà Đông',
		lat: 20.9722,
		lng: 105.7778,
		type: 'building'
	}
];

const mockReverseResult: ReverseResult = {
	lat: 21.0285,
	lng: 105.8542,
	address: '1 Đinh Tiên Hoàng',
	formattedAddress: '1 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội, Việt Nam',
	district: 'Hoàn Kiếm',
	city: 'Hà Nội'
};

const mockGeocodingResult: GeocodingResult = {
	lat: 21.0285,
	lng: 105.8542,
	address: '1 Đinh Tiên Hoàng',
	formattedAddress: '1 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội, Việt Nam'
};

const mockRouteResult: RouteResult = {
	distance: 12500,
	duration: 1800,
	steps: [
		{ instruction: 'Đi thẳng trên đường Đinh Tiên Hoàng', distance: 500 },
		{ instruction: 'Rẽ phải vào đường Tràng Tiền', distance: 800 },
		{ instruction: 'Tiếp tục đi thẳng', distance: 1200 }
	]
};

// API configs
const apiConfigs: Record<ApiType, { label: string; icon: React.ReactNode; color: string; description: string }> = {
	autocomplete: {
		label: 'Autocomplete API',
		icon: <Search className="h-5 w-5" />,
		color: '#2E90FA',
		description: 'Search for places with Vietmap Autocomplete API'
	},
	reverse: {
		label: 'Reverse API',
		icon: <LocateFixed className="h-5 w-5" />,
		color: '#F97316',
		description: 'Identify location from coordinates with Vietmap Reverse API'
	},
	geocoding: {
		label: 'Geocoding API',
		icon: <MapPin className="h-5 w-5" />,
		color: '#7C3AED',
		description: 'Convert address to coordinates with Vietmap Geocode API'
	},
	route: {
		label: 'Route API',
		icon: <Navigation className="h-5 w-5" />,
		color: '#10B981',
		description: 'Find routes between points with Vietmap Route API'
	}
};

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function ApiExplorerPage({ params }: PageProps) {
	const { id } = use(params);

	const apiType = (['autocomplete', 'reverse', 'geocoding', 'route'].includes(id) ? id : 'autocomplete') as ApiType;

	const config = apiConfigs[apiType];

	const [apiKey, setApiKey] = useState('');
	const [showSettings, setShowSettings] = useState(true);
	const [loading, setLoading] = useState(false);
	const [responseJson, setResponseJson] = useState<string>('');

	// Autocomplete state
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

	// Reverse state
	const [reverseLat, setReverseLat] = useState('');
	const [reverseLng, setReverseLng] = useState('');
	const [reverseResult, setReverseResult] = useState<ReverseResult | null>(null);

	// Geocoding state
	const [geocodeInput, setGeocodeInput] = useState('');
	const [geocodingResult, setGeocodingResult] = useState<GeocodingResult | null>(null);

	// Routing state
	const [origin, setOrigin] = useState('');
	const [destination, setDestination] = useState('');
	const [routeResult, setRouteResult] = useState<RouteResult | null>(null);

	// Map state
	const [mapClickedPoint, setMapClickedPoint] = useState<{ lat: number; lng: number } | null>(null);

	// Generate markers based on API type and results
	const markers: MarkerData[] = useMemo(() => {
		const result: MarkerData[] = [];

		// Autocomplete markers
		if (apiType === 'autocomplete') {
			searchResults.forEach((item) => {
				result.push({
					id: item.id,
					longitude: item.lng,
					latitude: item.lat,
					label: item.name,
					color: selectedResult?.id === item.id ? '#2E90FA' : '#667085',
					popup: (
						<div className="p-2">
							<p className="font-semibold text-gray-800">{item.name}</p>
							<p className="text-sm text-gray-600">{item.address}</p>
							<p className="text-xs text-gray-400">
								{item.lat}, {item.lng}
							</p>
						</div>
					)
				});
			});
		}

		// Reverse marker
		if (apiType === 'reverse' && reverseResult) {
			result.push({
				id: 'reverse-result',
				longitude: reverseResult.lng,
				latitude: reverseResult.lat,
				label: reverseResult.address,
				color: '#F97316',
				popup: (
					<div className="p-2">
						<p className="font-semibold text-gray-800">{reverseResult.formattedAddress}</p>
						<p className="text-sm text-gray-600">
							{reverseResult.district}, {reverseResult.city}
						</p>
					</div>
				)
			});
		}

		// Geocoding marker
		if (apiType === 'geocoding' && geocodingResult) {
			result.push({
				id: 'geocoding-result',
				longitude: geocodingResult.lng,
				latitude: geocodingResult.lat,
				label: geocodingResult.address,
				color: '#7C3AED',
				popup: (
					<div className="p-2">
						<p className="font-semibold text-gray-800">{geocodingResult.formattedAddress}</p>
						<p className="text-xs text-gray-400">
							{geocodingResult.lat}, {geocodingResult.lng}
						</p>
					</div>
				)
			});
		}

		// Route markers (start and end)
		if (apiType === 'route' && routeResult) {
			result.push({
				id: 'route-start',
				longitude: 105.8542,
				latitude: 21.0285,
				label: 'Start',
				color: '#10B981'
			});
			result.push({
				id: 'route-end',
				longitude: 105.8238,
				latitude: 21.0545,
				label: 'End',
				color: '#EF4444'
			});
		}

		// Map clicked point
		if (mapClickedPoint && apiType === 'reverse') {
			result.push({
				id: 'clicked-point',
				longitude: mapClickedPoint.lng,
				latitude: mapClickedPoint.lat,
				color: '#F97316'
			});
		}

		return result;
	}, [apiType, searchResults, selectedResult, reverseResult, geocodingResult, routeResult, mapClickedPoint]);

	// Handle map click
	const handleMapClick = useCallback(
		(event: { longitude: number; latitude: number }) => {
			if (apiType === 'reverse') {
				setReverseLat(event.latitude.toFixed(6));
				setReverseLng(event.longitude.toFixed(6));
				setMapClickedPoint({ lat: event.latitude, lng: event.longitude });
			}
		},
		[apiType]
	);

	// Handlers
	const handleSearch = useCallback(async () => {
		if (!searchQuery.trim()) return;

		setLoading(true);
		await new Promise((r) => setTimeout(r, 500));
		const filtered = mockSearchResults.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
		setSearchResults(filtered);
		setResponseJson(JSON.stringify({ results: filtered }, null, 2));
		setLoading(false);
	}, [searchQuery]);

	const handleReverse = useCallback(async () => {
		if (!reverseLat.trim() || !reverseLng.trim()) return;

		setLoading(true);
		await new Promise((r) => setTimeout(r, 500));
		setReverseResult(mockReverseResult);
		setResponseJson(JSON.stringify(mockReverseResult, null, 2));
		setLoading(false);
	}, [reverseLat, reverseLng]);

	const handleGeocode = useCallback(async () => {
		if (!geocodeInput.trim()) return;

		setLoading(true);
		await new Promise((r) => setTimeout(r, 500));
		setGeocodingResult(mockGeocodingResult);
		setResponseJson(JSON.stringify(mockGeocodingResult, null, 2));
		setLoading(false);
	}, [geocodeInput]);

	const handleRoute = useCallback(async () => {
		if (!origin.trim() || !destination.trim()) return;

		setLoading(true);
		await new Promise((r) => setTimeout(r, 800));
		setRouteResult(mockRouteResult);
		setResponseJson(JSON.stringify(mockRouteResult, null, 2));
		setLoading(false);
	}, [origin, destination]);

	const handleReset = () => {
		setSearchQuery('');
		setSearchResults([]);
		setSelectedResult(null);
		setReverseLat('');
		setReverseLng('');
		setReverseResult(null);
		setGeocodeInput('');
		setGeocodingResult(null);
		setOrigin('');
		setDestination('');
		setRouteResult(null);
		setResponseJson('');
	};

	const handleCopyResponse = () => {
		navigator.clipboard.writeText(responseJson);
	};

	const handleExecute = () => {
		switch (apiType) {
			case 'autocomplete':
				handleSearch();
				break;
			case 'reverse':
				handleReverse();
				break;
			case 'geocoding':
				handleGeocode();
				break;
			case 'route':
				handleRoute();
				break;
		}
	};

	return (
		<div className="flex h-screen flex-col overflow-hidden bg-gray-100">
			{/* Main Content - 2 columns */}
			<div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
				{/* Left Panel - API Parameters */}
				<aside className="flex w-full shrink-0 flex-col overflow-hidden border-b border-gray-200 bg-white lg:w-[460px] lg:border-r lg:border-b-0">
					{/* Panel Header */}
					<div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4">
						<Settings
							className="h-5 w-5"
							style={{ color: config.color }}
						/>
						<h2
							className="text-base font-semibold"
							style={{ color: config.color }}
						>
							API Parameters
						</h2>
					</div>

					{/* Scrollable Content */}
					<div className="flex-1 overflow-y-auto">
						{/* Required Parameters Section */}
						<div className="border-b border-gray-200 px-5 py-5">
							<h3 className="mb-4 text-sm font-semibold text-gray-900">Required parameter</h3>

							{/* API Key */}
							<div className="mb-5">
								<label
									className="mb-1.5 flex items-center gap-1 text-sm font-medium"
									style={{ color: config.color }}
								>
									Vietmap API Key <span className="text-red-500">*</span>
								</label>
								<TextField
									fullWidth
									size="small"
									type="password"
									placeholder="Enter your API key"
									value={apiKey}
									onChange={(e) => setApiKey(e.target.value)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													size="small"
													edge="end"
												>
													<Key className="h-4 w-4 text-gray-400" />
												</IconButton>
											</InputAdornment>
										)
									}}
									sx={{
										'& .MuiOutlinedInput-root': {
											bgcolor: 'white',
											'& fieldset': { borderColor: '#E5E7EB' }
										}
									}}
								/>
								<p className="mt-1.5 text-xs text-gray-500">
									API key provided by VIETMAP for customer account.{' '}
									<a
										href="#"
										className="text-blue-600 hover:underline"
									>
										Click here to register an apikey for free
									</a>
								</p>
							</div>

							{/* Main Input Field */}
							{apiType === 'autocomplete' && (
								<div>
									<label
										className="mb-1.5 block text-sm font-medium"
										style={{ color: config.color }}
									>
										text <span className="text-red-500">*</span>
									</label>
									<TextField
										fullWidth
										size="small"
										placeholder="Company"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
										sx={{
											'& .MuiOutlinedInput-root': {
												bgcolor: 'white',
												'& fieldset': { borderColor: '#E5E7EB' }
											}
										}}
									/>
									<p className="mt-1.5 text-xs text-gray-500">Content user wants to search for</p>
								</div>
							)}

							{apiType === 'reverse' && (
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											className="mb-1.5 block text-sm font-medium"
											style={{ color: config.color }}
										>
											lat <span className="text-red-500">*</span>
										</label>
										<TextField
											fullWidth
											size="small"
											placeholder="21.0285"
											value={reverseLat}
											onChange={(e) => setReverseLat(e.target.value)}
											sx={{
												'& .MuiOutlinedInput-root': {
													bgcolor: 'white',
													'& fieldset': { borderColor: '#E5E7EB' }
												}
											}}
										/>
										<p className="mt-1.5 text-xs text-gray-500">Latitude coordinate</p>
									</div>
									<div>
										<label
											className="mb-1.5 block text-sm font-medium"
											style={{ color: config.color }}
										>
											lng <span className="text-red-500">*</span>
										</label>
										<TextField
											fullWidth
											size="small"
											placeholder="105.8542"
											value={reverseLng}
											onChange={(e) => setReverseLng(e.target.value)}
											sx={{
												'& .MuiOutlinedInput-root': {
													bgcolor: 'white',
													'& fieldset': { borderColor: '#E5E7EB' }
												}
											}}
										/>
										<p className="mt-1.5 text-xs text-gray-500">Longitude coordinate</p>
									</div>
								</div>
							)}

							{apiType === 'geocoding' && (
								<div>
									<label
										className="mb-1.5 block text-sm font-medium"
										style={{ color: config.color }}
									>
										address <span className="text-red-500">*</span>
									</label>
									<TextField
										fullWidth
										size="small"
										placeholder="268 Ly Thuong Kiet, Quan 10, TP HCM"
										value={geocodeInput}
										onChange={(e) => setGeocodeInput(e.target.value)}
										sx={{
											'& .MuiOutlinedInput-root': {
												bgcolor: 'white',
												'& fieldset': { borderColor: '#E5E7EB' }
											}
										}}
									/>
									<p className="mt-1.5 text-xs text-gray-500">Address to geocode</p>
								</div>
							)}

							{apiType === 'route' && (
								<div className="space-y-4">
									<div>
										<label
											className="mb-1.5 block text-sm font-medium"
											style={{ color: config.color }}
										>
											origin <span className="text-red-500">*</span>
										</label>
										<TextField
											fullWidth
											size="small"
											placeholder="10.762622,106.660172"
											value={origin}
											onChange={(e) => setOrigin(e.target.value)}
											sx={{
												'& .MuiOutlinedInput-root': {
													bgcolor: 'white',
													'& fieldset': { borderColor: '#E5E7EB' }
												}
											}}
										/>
										<p className="mt-1.5 text-xs text-gray-500">Starting point (lat,lng)</p>
									</div>
									<div>
										<label
											className="mb-1.5 block text-sm font-medium"
											style={{ color: config.color }}
										>
											destination <span className="text-red-500">*</span>
										</label>
										<TextField
											fullWidth
											size="small"
											placeholder="10.802622,106.680172"
											value={destination}
											onChange={(e) => setDestination(e.target.value)}
											sx={{
												'& .MuiOutlinedInput-root': {
													bgcolor: 'white',
													'& fieldset': { borderColor: '#E5E7EB' }
												}
											}}
										/>
										<p className="mt-1.5 text-xs text-gray-500">Destination point (lat,lng)</p>
									</div>
								</div>
							)}
						</div>

						{/* Optional Parameters Section */}
						<div className="border-b border-gray-200">
							<div
								className="flex cursor-pointer items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50"
								onClick={() => setShowSettings(!showSettings)}
							>
								<h3 className="text-sm font-semibold text-gray-900">Optional parameter</h3>
								{showSettings ? (
									<ChevronUp className="h-5 w-5 text-gray-400" />
								) : (
									<ChevronDown className="h-5 w-5 text-gray-400" />
								)}
							</div>

							{showSettings && (
								<div className="space-y-5 px-5 pb-5">
									{/* Location filters */}
									<div>
										<h4 className="mb-2 text-sm font-medium text-blue-600">
											Location filters (By admin)
										</h4>
										<p className="mb-3 text-xs text-gray-500">
											API will search for addresses within the admin (province, district, ward
											entered based on id). If not found, API will return empty.
										</p>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="mb-1.5 block text-sm font-medium text-blue-600">
													cityId
												</label>
												<TextField
													fullWidth
													size="small"
													placeholder="12"
													sx={{
														'& .MuiOutlinedInput-root': {
															bgcolor: 'white',
															'& fieldset': { borderColor: '#E5E7EB' }
														}
													}}
												/>
												<p className="mt-1.5 text-xs text-gray-500">Unique ID of the city</p>
											</div>
											<div>
												<label className="mb-1.5 block text-sm font-medium text-blue-600">
													distId
												</label>
												<TextField
													fullWidth
													size="small"
													placeholder="1202"
													sx={{
														'& .MuiOutlinedInput-root': {
															bgcolor: 'white',
															'& fieldset': { borderColor: '#E5E7EB' }
														}
													}}
												/>
												<p className="mt-1.5 text-xs text-gray-500">
													Unique ID of the district
												</p>
											</div>
										</div>
									</div>

									{/* Focus location */}
									<div>
										<h4 className="mb-2 text-sm font-medium text-blue-600">
											Location filters (By coordinates)
										</h4>
										<p className="mb-3 text-xs text-gray-500">
											Focus: When searching, results near the input coordinates will be
											prioritized to the top.
										</p>
										<div>
											<label className="mb-1.5 block text-sm font-medium text-blue-600">
												focus
											</label>
											<TextField
												fullWidth
												size="small"
												placeholder="10.7568607,106.6765666"
												sx={{
													'& .MuiOutlinedInput-root': {
														bgcolor: 'white',
														'& fieldset': { borderColor: '#E5E7EB' }
													}
												}}
											/>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Send Request Button */}
						<div className="p-5">
							<Button
								fullWidth
								variant="contained"
								size="large"
								startIcon={
									loading ? (
										<CircularProgress
											size={18}
											color="inherit"
										/>
									) : (
										<Play className="h-5 w-5" />
									)
								}
								onClick={handleExecute}
								disabled={loading}
								sx={{
									py: 1.5,
									bgcolor: config.color,
									textTransform: 'none',
									fontWeight: 600,
									fontSize: '0.95rem',
									borderRadius: 2,
									boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
									'&:hover': { bgcolor: `${config.color}dd` }
								}}
							>
								Send Request
							</Button>
							<Button
								fullWidth
								variant="text"
								size="small"
								startIcon={<RotateCcw className="h-4 w-4" />}
								onClick={handleReset}
								sx={{
									mt: 1.5,
									color: '#667085',
									textTransform: 'none',
									'&:hover': { bgcolor: '#F9FAFB' }
								}}
							>
								Reset Parameters
							</Button>
						</div>
					</div>
				</aside>

				{/* Right Panel - Map View + Search Results */}
				<div className="flex flex-1 flex-col overflow-hidden bg-white">
					{/* Map Header */}
					<div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4">
						<MapPin className="h-5 w-5 text-gray-400" />
						<h2 className="text-base font-semibold text-gray-700">Map View</h2>
					</div>

					{/* Map Area */}
					<div className="relative flex-1">
						<MapView
							markers={markers}
							onClick={handleMapClick}
							onMarkerClick={(marker) => {
								if (apiType === 'autocomplete') {
									const result = searchResults.find((r) => r.id === marker.id);
									if (result) setSelectedResult(result);
								}
							}}
							initialCenter={
								selectedResult
									? { longitude: selectedResult.lng, latitude: selectedResult.lat }
									: reverseResult
										? { longitude: reverseResult.lng, latitude: reverseResult.lat }
										: geocodingResult
											? { longitude: geocodingResult.lng, latitude: geocodingResult.lat }
											: { longitude: 106.660172, latitude: 10.762622 }
							}
							initialZoom={14}
							className="h-full w-full"
						/>

						{/* Selected Result Info */}
						{selectedResult && (
							<div className="absolute top-4 left-4 z-10 max-w-[300px] rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
								<p className="font-semibold text-gray-800">{selectedResult.name}</p>
								<p className="mt-1 text-sm text-gray-600">{selectedResult.address}</p>
								<p className="mt-2 text-xs text-gray-400">
									{selectedResult.lat}, {selectedResult.lng}
								</p>
							</div>
						)}
					</div>

					{/* Search Results - Only for autocomplete */}
					{apiType === 'autocomplete' && (
						<div className="h-[280px] shrink-0 overflow-hidden border-t border-gray-200">
							<div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3">
								<Search className="h-4 w-4 text-gray-400" />
								<h2 className="text-sm font-semibold text-gray-700">
									Search Results ({searchResults.length})
								</h2>
							</div>
							<div className="h-[calc(100%-44px)] overflow-y-auto">
								{searchResults.length > 0 ? (
									<List
										dense
										disablePadding
									>
										{searchResults.map((result) => (
											<ListItemButton
												key={result.id}
												selected={selectedResult?.id === result.id}
												onClick={() => setSelectedResult(result)}
												sx={{
													px: 2.5,
													py: 1.5,
													'&.Mui-selected': { bgcolor: 'rgba(46, 144, 250, 0.08)' }
												}}
											>
												<MapPin className="mr-3 h-4 w-4 shrink-0 text-blue-500" />
												<ListItemText
													primary={result.name}
													secondary={result.address}
													primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }}
													secondaryTypographyProps={{ fontSize: 12, noWrap: true }}
												/>
												{result.type && (
													<Chip
														label={result.type}
														size="small"
														sx={{ fontSize: 10, height: 20, ml: 1 }}
													/>
												)}
											</ListItemButton>
										))}
									</List>
								) : (
									<div className="flex h-full items-center justify-center">
										<p className="text-sm text-gray-400">
											Enter a search query and click &quot;Send Request&quot;
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Reverse Result */}
					{apiType === 'reverse' && reverseResult && (
						<div className="shrink-0 border-t border-gray-200 p-5">
							<div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
								<p className="font-semibold text-orange-800">{reverseResult.formattedAddress}</p>
								<p className="mt-1 text-sm text-orange-600">
									{reverseResult.lat}, {reverseResult.lng}
								</p>
							</div>
						</div>
					)}

					{/* Geocoding Result */}
					{apiType === 'geocoding' && geocodingResult && (
						<div className="shrink-0 border-t border-gray-200 p-5">
							<div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
								<p className="font-semibold text-purple-800">{geocodingResult.formattedAddress}</p>
								<p className="mt-1 text-sm text-purple-600">
									Lat: {geocodingResult.lat}, Lng: {geocodingResult.lng}
								</p>
							</div>
						</div>
					)}

					{/* Route Result */}
					{apiType === 'route' && routeResult && (
						<div className="shrink-0 border-t border-gray-200 p-5">
							<div className="rounded-xl border border-green-200 bg-green-50 p-4">
								<div className="mb-3 flex gap-6">
									<div>
										<p className="text-xs font-medium text-green-600">Distance</p>
										<p className="text-lg font-bold text-green-800">
											{(routeResult.distance / 1000).toFixed(1)} km
										</p>
									</div>
									<div>
										<p className="text-xs font-medium text-green-600">Duration</p>
										<p className="text-lg font-bold text-green-800">
											{Math.round(routeResult.duration / 60)} min
										</p>
									</div>
								</div>
								<p className="mb-2 text-xs font-semibold text-green-600">Steps:</p>
								<div className="max-h-[100px] space-y-1 overflow-y-auto">
									{routeResult.steps.map((step, i) => (
										<p
											key={i}
											className="text-sm text-green-700"
										>
											{i + 1}. {step.instruction} ({step.distance}m)
										</p>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Response Panel */}
			<div className="border-t border-gray-200 bg-white">
				<div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
					<span className="text-sm font-semibold text-gray-700">Response</span>
					<Tooltip title="Copy Response">
						<IconButton
							size="small"
							onClick={handleCopyResponse}
							disabled={!responseJson}
						>
							<Copy className="h-4 w-4" />
						</IconButton>
					</Tooltip>
				</div>
				<div className="h-[180px] overflow-auto bg-slate-800 p-4 lg:h-[200px]">
					<pre className="font-mono text-xs leading-relaxed text-slate-200">
						{responseJson || '// Response will appear here after executing the API...'}
					</pre>
				</div>
			</div>
		</div>
	);
}
