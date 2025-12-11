'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { Search, MapPin, Navigation, LocateFixed } from 'lucide-react';
import { ApiCard, ApiCardData } from './ApiCard';

// API Cards Data
const apiCards: ApiCardData[] = [
	{
		id: 'autocomplete',
		title: 'Autocomplete API',
		description: 'Tìm kiếm địa điểm với Vietmap Autocomplete API',
		icon: <Search className="h-5 w-5 text-white" />,
		iconBgColor: 'linear-gradient(135deg, #2E90FA 0%, #1570EF 100%)',
		features: [
			{ text: 'Tự động gợi ý địa chỉ khi nhập' },
			{ text: 'Tìm kiếm theo từ khóa' },
			{ text: 'Hiển thị kết quả trên bản đồ' },
			{ text: 'Dữ liệu cập nhật hàng tuần' }
		],
		documentationUrl: '#',
		exploreUrl: '/playground/autocomplete',
		previewImage: '/assets/images/playground/autocomplete-preview.png'
	},
	{
		id: 'reverse',
		title: 'Reverse API',
		description: 'Xác định địa điểm từ tọa độ với Vietmap Reverse API',
		icon: <LocateFixed className="h-5 w-5 text-white" />,
		iconBgColor: 'linear-gradient(135deg, #2E90FA 0%, #1570EF 100%)',
		features: [
			{ text: 'Lấy thông tin địa điểm từ tọa độ' },
			{ text: 'Hiển thị thông tin chi tiết địa điểm' },
			{ text: 'Xem kết quả trên bản đồ' },
			{ text: 'Dữ liệu cập nhật hàng tuần' }
		],
		documentationUrl: '#',
		exploreUrl: '/playground/reverse',
		previewImage: '/assets/images/playground/reverse-preview.png'
	},
	{
		id: 'geocoding',
		title: 'Geocoding API',
		description: 'Chuyển đổi địa chỉ thành tọa độ với Vietmap Geocode API',
		icon: <MapPin className="h-5 w-5 text-white" />,
		iconBgColor: 'linear-gradient(135deg, #2E90FA 0%, #1570EF 100%)',
		features: [
			{ text: 'Tìm tọa độ từ địa chỉ văn bản' },
			{ text: 'Lọc kết quả theo tỉnh, quận, phường, tọa độ, v.v.' },
			{ text: 'Hiển thị trực quan kết quả trên bản đồ' },
			{ text: 'Dữ liệu cập nhật hàng tuần' }
		],
		documentationUrl: '#',
		exploreUrl: '/playground/geocoding',
		previewImage: '/assets/images/playground/geocoding-preview.png'
	},
	{
		id: 'route',
		title: 'Route API',
		description: 'Tìm đường đi giữa các điểm với Vietmap Route API',
		icon: <Navigation className="h-5 w-5 text-white" />,
		iconBgColor: 'linear-gradient(135deg, #2E90FA 0%, #1570EF 100%)',
		features: [
			{ text: 'Tìm đường đi giữa 2 hoặc nhiều điểm/địa điểm' },
			{ text: 'Tùy chọn phương tiện (ô tô, xe máy, đi bộ)' },
			{ text: 'Hiển thị kết quả chi tiết và chỉ đường trên bản đồ' },
			{ text: 'Mô tả chi tiết từng bước' }
		],
		documentationUrl: '#',
		exploreUrl: '/playground/route',
		previewImage: '/assets/images/playground/route-preview.png'
	}
];

export function PlaygroundContent() {
	return (
		<Box
			className="min-h-screen"
			sx={{ bgcolor: '#F9FAFB' }}
		>
			<Box
				sx={{
					background: 'linear-gradient(135deg, #5d8abb 0%, #2e90fa 100%)',
					py: { xs: 6, md: 10 }
				}}
			>
				<Container
					maxWidth="xl"
					className="lg:px-[120px]"
				>
					<Typography
						variant="h3"
						component="h1"
						sx={{
							color: 'white',
							fontWeight: 800,
							mb: 2,
							fontSize: { xs: '2rem', md: '2.5rem' }
						}}
					>
						API Playground
					</Typography>
					<Typography
						variant="h6"
						sx={{
							color: 'white',
							fontWeight: 400,
							maxWidth: 600
						}}
					>
						Khám phá và thử nghiệm các API của chúng tôi với các ví dụ tương tác. Xây dựng các ứng dụng dựa
						trên vị trí tuyệt vời.
					</Typography>
				</Container>
			</Box>

			<Container
				maxWidth="xl"
				className="lg:px-[120px] py-[64px]"
			>
				<Typography
					variant="h2"
					component="h1"
					sx={{
						fontWeight: 700,
						mb: 6,
						fontSize: '2rem',
						textAlign: 'center'
					}}
				>
					Explore our API types
				</Typography>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{apiCards.map((card) => (
						<ApiCard
							key={card.id}
							card={card}
						/>
					))}
				</div>
			</Container>
		</Box>
	);
}

export default PlaygroundContent;
