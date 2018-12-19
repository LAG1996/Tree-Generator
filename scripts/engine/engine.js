import { FileReader as H_FILE } from './parts/fileRead.js';
import { SceneHandler as H_SCENE } from './parts/engine-render/sceneHandler.js';
import { RenderHandler as H_RENDER } from './parts/engine-render/renderHandler.js';

let objCount = 0;

const sceneToRendererMap = new Map();
const objToDrawAction = new Map();


class _Engine {
	constructor() {}

	createScene(options) {
		const scene = H_SCENE.createScene(options);
		sceneToRendererMap.set(scene.name, scene);
	}

	addToScene(obj, sceneName, drawActions) {
		H_SCENE.addToScene(obj, sceneName);

		if (drawActions) {
			objToDrawAction.set(obj, {
				askFor: [...drawActions.askFor],
				onDraw: drawActions.onDraw,
			});
		}
	}

	draw() {
		// do some preprocess stuff with callback functions
		doDrawActions();

		const scenes = H_SCENE.getActiveScenes();

		for (const s of scenes) {
			H_RENDER.draw(s, s.containerID);
		}
	}

	get camera() {
		return H_SCENE.camera;
	}
};

export const Engine = new _Engine();

function d(){
	try{
		Engine.draw();
	} catch(e) {
		console.info(e);
	} finally {
		requestAnimationFrame(d);
	}
}

d();

function doDrawActions() {
	objToDrawAction.forEach((action) => {
		action.onDraw();
	});
}
