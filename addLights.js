import { AmbientLight, DirectionalLight } from 'three'

export const addLight = () => {
	let light = new DirectionalLight(0xffffff, 1)
	light.position.set(1, 1, 1)
	return light
}

export const lightMain = () => {
	let light = new DirectionalLight(0xffffff, 1)
	light.position.set(-1.5, 1, 1)
	return light
}

export const lightSub = () => {
	let light = new DirectionalLight(0xffffff, 3)
	light.position.set(11.5, 2, -2.5)
	return light
}

export const envLight = () => {
	let light = new AmbientLight(0x404040)
	return light
}