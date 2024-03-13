import {
	BoxGeometry,
	SphereGeometry,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Mesh,
	DoubleSide,
	TextureLoader,
} from 'three'

const loader = new TextureLoader()

// export const addStandardMesh = () => {
// 	const box = new BoxGeometry(1, 1, 1)
// 	const boxMaterial = new MeshStandardMaterial({ color: 0x00ff00 })
// 	const boxMesh = new Mesh(box, boxMaterial)
// 	boxMesh.position.set(2, 0, 0)
// 	return boxMesh
// }

export const createRooms = (roomData) => {
    const roomGeometry = new BoxGeometry(16, 9, 16)
    roomGeometry.scale(0.02, 0.02, -0.02)

    const textures = roomData.maps.map(path => loader.load(path))
    const roomMaterial = [
        new MeshBasicMaterial({ map: textures[0], side: DoubleSide }), // right
        new MeshBasicMaterial({ map: textures[1], side: DoubleSide }), // left
        new MeshBasicMaterial({ transparent: true, opacity: 0, side: DoubleSide }), // top
        new MeshBasicMaterial({ transparent: true, opacity: 0, side: DoubleSide }),  // bottom
        new MeshBasicMaterial({ map: textures[2], side: DoubleSide }), // front
        new MeshBasicMaterial({ map: textures[3], side: DoubleSide })  // back
    ];

    const roomMesh = new Mesh(roomGeometry, roomMaterial)
    roomMesh.name = roomData.name
    roomMesh.position.copy(roomData.position)
    roomMesh.rotation.y = Math.PI / 2
    roomMesh.visible = false

    return roomMesh
};