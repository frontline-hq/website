<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import FeaturedIconAtom from './FeaturedIconAtom.svelte';

	interface $$Props extends HTMLAttributes<HTMLSpanElement> {
		type: 'Dark';
		color: 'Brand';
		size: 'md' | 'lg' | 'xl';
		url: string;
	}

	export let type: $$Props['type'] = 'Dark';
	export let color: $$Props['color'] = 'Brand';
	export let size: $$Props['size'] = 'md';
	export let url: string;

	const backGroundColor = {
		Brand: 'bg-uui-bg-brand-solid'
	};

	const iconSize = {
		md: '[&&]:w-[2.5rem] [&&]:h-[2.5rem]',
		lg: '[&&]:w-[3rem] [&&]:h-[3rem]',
		xl: '[&&]:w-[3.5rem] [&&]:h-[3.5rem]'
	};
</script>

<div
	class="flex items-center justify-center rounded-uui-xl {iconSize[size]} {backGroundColor[color]}"
>
	<FeaturedIconAtom {color} {size} {type} {url}></FeaturedIconAtom>
</div>
