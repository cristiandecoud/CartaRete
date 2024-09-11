<script>
	import Card from '../components/Card.svelte';
	import LayerUploader from '../components/LayerUploader.svelte';
	import { fileNames } from '../stores/layerFiles';

	const conf = {
		cardWidth: 45
	};
</script>

<main>
	<Card {conf} layers={fileNames} />
	<LayerUploader />
</main>

<style>
	main {
		display: grid;
		margin: auto;
		padding: 1rem;
		width: 90%;
		max-width: calc(100% - 2rem);
		color: white;
		font-size: 20px;
		line-height: 1.6;

		grid-template-columns: repeat(4, 1fr);
		grid-gap: 15px;
		grid-auto-rows: minmax(100px, auto);
	}
</style>
