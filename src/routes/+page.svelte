<script lang="ts">
	export let data: any;
</script>

<div id="about" class="m-4 p-15">
	<h2 class="text-2xl text-white font-bold">AzidoDJ</h2>
	<p
		class="bg-gradient-to-r from-teal-400 to-yellow-200 text-lg font-sans font-bold tracking-normal text-transparent bg-clip-text inline-block"
	>
		Welcome to your personalized Artificial Intelligence based Music DJ.
	</p>
	<p class="text-base text-white font-bold">
		Powered by <a href="https://spotify.com/" class="text-spotify font-extrabold hover:underline"
			>Spotify</a
		>!
	</p>
</div>

<div class="p-2"></div>

{#if data.user}
	<h1>Logged in!</h1>
{:else}
	<div id="prompt_login" class="m-4 p-15">
            <h2>You are NOT logged in.</h2>
	</div>
{/if}
