<script lang="ts">
	import { PUBLIC_LICENSE } from '$env/static/public';
	import { License } from '@frontline-hq/uui/license';
	import '../app.css';
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n } from '$lib/i18n.js';
</script>

<ParaglideJS {i18n}>
	<License license={PUBLIC_LICENSE}><slot /></License>
</ParaglideJS>
