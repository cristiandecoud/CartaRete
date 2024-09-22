<script lang="ts">
	import { addLayers, clean, fileNames } from '../stores/layerFiles';
	let files: any = []
	let input: any

	function applyImages() {
		if (!files) return;
		clean()

		for (let i = 0; i < files.length; i++) {
			const file = files[i]
			const reader = new FileReader()
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (!e.target) return
				addLayers([{file: e.target.result, name: file.name, position: i}])
			};
			reader.readAsDataURL(file)
		}	
		fileNames.subscribe(item => console.log(item))
	}

	function cleanImages() {
		clean()
		files = []
	}

	function changePosition(index: number, direction: number) {
		console.log(index, direction);	
		const dt = new DataTransfer();
		
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (i == index) {
					dt.items.add(files[i + direction]);
				} else if (i == index + direction) {
					dt.items.add(files[i - direction]);
				} else {
					dt.items.add(files[i]);
				}
			}
		}

		files = dt.files;
}
</script>

<section>
	{#if files.length}
		<h1>Selected files: </h1>
		<h4>Please order the images</h4>
		{#each files as file, i}
			<ol>
				<p id="list">
					{#if i + 1 != files.length}
						<button id='arrow' on:click={() => changePosition(i, 1)}>&#8595;</button>
					{/if}
					{#if i != 0 }
						<button id='arrow' on:click={() => changePosition(i, -1)}>&#8593;</button>
					{/if}
					{i + 1} - {file.name} 
				</p>
			</ol>
		{/each}
		<article >
			<button class='load' on:click={applyImages}>Show card</button>
			<button class='clean' on:click={cleanImages}>Clean</button>
		</article>
	{:else}
		<input bind:files bind:this={input} type="file" multiple />
	{/if}
</section>

<style>
	#list {
		margin: 0;
	}

	.clean {
		background-color: #b32400;
	}

	.load {
		background-color: #4DB6Af;
	}

	ol {
		margin: 0;
	}

	p {
		border: 2px solid grey;
		border-radius: 2px;
	}
	section {
		min-height: 200px;
		background-color: black;
		grid-column: 2 / 5;
		grid-row: 3 / 5;
		border: 10px solid black;
		border-radius: 10px;
	}


</style>
