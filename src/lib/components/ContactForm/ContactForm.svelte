<script lang="ts">
	import { DateTime } from 'luxon';
	import pgpPublicKey from '$lib/pgp.publickey.txt?raw';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import * as m from '$lib/paraglide/messages.js';
	import { readKey, encrypt, createMessage } from 'openpgp';
	import {
		alertAndFeedbackAlertCircle,
		generalCheckCircle,
		generalLoading01,
		securityLock03
	} from '@frontline-hq/untitledui-icons';
	import { i18n } from '$lib/i18n';
	yup.setLocale({
		mixed: {
			default: m.yupmixeddefault(),
			required: m.yupmixedrequired()
		},
		string: {
			max: ({ max }) => m.yupstringmaxchars({ max }),
			email: m.yupstringemail()
		}
	});
	const schema = yup.object({
		'first-name': yup.string().max(50).required(),
		'last-name': yup.string().max(50).required(),
		email: yup.string().email().required(),
		message: yup.string().max(300).required()
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
				const firstName = values['first-name'];
				const lastName = values['last-name'];
				const email = values.email;
				const message = values.message;
				const body = m.contactformourreplyemail({ firstName, lastName, email, message, sendtime });
				const encodedSubject = encodeURIComponent(subject);
				const encodedBody = encodeURIComponent(body);
				return m.contactformemailtous({
					firstName,
					lastName,
					email,
					message,
					sendtime,
					encodedBody,
					encodedSubject
				});
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
	const privacyLink = i18n.resolveRoute('/privacy');
	// You agree to our friendly privacy policy .*
	// Sie stimmen unserer <a class="uui-anchor" href="${privacyLink}">Datenschutzrichtlinie</a>zu.*
</script>

<form use:form>
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
				<span slot="hint"
					>{@html `You agree to our friendly <a class="uui-anchor" href="${privacyLink}">privacy policy</a>.*`}</span
				>
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
