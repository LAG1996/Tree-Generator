let sceneID = 0;

const sceneMap = new Map();

const activeScenes = new Map();

const renderObjQueue = new Map();

class _SceneHandler{
	constructor() {
		this.camera = null;

		$(window).on('resize', () => {
			for (const sID of sceneMap.keys()) {
				console.log(`resizing scene: ${sID}`);
				const s = sceneMap.get(sID);
				const c = $(`#${s.containerID}`);

				s.camera.aspect = c.width() / c.height();
    		s.camera.updateProjectionMatrix();
			}
		});
	}

	createScene(options) {
		let container = $(`#${options.containerId}`);

		const sName = options.name ? options.name : `scene-${sceneMap.size}`;
		const bgColor = options.backgroundColor ? options.backgroundColor : ConfigSettings.defaultBackgroundColor;
		const isPickingScene = options.picking || false;
		const isActive = options.active || true;

		// create the threejs scene
		const newScene = new THREE.Scene();
		newScene.name = sName;

		if (renderObjQueue.has(sName)) {
			newScene.add(...renderObjQueue.get(sName));
			renderObjQueue.delete(sName);
		}

		// create a perspective camera for this scene
		this.camera = new THREE.PerspectiveCamera(45, container.width() / container.height(), 0.1, 1000);
		this.camera.position.set(
			ConfigSettings.defaultCameraPosition.x,
			ConfigSettings.defaultCameraPosition.y,
			ConfigSettings.defaultCameraPosition.z,
		);

		// save this scene to the map of scenes
		sceneMap.set(sName, {
			scene: newScene,
			name: sName,
			camera: this.camera,
			picking: isPickingScene,
			backgroundColor: bgColor,
			activeID: sceneID,
			active: isActive,
			containerID: container.attr('id'),
		});

		sceneID += 1;

		if (sceneMap.get(sName).active) {
			this.activateScene(sceneMap.get(sName).name);
		}

		container.on('resize', (evt) => {
			console.log('resizing container...')
			const c = $(evt.currentTarget);
			const s = sceneMap.get(sName);

			s.camera.aspect = c.width() / c.height();
    	s.camera.updateProjectionMatrix();
		});
	}

	getScene(sceneName) {
		return sceneMap.get(sceneName);
	}

	getActiveScenes() {
		return activeScenes.values();
	}

	getAllScenes() {
		return sceneMap.values();
	}

	addToScene(obj, sceneName) {
		const s = this.getScene(sceneName);

		if (!s) {

			if (!renderObjQueue.has(sceneName)) {
			 	renderObjQueue.set(sceneName, []);
			}

			renderObjQueue.get(sceneName).push(obj);

			return;
		}

		s.scene.add(obj);
	}

	activateScene(sceneName) {
		const scene = this.getScene(sceneName);

		if (!activeScenes.has(scene.activeID)) {
			activeScenes.set(scene.activeID, scene);
			scene.active = true;
		}
	}

	deactivateScene(sceneName) {
		const scene = this.getScene(sceneName);

		if (activeScenes.has(scene.activeID)) {
			activeScenes.delete(scene.activeID);
			scene.active = false;
		}
	}
}

export const SceneHandler = new _SceneHandler();
