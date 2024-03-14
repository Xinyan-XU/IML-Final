import './style.css'
import * as THREE from 'three'
import { createRooms } from './addMeshes'
import { addLight, lightMain, lightSub, envLight } from './addLights'
import { post } from './post'
import Model from './Model'
import {
	CameraRig,
	StoryPointsControls,
	ThreeDOFControls
} from 'three-story-controls'

const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)

const lights = {}
const models = {}
const importMesh = {}
const scene = new THREE.Scene()
const composer = post(scene, camera, renderer)

let roomMeshes
let cameraCounter = 0
let currentSection = 0

//rendering gallery area
const glitchArea = {
	minZ: 4.4,
	maxZ: 4.6,
	//room1
	minX: -9.1,
	maxX: -8.9,
	//room2
	minX2: -0.1,
	maxX2: 0.1,
	//room3
	minX3: 12.9,
	maxX3: 13.1,
	minZ3: -2.6,
	maxZ3: -2.4,
	//room4
	minX4: 18.4,
	maxX4: 18.6
}

const rooms = [
	{
		name: 'room1',
		maps: ['./1.2.png', './1.4.png', './1.1.png', './1.3.png'],
		position: new THREE.Vector3(-9, 2, 4.5)
	},
	{
		name: 'room2',
		maps: ['./2.2.png', './2.4.png', './2.3.png', './2.1.png'],
		position: new THREE.Vector3(0, 2, 4.5)
	},
	{
		name: 'room3',
		maps: ['./3.1.png', './3.1.png', './3.1.png', './3.1.png'],
		position: new THREE.Vector3(13, 2, -2.5)
	},
	{
		name: 'room4',
		maps: ['./3.2.png', './3.2.png', './3.2.png', './3.2.png'],
		position: new THREE.Vector3(18.5, 2, -2.5)
	},
]

//imported models
function model() {
	const modelMain = new Model({
		url: '/model1.gltf',
		scene: scene,
		meshes: importMesh,
		name: 'modelMain',
		position: new THREE.Vector3(0, 0, 0),
		visible: true,
	})
	modelMain.init()

	models.set1 = new Model({
		url: '/option1.gltf',
		scene: scene,
		meshes: importMesh,
		name: 'opt1',
		position: new THREE.Vector3(-0.9, 0.5, 4.6),
		visible: true,
	})
	models.set1.init()

	models.set2 = new Model({
		url: '/option2.gltf',
		scene: scene,
		meshes: importMesh,
		name: 'opt2',
		position: new THREE.Vector3(1.5, 0.5, 4.7),
		visible: false,
	})
	models.set2.init()
}

//camera positions using three-story-controls
const cameraPoints = [
	{
		name: 'view0',
		text: 'hihi',
		cameraPosition: new THREE.Vector3(0, 0, 0),
		lookAtPosition: new THREE.Vector3(0, 0, 0),
	},
	{
		name: 'view1',
		text: 'You are about to walk around in a multipurpose public interior space, but let us first take a look at some space renderings.',
		cameraPosition: new THREE.Vector3(-9, 2, 9.8),
		lookAtPosition: new THREE.Vector3(-9, 2, 4.5),
	},
	{
		name: 'view1-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(-9, 2, 4.5),
		lookAtPosition: new THREE.Vector3(-9, 2, -3.5),
	},
	{
		name: 'view3-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(-9, 2, 4.5),
		lookAtPosition: new THREE.Vector3(-8, 2, 4.5),
	},
	{
		name: 'view4-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(-9, 2, 4.5),
		lookAtPosition: new THREE.Vector3(-9, 2, 5),
	},
	{
		name: 'view2-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(-9, 2, 4.5),
		lookAtPosition: new THREE.Vector3(-10, 2, 4.5),
	},
	{
		name: 'view4',
		text: "This is the 'living room' area that hosts a large LED on the left for mini-movie displays, surrounded by various seating arrangements for small conversations, and features multiple touchable devices for product display and interaction on the right.",
		cameraPosition: new THREE.Vector3(-9, 2, -3.5),
		lookAtPosition: new THREE.Vector3(-9, 2, 4.5),
	},
	{
		name: 'view5',
		text: 'CLICK on the screen to see a different furniture set that transforms cafe area into a banquet space.',
		cameraPosition: new THREE.Vector3(0, 2, -3.5),
		lookAtPosition: new THREE.Vector3(0, 2, 4.5),
	},
	{
		name: 'view6',
		text: 'CLICK again to see the furniture setting change.',
		cameraPosition: new THREE.Vector3(3, 2, 9),
		lookAtPosition: new THREE.Vector3(0, 2, 4.5),
	},
	{
		name: 'view6-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(0, 2, 4.5),
		lookAtPosition: new THREE.Vector3(0, 2, 4.5),
	},
	{
		name: 'view5-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(0, 2, 4.5),
		lookAtPosition: new THREE.Vector3(9, 2, 4.5),
	},
	{
		name: 'view7-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(0, 2, 4.5),
		lookAtPosition: new THREE.Vector3(0, 2, 9),
	},
	{
		name: 'view8-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(0, 2, 4.5),
		lookAtPosition: new THREE.Vector3(-9, 2, 4.5),
	},
	{
		name: 'view9',
		text: 'These two square spaces can host many activities, including but not limited to showcases, conferences, presentations, banquets, small meetings, and many more.',
		cameraPosition: new THREE.Vector3(0, 2, -2.5),
		lookAtPosition: new THREE.Vector3(-1, 2, -2.5),
	},
	{
		name: 'view10',
		text: 'There are small LED screens on the left can reflect the walking direction of passersby.',
		cameraPosition: new THREE.Vector3(11.5, 2, -2.5),
		lookAtPosition: new THREE.Vector3(9, 2, -2.5),
	},
	{
		name: 'view10-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(13, 2, -2.5),
		lookAtPosition: new THREE.Vector3(9, 2, -2.5),
	},
	{
		name: 'view11',
		text: 'Let us check out some back-of-house areas.',
		cameraPosition: new THREE.Vector3(18, 2, -2.5),
		lookAtPosition: new THREE.Vector3(9, 2, -2.5),
	},
	{
		name: 'view11-img',
		text: ' ',
		cameraPosition: new THREE.Vector3(18.5, 2, -2.5),
		lookAtPosition: new THREE.Vector3(9, 2, -2.5),
	},
	{
		name: 'view12',
		text: "It's some more small talking and lounging areas that allow for casual conversations to happen.",
		cameraPosition: new THREE.Vector3(19.1, 2, -2.5),
		lookAtPosition: new THREE.Vector3(9, 2, -2.5),
	},
	{
		name: 'view13',
		text: 'You have reached the end! But it is also fun to travel backward.',
		cameraPosition: new THREE.Vector3(-6, 2, -2.5),
		lookAtPosition: new THREE.Vector3(-7, 2, -2.5),
	},
]

const cameraPositions = cameraPoints.map((item) => {
	const position = item.cameraPosition
	const mat = new THREE.Matrix4().lookAt(position, item.lookAtPosition, new THREE.Vector3(0, 1, 0))
	const quaternion = new THREE.Quaternion().setFromRotationMatrix(mat)

	return {
		position,
		quaternion,
		duration: 2,
		useSlerp: true,
	}
})

const rig = new CameraRig(camera, scene)
const PointsControls = new StoryPointsControls(rig, cameraPositions, {
	dampingFactor: 0.4
})
PointsControls.enable()
PointsControls.goToPOI(0)

const controls3dof = new ThreeDOFControls(rig, {
	panFactor: Math.PI / 5,
	tiltFactor: 0,
	truckFactor: 0,
	pedestalFactor: 0,
})
controls3dof.enable()

//clickBtn
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const textElement = document.getElementById('words_explainations')
nextBtn.addEventListener('click', () => {
	nextBtn.disabled = true
	setTimeout(() => {
		nextBtn.disabled = false
	}, 1800)

	cameraCounter++
	if (cameraCounter >= cameraPoints.length) {
		PointsControls.goToPOI(cameraPoints.length - 1)
		cameraCounter = cameraPoints.length - 1
	} else {
		PointsControls.nextPOI()
		textElement.innerHTML = cameraPoints[cameraCounter].text
	}
})
prevBtn.addEventListener('click', () => {
	prevBtn.disabled = true
	setTimeout(() => {
		prevBtn.disabled = false
	}, 1800)

	cameraCounter--
	if (cameraCounter <= 0) {
		PointsControls.goToPOI(1)
		cameraCounter = 1
	} else {
		PointsControls.prevPOI()
		textElement.innerHTML = cameraPoints[cameraCounter].text
	}
})

//audio
const listener = new THREE.AudioListener()
const sound1 = new THREE.PositionalAudio(listener)
const audioLoader = new THREE.AudioLoader()
camera.add(listener)
function initAudio() {
	audioLoader.load('/ambience.mp3', function (buffer) {
		sound1.setBuffer(buffer)
	})
}

//scrolling (slightly working)
const container = document.getElementById('page')
function initScrolling() {
	container.addEventListener('scroll', () => {
		const scrollY = container.scrollTop;
		const windowHeight = window.innerHeight;
		const section = Math.round(scrollY / windowHeight);

		if (section !== currentSection) {
			currentSection = section;
			const targetScroll = (section * windowHeight) + (windowHeight / 2) - (container.clientHeight / 2);
			container.scrollTo({
				top: targetScroll,
				behavior: 'smooth'
			});
		}
	});
}

init()
function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	const mainModel = document.getElementById('model')
	mainModel.appendChild(renderer.domElement)

	lights.default = addLight()
	lights.lightSub = lightSub()
	lights.lightMain = lightMain()
	lights.envLight = envLight()

	scene.add(lights.default)
	roomMeshes = rooms.map(room => createRooms(room))
	roomMeshes.forEach(mesh => scene.add(mesh))

	camera.position.set(-9, 2, 9.5)

	window.addEventListener('click', () => {
		sound1.play()
	})

	model()
	initScrolling()
	initAudio()
	resize()
	animate()
}

//check position to manipulate posteffects
function checkPosition() {
	if ((cameraPoints[cameraCounter].cameraPosition.x >= glitchArea.minX &&
		cameraPoints[cameraCounter].cameraPosition.x <= glitchArea.maxX &&
		cameraPoints[cameraCounter].cameraPosition.z >= glitchArea.minZ &&
		cameraPoints[cameraCounter].cameraPosition.z <= glitchArea.maxZ) ||
		(cameraPoints[cameraCounter].cameraPosition.x >= glitchArea.minX2 &&
			cameraPoints[cameraCounter].cameraPosition.x <= glitchArea.maxX2 &&
			cameraPoints[cameraCounter].cameraPosition.z >= glitchArea.minZ &&
			cameraPoints[cameraCounter].cameraPosition.z <= glitchArea.maxZ) ||
		(cameraPoints[cameraCounter].cameraPosition.x >= glitchArea.minX3 &&
			cameraPoints[cameraCounter].cameraPosition.x <= glitchArea.maxX3 &&
			cameraPoints[cameraCounter].cameraPosition.z >= glitchArea.minZ3 &&
			cameraPoints[cameraCounter].cameraPosition.z <= glitchArea.maxZ3) ||
		(cameraPoints[cameraCounter].cameraPosition.x >= glitchArea.minX4 &&
			cameraPoints[cameraCounter].cameraPosition.x <= glitchArea.maxX4 &&
			cameraPoints[cameraCounter].cameraPosition.z >= glitchArea.minZ3 &&
			cameraPoints[cameraCounter].cameraPosition.z <= glitchArea.maxZ3)
	) {
		setTimeout(() => {
			roomMeshes.forEach(mesh => mesh.visible = true)
		}, 1200)
		setTimeout(() => {
			composer.gtao.enabled = false;
			composer.grayscale.enabled = false;
			composer.sobel.enabled = false;
		}, 1500)
	} else {
		roomMeshes.forEach(mesh => mesh.visible = false)
		composer.grayscale.enabled = true
		composer.sobel.enabled = true
		composer.gtao.enabled = true
	}
}

//click to manipulate sub-model change
function changeModel() {
	if (cameraCounter == 7 || cameraCounter == 8) {
		document.addEventListener('click', () => {
			importMesh.opt1.visible = !importMesh.opt1.visible
			importMesh.opt2.visible = !importMesh.opt2.visible
		})
	}
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		composer.composer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate(t) {
	requestAnimationFrame(animate)
	checkPosition()
	changeModel()

	// console.log(`Camera Position - x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`)
	// console.log(rig)
	// console.log(cameraCounter)
	// console.log(importMesh.opt2.visible)
	// console.log(importMesh.opt1.visible)

	PointsControls.update(t)
	controls3dof.update(t)
	composer.composer.render()
	// renderer.render(scene, camera)
}
