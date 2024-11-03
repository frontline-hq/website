<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import calFn from '@calcom/embed-snippet';
	import { McHeroHeaderSectionFormWrapper } from '@frontline-hq/uui/marketing-components';
	import DomainCheckerForm from '$lib/components/DomainCheckerForm/DomainCheckerForm.svelte';

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
	<link rel="canonical" href="https://www.domainchecker.mailguard.codes" />
	<meta property="og:title" content={m.pageheadogtitle()} />
	<meta property="og:description" content={m.pageheadogdescription()} />
	<meta property="og:image" content="https://mailguard.codes/static/LogotypeLight.svg" />
	<meta property="og:url" content="https://domainchecker.mailguard.codes" />
	<meta name="robots" content="index, follow" />
	<!-- Add this in later, when added to google-site-verification -->
	<!-- <meta name="google-site-verification" content="Bq4e8ICS3Kqjp-0k2C-1PSX5cnY9btnGGI0ipjlYsds" /> -->
	<!-- Update this value if needed -->
	<link rel="icon" type="image/x-icon" href="/favicon.png" />
	<!-- Update the favicon path if needed -->
</svelte:head>
{#if browser}
	<div class="min-h-[calc(100vh-8rem)] flex flex-col justify-center">
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
{/if}
