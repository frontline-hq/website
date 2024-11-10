<script lang="ts">
	import SecurityAssessmentForm from '$lib/components/SecurityAssessmentForm/SecurityAssessmentForm.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<tdc-mc-contactsection
	class="uui-light-default bg-white [&&]:pb-uui-none"
	id="assessment"
	tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'simple-form-01' }}
>
	<h6 slot="subheading">Gain Valuable Security Insights</h6>
	<h3 slot="heading">IT Security and Compliance Assessment</h3>
	<p class="max-w-[70ch] underline-offset-4">
		{@html `Assess your company's security with our easy-to-use assessment form. </br>  </br> Check the box <u><b>only</b></u> if your company ensures <u><b>full compliance</b></u> with <u><b>all</b></u> aspects of the question; if not leave the checkbox blank. <br/> <br/> After completing the form, you will receive an initial rating to help you understand your current security posture.`}
	</p>
</tdc-mc-contactsection>
<div
	class="pb-uui-7xl lg:pb-uui-9xl px-uui-container-padding-mobile w-full mx-auto flex items-center justify-center uui-light-default bg-white"
>
	<SecurityAssessmentForm />
</div>
