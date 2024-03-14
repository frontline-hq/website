<script lang="ts">
	import avifBackground from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=avif&as=srcset';
	import webpBackground from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=webp&as=srcset';
	import avifBackgroundMobile from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=avif&as=srcset&rotate=270';
	import webpBackgroundMobile from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=webp&as=srcset&rotate=270';
	import fallbackBackground from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920';
	import fallbackBackgroundMobile from './jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=768';
	import * as yup from 'yup';
	import * as m from '$lib/paraglide/messages.js';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { DateTime } from 'luxon';
	import dedent from 'ts-dedent';
	import pgpPublicKey from '$lib/pgp.publickey.txt?raw';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import {
		alertAndFeedbackAlertCircle,
		generalCheckCircle,
		generalLoading01,
		generalLoading03,
		communicationPhone as phoneCall,
		securityLock03
	} from '@frontline-hq/untitledui-icons';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { readKey, encrypt, createMessage } from 'openpgp';
	import calFn from '@calcom/embed-snippet';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';

	const schema = yup.object({
		'first-name': yup.string().max(50).required(),
		'last-name': yup.string().max(50).required(),
		email: yup.string().email().required(),
		message: yup.string().max(300).required(),
		'privacy-policy': yup.bool().oneOf([true], 'Accept Ts & Cs is required')
	});
	let submissionTimeoutId: number | undefined;
	let submissionState: 'success' | 'error' | undefined;
	const { form, errors, data, isSubmitting, reset } = createForm({
		initialValues: {
			'first-name': '',
			'last-name': '',
			email: '',
			message: '',
			'privacy-policy': false
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = undefined;
			// Do not reformat this.
			const publicKeyArmored = pgpPublicKey;

			const publicKey = await readKey({ armoredKey: publicKeyArmored });

			const generateMailFromValues = (values: yup.InferType<typeof schema>) => {
				const subject = 'Frontline Contact';
				const dt = DateTime.now();
				const sendtime = dt.setLocale('en-GB').toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
				const body = dedent`
					<html>
						<head><meta http-equiv="content-type" content="text/html; charset=utf-8"></head>
						<body dir="auto">
							<br>
							<blockquote type="cite">
								${values['first-name']} ${values['last-name']} <${values.email}> wrote at ${sendtime}:
								<br>
								<br>
							</blockquote>
							<blockquote type="cite">
							</blockquote>
						</body>
					</html>
				`;
				return dedent`
					<html>
						<head><meta http-equiv="content-type" content="text/html; charset=utf-8"></head>
						<body dir="auto">
							<h4>${values['first-name']} ${values['last-name']} <${values.email}> wrote at ${sendtime}:</h4>
							<p>${values.message}</p>
							<a href="mailto:${values.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">Reply</a>
						</body>
					</html>
				`;
			};

			const encrypted = await encrypt({
				message: await createMessage({ text: generateMailFromValues(values) }), // input as Message object
				encryptionKeys: publicKey
			});
			// this will either return
			const response = await fetch('/api/send-mail', {
				method: 'POST',
				body: JSON.stringify({ message: encrypted }),
				headers: {
					'content-type': 'application/json'
				}
			});
			const { message } = await response.json();
			if (!response.ok) {
				throw new Error(message);
			}
			return message;
		},
		onSuccess(response, context) {
			console.log('success', response);
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = 'success';
			reset();
			submissionTimeoutId = setTimeout(() => {
				submissionState = undefined;
			}, 3000);
			// Do something with the returned value from `onSubmit`.
		},
		onError(err, context) {
			console.log('error', (err as Error).message);
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = 'error';
			submissionTimeoutId = setTimeout(() => {
				submissionState = undefined;
			}, 3000);
		}
	});

	$: console.log(languageTag());
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
					href="mailto:contact@frontline.codes"
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
		tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'simple-form-01' }}
	>
		<h6 slot="subheading">{m.contactsectionsubheading()}</h6>
		<h3 slot="heading">{m.contactsectionheading()}</h3>
		<p class="max-w-[50ch]">
			{@html m.contactsectionp()}
		</p>
		<form use:form slot="form">
			<tdc-mc-util-form tdc={{ type: 'regular' }}>
				<span class="col-span-2 uui-desktop:col-span-1">
					<tdc-input
						bind:value={$data['first-name']}
						tdc={{ size: 'md' }}
						destructive={$errors['first-name'] !== null}
						type="text"
						name="first-name"
						placeholder={m.contactsectionformfirstnameplaceholder()}
						disabled={$isSubmitting}
						hint={$errors['first-name'] ?? undefined}
					>
						<span slot="label">{m.contactsectionformfirstnamelabel()}</span>
					</tdc-input>
				</span>
				<span class="col-span-2 uui-desktop:col-span-1">
					<tdc-input
						bind:value={$data['last-name']}
						tdc={{ size: 'md' }}
						destructive={$errors['last-name'] !== null}
						type="text"
						name="last-name"
						placeholder={m.contactsectionformlastnameplaceholder()}
						disabled={$isSubmitting}
						hint={$errors['last-name'] ?? undefined}
					>
						<span slot="label">{m.contactsectionformlastnamelabel()}</span>
					</tdc-input>
				</span>

				<span class="col-span-2">
					<tdc-input
						bind:value={$data['email']}
						tdc={{ size: 'md' }}
						destructive={$errors['email'] !== null}
						type="text"
						name="email"
						placeholder={m.contactsectionformemailplaceholder()}
						disabled={$isSubmitting}
						hint={$errors['email'] ?? undefined}
					>
						<span slot="label">{m.contactsectionformemaillabel()}</span>
					</tdc-input>
				</span>
				<span class="col-span-2">
					<tdc-input-textarea
						bind:value={$data['message']}
						disabled={$isSubmitting}
						destructive={$errors['message'] !== null}
						name="message"
						placeholder={m.contactsectionformmessageplaceholder()}
						hint={$errors['message'] ?? undefined}
					>
						<span slot="label">{m.contactsectionformmessagelabel()}</span>
					</tdc-input-textarea>
				</span>
				<span class="col-span-2">
					<tdc-checkbox
						bind:checked={$data['privacy-policy']}
						disabled={$isSubmitting}
						tdc={{
							size: 'md'
						}}
						name="privacy-policy"
					>
						<span slot="hint">{@html m.contactsectionformprivacypolicyhint()}</span>
					</tdc-checkbox>
				</span>
				<div slot="actions" class="flex flex-col items-center gap-y-uui-6xl">
					<div class="w-full flex flex-col items-stretch">
						{#if submissionState === 'error'}
							<tdc-button
								type="submit"
								tdc={{
									size: 'xl',
									destructive: 'true',
									hierarchy: 'primary',
									coloring: 'color'
								}}
								disabled={false}
								icon={{ type: 'icon', leading: alertAndFeedbackAlertCircle }}
							>
								{m.contactsectionformbuttonsubmiterror()}</tdc-button
							>
						{:else}
							<tdc-button
								type="submit"
								tdc={{
									size: 'xl',
									destructive: 'false',
									hierarchy: 'primary',
									coloring: 'color'
								}}
								disabled={$data['privacy-policy'] === false || $isSubmitting}
								icon={{
									type: 'icon',
									leading: $isSubmitting
										? generalLoading01
										: submissionState === 'success'
											? generalCheckCircle
											: securityLock03
								}}
							>
								{#if $isSubmitting}
									{m.contactsectionformbuttonsubmitting()}
								{:else if submissionState === 'success'}
									{m.contactsectionformbuttonsubmitsuccess()}
								{:else}
									{@html m.contactsectionformbuttonsubmit()}
								{/if}</tdc-button
							>
						{/if}
					</div>

					<span
						class="flex items-center gap-x-2 uui-text-sm font-medium text-uui-text-tertiary_on-brand"
						>{m.contactsectionfootnotetooltipheader()}<tdc-tooltip
							position="right-center"
							arrow={true}
							supportingText={m.contactsectionfootnotetooltipsupportingtext()}
							text={m.contactsectionfootnotetooltiptext()}><tdc-tooltip-helpicon /></tdc-tooltip
						></span
					>
				</div>
			</tdc-mc-util-form>
		</form>
	</tdc-mc-contactsection>
	<tdc-mc-footer tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>
		<tdc-fs-logo slot="logo" />
		<tdc-mc-footer-link
			href="/datenschutzerklaerung"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>{m.footerprivacylinktext()}</tdc-mc-footer-link
		>
		<tdc-mc-footer-link
			href="/impressum"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>{m.footerimprintlinktext()}</tdc-mc-footer-link
		>
		{#each availableLanguageTags as lang}
			<tdc-mc-footer-link
				href={i18n.route($page.url.pathname)}
				hreflang={lang}
				aria-current={lang === languageTag() ? 'page' : undefined}
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
				>{lang}</tdc-mc-footer-link
			>
		{/each}
		<span slot="sidenote">{m.footersidenotetext()}</span>
	</tdc-mc-footer>
{/if}
