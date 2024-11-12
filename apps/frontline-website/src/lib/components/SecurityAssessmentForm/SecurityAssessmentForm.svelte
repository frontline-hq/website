<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import * as m from '$lib/paraglide/messages.js';
	import { i18n } from '$lib/i18n';
	import {
		generalCheckCircle,
		generalLoading01,
		alertAndFeedbackAlertCircle,
		securityLock03
	} from '@frontline-hq/untitledui-icons';
	import { DateTime } from 'luxon';
	import pgpPublicKey from '$lib/pgp.publickey.txt?raw';
	import { readKey, encrypt, createMessage } from 'openpgp';

	let submissionState: 'success' | 'error' | undefined;
	let submissionTimeoutId: NodeJS.Timeout | undefined;

	const privacyLink = i18n.resolveRoute('/privacy');

	const categories = [
		{
			title: m.cute_moving_capybara_glow(),
			questions: [
				{
					id: 'q1',
					label: m.honest_wild_polecat_cook()
				},
				{
					id: 'q2',
					label: m.antsy_proof_chipmunk_renew()
				},
				{ id: 'q3', label: m.crazy_nice_impala_relish() }
			]
		},
		{
			title: m.cozy_stock_florian_race(),
			questions: [
				{ id: 'q4', label: m.such_steep_eel_pop() },
				{
					id: 'q5',
					label: m.vivid_dizzy_florian_surge()
				},
				{
					id: 'q6',
					label: m.true_merry_florian_race()
				}
			]
		},
		{
			title: m.bald_plain_cow_snip(),
			questions: [
				{
					id: 'q7',
					label: m.mad_agent_nils_relish()
				},
				{
					id: 'q8',
					label: m.full_born_octopus_tear()
				}
			]
		},
		{
			title: m.seemly_best_lark_accept(),
			questions: [
				{
					id: 'q9',
					label: m.knotty_chunky_sawfish_offer()
				}
			]
		},
		{
			title: m.every_trite_thrush_dare(),
			questions: [
				{
					id: 'q10',
					label: m.last_tough_shrimp_gaze()
				}
			]
		}
	];

	const phoneRegExp = /^\+?[1-9]{1,4}[ \-]*([0-9]{2,4}[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

	// Validation schema
	const schema = yup.object({
		'first-name': yup.string().required(m.wide_jolly_cuckoo_radiate()),
		'last-name': yup.string().required(m.weary_alert_capybara_forgive()),
		'company-name': yup.string().required(m.calm_inclusive_shad_cook()),
		'company-email': yup.string().email().required(m.kind_warm_coyote_glow()),
		'phone-number': yup
			.string()
			.matches(phoneRegExp, m.mad_inclusive_warbler_twist())
			.required(m.elegant_game_midge_gaze()),
		questions: yup
			.object()
			.shape(
				Object.fromEntries(
					categories.flatMap((category) => category.questions.map((q) => [q.id, yup.boolean()]))
				)
			)
	});

	const { form, errors, data, isSubmitting, reset } = createForm({
		initialValues: {
			'first-name': '',
			'last-name': '',
			'company-name': '',
			'company-email': '',
			'phone-number': '',
			'privacy-policy': false,
			questions: Object.fromEntries(
				categories.flatMap((category) => category.questions.map((q) => [q.id, false]))
			)
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = undefined;

			const publicKeyArmored = pgpPublicKey;
			const publicKey = await readKey({ armoredKey: publicKeyArmored });

			// Generate the email content based on `values` and `categories`
			const generateEmailContent = (values: any, categories: any[]): string => {
				const dt = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
				const output = {
					date: dt,
					name: `${values['first-name']} ${values['last-name']}`,
					company: values['company-name'],
					email: values['company-email'],
					phone: values['phone-number'],
					answers: categories.map((category) => ({
						title: category.title,
						questions: category.questions.map((question) => ({
							id: question.id,
							question: question.label,
							answer: values.questions[question.id] ? '1' : '0'
						}))
					}))
				};

				return JSON.stringify(output, null, 2);
			};

			const emailContent = generateEmailContent(values, categories);

			// Prepare the encrypted email
			const subject = 'Frontline Security Assessment';
			const sendtime = DateTime.now()
				.setLocale('en-GB')
				.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
			const firstName = values['first-name'];
			const lastName = values['last-name'];
			const email = values['company-email'];
			const body = `Assessment completed by: ${firstName} ${lastName} on ${sendtime}\n\n${emailContent}`;
			const encodedSubject = encodeURIComponent(subject);
			const encodedBody = encodeURIComponent(body);

			const mailContent = {
				firstName,
				lastName,
				email,
				body,
				sendtime,
				encodedBody,
				encodedSubject
			};

			const encrypted = await encrypt({
				message: await createMessage({ text: JSON.stringify(mailContent) }), // Encrypts mail content JSON
				encryptionKeys: publicKey
			});

			// Send the encrypted email via your API
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
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = 'success';
			reset();
			submissionTimeoutId = setTimeout(() => {
				submissionState = undefined;
			}, 3000);
			// Do something with the returned value from `onSubmit`.
		},
		onError(err, context) {
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = 'error';
			submissionTimeoutId = setTimeout(() => {
				submissionState = undefined;
			}, 3000);
		}
	});
</script>

<form use:form>
	<tdc-mc-util-form class="[&&]:max-w-[70ch] w-full" tdc={{ type: 'regular' }}>
		<!-- First Name -->
		<span class="col-span-2 uui-desktop:col-span-1">
			<tdc-input
				bind:value={$data['first-name']}
				tdc={{ size: 'md' }}
				destructive={$errors['first-name'] !== null}
				type="text"
				name="first-name"
				placeholder={m.major_acidic_starfish_cheer()}
				disabled={$isSubmitting}
				hint={$errors['first-name'] ?? undefined}
			>
				<span slot="label">{m.proud_good_shrike_fetch()}</span>
			</tdc-input>
		</span>

		<!-- Last Name -->
		<span class="col-span-2 uui-desktop:col-span-1">
			<tdc-input
				bind:value={$data['last-name']}
				tdc={{ size: 'md' }}
				destructive={$errors['last-name'] !== null}
				type="text"
				name="last-name"
				placeholder={m.dirty_lost_opossum_grip()}
				disabled={$isSubmitting}
				hint={$errors['last-name'] ?? undefined}
			>
				<span slot="label">{m.cute_wild_platypus_bump()}</span>
			</tdc-input>
		</span>
		<!-- Company Name -->
		<span class="col-span-2 uui-desktop:col-span-1">
			<tdc-input
				bind:value={$data['company-name']}
				tdc={{ size: 'md' }}
				destructive={$errors['company-name'] !== null}
				type="text"
				name="company-name"
				placeholder={m.dark_tame_tadpole_scold()}
				disabled={$isSubmitting}
				hint={$errors['company-name'] ?? undefined}
			>
				<span slot="label">{m.dark_brave_leopard_cuddle()}</span>
			</tdc-input>
		</span>

		<!-- Phone Number -->
		<span class="col-span-2 uui-desktop:col-span-1">
			<tdc-input
				bind:value={$data['phone-number']}
				tdc={{ size: 'md' }}
				destructive={$errors['phone-number'] !== null}
				type="text"
				name="phone-number"
				placeholder="+49 123 456 789"
				disabled={$isSubmitting}
				hint={$errors['phone-number'] ?? undefined}
			>
				<span slot="label">{m.white_new_cow_drum()}</span>
			</tdc-input>
		</span>

		<!-- Company Email -->
		<span class="col-span-2">
			<tdc-input
				bind:value={$data['company-email']}
				tdc={{ size: 'md' }}
				destructive={$errors['company-email'] !== null}
				type="text"
				name="company-email"
				placeholder={m.novel_fuzzy_giraffe_fulfill()}
				disabled={$isSubmitting}
				hint={$errors['company-email'] ?? undefined}
			>
				<span slot="label">{m.suave_weak_goat_approve()}</span>
			</tdc-input>
		</span>

		<!-- Loop through categories and questions -->
		{#each categories as category (category.title)}
			<h3 class="col-span-2 uui-text-lg md:uui-text-xl text-uui-text-primary-900">
				{category.title}
			</h3>
			{#each category.questions as question (question.id)}
				<div class="flex items-center justify-between gap-2 col-span-2">
					<label for={question.id} class="flex items-center gap-2">
						<!-- Display the question number and label text -->
						<span class="text-uui-text-tertiary-600 uui-text-md">
							{question.id.replace('q', '')}.
							{' ' + question.label}</span
						>
					</label>
					<!-- Checkbox positioned after the text -->
					<tdc-checkbox
						id={question.id}
						bind:checked={$data.questions[question.id]}
						name={question.id}
						tdc={{ size: 'md' }}
						disabled={$isSubmitting}
					>
					</tdc-checkbox>
				</div>
			{/each}
		{/each}

		<span class="col-span-2">
			<tdc-checkbox
				bind:checked={$data['privacy-policy']}
				disabled={$isSubmitting}
				tdc={{
					size: 'md'
				}}
				name="privacy-policy"
			>
				<span slot="hint">{@html m.contactsectionformprivacypolicyhint1({ privacyLink })}</span>
			</tdc-checkbox>
		</span>

		<!-- Submit Button -->
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
				{:else if $errors['first-name'] || $errors['last-name'] || $errors['company-name'] || $errors['company-email'] || $errors['phone-number'] || $errors['privacy-policy']}
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
						{$errors['first-name'] ||
							$errors['last-name'] ||
							$errors['company-name'] ||
							$errors['company-email'] ||
							$errors['phone-number'] ||
							$errors['privacy-policy']?.join('')[0]}</tdc-button
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
