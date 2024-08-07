<script lang="ts">
	import avifBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=avif&as=srcset';
	import webpBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=webp&as=srcset';
	import avifBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=avif&as=srcset&rotate=270';
	import webpBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=webp&as=srcset&rotate=270';
	import fallbackBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920';
	import fallbackBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=768';
	import * as m from '$lib/paraglide/messages.js';
	import { communicationPhone as phoneCall } from '@frontline-hq/untitledui-icons';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import calFn from '@calcom/embed-snippet';
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
		arrowsArrowUpLeft,
		generalXClose
	} from '@frontline-hq/untitledui-icons';
	import ContactForm from '$lib/components/ContactForm/ContactForm.svelte';

	let domainCheckerForm: DomainCheckerForm;
	let checkedDomain: string | undefined;
	let domainIsSafe: boolean | undefined;
	let subDomainIsSafe: boolean | undefined;

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
	<tdc-mc-hhs
		tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'splitform02' }}
	>
		<h1>{m.domaincheckerheading()}</h1>
		<p>
			{m.domaincheckersubtitle()}
		</p>
		<!-- this div is tdc-hhs-form-wrapper make this a component with different types like before -->
		<div class="w-full" id="domaincheckerform" slot="after">
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
				<h4 slot="title">{m.domaincheckerformheading()}</h4>
				<span slot="subtitle">{m.domaincheckerformsubtitle()} </span>
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
						{m.domaincheckerformfooter1()}
						<span class="flex flex-row items-center justify-center space-x-uui-md"
							><span class="">{m.domaincheckerformfooter2()}</span>
							<span class="underline underline-offset-2">{m.domaincheckerformfooter3()}</span>
							<span> {m.domaincheckerformfooter4()} </span>
						</span>
					</span>
				</div></McHeroHeaderSectionFormWrapper
			>
		</div>
	</tdc-mc-hhs>

	<div
		class="{checkedDomain !== undefined && domainIsSafe !== undefined
			? ''
			: 'hidden '}  bg-uui-bg-primary/70 backdrop-blur-md z-10 fixed w-full h-full top-0"
	>
		<tdc-button-a
			class="absolute right-0 m-8"
			tdc={{
				size: { default: 'md', 'uui-desktop': 'lg' },
				destructive: 'false',
				hierarchy: 'secondary',
				coloring: 'gray'
			}}
			type="button"
			on:click={() => {
				document.body.style.overflowY = 'auto';
				domainCheckerForm.resetForm();
			}}
			href="#domaincheckerform"
			icon={{ type: 'icon-only', leading: generalXClose }}
		/>
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
						}}
						>{domainIsSafe
							? `${m.domaincheckeroverlaybadgeprotected()}`
							: `${m.domaincheckeroverlaybadgenotprotected()}`}</tdc-badge
					>
				</h6>
				<!-- TODO continue here scheint geschützt zu sein. -->
				<h2 slot="heading">
					{checkedDomain}
					{domainIsSafe
						? `${m.domaincheckeroverlaytitleprotected()}`
						: `${m.domaincheckeroverlaytitlenotprotected()}`}
					<!-- This h4 only pops-up when a domainIsSafe but has false subdomain-protection settings -->
					<h4 class="uui-text-lg">
						{!subDomainIsSafe && domainIsSafe ? `${m.domaincheckeroverlaysubdomaintitle()}` : ''}
					</h4>
				</h2>
				<p>
					{domainIsSafe
						? `${m.domaincheckeroverlaydomainissafetext()}`
						: `${m.domaincheckeroverlaydomainisnotsafetext()}`}
				</p>
				<p>
					{domainIsSafe ? '' : `${m.domaincheckeroverlaydomainisnotsafetext2()}`}
				</p>
				<p>
					{domainIsSafe ? '' : `${m.domaincheckeroverlaydomainisnotsafetext3()}`}
				</p>

				<McUtilActions slot="after">
					<tdc-button-a
						tdc={{
							size: { default: 'xl', 'uui-desktop': 'xl' },
							destructive: 'false',
							hierarchy: 'secondary',
							coloring: 'gray'
						}}
						type="button"
						on:click={() => {
							document.body.style.overflowY = 'auto';
							domainCheckerForm.resetForm();
						}}
						href="#domaincheckerform"
						icon={{ type: 'icon', leading: arrowsArrowUpLeft }}
						>{m.domaincheckeroverlaycta1()}</tdc-button-a
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
						icon={{ type: 'icon', leading: phoneCall }}>{m.domaincheckeroverlaycta2()}</tdc-button
					>
				</McUtilActions>
			</tdc-mc-hs>
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
{/if}
