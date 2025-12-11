/**
 * The LayoutGround Config object.
 * A minimal layout for playground/GIS applications - fullwidth without any UI chrome.
 */
const LayoutGroundConfig = {
	title: 'Layout Ground - Minimal',
	defaults: {
		mode: 'fullwidth',
		navbar: {
			display: false
		},
		toolbar: {
			display: false
		},
		footer: {
			display: false
		},
		leftSidePanel: {
			display: false
		},
		rightSidePanel: {
			display: false
		}
	},
	form: {
		mode: {
			title: 'Mode',
			type: 'radio',
			options: [
				{
					name: 'Full Width',
					value: 'fullwidth'
				}
			]
		},
		navbar: {
			type: 'group',
			title: 'Navbar',
			children: {
				display: {
					title: 'Display',
					type: 'switch'
				}
			}
		},
		toolbar: {
			type: 'group',
			title: 'Toolbar',
			children: {
				display: {
					title: 'Display',
					type: 'switch'
				}
			}
		},
		footer: {
			type: 'group',
			title: 'Footer',
			children: {
				display: {
					title: 'Display',
					type: 'switch'
				}
			}
		}
	}
};

export type LayoutGroundConfigDefaultsType = (typeof LayoutGroundConfig)['defaults'];

export default LayoutGroundConfig;

