import { writable, type Writable } from 'svelte/store';
export interface Layer {
	name: string
	file: any;
	position: number
}

export const fileNames: Writable<Layer[]> = writable([]);

export function addLayers(files: Layer[]) {
	fileNames.update((names: any) => {
		if (!files) return names;

		// Añadir los archivos ordenados a la lista 'names'
		for (const file of files) {
			// Insertar en la posición correcta según 'position'
			const index = names.findIndex((item: Layer) => item.position > file.position);
			if (index === -1) {
				names.push(file); // Añadir al final si no hay un índice mayor
			} else {
				names.splice(index, 0, file); // Insertar en la posición correspondiente
			}
		}

		return names;
	});
}

export function clean() {
	fileNames.set([])
}


