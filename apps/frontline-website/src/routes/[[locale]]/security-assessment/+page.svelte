<script lang="ts">
	import SecurityAssessmentForm from '$lib/components/SecurityAssessmentForm/SecurityAssessmentForm.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<tdc-mc-contactsection
	class="uui-light-default bg-white [&&]:pb-uui-none"
	id="assessment"
	tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'simple-form-01' }}
>
	<h6 slot="subheading">{m.grassy_seemly_leopard_fade()}</h6>
	<h3 slot="heading">{m.green_warm_bee_thrive()}</h3>
	<p class="max-w-[70ch] underline-offset-4">
		{@html m.crisp_gaudy_wasp_pick()}
	</p>
</tdc-mc-contactsection>
<div
	class="pb-uui-7xl lg:pb-uui-9xl px-uui-container-padding-mobile w-full mx-auto flex items-center justify-center uui-light-default bg-white"
>
	<SecurityAssessmentForm />
</div>
