import { writable } from 'svelte/store';

export const name = writable('');
export const fileNames = writable([]);

export function addLayers(files: any) {
	fileNames.update((names: any) => {
		if (!names || !files) return names;
		for (const file of files) {
			names.push(file);
		}
		return names;
	});
}
