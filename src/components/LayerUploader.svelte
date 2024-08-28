<script lang="ts">
	import { addLayers, clean } from '../stores/layerFiles';
	let files: any
	let input:any

	async function applyImages() {
		if (!files) return;

		for (let i = 0; i < files.length; i++) {
			const file = files[i]
			const reader = new FileReader()
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (!e.target) return
				addLayers([e.target.result])
			};
			reader.readAsDataURL(file)
		}	
	}

	function cleanImages() {
		clean()
		input.value=''
		files = null
	}
</script>

<div>
	<input bind:files bind:this={input} type="file" multiple />
	{#if files}
		{#each files as file}
			<pre id="list">Selected files: {file.name}</pre>
		{/each}
	{/if}
	<button on:click={applyImages}>Load all images</button>
	<button on:click={cleanImages}>Clean</button>
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
