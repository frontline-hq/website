<script lang="ts">
	import { PUBLIC_UUI_LICENSE } from '$env/static/public';
	import { License } from '@frontline-hq/uui/license';
	import '../app.css';
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n } from '$lib/i18n.js';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';
	import * as m from '$lib/paraglide/messages.js';
	import { generalMenu01, generalXClose } from '@frontline-hq/untitledui-icons';
	import SectionContainer from '$lib/components/SectionContainer/SectionContainer.svelte';
	import { browser } from '$app/environment';

	let isMenuOpen = false;
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		// Prevent scrolling when the menu is open
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<ParaglideJS {i18n}>
	<License license={PUBLIC_UUI_LICENSE}>
		{#if browser}
			<div
				class={`${
					isMenuOpen ? 'block' : 'hidden'
				} fixed inset-0 bg-uui-bg-primary   z-50 lg:hidden`}
			>
				<div class="flex h-full py-uui-5xl flex-col items-center justify-between">
					<tdc-button
						tdc={{
							size: { default: 'md', 'uui-desktop': 'lg' },
							destructive: 'false',
							hierarchy: 'secondary',
							coloring: 'gray'
						}}
						type="button"
						on:click={toggleMenu}
						icon={{ type: 'icon-only', leading: generalXClose }}
					/>
					<div class="space-y-uui-4xl">
						<tdc-button-a
							href="#it-security-assessment"
							on:click={toggleMenu}
							tdc={{
								size: { default: 'xl' },
								destructive: 'false',
								hierarchy: 'link',
								coloring: 'color'
							}}
							icon={{ type: 'icon' }}
						>
							{m.zany_that_lionfish_dart()}
						</tdc-button-a>

						<tdc-button-a
							href="#domaintester"
							on:click={toggleMenu}
							tdc={{
								size: { default: 'xl' },
								destructive: 'false',
								hierarchy: 'link',
								coloring: 'color'
							}}
							icon={{ type: 'icon' }}>{m.last_brief_ant_adore()}</tdc-button-a
						>
						<tdc-button-a
							href="#about"
							on:click={toggleMenu}
							tdc={{
								size: { default: 'xl' },
								destructive: 'false',
								hierarchy: 'link',
								coloring: 'color'
							}}
							icon={{ type: 'icon' }}
							>{m.civil_calm_walrus_reap()}
						</tdc-button-a>
						<tdc-button-a
							on:click={toggleMenu}
							href="#contact"
							tdc={{
								size: { default: 'md' },
								destructive: 'false',
								hierarchy: 'primary',
								coloring: 'color'
							}}
							icon={{ type: 'icon' }}>{m.bland_alive_ocelot_chop()}</tdc-button-a
						>
					</div>
					<a on:click={toggleMenu} href="/">
						<tdc-fs-logo />
					</a>
				</div>

				<!-- Close Button -->
			</div>
			<SectionContainer
				class="z-30  sticky top-uui-md backdrop-blur-md rounded-full px-uui-container-padding-mobile lg:px-uui-container-padding-desktop w-full max-w-screen-lg py-uui-xl mx-auto"
			>
				<nav class=" {$page.url.pathname === '/security-assessment' ? 'bg-black/50' : ''} ">
					<div class="flex w-full items-center justify-between">
						<div class="flex space-x-uui-7xl">
							<a class="w-fit min-w-fit" hreflang={languageTag()} href="/{languageTag()}">
								<tdc-fs-logo />
							</a>
							<div class="hidden items-center text-white lg:flex">
								<div class="space-x-uui-3xl flex">
									<!-- Menu for larger screens -->
									<tdc-button-a
										href="#it-security-assessment"
										tdc={{
											size: { default: 'md' },
											destructive: 'false',
											hierarchy: 'link',
											coloring: 'color'
										}}
										icon={{ type: 'icon' }}
									>
										{m.left_fine_yak_laugh()}
									</tdc-button-a>

									<tdc-button-a
										href="#domaintester"
										tdc={{
											size: { default: 'md' },
											destructive: 'false',
											hierarchy: 'link',
											coloring: 'color'
										}}
										icon={{ type: 'icon' }}>{m.last_brief_ant_adore()}</tdc-button-a
									>
									<tdc-button-a
										href="#about"
										tdc={{
											size: { default: 'md' },
											destructive: 'false',
											hierarchy: 'link',
											coloring: 'color'
										}}
										icon={{ type: 'icon' }}
										>{m.civil_calm_walrus_reap()}
									</tdc-button-a>
								</div>
							</div>
						</div>
						<div class="hidden lg:flex">
							<tdc-button-a
								href="#contact"
								tdc={{
									size: { default: 'md' },
									destructive: 'false',
									hierarchy: 'primary',
									coloring: 'color'
								}}
								icon={{ type: 'icon' }}>{m.bland_alive_ocelot_chop()}</tdc-button-a
							>
						</div>
						<!-- Menu Button for Mobile -->
						<tdc-button
							class="lg:hidden focus:outline-none"
							tdc={{
								size: { default: 'md', 'uui-desktop': 'lg' },
								destructive: 'false',
								hierarchy: 'secondary',
								coloring: 'gray'
							}}
							type="button"
							on:click={toggleMenu}
							icon={{ type: 'icon-only', leading: generalMenu01 }}
						/>

						<!-- Full-Screen Mobile Menu -->
					</div>
				</nav>
			</SectionContainer>
			<slot />
			<tdc-mc-footer tdc={{ breakpoint: { default: 'mobile', 'uui-desktop': 'desktop' } }}>
				<a href={'/' + languageTag()}>
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
		{/if}
	</License>
</ParaglideJS>
