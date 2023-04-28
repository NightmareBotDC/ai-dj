<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	import Meta from '../components/Meta.svelte';

        interface Event {
          type: String,
          description: String
        }

	let Loading: Boolean = true;
	let WS: any = null;
	let EventLogs: Event = [];

	export let data: any;

	const isAccountConnected = (p: any) => {
		return data.user.Connections.find((e: any) => e.service === p);
	};

	if (isAccountConnected('Spotify')) {
		Loading = true;

		onMount(() => {
			WS = io('wss://api.azidoazide.xyz', { transports: ['websocket'] });

                        WS.io.on("error", (error) => {
                           EventLogs = EventLogs.concat({
                               type: "error",
                               description: error
                           });
                        });

                        WS.io.on("reconnect", (attempt) => {
                           EventLogs = EventLogs.concat({
                               type: "debug",
                               description: `Reconnected to server. Attempt: #${attempt}`
                           });
                        });

                        WS.io.on("reconnect_attempt", (attempt) => {
                           EventLogs = EventLogs.concat({
                               type: "debug",
                               description: `Attempting to reconnect to server. Attempt: #${attempt}`
                           });
                        });

                        WS.io.on("reconnect_error", (error) => {
                           EventLogs = EventLogs.concat({
                               type: "error",
                               description: `Something went wrong with reconnecting to the server. Error: ${error}`
                           });
                        });

			console.log(WS);
		});

		setTimeout(() => {
			if (WS.connected) {
                           EventLogs = EventLogs.concat({
                               type: "success",
                               description: `Connected to the server!`
                           });

                           Loading = false;
                        }
		}, 2000);
	}
</script>

<Meta
	Title="Your Experience - AzidoDJ"
	Description="AzidoDJ is a Artificial Intelligence based DJ experience that allows you to always be in the moment, with similar music you already listen to!"
/>

{#if isAccountConnected('Spotify')}
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

	<section class="bg-white rounded-md p-3" id="event_logs">
		<h1 class="text-base font-bold text-black">Event Log</h1>
		<div class="p-2" />

		<ol class="bg-gray-700 p-2 rounded-md overflow-scroll">
			{#each EventLogs as event}
                                <div class="p-1" />

				<li>
					<div>
						<h1 class="text-lg font-bold text-white">{event.type.toUpperCase()}</h1>
						<p class="text-base font-bold text-white">{event.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>
{/if}
