<script lang="ts">
	import avifBackground from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=avif&as=srcset';
	import webpBackground from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=webp&as=srcset';
	import avifBackgroundMobile from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=avif&as=srcset&rotate=270';
	import webpBackgroundMobile from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=webp&as=srcset&rotate=270';
	import fallbackBackground from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920';
	import fallbackBackgroundMobile from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=768';
	import * as m from '$lib/paraglide/messages.js';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { communicationPhone as phoneCall } from '@frontline-hq/untitledui-icons';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import calFn from '@calcom/embed-snippet';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import ContactForm from '$lib/components/ContactForm/ContactForm.svelte';

	onMount(() => {
		const Cal = calFn('https://app.cal.com/embed/embed.js');
		Cal('init', { origin: 'https://cal.com' });

		Cal('ui', {
			styles: { branding: { brandColor: '#000000' } },
			hideEventTypeDetails: false,
			layout: 'month_view'
		});
	});
</script>

<svelte:head>
	<title>{m.pageheadtitle()}</title>
	<meta name="description" content={m.pageheadmetadescription()} />
	<link rel="canonical" href="https://www.frontline.codes" />
	<meta property="og:title" content={m.pageheadogtitle()} />
	<meta property="og:description" content={m.pageheadogdescription()} />
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
	<div class="relative flex flex-col justify-end h-[100vh] uui-desktop:h-auto overflow-hidden">
		<tdc-mc-hhs
			tdc={{
				breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' },
				type: 'geometricshapes01'
			}}
		>
			<h1 class="[&&]:font-super-large [&&]:text-5xl [&&]:uui-desktop:text-8xl [&&]:font-black">
				{m.herosectionh1()}
			</h1>
			<p>{m.herosectionp()}</p>
			<tdc-mc-hhs-buttongroupa
				slot="actions"
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>
				<tdc-button
					type="button"
					data-cal-link="frontline-meeting/20-Minute-Discovery-Session"
					data-cal-config={JSON.stringify({ layout: 'month_view' })}
					tdc={{
						size: { default: 'xl', 'uui-desktop': '2xl' },
						destructive: 'false',
						hierarchy: 'secondary',
						coloring: 'gray'
					}}
					icon={{ type: 'icon', leading: phoneCall }}>{m.herosectionsecondarybutton()}</tdc-button
				>
				<tdc-button-a
					href="#contact"
					tdc={{
						size: { default: 'xl', 'uui-desktop': '2xl' },
						destructive: 'false',
						hierarchy: 'primary',
						coloring: 'color'
					}}
					icon={{ type: 'icon' }}>{m.herosectionprimarybutton()}</tdc-button-a
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
					alt={m.herosectionimgalt()}
				/>
			</picture>
		</div>
	</div>
	<tdc-mc-contactsection
		id="contact"
		tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'simple-form-01' }}
	>
		<h6 slot="subheading">{m.contactsectionsubheading()}</h6>
		<h3 slot="heading">{m.contactsectionheading()}</h3>
		<p class="max-w-[50ch]">
			{@html m.contactsectionp()}
		</p>
		<div slot="form">
			<ContactForm />
		</div>
	</tdc-mc-contactsection>
	<tdc-mc-footer tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>
		<tdc-fs-logo slot="logo" />
		<tdc-mc-footer-link
			href="/privacy"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>{m.footerprivacylinktext()}</tdc-mc-footer-link
		>
		<tdc-mc-footer-link
			href="/imprint"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>{m.footerimprintlinktext()}</tdc-mc-footer-link
		>
		{#each availableLanguageTags.filter((lang) => lang !== languageTag()) as lang}
			<tdc-mc-footer-link
				href={i18n.route($page.url.pathname)}
				hreflang={lang}
				aria-current={lang === languageTag() ? 'page' : undefined}
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
				>{lang.toUpperCase()}</tdc-mc-footer-link
			>
		{/each}
		<span slot="sidenote">{m.footersidenotetext()}</span>
	</tdc-mc-footer>
{/if}
