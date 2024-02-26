<script lang="ts">
	import { PUBLIC_LICENSE } from '$env/static/public';
	import { License } from '@frontline-hq/uui/license';
	import '../app.css';
</script>

<License license={PUBLIC_LICENSE}><slot /></License>
