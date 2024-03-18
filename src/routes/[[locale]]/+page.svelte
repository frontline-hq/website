<script lang="ts">
	import avifBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=avif&as=srcset';
	import webpBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=webp&as=srcset';
	import avifBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=avif&as=srcset&rotate=270';
	import webpBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=webp&as=srcset&rotate=270';
	import fallbackBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920';
	import fallbackBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=768';
	import * as m from '$lib/paraglide/messages.js';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { communicationPhone as phoneCall } from '@frontline-hq/untitledui-icons';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import calFn from '@calcom/embed-snippet';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import ContactForm from '$lib/components/ContactForm/ContactForm.svelte';
	import {
		McUtilActions,
		McHeroHeaderSectionFormWrapper
	} from '@frontline-hq/uui/marketing-components';
	import {
		fsMiscIconsSocialDribbbleMask,
		fsMiscIconsSocialGithubMask,
		fsMiscIconsSocialLinkedinMask,
		fsMiscIconsSocialXMask
	} from '@frontline-hq/uui/foundations';
	import nadiem from '$lib/assets/nadiem_cut.png?enhanced';
	import ben from '$lib/assets/ben_cut.png?enhanced';
	import DomainCheckerForm from '$lib/components/DomainCheckerForm/DomainCheckerForm.svelte';
	import {
		generalSlashCircle01,
		securityShield01,
		arrowsArrowUpLeft
	} from '@frontline-hq/untitledui-icons';

	let domainCheckerForm: DomainCheckerForm;
	let checkedDomain: string | undefined;
	let domainIsSafe: boolean | undefined;
	let subDomainIsSafe: boolean | undefined;

	$: console.log(checkedDomain, 'within parent');
	$: console.log(domainIsSafe, 'domainIsSafe within parent');
	$: console.log(subDomainIsSafe, 'subDomainIsSafe within parent');

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
			<h1
				slot="heading"
				class="[&&]:font-super-large [&&]:text-5xl [&&]:uui-desktop:text-8xl [&&]:font-black"
			>
				{m.herosectionh1()}
			</h1>
			<p class="uui-desktop:max-w-uui-width-md">{m.herosectionp()}</p>
			<McUtilActions slot="actions">
				<tdc-button
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
			</McUtilActions>
			<div slot="after" class="w-[50vw] uui-desktop:h-[80vh]"></div>
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
	<div class="relative overflow-hidden">
		<tdc-mc-hhs
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'splitform02' }}
		>
			<h1>Make your E-Mail great again.</h1>
			<p>
				Become compliant with the 2024 Google and Yahoo standards. Protect yourself against
				impersonation attacks and make sure your e-mails get delivered.
			</p>
			<!-- this div is tdc-hhs-form-wrapper make this a component with different types like before -->
			<div class="w-full" slot="after">
				<McHeroHeaderSectionFormWrapper>
					<div
						class="flex text-white items-center w-full h-full mb-uui-3xl space-x-uui-xl"
						slot="logo"
					>
						<img
							src="/google-logo.svg"
							class="w-[5rem] h-[5rem] lg:w-[5.5rem] lg:h-[5.5rem] [&&]:m-0"
							alt="Google logo"
						/>

						<img
							src="/yahoo-logo.svg"
							class="w-[5rem] h-[5rem] lg:w-[5.5rem] lg:h-[5.5rem] [&&]:m-0"
							alt="Yahoo logo"
						/>
					</div>
					<h4 slot="title">Check your domain now.</h4>
					<span slot="subtitle">Is your e-mail domain susceptible to impersonation attacks? </span>
					<!-- Todo might be a solution for not setting classes on the form slot -->
					<DomainCheckerForm
						bind:this={domainCheckerForm}
						bind:checkedDomain
						bind:domainIsSafe
						bind:subDomainIsSafe
						slot="form"
					/>
					<div class="space-x-uui-xs flex justify-center items-center" slot="footnote">
						<span>
							Your data is safe with us!
							<span class=" "
								><span class="">We do</span>
								<span class="underline underline-offset-2">not</span></span
							>
							<br />

							<span> collect any data here. </span>
						</span>
					</div></McHeroHeaderSectionFormWrapper
				>
			</div>
		</tdc-mc-hhs>

		<div
			class="{checkedDomain !== undefined && domainIsSafe !== undefined
				? ''
				: 'hidden'}  bg-uui-bg-primary z-10 absolute w-full h-full top-0"
		>
			<div class="flex items-center justify-center w-full h-full">
				<tdc-mc-hs
					tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'center' }}
				>
					<h6 slot="subheading">
						<tdc-badge
							icon={{
								type: 'icon',
								leading: domainIsSafe ? securityShield01 : generalSlashCircle01
							}}
							tdc={{
								size: 'lg',
								color: domainIsSafe ? 'success' : 'error',
								badgeType: 'Pill color'
							}}>{domainIsSafe ? 'Protected' : 'Not Protected'}</tdc-badge
						>
					</h6>
					<h2 slot="heading">
						{checkedDomain}
						{domainIsSafe ? `seems to be protected.` : `is not protected.`}
						<!-- This h4 only pops-up when a domainIsSafe but has false subdomain-protection settings -->
						<h4 class="uui-text-lg">
							{!subDomainIsSafe && domainIsSafe ? 'Your subdomains are unsafe.' : ''}
						</h4>
					</h2>
					<p>
						{domainIsSafe
							? 'Keep your domain secure. Reach out for a straightforward security check.'
							: "Hackers can impersonate your domain's emails, putting you at risk."}
					</p>
					<p>
						{domainIsSafe ? '' : 'Your domain also fails to meet 2024 Google and Yahoo standards. '}
					</p>
					<p>
						{domainIsSafe ? '' : 'Contact us today to secure your domain.'}
					</p>

					<McUtilActions slot="after">
						<tdc-button
							tdc={{
								size: { default: 'xl', 'uui-desktop': 'xl' },
								destructive: 'false',
								hierarchy: 'secondary',
								coloring: 'gray'
							}}
							type="button"
							on:click={() => domainCheckerForm.resetForm()}
							icon={{ type: 'icon', leading: arrowsArrowUpLeft }}>Check another domain</tdc-button
						>
						<tdc-button
							data-cal-link="frontline-meeting/20-Minute-Discovery-Session"
							data-cal-config={JSON.stringify({ layout: 'month_view' })}
							tdc={{
								size: { default: 'xl', 'uui-desktop': 'xl' },
								destructive: 'false',
								hierarchy: 'primary',
								coloring: 'color'
							}}
							icon={{ type: 'icon', leading: phoneCall }}>Schedule call</tdc-button
						>
					</McUtilActions>
				</tdc-mc-hs>
			</div>
		</div>
	</div>
	<tdc-mc-cta-section
		tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'split-image-02' }}
	>
		<h2 slot="heading">{m.introsectionheading()}</h2>
		<!-- Default slot ... -->
		<p>{m.introsectiontext()}</p>
		<!-- McUtilActions inherits tdc styles from parent. -->
		<McUtilActions slot="actions">
			<tdc-button
				data-cal-link="frontline-meeting/20-Minute-Discovery-Session"
				data-cal-config={JSON.stringify({ layout: 'month_view' })}
				tdc={{
					size: 'xl',
					destructive: 'false',
					hierarchy: 'secondary',
					coloring: 'gray'
				}}
				icon={{ type: 'icon', leading: phoneCall }}>{m.introsectionactionsecondary()}</tdc-button
			>
		</McUtilActions>
		<!-- We let users define the height of their images themself, for horizontal imgs e.g. -->
		<div class="w-full space-y-uui-6xl" slot="img">
			<tdc-mc-team-section-member
				class="[&&]:uui-desktop:min-w-uui-none [&&]:uui-desktop:max-w-uui-width-lg [&&]:w-full"
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'image-left' }}
			>
				<div
					class="relative flex justify-center uui-desktop:w-[11rem] shrink-0 overflow-hidden"
					slot="img"
				>
					<div class="uui-desktop:hidden absolute inset-0 -z-10 blur-2xl">
						<div
							class="w-full h-full bg-[radial-gradient(circle_at_center_bottom,rgb(var(--colormodes-uui-bg-quaternary))_0%,transparent)]"
						></div>
					</div>
					<div class="max-h-[40vh] uui-desktop:h-auto">
						<enhanced:img
							class="h-full object-scale-down object-center"
							src={nadiem}
							alt="An alt text"
						/>
					</div>
				</div>
				<span slot="name">Nadiem Marzguioui</span>
				<span slot="text">{@html m.introsectionnadiemtext()}</span>
				<a target="_blank" href="https://github.com/NadiemM">
					<tdc-fs-misc-icons-social url={fsMiscIconsSocialGithubMask} tdc={{ style: 'gray' }} /></a
				>
			</tdc-mc-team-section-member>
			<tdc-mc-team-section-member
				class="[&&]:uui-desktop:min-w-uui-none [&&]:uui-desktop:max-w-uui-width-lg [&&]:w-full"
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'image-left' }}
			>
				<div
					class="relative flex justify-center uui-desktop:w-[11rem] shrink-0 overflow-hidden"
					slot="img"
				>
					<div class="uui-desktop:hidden absolute inset-0 -z-10 blur-2xl">
						<div
							class="w-full h-full bg-[radial-gradient(circle_at_center_bottom,rgb(var(--colormodes-uui-bg-quaternary))_0%,transparent)]"
						></div>
					</div>
					<div class="max-h-[40vh] uui-desktop:h-auto">
						<enhanced:img
							class="h-full object-scale-down object-center"
							src={ben}
							alt="An alt text"
						/>
					</div>
				</div>
				<span slot="name">Benjamin Preiss</span>
				<span slot="text">{@html m.introsectionbentext()}</span>
				<a target="_blank" href="https://github.com/benjaminpreiss">
					<tdc-fs-misc-icons-social url={fsMiscIconsSocialGithubMask} tdc={{ style: 'gray' }} /></a
				>
				<a target="_blank" href="https://www.linkedin.com/in/benjamin-preiss-708985231/">
					<tdc-fs-misc-icons-social
						url={fsMiscIconsSocialLinkedinMask}
						tdc={{ style: 'gray' }}
					/></a
				>
				<a target="_blank" href="https://twitter.com/preiss_benjamin">
					<tdc-fs-misc-icons-social url={fsMiscIconsSocialXMask} tdc={{ style: 'gray' }} /></a
				>
			</tdc-mc-team-section-member>
		</div>
	</tdc-mc-cta-section>

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
