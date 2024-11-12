<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import CheckIconAtom from './CheckIconAtom.svelte';

	interface $$Props extends HTMLAttributes<HTMLSpanElement> {
		url: string;
	}

	export let url: string;
</script>

<div
	class="flex items-center rounded-full bg-uui-bg-success-secondary justify-center w-[2rem] h-[2rem] min-w-[2rem] min-h-[2rem]
	 "
>
	<CheckIconAtom {url}></CheckIconAtom>
</div>
