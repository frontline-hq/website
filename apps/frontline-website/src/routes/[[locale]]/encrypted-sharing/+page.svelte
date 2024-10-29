<script>
	import TrustedForm from '$lib/components/TrustedForm/TrustedForm.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<tdc-mc-contactsection
	id="contact"
	tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' }, type: 'simple-form-01' }}
>
	<h6 slot="subheading">{m.encryptedsharingsectionsubheading()}</h6>
	<h3 slot="heading">{m.encryptedsharingsectionheading()}</h3>
	<p class="max-w-[50ch]">
		{@html m.encryptedsharingcontactsectionp()}
	</p>
	<div slot="form">
		<TrustedForm />
	</div>
</tdc-mc-contactsection>
