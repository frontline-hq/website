<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import FeaturedIconAtom from './FeaturedIconAtom.svelte';

	interface $$Props extends HTMLAttributes<HTMLSpanElement> {
		type: 'Dark';
		color: 'Brand';
		url: string;
	}

	export let type: $$Props['type'] = 'Dark';
	export let color: $$Props['color'] = 'Brand';
	export let url: string;

	const backGroundColor = {
		Brand: 'bg-uui-bg-brand-solid'
	};
</script>

<div
	class="flex items-center justify-center rounded-uui-xl w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem]
	 {backGroundColor[color]}"
>
	<FeaturedIconAtom {color} {type} {url}></FeaturedIconAtom>
</div>
