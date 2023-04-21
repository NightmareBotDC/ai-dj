<script lang="ts">
	interface ButtonInt {
		Name: string;
		Function: () => void;
	}

	export let Status: number = 0;
	export let Message: string = 'Unknown';
	export let SubText: string = 'Unknown Error!';
	export let Button: ButtonInt | null = null;
</script>

<section class="flex items-center h-full p-16">
	<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div class="max-w-md text-center">
			<h2 class="mb-8 font-extrabold text-9xl text-white">
				<span class="sr-only">Error</span>{Status}
			</h2>
			<p class="text-2xl font-semibold md:text-3xl text-white">{Message}</p>
			<p class="mt-4 mb-8 text-white">{SubText}</p>

			{#if Button}
				<button
					type="button"
					class="px-8 py-3 font-semibold rounded bg-violet-400 text-white"
					on:click={Button.Function}>{Button.Name}</button
				>
			{:else}
				<a
					rel="noopener noreferrer"
					href="/"
					class="px-8 py-3 font-semibold rounded bg-violet-400 text-white">Back Home!</a
				>
			{/if}
		</div>
	</div>
</section>
