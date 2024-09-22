<script lang="ts">
	import { cardSettings, editSettings, type Settings } from "../stores/layerSettings";

	let settings;
	let settings2: Settings;
	function onSubmit(e: any) {
		const formData = new FormData(e.target);
		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		editSettings(data);
	}

	cardSettings.subscribe(item => {settings2 = item})
</script>

<section>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for='gap' >Gap between layers (px)</label>
			<input type="number" name='gap' />
		</div>
		<div>
			<label for="border">Select Frame</label>
			<select name="border">
				<option value='1'>Frame 1</option>
				<option value='2'>Frame 2</option>
			</select>
		</div>
	
		<div>
			<label for="height">Height</label>
			<input type='number'name='height' disabled/>
		</div>
		
		<div>
			<label for="width">Width</label>
			<input type="number" name='width' disabled/>
		</div>
	

		<button type='submit'>Save</button>
	</form>
</section>


<style>
	section {
		min-height: 200px;
		background-color: rgb(0, 0, 0);
		grid-column: 2 / 5;
		grid-row: 1 / 3;
		border-radius: 10px;
		padding: 15px;
	}

	form {
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		gap: 15px;
	}

	form div {
		width: calc(50% - 15px);
		display: flex;
		flex-direction: column;
	}
</style>