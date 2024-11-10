<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLSpanElement> {
		url: string;
	}

	export let url: string;
</script>

<div
	style="--featured-check-icon-url:url('{url}')"
	class="
		[mask-position:center]
		[mask-size:contain]
		[mask-repeat:no-repeat]
		[mask-image:var(--featured-check-icon-url)]
        bg-uui-featured-icon-light-fg-success
		w-[1rem] h-[0.875rem]
		lg:w-[1rem] lg:h-[0.875rem]
		{$$props.class}"
/>
