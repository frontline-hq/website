import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { plugin } from '@frontline-hq/tdc/plugin';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [enhancedImages(), imagetools(), await plugin(), sveltekit()]
});
