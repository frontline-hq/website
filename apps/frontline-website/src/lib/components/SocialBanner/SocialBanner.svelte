<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	export let bannerLogos = [
		{
			src: '/logos/filecoin-logo.svg',
			alt: 'Filecoin logo'
		},
		{
			src: '/logos/kamalashila-logo.svg',
			alt: 'Kamalashila logo'
		},
		{
			src: '/logos/lilypad-logo.svg',
			alt: 'Lilypad logo'
		},
		{
			src: '/logos/montee-logo.svg',
			alt: 'Montee logo'
		},
		{
			src: '/logos/weischer-logo.svg',
			alt: 'Weischer logo'
		}
	];
</script>

<div class="flex flex-col items-center justify-center gap-uui-3xl lg:gap-uui-4xl">
	<h6 class="font-semibold text-uui-text-brand-secondary-700 uui-text-sm lg:uui-text-md">
		{m.livid_quick_midge_pull()}
	</h6>
	<div class="overflow-x-auto no-scrollbar flex gap-uui-2xl lg:gap-uui-3xl">
		{#each bannerLogos as { src, alt }, i}
			<img {src} {alt} />
		{/each}
	</div>
</div>
