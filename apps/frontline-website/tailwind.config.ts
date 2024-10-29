import type { Config } from 'tailwindcss';
import { getDynamicSafelist } from '@frontline-hq/tdc/tailwind';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import { preset } from 'uui-tailwind-styles/js';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,json}', '!**/*.tdc.ts', './messages/*.json'],
	theme: {
	},
	corePlugins: {
		aspectRatio: false
	},
	safelist: [...getDynamicSafelist()],
	presets: [
		preset
	],
	plugins: [aspectRatioPlugin]
} as Config;
