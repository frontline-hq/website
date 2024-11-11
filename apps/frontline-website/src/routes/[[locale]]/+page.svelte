<script lang="ts">
	import avifBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=avif&as=srcset';
	import webpBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=webp&as=srcset';
	import avifBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=avif&as=srcset&rotate=270';
	import webpBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=webp&as=srcset&rotate=270';
	import fallbackBackground from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920';
	import fallbackBackgroundMobile from '$lib/assets/jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=768';
	import * as m from '$lib/paraglide/messages.js';
	import {
		arrowsSwitchHorizontal01,
		communicationMail02,
		generalDownloadCloud01,
		generalTool02,
		communicationPhone as phoneCall,
		securityFingerprint04,
		securityShieldTick
	} from '@frontline-hq/untitledui-icons';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import calFn from '@calcom/embed-snippet';
	import {
		McUtilActions,
		McHeroHeaderSectionFormWrapper
	} from '@frontline-hq/uui/marketing-components';
	import {
		fsMiscIconsSocialGithubMask,
		fsMiscIconsSocialLinkedinMask,
		fsMiscIconsSocialXMask
	} from '@frontline-hq/uui/foundations';
	import nadiem from '$lib/assets/nadiem_cut.png?enhanced';
	import ben from '$lib/assets/ben_cut.png?enhanced';
	import DomainCheckerForm from '$lib/components/DomainCheckerForm/DomainCheckerForm.svelte';
	import ContactForm from '$lib/components/ContactForm/ContactForm.svelte';
	import FeatureText from '$lib/components/FeatureText/FeatureText.svelte';
	import FeaturedIcon from '$lib/components/FeaturedIcon/FeaturedIcon.svelte';
	import SectionContainer from '$lib/components/SectionContainer/SectionContainer.svelte';
	import FeaturedNumber from '$lib/components/FeaturedNumber/FeaturedNumber.svelte';
	import CheckIcon from '$lib/components/CheckIcon/CheckIcon.svelte';
	import SocialBanner from '$lib/components/SocialBanner/SocialBanner.svelte';

	onMount(() => {
		const Cal = calFn('https://app.cal.com/embed/embed.js');
		Cal('init', { origin: 'https://cal.com' });

		Cal('ui', {
			styles: { branding: { brandColor: '#000000' } },
			hideEventTypeDetails: false,
			layout: 'month_view'
		});
	});

	const featuredIconArray: {
		url: string;
		type: 'Dark';
		size: 'lg';
		color: 'Brand';
		title: string;
		description: string;
	}[] = [
		{
			url: communicationMail02,
			type: 'Dark',
			color: 'Brand',
			size: 'lg',
			title: m.upper_left_wren_enchant(),
			description: m.tense_lazy_earthworm_roam()
		},
		{
			url: arrowsSwitchHorizontal01,
			type: 'Dark',
			color: 'Brand',
			size: 'lg',
			title: m.inclusive_stock_mallard_read(),
			description: m.heroic_house_ant_edit()
		},
		{
			url: securityFingerprint04,
			type: 'Dark',
			color: 'Brand',
			size: 'lg',
			title: m.bold_noble_martin_pinch(),
			description: m.alert_yummy_stingray_taste()
		},
		{
			url: generalTool02,
			type: 'Dark',
			color: 'Brand',
			size: 'lg',
			title: m.extra_light_anaconda_hunt(),
			description: m.slow_nice_hamster_surge()
		},
		{
			url: securityShieldTick,
			type: 'Dark',
			color: 'Brand',
			size: 'lg',
			title: m.steep_level_squirrel_laugh(),
			description: m.plain_loud_mule_aspire()
		},
		{
			url: generalDownloadCloud01,
			type: 'Dark',
			color: 'Brand',
			size: 'lg',
			title: m.alert_tense_tuna_rest(),
			description: m.shy_next_jackdaw_snap()
		}
	];

	const featuredNumberArray: {
		title: string;
		description: string;
		url: string;
	}[] = [
		{
			url: '/number-1.svg',
			title: m.bright_tangy_sheep_enrich(),
			description: m.good_jolly_chicken_wish()
		},
		{
			url: '/number-2.svg',
			title: m.next_north_cheetah_build(),
			description: m.only_polite_trout_play()
		},
		{
			url: '/number-3.svg',
			title: m.orange_trick_grebe_dig(),
			description: m.lost_tired_zebra_race()
		}
	];
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
	<div class=" relative flex flex-col justify-end uui-desktop:h-auto overflow-hidden">
		<SectionContainer class="py-uui-7xl lg:py-uui-9xl">
			<div class="flex gap-uui-5xl flex-col w-full text-left py-uui-7xl lg:py-uui-9xl">
				<div
					class="flex flex-col lg:flex-row mx-auto max-w-uui-container-max-width-mobile lg:max-w-uui-container-max-width-desktop gap-uui-6xl w-full"
				>
					<div class="gap-uui-3xl max-w-uui-width-xl">
						<div class="flex flex-col">
							<h1 class="uui-display-lg font-semibold lg:uui-display-xl text-uui-text-primary-900">
								{m.slow_heroic_crab_gaze()}
							</h1>
							<p
								class="text-uui-text-tertiary-600 uui-text-lg lg:uui-text-xl mb-uui-4xl lg:mb-uui-6xl mt-uui-2xl lg:mt-uui-3xl"
							>
								{m.curly_dizzy_giraffe_evoke()}
							</p>
							<div class="flex flex-col md:flex-row gap-uui-xl">
								<tdc-button
									data-cal-link="frontline-meeting/20-Minute-Discovery-Session"
									data-cal-config={JSON.stringify({ layout: 'month_view' })}
									tdc={{
										size: { default: 'xl', 'uui-desktop': '2xl' },
										destructive: 'false',
										hierarchy: 'secondary',
										coloring: 'gray'
									}}
									icon={{ type: 'icon', leading: phoneCall }}
									>{m.icy_quiet_gazelle_cure()}</tdc-button
								>

								<tdc-button-a
									href="#contact"
									tdc={{
										size: { default: 'xl', 'uui-desktop': '2xl' },
										destructive: 'false',
										hierarchy: 'primary',
										coloring: 'color'
									}}
									icon={{ type: 'icon' }}>{m.mealy_spicy_lizard_fetch()}</tdc-button-a
								>
							</div>
						</div>
					</div>
					<div
						class="flex px-uui-container-padding-mobile lg:px-0 max-w-uui-container-max-width-mobile lg:max-w-none gap-uui-xl pb-uui-3xl lg:gap-uui-2xl text-uui-text-tertiary-600 uui-text-lg lg:uui-text-xl text-left self-start lg:self-end flex-col items-start justify-start"
					>
						<div class="flex items-center gap-uui-lg">
							<CheckIcon url="/check-icon.svg" />
							<span>{m.slow_ok_donkey_learn()}</span>
						</div>
						<div class="flex items-center gap-uui-lg">
							<CheckIcon url="/check-icon.svg" />
							<span>{m.sea_each_lionfish_win()}</span>
						</div>
						<div class="flex items-center gap-uui-lg">
							<CheckIcon url="/check-icon.svg" />
							<span>{m.zany_red_koala_hint()}</span>
						</div>
					</div>
				</div>
			</div></SectionContainer
		>

		<!-- <div class="absolute inset-0 -z-10 overflow-hidden">
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
		</div>-->
	</div>

	<SectionContainer class="py-uui-7xl lg:pb-uui-9xl">
		<SocialBanner />
	</SectionContainer>

	<div class="bg-uui-bg-primary_alt">
		<SectionContainer>
			<div
				id="it-security-assessment"
				class=" flex scroll-mt-12 gap-uui-5xl flex-col w-full text-left py-uui-7xl lg:py-uui-9xl"
			>
				<div
					class=" mx-auto max-w-uui-container-max-width-mobile lg:max-w-uui-container-max-width-desktop gap-uui-6xl w-full"
				>
					<div class="gap-uui-3xl max-w-uui-width-xl">
						<div class="flex flex-col gap-uui-lg">
							<h6
								class="font-semibold text-uui-text-brand-secondary-700 uui-text-sm lg:uui-text-md"
							>
								{m.level_awake_donkey_flop()}
							</h6>
							<h2 class="font-bold text-uui-text-primary-900 uui-display-sm lg:uui-display-md">
								{m.least_kind_peacock_gulp()}
							</h2>
							<div class="text-uui-text-tertiary-600 uui-text-lg lg:uui-text-xl">
								<p>
									{m.strong_home_horse_honor()}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-uui-9xl grid w-full justify-evenly mx-auto gap-uui-7xl max-w-uui-container-max-width-mobile lg:max-w-uui-container-max-width-desktop"
			>
				{#each featuredNumberArray as number}
					<FeatureText>
						<FeaturedNumber slot="icon" url={number.url}></FeaturedNumber>
						<h4 slot="title">{number.title}</h4>
						<p slot="description">{number.description}</p>
					</FeatureText>
				{/each}
			</div>
		</SectionContainer>
		<SectionContainer class="pb-uui-7xl lg:pb-uui-9xl">
			<div
				class="flex flex-col mx-auto max-w-uui-container-max-width-mobile lg:max-w-uui-container-max-width-desktop lg:flex-row gap-uui-5xl"
			>
				<div class="w-full md:min-w-[30rem]">
					<img src="/certificate-svg.svg" alt="frontline cybersecurity rating" />
				</div>
				<div
					class="text-uui-text-tertiary-600 uui-text-lg lg:uui-text-xl flex flex-col gap-uui-4xl"
				>
					<p>
						{m.major_loud_kangaroo_cry()}
					</p>
					<div class=" flex flex-col lg:flex-row grow w-full gap-uui-lg">
						<tdc-button
							data-cal-link="frontline-meeting/20-Minute-Discovery-Session"
							data-cal-config={JSON.stringify({ layout: 'month_view' })}
							tdc={{
								size: { default: 'lg', 'uui-desktop': 'xl' },
								destructive: 'false',
								hierarchy: 'secondary',
								coloring: 'gray'
							}}
							icon={{ type: 'icon', leading: phoneCall }}>{m.empty_yummy_salmon_arise()}</tdc-button
						>
						<tdc-button-a
							href="/security-assessment"
							tdc={{
								size: { default: 'lg', 'uui-desktop': 'xl' },
								destructive: 'false',
								hierarchy: 'primary',
								coloring: 'color'
							}}
							icon={{ type: 'icon' }}>{m.fluffy_warm_ape_dream()}</tdc-button-a
						>
					</div>
				</div>
			</div>
		</SectionContainer>
	</div>

	<tdc-mc-cta-section
		id="services"
		class="scroll-mt-20"
		tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'simple-left' }}
	>
		<h2 slot="heading">{m.great_watery_turkey_quell()}</h2>
		<!-- Default slot ... -->
		<p>
			{m.long_long_ape_clasp()}
		</p>
		<!-- McUtilActions inherits tdc styles from parent. -->

		<!-- We let users define the height of their images themself, for horizontal imgs e.g. -->
		<div slot="img" class="flex items-stretch lg:items-start lg:ml-auto mt-uui-xl lg:mt-0">
			<McUtilActions class="items-stretch w-full lg:w-fit lg:items-start lg:ml-auto ">
				<!-- <tdc-button
				tdc={{
					size: 'xl',
					destructive: 'false',
					hierarchy: 'secondary',
					coloring: 'gray'
				}}
				icon={{ type: 'icon' }}>Learn more</tdc-button
			> -->

				<tdc-button-a
					href="#contact"
					tdc={{
						size: { default: 'xl' },
						destructive: 'false',
						hierarchy: 'primary',
						coloring: 'color'
					}}
					icon={{ type: 'icon' }}>{m.clean_less_pug_aim()}</tdc-button-a
				>
			</McUtilActions>
		</div>
	</tdc-mc-cta-section>

	<div
		class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-uui-9xl grid w-full justify-evenly mx-auto gap-uui-7xl max-w-uui-container-max-width-mobile px-uui-container-padding-mobile lg:px-uui-container-padding-desktop lg:max-w-uui-container-max-width-desktop"
	>
		{#each featuredIconArray as icon}
			<FeatureText>
				<FeaturedIcon slot="icon" url={icon.url} type={icon.type} color={icon.color}></FeaturedIcon>
				<h4 slot="title">{icon.title}</h4>
				<p slot="description">{icon.description}</p>
			</FeatureText>
		{/each}
	</div>

	<div class="py-uui-2xl lg:py-uui-4xl">
		<SectionContainer class="py-uui-2xl lg:py-uui-3xl border-uui-utility-gray-300  ">
			<tdc-mc-hs
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'center' }}
			>
				<h2 slot="heading">{m.mean_lofty_larva_conquer()}</h2>
				<p>{m.drab_fresh_oryx_learn()}</p>
				<div class="flex items-center justify-center" slot="after"><tdc-fs-logo /></div>
			</tdc-mc-hs>
		</SectionContainer>
	</div>

	<div class="min-h-[calc(100vh-8rem)] flex flex-col justify-center bg-uui-bg-primary_alt">
		<tdc-mc-hhs
			id="domaintester"
			class="scroll-mt-24"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'splitform02' }}
		>
			<h2>{m.domaincheckerheading()}</h2>
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
					<DomainCheckerForm slot="form" />
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
	</div>

	<div class="overflow-hidden scroll-mt-uui-10xl pt-uui-4xl" id="about">
		<SectionContainer>
			<div class="relative">
				<tdc-mc-cta-section
					tdc={{
						breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' },
						type: 'split-image-02'
					}}
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
							icon={{ type: 'icon', leading: phoneCall }}
							>{m.introsectionactionsecondary()}</tdc-button
						>
					</McUtilActions>
					<!-- We let users define the height of their images themself, for horizontal imgs e.g. -->
					<div class="w-full space-y-uui-6xl" slot="img">
						<tdc-mc-team-section-member
							class="[&&]:uui-desktop:min-w-uui-none [&&]:uui-desktop:max-w-uui-width-lg [&&]:w-full"
							tdc={{
								breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' },
								type: 'image-left'
							}}
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
								<tdc-fs-misc-icons-social
									url={fsMiscIconsSocialGithubMask}
									tdc={{ style: 'gray' }}
								/></a
							>
						</tdc-mc-team-section-member>
						<tdc-mc-team-section-member
							class="[&&]:uui-desktop:min-w-uui-none [&&]:uui-desktop:max-w-uui-width-lg [&&]:w-full"
							tdc={{
								breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' },
								type: 'image-left'
							}}
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
								<tdc-fs-misc-icons-social
									url={fsMiscIconsSocialGithubMask}
									tdc={{ style: 'gray' }}
								/></a
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
					<img
						class="inset-0 absolute -translate-x-[7.5%] mt-12 lg:-mt-24 -z-10 w-full min-h-[20rem] min-w-[60rem] lg:min-h-[60rem] object-fill"
						src="/background-pattern.svg"
						alt="dot-pattern-frontline"
					/>
				</tdc-mc-cta-section>
			</div>
		</SectionContainer>
	</div>
	<tdc-mc-contactsection
		class="scroll-mt-16"
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
