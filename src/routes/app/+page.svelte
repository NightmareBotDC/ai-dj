<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	import Meta from '../components/Meta.svelte';

	interface Event {
		type: string;
		description: string;
	}

	let Loading: Boolean = true;
	let WS: any = null;
	let Speech: any = null;
	let Voices: any = [];
	let EventLogs: Event[] = [
		{
			type: 'success',
			description: 'Page Loaded. Connecting to server now!'
		}
	];

	export let data: any;

	const isAccountConnected = (p: any) => {
		return data.user.Connections.find((e: any) => e.service === p);
	};

	if (isAccountConnected('Spotify')) {
		Loading = true;

		EventLogs = EventLogs.concat({
			type: 'success',
			description: 'User authenticated, and Azidoazide account is linked with Spotify.'
		});

		onMount(() => {
			WS = io('wss://api.azidoazide.xyz', { transports: ['websocket'] });

			WS.io.on('error', (error: any) => {
				EventLogs = EventLogs.concat({
					type: 'error',
					description: error
				});
			});

			WS.io.on('reconnect', (attempt: any) => {
				EventLogs = EventLogs.concat({
					type: 'debug',
					description: `Reconnected to server. Attempt: #${attempt}`
				});
			});

			WS.io.on('reconnect_attempt', (attempt: any) => {
				EventLogs = EventLogs.concat({
					type: 'debug',
					description: `Attempting to reconnect to server. Attempt: #${attempt}`
				});
			});

			WS.io.on('reconnect_error', (error: any) => {
				EventLogs = EventLogs.concat({
					type: 'error',
					description: `Something went wrong with reconnecting to the server. Error: ${error}`
				});
			});

			if ('speechSynthesis' in window) {
				Speech = window.speechSynthesis;

				const loadVoices = () => {
					Voices = Speech.getVoices();
				};

				if ('onvoiceschanged' in Speech) Speech.onvoiceschanged = loadVoices;
				else loadVoices();

                                Voices = [
					{
						error: Speech.getVoices()
					}
				];
			} else {
				Voices = [
					{
						error: 'Speech Synthesis is not compatible with your browser/device.'
					}
				];
			}

			setTimeout(() => {
				if (WS.connected) {
					EventLogs = EventLogs.concat({
						type: 'success',
						description: `Connected to the server!`
					});

					EventLogs = EventLogs.concat({
						type: 'debug',
						description: `Waiting for TTS voices to load.`
					});

					Loading = false;
				}
			}, 2000);
		});
	}
</script>

<Meta
	Title="Your Experience - AzidoDJ"
	Description="AzidoDJ is a Artificial Intelligence based DJ experience that allows you to always be in the moment, with similar music you already listen to!"
/>

{#if isAccountConnected('Spotify')}
	{#if Loading}
		<div id="loading" class="text-base text-white font-bold">
			<p class="text-base text-white text-center font-bold">
				Loading your personalized DJ experience...
			</p>
		</div>
	{:else}
		<h1 class="text-base font-bold text-white">
			Welcome to your personalized Music DJ experience. We hope you enjoy your time here!
		</h1>

		<div class="p-3" />

		{#if Voices.length != 0}
			<section class="bg-white rounded-md p-3" id="voices">
				<h1 class="text-base font-bold text-black">Available Voices</h1>
				<div class="p-2" />

				<ol class="bg-gray-700 p-2 rounded-md h-20 overflow-y-auto">
					{#each Voices as voice}
						{#if voice.error}
							<h1 class="text-base font-bold text-white">Error: {voice.error}</h1>
						{:else}
							<li>
								<label class="text-base font-bold text-white">
									<input type="radio" />
									{voice.name} ({voice.lang})
								</label>
							</li>
						{/if}
					{/each}
				</ol>
			</section>
		{/if}
	{/if}

	<div class="p-3" />

	<section class="bg-white rounded-md p-3" id="event_logs">
		<h1 class="text-base font-bold text-black">Event Log</h1>
		<div class="p-2" />

		<ol class="bg-gray-700 p-2 rounded-md h-20 overflow-y-auto">
			{#each EventLogs as event}
				<div class="p-1" />

				<li>
					<div>
						<h1 class="text-md font-bold text-white">{event.type.toUpperCase()}</h1>
						<p class="text-base font-bold text-white">{event.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>
{/if}
