<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLSpanElement> {
		url: string;
		color: 'Brand';
		type: 'Dark';
		size: 'md' | 'lg' | 'xl';
	}

	export let url: string;
	export let size: $$Props['size'] = 'md';
	export let color: $$Props['color'] = 'Brand';
	export let type: $$Props['type'] = 'Dark';

	const iconSize = {
		md: '[&&]:w-[1.25rem] [&&]:h-[1.25rem]',
		lg: '[&&]:w-[1.5rem] [&&]:h-[1.5rem]',
		xl: '[&&]:w-[1.75rem] [&&]:h-[1.75rem]'
	};
</script>

<div
	style="--featured-icon-url:url('{url}')"
	class="
		[mask-position:center]
		[mask-size:contain]
		[mask-repeat:no-repeat]
		[mask-image:var(--featured-icon-url)]
        bg-uui-featured-icon-dark-fg-brand
        {iconSize[size]}
		{$$props.class}"
/>
