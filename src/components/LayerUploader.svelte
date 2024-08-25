<script lang="ts">
	import { addLayers } from '../stores/layerFiles';
	let files: FileList;
	let texto: string = '';
	let images: any[] = [];

	function applyImages() {
		if (!files) return;

		images = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();

			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (!e.target) return;
				images = [...images, e.target.result];
				addLayers(images);
			};

			reader.readAsDataURL(file);
		}
	}
</script>

<div>
	<input type="text" bind:value={texto} />
	<input bind:files type="file" multiple />
	{#if files}
		{#each files as file}
			<pre id="list">Selected files: {file.name}</pre>
		{/each}
	{/if}
	<button on:click={applyImages}>Load all images</button>
</div>

<style>
	div {
		min-height: 200px;
		background-color: black;
		grid-column: 2 / 5;
		grid-row: 1/ 3;
		padding: 10px;
	}
</style>
