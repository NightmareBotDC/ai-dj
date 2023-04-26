<script lang="ts">
	import Meta from './components/Meta.svelte';

        export let data: any;

        const accountConnected = (d) => { return data.user.Connections.find((i) => i.service === d); };
        const startExperience = () => { return window.location.href = "/app"; };
</script>

<Meta
	Title="AzidoDJ"
	Description="AzidoDJ is a Artificial Intelligence based DJ experience that allows you to always be in the moment, with similar music you already listen to!"
/>

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
		Powered by <a href="https://spotify.com/">
			<img src="/Spotify_Logo.png" class="ml-2" height="50px" width="80px" alt="Spotify" />
		</a>
	</p>
</div>

<div class="p-2" />

{#if data.user}
        {#if accountConnected("Spotify") }
           <h1 class="text-white font-bold m-4">Welcome back, {data.user.Username}! Your Spotify account is already linked to your Azidoazide profile. Start your enhanced music listening experience now!</h1>
           <button
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              on:click={startExperience}
           >Start your Experience =></button>
        {:else}
	   <h1 class="text-white font-bold m-4">Hello, {data.user.Username}. It seems you don't have a Spotify account linked with your Azidoazide profile. Please go to <span class="text-spotify font-bold">Link Account</span> to start using AzidoDJ today!</h1>
        {/if}
{:else}
	<div id="prompt_login" class="m-4 p-15">
		<h2 class="text-white font-bold">You are NOT logged in.</h2>
	</div>
{/if}
