<script lang="ts">
	import { communicationPhone as phoneCall } from '@frontline-hq/untitledui-icons';
	import { onMount } from 'svelte';
	import calFn from '@calcom/embed-snippet';

	export let language = 'de';

	onMount(() => {
		const Cal = calFn('https://app.cal.com/embed/embed.js');
		Cal('init', { origin: 'https://cal.com' });

		Cal('ui', {
			styles: { branding: { brandColor: '#000000' } },
			hideEventTypeDetails: false,
			layout: 'month_view'
		});
	});
</script>

<tdc-button
	type="button"
	data-cal-link="frontline-meeting/20-Minute-Discovery-Session"
	data-cal-config={JSON.stringify({ layout: 'month_view' })}
	tdc={{
		size: { default: 'xl', 'uui-desktop': '2xl' },
		destructive: 'false',
		hierarchy: 'secondary',
		coloring: 'gray'
	}}
	icon={{ type: 'icon', leading: phoneCall }}
	>{language === 'de' ? 'Call vereinbaren' : 'Schedule call'}</tdc-button
>
