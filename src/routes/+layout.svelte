<script>
	import favicon from '$lib/assets/favicon-128.png';
	import ConsentBanner from '$lib/components/ConsentBanner.svelte';

	let { children } = $props();

	const openConsent = () => window.dispatchEvent(new Event('cvac-open-consent'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<div class="privacy-bar">
	<a href="/confidentialite">Confidentialité / Privacy</a>
	<button type="button" onclick={openConsent}>Témoins / Cookies</button>
</div>

<ConsentBanner />

<style>
	.privacy-bar {
		display: flex;
		gap: 18px;
		justify-content: center;
		flex-wrap: wrap;
		padding: 12px 16px 18px;
		font-family: 'Urbanist', sans-serif;
		font-size: 0.85rem;
		color: #5e6c7a;
	}
	.privacy-bar a,
	.privacy-bar button {
		color: inherit;
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
