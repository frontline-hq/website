<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLSpanElement> {
		url: string;
	}

	export let url: string;
</script>

<div
	style="--featured-icon-url:url('{url}')"
	class="
		[mask-position:center]
		[mask-size:contain]
		[mask-repeat:no-repeat]
		[mask-image:var(--featured-icon-url)]
        bg-uui-featured-icon-dark-fg-brand
		w-[1.25rem] h-[1.25rem]
		lg:w-[1.5rem] lg:h-[1.5rem]
		{$$props.class}"
/>
