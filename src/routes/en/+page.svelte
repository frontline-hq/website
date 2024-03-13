<script lang="ts">
	import avifBackground from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=avif&as=srcset';
	import webpBackground from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920;2560;3000;4096;5120&format=webp&as=srcset';
	import avifBackgroundMobile from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=avif&as=srcset&rotate=270';
	import webpBackgroundMobile from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=540;768;1080;1366;1536&format=webp&as=srcset&rotate=270';
	import fallbackBackground from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=1920';
	import fallbackBackgroundMobile from '../jeremy-bishop-rqWoB4LFgmc-unsplash.png?w=768';
	import * as yup from 'yup';
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

	const schema = yup.object({
		'First name': yup.string().max(50).required(),
		'Last name': yup.string().max(50).required(),
		Email: yup.string().email().required(),
		Message: yup.string().max(300).required(),
		'Privacy policy': yup.bool().oneOf([true], 'Accept Ts & Cs is required')
	});
	let submissionTimeoutId: number | undefined;
	let submissionState: 'success' | 'error' | undefined;
	const { form, errors, data, isSubmitting, reset } = createForm({
		initialValues: {
			'First name': '',
			'Last name': '',
			Email: '',
			Message: '',
			'Privacy policy': false
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
								${values['First name']} ${values['Last name']} <${values.Email}> wrote at ${sendtime}:
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
							<h4>${values['First name']} ${values['Last name']} <${values.Email}> wrote at ${sendtime}:</h4>
							<p>${values.Message}</p>
							<a href="mailto:${values.Email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">Reply</a>
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

	$: console.log($isSubmitting);
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
					icon={{ type: 'icon', leading: phoneCall }}>{'Schedule call'}</tdc-button
				>
				<tdc-button-a
					href="mailto:contact@frontline.codes"
					tdc={{
						size: { default: 'xl', 'uui-desktop': '2xl' },
						destructive: 'false',
						hierarchy: 'primary',
						coloring: 'color'
					}}
					icon={{ type: 'icon' }}>Email us</tdc-button-a
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
	<tdc-mc-contactsection
		tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'simple-form-01' }}
	>
		<h6 slot="subheading">Contact us</h6>
		<h3 slot="heading">Get in touch</h3>
		<p class="max-w-[50ch]">
			Peace of mind is our currency.<br />Reach out to us at
			<a class="uui-anchor" href="mailto:contact@frontline.codes">contact@frontline.codes</a> to unlock
			the full potential of your digital presence.
		</p>
		<form use:form slot="form">
			<tdc-mc-util-form tdc={{ type: 'regular' }}>
				<span class="col-span-2 uui-desktop:col-span-1">
					<tdc-input
						bind:value={$data['First name']}
						tdc={{ size: 'md' }}
						destructive={$errors['First name'] !== null}
						type="text"
						name="First name"
						placeholder="First name"
						disabled={$isSubmitting}
						hint={$errors['First name'] ?? undefined}
					>
						<span slot="label">First name*</span>
					</tdc-input>
				</span>
				<span class="col-span-2 uui-desktop:col-span-1">
					<tdc-input
						bind:value={$data['Last name']}
						tdc={{ size: 'md' }}
						destructive={$errors['Last name'] !== null}
						type="text"
						name="Last name"
						placeholder="Last name"
						disabled={$isSubmitting}
						hint={$errors['Last name'] ?? undefined}
					>
						<span slot="label">Last name*</span>
					</tdc-input>
				</span>

				<span class="col-span-2">
					<tdc-input
						bind:value={$data['Email']}
						tdc={{ size: 'md' }}
						destructive={$errors['Email'] !== null}
						type="text"
						name="Email"
						placeholder="you@company.com"
						disabled={$isSubmitting}
						hint={$errors['Email'] ?? undefined}
					>
						<span slot="label">Email*</span>
					</tdc-input>
				</span>
				<span class="col-span-2">
					<tdc-input-textarea
						bind:value={$data['Message']}
						disabled={$isSubmitting}
						destructive={$errors['Message'] !== null}
						name="Message"
						placeholder="Please enter your message for us..."
						hint={$errors['Message'] ?? undefined}
					>
						<span slot="label">Message*</span>
					</tdc-input-textarea>
				</span>
				<span class="col-span-2">
					<tdc-checkbox
						bind:checked={$data['Privacy policy']}
						disabled={$isSubmitting}
						tdc={{
							size: 'md'
						}}
						name="Privacy policy"
						><span slot="hint"
							>You agree to our friendly <a class="uui-anchor" href="/datenschutzerklaerung"
								>privacy policy</a
							>.*</span
						></tdc-checkbox
					>
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
								Couldn't submit form</tdc-button
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
								disabled={$data['Privacy policy'] === false || $isSubmitting}
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
									Sending...
								{:else if submissionState === 'success'}
									Sent successfully.
								{:else}
									Send <span class="underline underline-offset-2">encrypted</span> message
								{/if}</tdc-button
							>
						{/if}
					</div>

					<span
						class="flex items-center gap-x-2 uui-text-sm font-medium text-uui-text-tertiary_on-brand"
						>Encrypted with PGP <tdc-tooltip
							position="right-center"
							arrow={true}
							supportingText="We encrypt your E-Mail right here in the browser even before it is sent. This way, no one can read our conversation. Not even our mail provider(s)."
							text="We leverage client side PGP encryption."><tdc-tooltip-helpicon /></tdc-tooltip
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
			>Privacy</tdc-mc-footer-link
		>
		<tdc-mc-footer-link
			href="/impressum"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
			>Imprint</tdc-mc-footer-link
		><tdc-mc-footer-link
			href="/"
			tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>DE</tdc-mc-footer-link
		>
		<span slot="sidenote">2024, Hamburg DE</span>
	</tdc-mc-footer>
{/if}
