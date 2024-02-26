<script lang="ts">
	import CalendarPopUp from '$lib/components/CalendarPopUp/CalendarPopUp.svelte';
	import avifBackground from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=avif&as=srcset';
	import webpBackground from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=webp&as=srcset';
	import avifBackgroundMobile from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=avif&as=srcset&rotate=270';
	import webpBackgroundMobile from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=webp&as=srcset&rotate=270';
	import fallbackBackground from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920';
	import fallbackBackgroundMobile from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=768';
	import { browser } from '$app/environment';
</script>

{#if browser}
	<div class="relative flex flex-col justify-end h-[100vh] uui-desktop:h-auto">
		<tdc-mc-hhs
			tdc={{
				breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' },
				type: 'geometricshapes01'
			}}
		>
			<h1 class="[&&]:font-super-large [&&]:text-5xl [&&]:uui-desktop:text-8xl [&&]:font-black">
				frontline.
			</h1>
			<p>— We build software at the intersection of cybersecurity, design and sustainability.</p>
			<tdc-mc-hhs-buttongroupa
				slot="actions"
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>
				<CalendarPopUp />
				<tdc-button
					on:click={() => window.open('mailto:contact@frontline.codes', '_blank')}
					tdc={{
						size: { default: 'xl', 'uui-desktop': '2xl' },
						destructive: 'false',
						hierarchy: 'primary',
						coloring: 'color'
					}}
					icon={{ type: 'icon' }}>Email us</tdc-button
				>
			</tdc-mc-hhs-buttongroupa>
			<div slot="img" class="w-[50vw] uui-desktop:h-[100vh]"></div>
		</tdc-mc-hhs>
		<div class="absolute inset-0 -z-10 overflow-hidden">
			<picture>
				<source
					media="(max-width: 1023px)"
					sizes="max(1023px, 100vw)"
					type="image/avif"
					srcset={avifBackgroundMobile}
				/>
				<source
					media="(max-width: 1023px)"
					sizes="max(1023px, 100vw)"
					type="image/webp"
					srcset={webpBackgroundMobile}
				/>
				<source
					media="(min-width: 1024px)"
					sizes="min(1024px, 100vw)"
					type="image/avif"
					srcset={avifBackground}
				/>
				<source
					media="(min-width: 1024px)"
					sizes="min(1024px, 100vw)"
					type="image/webp"
					srcset={webpBackground}
				/>
				<img
					srcset="{fallbackBackgroundMobile} 540w, {fallbackBackground} 1024w"
					src={fallbackBackground}
					fetchpriority="high"
					decoding="sync"
					loading="eager"
					class="object-cover w-full h-full"
					alt="This is an awesome image "
				/>
			</picture>
		</div>
	</div>
	<tdc-mc-hs tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>
		<span slot="subheading">Don't worry -</span>
		<h2 slot="heading">We got you covered.</h2>
		<p>Need help with your web project or cybersecurity? We got you covered.</p>
		<p class="font-semibold">contact@frontline.codes</p>
	</tdc-mc-hs>
{/if}
