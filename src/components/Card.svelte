<script lang="ts">
	import { onMount } from 'svelte';
	import type { Layer } from '../stores/layerFiles';

	import marco from '../lib/images/marco1.png';

	interface Props {
		conf: { cardWidth: number };
		body: string;
		layers: string[];
		title: string;
	}

	interface Dimensions {
		bottom: number;
		hMedium: number;
		left: number;
		right: number;
		top: number;
		vMedium: number;
	}

	export let layers;
	export let conf;

	let gap = 15;
	let numberOfLayers = 0;
	const cardWidth = conf.cardWidth;
	let currentLayers: Layer[];

	function countLayers(layers: Layer[]): number {
		return layers.length;
	}

	function setGap(numberOfLayers: number, cardWidth: number): number {
		return cardWidth / numberOfLayers;
	}

	function setLayerSeparation(index: number) {
		return `transform: translateZ(${index * gap}px)`;
	}

	function setSeparationLastLayer(numberLayers: number, gap: number) {
		return `transform: translateZ(${(numberLayers - 1) * gap + 5}px)`;
	}

	
	onMount(() => {
		let wrapper = document.getElementById('wrapper');
		let card = document.getElementById('card');
		
		wrapper?.addEventListener('mouseover', (event) => {
			const target = event.target;
			document.onmousemove = (event) => {
				let x = event.x;
				let y = event.y;
				if (card)
				card.style.transform = `rotate3d(${(x - 390) / 10}, ${(y - 276) / 10}, ${0.2}, 15deg)`;
			};
		});
		layers.subscribe((layers: any) => {
			numberOfLayers = countLayers(layers);
			gap = setGap(numberOfLayers, cardWidth);
			currentLayers = layers
		});
	});
</script>
<div id="wrapper">
	<div class="card" id="card">
		{#if $layers.length}
			{#each $layers as layer, i}
				<div class="layer" style={setLayerSeparation(i)}>
					<img src={layer.file} alt={layer.name} />
				</div>
			{/each}

			<div class="layer last" style={setSeparationLastLayer(numberOfLayers, gap)}>
				<img src={marco} alt='marco'/>
			</div>
		{/if}
	</div>
</div>

<style>
	:root {
		--sides-color: rgb(41, 41, 41);
		--aspect-ratio: 1.68;
		--card-width: 300px;
		--card-height: calc(var(--card-width) * var(--aspect-ratio));
		--card-thickness: 35px;
		--center-sides: calc((var(--card-width) / 2) - var(--card-thickness) / 2);
		--center-top-bottom: calc((var(--card-height) / 2) - var(--card-thickness) / 2);
		--translate-z-sides: calc(var(--card-width) / 2);
		--translate-z-top-bottom: calc(var(--card-height) / 2);
		--shadow-layers: drop-shadow(8px 8px 8px #000000e1);
	}

	#wrapper {
		grid-column: 1 / 2;
		grid-row: 1/ 5;
		width: var(--card-width);
		height: var(--card-height);
		perspective: 1000px;
	}

	.card {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transform: translateZ(-100px);
	}

	.layer {
		box-sizing: border-box;
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 5px;
		filter: var(--shadow-layers);
	}

	img {
		width: inherit;
		height: inherit;
		border-radius: 5px;
	}

	.layer:first-child {
		background-color: var(--sides-color);
		filter: drop-shadow(0);
	}

	.last {
		border: none;
		scale: 1.15
	}
</style>
