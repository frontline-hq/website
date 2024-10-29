<script lang="ts">
	import { generalActivity } from '@frontline-hq/untitledui-icons';
	import FeaturedIcon from '../FeaturedIcon/FeaturedIcon.svelte';
</script>

<div class="flex flex-col gap-y-uui-xl lg:gap-y-uui-2xl">
	<slot name="icon"></slot>
	<div class="flex flex-col gap-y-uui-xs lg:gap-y-uui-md">
		<div class="uui-text-lg lg:uui-text-xl text-uui-text-primary-900 antialiased">
			<slot name="title"></slot>
		</div>
		<div class="uui-text-md text-uui-text-tertiary-600 antialiased">
			<slot name="description"></slot>
		</div>
	</div>
</div>
