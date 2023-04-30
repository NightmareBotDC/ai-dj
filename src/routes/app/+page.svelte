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
	let SelectedVoiceIndex: number = 0;
	let SelectedVoice: any = null;

	let Pitch: number = 0;
	let Rate: number = 1;

        let CurrService: String = "Spotify";
        let SongTitle: String = "";
        let SongAlbum: String = "";
        let SongArtist: String = "";

	let TTSsay: Function = (Message: string) => {
		let tts = new SpeechSynthesisUtterance(Message);
		tts.voice = SelectedVoice;
		tts.pitch = Pitch;
		tts.rate = Rate;
		window.speechSynthesis.speak(tts);
	};

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
					SelectedVoiceIndex = Voices.findIndex((voice: any) => voice.default === true);
					SelectedVoice = Voices[SelectedVoiceIndex];
				};

				if ('onvoiceschanged' in Speech) {
					Speech.onvoiceschanged = loadVoices;
					loadVoices();
				} else loadVoices();
			} else {
				Voices = [
					{
						error: 'Speech Synthesis is not compatible with your browser/device.'
					}
				];
			}

			if ('Spotify' in window) {
				const Spotify: any = window.Spotify;
				const token = isAccountConnected('Spotify').accessToken;
				const player = new Spotify.Player({
					name: 'AzidoDJ',
					getOAuthToken: (cb: any) => {
						cb(token);
					},
					volume: 0.5
				});

				// Ready
				player.addListener('ready', ({ device_id }: any) => {
					console.log('Ready with Device ID', device_id);
				});

				// Not Ready
				player.addListener('not_ready', ({ device_id }: any) => {
					console.log('Device ID has gone offline', device_id);
				});

				player.addListener('initialization_error', ({ message }: any) => {
					console.error(message);
				});

				player.addListener('authentication_error', ({ message }: any) => {
					console.error(message);
				});

				player.addListener('account_error', ({ message }: any) => {
					console.error(message);
				});

				player.connect();
			}

			setTimeout(() => {
				if (WS.connected) {
					EventLogs = EventLogs.concat({
						type: 'success',
						description: `Connected to the server!`
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
		<center>
                   <img src={CurrService === "AzidoDJ" ? "/logo.png" : "/Spotify_Logo.png"} alt="Currently Playing" class="rounded-md" />
                </center>

		<div class="p-3" />

		{#if Voices.length != 0}
			<section class="bg-white rounded-md p-3" id="voices">
				<h1 class="text-base font-bold text-black">Available Voices</h1>
				<p class="text-sm font-semibold text-gray-700">
					Current: {SelectedVoiceIndex + 1}. {SelectedVoice.name}
					{SelectedVoice.default ? '(Default)' : ''}
				</p>
				<p class="text-sm font-semibold text-gray-700">
					Settings: Pitch ({Pitch}) | Speed/Rate ({Rate})
				</p>
				<p class="text-sm font-semibold text-gray-700">
					Voices: {Voices.length}
				</p>

				<div class="p-2" />

				<ol class="bg-gray-700 p-2 rounded-md h-20 overflow-y-auto">
					{#each Voices as i, n}
						{#if i.error}
							<h1 class="text-base font-bold text-white">Error: {i.error}</h1>
						{:else}
							<li>
								<label class="text-base font-bold text-white">
									<input
										type="radio"
										on:change={() => {
											SelectedVoice = Voices[n];
											TTSsay(`Hello, ${data.user.Username}. I hope you enjoy my voice!`);
										}}
										bind:group={SelectedVoiceIndex}
										value={n}
									/>
									{n + 1}. {i.name}
									{i.default ? '(Default)' : ''}
								</label>
							</li>
						{/if}
					{/each}
				</ol>

				<div class="p-2" />

				<label for="pitch">Pitch:</label>
				<input type="range" name="pitch" min="0" max="10" bind:value={Pitch} />

				<div class="p-2" />

				<label for="rate">Speed/Rate:</label>
				<input type="range" name="rate" min="0" max="10" bind:value={Rate} />
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
