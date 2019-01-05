import { Engine as E } from '/scripts/engine/engine.js';
import { VertexLexicOrder } from '/scripts/geometry-generating-stuff/vertex-ordering.js';
import { generateTree } from '/scripts/geometry-generating-stuff/making-a-tree.js';
import { nodeSet, branchRule } from '/scripts/geometry-generating-stuff/test-branch-function-1.js';
import spherePosition from '/scripts/geometry-generating-stuff/position-rules/sphere-position.js';

// add a grid to the main scene to give a sense of place
const gridSideLength = 100;
const gridDivisions = 10;

const grid = new THREE.GridHelper(gridSideLength, gridDivisions);

E.addToScene(grid, 'main-scene');

// some preliminary stuff we'll need to draw lines and points in the scene
const lineMat = new THREE.LineBasicMaterial({ color: 0xaadeee }); // line material
const lineGeom = new THREE.BufferGeometry(); // an empty buffer object

// point material
const pointMat = new THREE.PointsMaterial({
	color: 0x77abff,
	sizeAttenuation: false,
	size: 2,
}); 
const pointGeom = new THREE.BufferGeometry(); // an empty buffer object

//const treeData = generateTree(nodeSet, branchRule);

const positionRule = spherePosition(2, 1, 0, Math.PI / 2, Math.PI / 2, 0, Math.PI * 2);

const growRule = [
	4,
		4,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
		4,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
		4,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
		4,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
			4,
				0,
				0,
				0,
				0,
];
const treeData = generateTree(growRule, positionRule);

console.log(treeData.points);

lineGeom.addAttribute('position', new THREE.BufferAttribute(new Float32Array(treeData.edges), 3));
E.addToScene(
	new THREE.LineSegments(
		lineGeom,
		lineMat,
	),
	'main-scene',
);

pointGeom.addAttribute('position', new THREE.BufferAttribute(new Float32Array(treeData.points), 3));
E.addToScene(
	new THREE.Points(
		pointGeom,
		pointMat,
	),
	'main-scene',
);

function getVertexPositions(posAttrArray) {
	const verts = [];
	for(let i = 0; i < posAttrArray.length; i += 3) {
		verts.push(
			{ 
				x: posAttrArray[i],
				y: posAttrArray[i + 1],
				z: posAttrArray[i + 2],
			}
		)
	}

	return verts;
}
