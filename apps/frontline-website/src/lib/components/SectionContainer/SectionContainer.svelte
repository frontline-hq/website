<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div
	class=" {$$props.class} sm:px-uui-container-padding-desktop mx-auto px-uui-container-padding-mobile w-full max-w-uui-container-max-width-desktop"
>
	<slot />
</div>
