import { Engine as E } from '/scripts/engine/engine.js' 

$(document).ready(() => {
	E.createScene({ containerId: 'canvas-container', name: 'main-scene', picking: false, isActive: true });
});
