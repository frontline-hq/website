<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import { page } from '$app/stores';
	import { schema, submitHandler, successHandler } from './helper';
	import {
		generalSlashCircle01,
		securityShield01,
		arrowsArrowUpLeft,
		generalXClose,
		communicationPhone as phoneCall,
		generalLoading01,
		alertAndFeedbackAlertCircle,
		generalSearchSm
	} from '@frontline-hq/untitledui-icons';
	import { McUtilActions } from '@frontline-hq/uui/marketing-components';

	let domain: string | undefined;
	let domainIsSafe: boolean | undefined;
	let subDomainIsSafe: boolean | undefined;

	let submissionTimeoutId: NodeJS.Timeout | undefined;
	let submissionState: 'success' | 'error' | undefined;
	let formRef: HTMLFormElement | undefined;

	$: if ($page.url.searchParams.get('domain') && formRef) {
		formRef.requestSubmit();
	}

	function successSideEffects({
		reset,
		handlerResult
	}: {
		reset: () => void;
		handlerResult: ReturnType<typeof successHandler>;
	}) {
		domainIsSafe = handlerResult.domainIsSafe;
		subDomainIsSafe = handlerResult.subDomainIsSafe;
		if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
		submissionState = 'success';
		reset();
		submissionTimeoutId = setTimeout(() => {
			submissionState = undefined;
		}, 3000);
	}

	function errorSideEffects() {
		if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
		submissionState = 'error';
		submissionTimeoutId = setTimeout(() => {
			submissionState = undefined;
		}, 3000);
	}

	function resetSideEffects() {
		if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
		submissionState = undefined;
		domain = undefined;
		domainIsSafe = undefined;
		subDomainIsSafe = undefined;
	}

	const { form, errors, data, isSubmitting, reset } = createForm({
		initialValues: {
			domain: $page.url.searchParams.get('domain') ?? undefined
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			if (submissionTimeoutId != undefined) clearTimeout(submissionTimeoutId);
			submissionState = undefined;
			domain = values.domain;
			return await submitHandler({ inputValue: values.domain });
		},
		onSuccess(response: any) {
			const handlerResult = successHandler(response);
			successSideEffects({ reset, handlerResult });
		},
		onError(err, context) {
			errorSideEffects();
		}
	});

	function resetForm() {
		resetSideEffects();
		reset();
	}

	function useDomainOverlay(_: HTMLElement) {
		document.body.style.overflowY = 'hidden';
		return {
			destroy() {
				document.body.style.overflowY = 'auto';
			}
		};
	}
</script>

{#if domain !== undefined && domainIsSafe !== undefined}
	<div
		use:useDomainOverlay
		class="bg-uui-bg-primary/70 backdrop-blur-md z-40 fixed h-full top-0 inset-x-0"
	>
		<tdc-button-a
			class="absolute right-0 m-8"
			tdc={{
				size: { default: 'md', 'uui-desktop': 'lg' },
				destructive: 'false',
				hierarchy: 'secondary',
				coloring: 'gray'
			}}
			href={$page.url.searchParams.get('redirect-to')}
			type="button"
			on:click={() => {
				resetForm();
			}}
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
					{domain}
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
					<!-- Domain contains a redirect parameter -->
					<tdc-button-a
						tdc={{
							size: { default: 'xl', 'uui-desktop': 'xl' },
							destructive: 'false',
							hierarchy: 'secondary',
							coloring: 'gray'
						}}
						type="button"
						href={$page.url.searchParams.get('redirect-to')}
						on:click={() => {
							resetForm();
						}}
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
{/if}
<form bind:this={formRef} use:form class="w-full flex justify-center items-center">
	<tdc-mc-util-form tdc={{ type: 'login' }}>
		<tdc-input
			bind:value={$data['domain']}
			tdc={{ size: 'md' }}
			type="domain"
			destructive={$errors['domain'] !== null}
			placeholder={m.domaincheckerplaceholder()}
			disabled={false}
			hint={$errors['domain'] ?? undefined}
		>
			<span slot="label">{m.domaincheckerformlabel()}</span>
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
				{m.domaincheckersubmitbuttonerrortext()}</tdc-button
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
					{m.domaincheckersubmitbuttonissubmittingtext()}
				{:else if submissionState === 'success'}
					{m.domaincheckersubmitbuttonsubmissionsuccestext()}
				{:else}
					{m.domaincheckersubmitbuttonctatext()}
				{/if}</tdc-button
			>
		{/if}
	</tdc-mc-util-form>
</form>
