<script lang="ts">
	import { PUBLIC_LICENSE } from '$env/static/public';
	import { License } from '@frontline-hq/uui/license';
	import '../app.css';
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n } from '$lib/i18n.js';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';
	import * as m from '$lib/paraglide/messages.js';
</script>

<ParaglideJS {i18n}>
	<License license={PUBLIC_LICENSE}
		><slot />
		<tdc-mc-footer tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>
			<a href="/">
				<tdc-fs-logo slot="logo" />
			</a>
			<tdc-mc-footer-link
				href="/privacy"
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
				>{m.footerprivacylinktext()}</tdc-mc-footer-link
			>
			<tdc-mc-footer-link
				href="/imprint"
				tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
				>{m.footerimprintlinktext()}</tdc-mc-footer-link
			>
			{#each availableLanguageTags.filter((lang) => lang !== languageTag()) as lang}
				<tdc-mc-footer-link
					href={i18n.route($page.url.pathname)}
					hreflang={lang}
					aria-current={lang === languageTag() ? 'page' : undefined}
					tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}
					>{lang.toUpperCase()}</tdc-mc-footer-link
				>
			{/each}
			<span slot="sidenote">{m.footersidenotetext()}</span>
		</tdc-mc-footer>
	</License>
</ParaglideJS>
