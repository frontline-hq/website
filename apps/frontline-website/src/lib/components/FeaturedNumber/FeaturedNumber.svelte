<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import FeaturedNumberAtom from './FeaturedNumberAtom.svelte';

	interface $$Props extends HTMLAttributes<HTMLSpanElement> {
		url: string;
	}

	export let url: string;
</script>

<div
	class="flex items-center bg-transparent border-uui-1 border-uui-featured-icon-modern-border justify-center rounded-uui-xl w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem]
	 "
>
	<FeaturedNumberAtom {url}></FeaturedNumberAtom>
</div>
