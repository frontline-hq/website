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

	let submissionState: 'success' | 'error' | undefined;
	let submissionTimeoutId: NodeJS.Timeout | undefined;

	const privacyLink = i18n.resolveRoute('/privacy');

	const categories = [
		{
			title: 'Access and Authentication',
			questions: [
				{
					id: 'q1',
					label: 'Do you have documented password rules and guidelines that include 2FA?'
				},
				{
					id: 'q2',
					label:
						'Do you and your employees use an open-source password manager with a bug-bounty program?'
				},
				{ id: 'q3', label: 'Do members with higher access privileges use physical security keys?' }
			]
		},
		{
			title: 'Email Security and Deliverability',
			questions: [
				{ id: 'q4', label: 'Do you use Office 365 for email communication?' },
				{
					id: 'q5',
					label:
						'Is your email configured with SPF, DKIM, and DMARC records, and do you have a monitoring system to alert you to failed, blocked, or spoofed email deliveries?'
				},
				{
					id: 'q6',
					label:
						'Have you experienced issues with email delivery to or from customers, or has your company faced a spoofing incident in the last year?'
				}
			]
		},
		{
			title: 'Network and Device Security',
			questions: [
				{
					id: 'q7',
					label:
						'Do you have secure remote access for employees, including VPNs and strong Wi-Fi policies, such as WPA2/WPA3 with complex passwords?'
				},
				{
					id: 'q8',
					label:
						'Are all employee devices equipped with up-to-date antivirus, anti-malware, and device encryption, and is there a process in place to ensure regular software updates?'
				}
			]
		},
		{
			title: 'Data Protection and Backup',
			questions: [
				{
					id: 'q9',
					label:
						'Do you have a georedundant, encrypted backup strategy for both company devices, servers, and email data?'
				}
			]
		},
		{
			title: 'Incident Response',
			questions: [
				{
					id: 'q10',
					label:
						'Is there a documented incident response plan that is regularly tested and updated, with strategies to ensure recoverability without relying solely on backup restoration?'
				}
			]
		}
	];

	const phoneRegExp = /^\+?[1-9]{1,4}[ \-]*([0-9]{2,4}[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

	// Validation schema
	const schema = yup.object({
		'first-name': yup.string().required('First name is required'),
		'last-name': yup.string().required('Last name is required'),
		'company-name': yup.string().required('Company name is required'),
		'company-email': yup.string().email().required('Company email is not valid'),
		'phone-number': yup
			.string()
			.matches(phoneRegExp, 'Phone number is not valid')
			.required('Phone number is required valid'),
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
			// Generate the email
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
							id: question.id, // Added question ID
							question: question.label,
							answer: values.questions[question.id] ? '1' : '0'
						}))
					}))
				};

				return JSON.stringify(output, null, 2);
			};

			const emailContent = generateEmailContent(values, categories);
			console.log('Generated Email Content:\n', emailContent);

			submissionState = 'success';
			reset();
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
				placeholder="First Name"
				disabled={$isSubmitting}
				hint={$errors['first-name'] ?? undefined}
			>
				<span slot="label">First Name*</span>
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
				placeholder="Last Name"
				disabled={$isSubmitting}
				hint={$errors['last-name'] ?? undefined}
			>
				<span slot="label">Last Name*</span>
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
				placeholder="Your company name"
				disabled={$isSubmitting}
				hint={$errors['company-name'] ?? undefined}
			>
				<span slot="label">Company Name*</span>
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
				<span slot="label">Phone Number*</span>
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
				placeholder="you@company.de"
				disabled={$isSubmitting}
				hint={$errors['company-email'] ?? undefined}
			>
				<span slot="label">Company Email*</span>
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
