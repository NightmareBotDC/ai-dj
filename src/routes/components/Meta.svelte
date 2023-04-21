<script lang="ts">
	export let Title: string;
	export let Description: string;
	export let Image: string = '/logo.png';
</script>

<svelte:head>
	<title>{Title}</title>
	<meta name="og:title" content={Title} />
	<meta name="og:site_name" content="Azidoazide" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="https://azidoazide.xyz/" />
	<meta name="og:image" content={Image} />
	<meta name="og:description" content={Description} />
	<meta name="theme-color" content="#3c3c3c" />
	<meta name="apple-mobile-web-app-status-bar" content="#3c3c3c" />
	<link rel="manifest" href="https://azidoazide.xyz/manifest.json" />
</svelte:head>
