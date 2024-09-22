import { writable, type Writable } from 'svelte/store';

export interface Settings {
	gap: number
	border: string
	width: number
	aspectRatio: number
}

export const defaultSettings: Settings = {
	gap: 15,
	border: 'frame1',
	width: 300,
	aspectRatio: 1.68
}

export const cardSettings: Writable<Settings> = writable(defaultSettings);

export function editSettings(settings: Settings) {
	cardSettings.update(() => settings ? settings : defaultSettings)
}
