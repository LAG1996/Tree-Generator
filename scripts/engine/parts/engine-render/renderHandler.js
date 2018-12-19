const containerMap = new Map();
const camControlMap = new Map();

class _RenderHandler {
	constructor() {
		$(window).on('resize', () => {
			for (const cID of containerMap.keys()) {
				console.log(`resizing ${cID}`)
				const c = $(`#${cID}`);
				const r = containerMap.get(cID);
				r.setSize(c.width(), c.height());
			}
		});	
	}

	draw(s, cID) {
		if (!containerMap.has(cID)) {
			containerMap.set(cID, createNewRenderer(cID));
			const camControl = new THREE.OrbitControls(s.camera, containerMap.get(cID).domElement);
			camControl.screenSpacePanning = true;
			camControlMap.set(cID, camControl);
		}

		const r = containerMap.get(cID);

		if (s.picking) {

		} else {
			r.render(s.scene, s.camera);
		}
	}
}

const createNewRenderer = function(cID) {
	const r = new THREE.WebGLRenderer();
	const c = $(`#${cID}`);
	r.setSize(c.width(), c.height());
	c.append(r.domElement);

	return r;
}

export const RenderHandler = new _RenderHandler();
