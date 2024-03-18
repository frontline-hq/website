<script lang="ts">
	import {
		generalLoading01,
		alertAndFeedbackAlertCircle,
		generalSearchSm
	} from '@frontline-hq/untitledui-icons';
	import * as yup from 'yup';
	import * as m from '$lib/paraglide/messages.js';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';

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
		domain: yup
			.string()
			.matches(
				/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
				'Invalid domain'
			)
			.required()
	});
	let checkedDomain: string | undefined;
	let domainIsSafe: boolean | undefined;
	let subDomainIsSafe: boolean | undefined;
	let submissionTimeoutId: NodeJS.Timeout | undefined;
	let submissionState: 'success' | 'error' | undefined;

	const { form, errors, data, isSubmitting, reset } = createForm({
		initialValues: {
			domain: ''
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = undefined;
			let domainParts = values.domain.split('.');
			let checkedDomain = domainParts.slice(-2).join('.');
			console.log(checkedDomain);
			const endpoint = `https://dns.quad9.net:5053/dns-query?name=_dmarc.${checkedDomain}&type=txt`;

			const response = await fetch(endpoint, {
				method: 'GET'
			});
			const res = await response.json();
			if (!res) {
				throw new Error('No response received');
			}
			if (!response.ok) {
				throw new Error(res);
			}
			// Probably not needed when translating in an overlay
			domainIsSafe = false;
			subDomainIsSafe = false;
			if (res?.Answer) {
				const dmarcRecord = res.Answer.find(
					(a: { name: string | undefined }) => a.name === `_dmarc.${checkedDomain}.`
				);
				if (dmarcRecord) {
					const dmarcPolicy = dmarcRecord.data;
					const policy = dmarcPolicy.match(/p=(reject|quarantine|none)/)?.[1];
					const subdomainPolicy = dmarcPolicy.match(/sp=(reject|quarantine|none)/)?.[1];
					const pct = dmarcPolicy.match(/pct=(\d+)/)?.[1];

					domainIsSafe =
						(policy === 'reject' || policy === 'quarantine') && (!pct || pct === '100');
					if (domainParts.length > 2 && subdomainPolicy === 'none') {
						subDomainIsSafe = false;
					} else {
						subDomainIsSafe = true;
					}
				}
			}
			return res;
		},
		onSuccess(response, context) {
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = 'success';
			reset();
			submissionTimeoutId = setTimeout(() => {
				submissionState = undefined;
			}, 3000);
		},
		onError(err, context) {
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = 'error';
			submissionTimeoutId = setTimeout(() => {
				submissionState = undefined;
			}, 3000);
		}
	});

	function resetForm() {
		if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
		submissionState = undefined;
		checkedDomain = undefined;
		domainIsSafe = undefined;
		subDomainIsSafe = undefined;
		reset();
	}
</script>

<form use:form class="w-full flex justify-center items-center">
	<tdc-mc-util-form tdc={{ type: 'login' }}>
		<tdc-input
			bind:value={$data['domain']}
			tdc={{ size: 'md' }}
			type="domain"
			destructive={$errors['domain'] !== null}
			placeholder="example.com"
			disabled={false}
			hint={$errors['domain'] ?? undefined}
		>
			<span slot="label">Fill in your e-mail domain</span>
		</tdc-input>
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
				Couldn't check domain</tdc-button
			>
		{:else}
			<tdc-button
				type="submit"
				tdc={{
					size: 'lg',
					destructive: 'false',
					hierarchy: 'primary',
					coloring: 'color'
				}}
				disabled={$data['domain'] ? false : true || $isSubmitting}
				icon={{
					type: 'icon',
					leading: $isSubmitting
						? generalLoading01
						: submissionState === 'success'
							? undefined
							: generalSearchSm
				}}
			>
				{#if $isSubmitting}
					Checking domain...
				{:else if submissionState === 'success'}
					Domain checked
				{:else}
					Find out now
				{/if}</tdc-button
			>
		{/if}
		{#if checkedDomain && domainIsSafe !== undefined}
			<div class="text-white flex flex-col items-center gap-y-uui-6xl">
				<div class="flex flex-col items-center gap-y-uui-6xl">
					{#if submissionState === 'success'}
						<div class="text-lg">
							<span class="font-bold">{checkedDomain}</span> is{' '}
							<span class="font-bold">{domainIsSafe ? 'safe' : 'not safe'}</span>
							<button type="button" on:click={resetForm} class="mt-4">Test another domain</button>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</tdc-mc-util-form>
</form>
