<script lang="ts">
	import { onMount } from 'svelte';

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
	let numberLayers = 0;
	const cardWidth = conf.cardWidth;

	function countLayers(layers: string[]): number {
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

	layers.subscribe((item: any) => console.log(item));

	numberLayers = countLayers($layers);
	gap = setGap(numberLayers, cardWidth);
	onMount(() => {
		let wrapper = document.getElementById('wrapper');
		let card = document.getElementById('card');

		wrapper?.addEventListener('mouseover', (event) => {
			const target = event.target;
			document.onmousemove = (event) => {
				let x = event.x;
				let y = event.y;
				if (card)
					card.style.transform = `rotate3d(${(x - 390) / 10}, ${(y - 276) / 10}, ${0.2}, 25deg)`;
			};
		});
	});
</script>

<div id="wrapper">
	<div class="card" id="card">
		{#each $layers as layer, i}
			<div class="layer" style={setLayerSeparation(i)}>
				<img src={layer} alt="" />
			</div>
		{/each}

		<div class="layer last" style={setSeparationLastLayer(numberLayers, gap)}></div>

		<div class="left side"></div>
		<div class="right side"></div>
		<div class="top side"></div>
		<div class="bottom side"></div>
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
		background-color: blue;
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
		/* border: 1px solid #a5a5a5; */
		/* border-radius: 10px; */
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
		border: 15px solid #000000e1;
		filter: drop-shadow(0px 0px 0px #000000e1);
	}

	.side {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: var(--sides-color);
	}

	.left {
		transform: rotateY(-90deg) translateZ(var(--translate-z-sides))
			translateX(calc(var(--card-thickness) / 2));
		width: var(--card-thickness);
		left: var(--center-sides);
	}

	.right {
		transform: rotateY(90deg) translateZ(var(--translate-z-sides))
			translateX(calc(-1 * var(--card-thickness) / 2));
		width: var(--card-thickness);
		left: var(--center-sides);
	}

	.bottom {
		transform: rotateX(-90deg) translateZ(var(--translate-z-top-bottom))
			translateY(calc(-1 * var(--card-thickness) / 2));
		height: var(--card-thickness);
		top: var(--center-top-bottom);
	}

	.top {
		transform: rotateX(90deg) translateZ(var(--translate-z-top-bottom))
			translateY(calc(var(--card-thickness) / 2));
		height: var(--card-thickness);
		top: var(--center-top-bottom);
	}
</style>
