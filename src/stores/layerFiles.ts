import { writable } from 'svelte/store';

export const name = writable('');
export const fileNames = writable([]);

export function addLayers(files: any) {
	console.log(files)
	fileNames.update((names: any) => {
		if (!names || !files) return names
		for (const file of files) {
			names.unshift(file)
		}
		return names
	});
}

export function clean() {
	fileNames.set([])
}
