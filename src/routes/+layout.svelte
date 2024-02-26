<script lang="ts">
	import { UUI_LICENSE } from '$env/static/UUI';
	import { License } from '@frontline-hq/uui/license';
	import '../app.css';
</script>

<License license={UUI_LICENSE}><slot /></License>
