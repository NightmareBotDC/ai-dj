<script lang="ts">
	import { onMount } from 'svelte';

	let status: any = null;

	onMount(async () => {
		status = await fetch('https://nightmare-project.instatus.com/summary.json').then((res) => {
			if (res.status === 200) return res.json();
			else
				return {
					error: 'Unable to reach server.'
				};
		});
	});
</script>

{#if status && !status.error}
	<center>
		<div class="p-2 bg-white inline-block rounded-md">
			<div class="flex items-center justify-center">
				{#if status.page.status === 'UP'}
					<div class="p-2 bg-green-500 rounded-lg" />
					<h2 class="pl-2 text-green-500 font-bold text-center">All services are online!</h2>
				{/if}

				{#if status.page.status === 'HASISSUES'}
					<div class="p-2 bg-red-500 rounded-lg" />
					<h2 class="pl-2 text-red-500 font-bold text-center">Some services are having issues!</h2>
				{/if}

				{#if status.page.status === 'UNDERMAINTENANCE'}
					<div class="p-2 bg-black rounded-lg" />
					<h2 class="pl-2 text-black font-bold text-center">
						Some services are under maintenance!
					</h2>
				{/if}
			</div>
		</div>
	</center>
{/if}
