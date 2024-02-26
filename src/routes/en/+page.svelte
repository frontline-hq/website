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

<svelte:head>
	<title
		>Building software at the intersection of cybersecurity, design, and sustainability |
		frontline.codes</title
	>
	<meta
		name="description"
		content="We are ethical hackers and a web development agency committed to delivering secure, beautifully designed, and sustainable digital solutions."
	/>
	<link rel="canonical" href="https://www.frontline.codes" />
	<meta property="og:title" content="Cybersecurity and Web Development | Frontline.codes" />
	<meta
		property="og:description"
		content="At the forefront of cybersecurity, design, and sustainability, we offer comprehensive services to protect and enhance your digital presence."
	/>
	<meta property="og:image" content="https://www.frontline.codes/static/frontline-logo.png" />
	<meta property="og:url" content="https://www.frontline.codes" />
	<meta name="robots" content="index, follow" />
	<!-- Add this in later, when added to google-site-verification -->
	<!-- <meta name="google-site-verification" content="Bq4e8ICS3Kqjp-0k2C-1PSX5cnY9btnGGI0ipjlYsds" /> -->
	<!-- Update this value if needed -->
	<link rel="icon" type="image/x-icon" href="/favicon.png" />
	<!-- Update the favicon path if needed -->
</svelte:head>

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
	<div class="w-full h-60"></div>
	<tdc-mc-footer tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>
		<tdc-mc-footer-link
			href="/privacy"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>Privacy</tdc-mc-footer-link
		>
		<tdc-mc-footer-link
			href="/imprint"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>Imprint</tdc-mc-footer-link
		><tdc-mc-footer-link
			href="/de/"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>DE</tdc-mc-footer-link
		>
		<tdc-mc-footer-link
			href="/"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>EN</tdc-mc-footer-link
		>
		<span slot="sidenote">2024, Hamburg DE</span>
	</tdc-mc-footer>
{/if}
