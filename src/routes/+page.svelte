<script lang="ts">
	export let data: any;
</script>

<div id="about" class="m-4 p-15">
    <div class="flex">
        <img src="/logo.png" class="h-8 w-8 rounded-full" alt="AzidoDJ" />

	    <h2 class="text-2xl text-white font-bold ml-2">AzidoDJ</h2>
    </div>

	<p
		class="bg-gradient-to-r from-teal-400 to-yellow-200 text-lg font-sans font-bold tracking-normal text-transparent bg-clip-text inline-block"
	>
		Welcome to your personalized Artificial Intelligence based Music DJ.
	</p>
	<p class="flex text-base text-white font-bold">
		Powered by <img src="/Spotify_Logo.png" class="ml-2" height="20px" width="70px" />
	</p>
</div>

<div class="p-2" />

{#if data.user}
	<h1>Logged in!</h1>
{:else}
	<div id="prompt_login" class="m-4 p-15">
		<h2>You are NOT logged in.</h2>
	</div>
{/if}
