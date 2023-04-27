<script lang="ts">
   import { onMount } from "svelte";

   let Loading: Boolean = true;

   export let data: any;

   const isAccountConnected = (p) => { return data.user.Connections.find((e) => e.service === p); };
</script>

{#if Loading}
   <div id="loading" class="text-base text-white font-bold">
<div class="text-center">
	<p id="song">🎶</p>
</div>

<div class="p-5" />

<p class="text-base text-white text-center font-bold">
   Loading your personalized DJ experience...
</p>

<style>
	#song {
		animation: bobble 2s infinite;
		font-size: 60px;
		margin-top: 0;
	}

	@keyframes bobble {
		0% {
			transform: translateY(10px);
		}
		50% {
			transform: translateY(40px);
		}
		100% {
			transform: translateY(10px);
		}
	}
</style>
   </div>
{/if}
