<script lang="ts">
	const reloadWindow = () => {
		location.reload();
	};
</script>

<div class="text-center">
	<p id="burger">🍔</p>
</div>

<div class="p-5" />

<p class="text-base text-white text-center font-bold">
	<span>Due to loss of connection, our kitchen cannot serve you.</span>
	<br />
	Please check your internet connection, and watch this burger bouncing in the meantime.
</p>

<p>&nbsp;</p>
<p>&nbsp;</p>

<div class="flex items-center justify-center">
	<button
		class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={reloadWindow}>Reload</button
	>
</div>

<style>
	#burger {
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
