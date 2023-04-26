<script lang="ts">
	import '../app.css';
	import Status from './components/Status.svelte';
	import TopAlert from './components/TopAlert.svelte';
	import Header from './components/Header.svelte';
        import { PUBLIC_ENVIRONMENT } from '$env/static/public';

	export let data: any;
</script>

<section id="content">
	<TopAlert Title="Notice" Desc="This website is still under development." />

	<header>
		<Header user={data.user || null} prod={PUBLIC_ENVIRONMENT === 'production'} />
	</header>

	<div class="p-3" />

	<main class="m-4">
		<slot />
	</main>

	<footer class="m-4">
		<Status />
	</footer>
</section>
