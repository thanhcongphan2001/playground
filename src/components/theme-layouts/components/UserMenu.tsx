import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Link from '@fuse/core/Link';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { darken } from '@mui/material/styles';
import clsx from 'clsx';
import Popover, { PopoverProps } from '@mui/material/Popover';

type UserMenuProps = {
	className?: string;
	popoverProps?: Partial<PopoverProps>;
	arrowIcon?: string;
	dense?: boolean;
	onlyAvatar?: boolean;
};

/**
 * The user menu.
 */
function UserMenu(props: UserMenuProps) {
	const { className, popoverProps, arrowIcon = 'lucide:chevron-up', dense = false, onlyAvatar = false } = props;
	const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

	const userMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button
				className={clsx(
					'user-menu flex shrink-0 justify-start',
					onlyAvatar ? 'min-w-0 p-0' : dense ? 'h-9 min-h-9 gap-1.5 px-1' : 'h-14 min-h-14 gap-3',
					className
				)}
				onClick={userMenuClick}
				color="inherit"
			>
				<Avatar
					sx={(theme) => ({
						background: (theme) => darken(theme.palette.background.default, 0.05),
						color: theme.vars.palette.text.secondary
					})}
					className={clsx('avatar h-10 w-10', dense && 'h-8 w-8')}
				>
					G
				</Avatar>
				{!onlyAvatar && (
					<>
						<div className={clsx('flex flex-auto flex-col', dense ? '' : 'gap-2')}>
							<Typography
								component="span"
								className={clsx(
									'title flex truncate leading-none font-semibold tracking-tight capitalize',
									dense ? 'text-md' : 'text-base'
								)}
							>
								Guest
							</Typography>
						</div>
						<div className="flex shrink-0 items-center gap-2">
							<FuseSvgIcon
								className="arrow"
								size={13}
							>
								{arrowIcon}
							</FuseSvgIcon>
						</div>
					</>
				)}
			</Button>
			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				classes={{
					paper: 'min-w-32'
				}}
				{...popoverProps}
			>
				<MenuItem
					component={Link}
					to="/apps/profile"
					onClick={userMenuClose}
					role="button"
				>
					<ListItemIcon>
						<FuseSvgIcon>lucide:circle-user</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="My Profile" />
				</MenuItem>
				<MenuItem
					component={Link}
					to="/apps/mailbox"
					onClick={userMenuClose}
					role="button"
				>
					<ListItemIcon>
						<FuseSvgIcon>lucide:mail</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Inbox" />
				</MenuItem>
			</Popover>
		</>
	);
}

export default UserMenu;
