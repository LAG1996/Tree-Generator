import { Engine as E } from '/scripts/engine/engine.js';
import { VertexLexicOrder } from '/scripts/geometry-generating-stuff/vertex-ordering.js';
import { generateTree } from '/scripts/geometry-generating-stuff/making-a-tree.js';
import { nodeSet, branchRule } from '/scripts/geometry-generating-stuff/test-branch-function-1.js'

const gridSideLength = 100;
const gridDivisions = 10;

const grid = new THREE.GridHelper(gridSideLength, gridDivisions);

E.addToScene(grid, 'main-scene');

const origin = { x: gridSideLength, y: 0, z: gridSideLength };

// we're going to use circles to define the points on a shape

const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const geom = new THREE.CircleBufferGeometry( 0.001, 35 );
const circle = new THREE.Mesh( geom, mat );

// define a cube
const cubeDimension = 10;
// generate cube geometry
const cubeGeom = new THREE.BoxBufferGeometry(cubeDimension, cubeDimension, cubeDimension);
const edgeGeom = new THREE.EdgesGeometry(cubeGeom);
const lines = new THREE.LineSegments(edgeGeom, new THREE.LineBasicMaterial({ color: 0xaadeff }))
// draw the cube's edges
E.addToScene(lines, 'main-scene');

let verts = getVertexPositions(cubeGeom.attributes.position.array);
verts = VertexLexicOrder(verts, false);

const halfLength = (verts.length) / 2;
const r = ((halfLength + 1) % 2) / 2;
/*
const orderedVerts = [];
for (let i = 0; i < verts.length; i += 1) {
	const newCircle = circle.clone();
	const pos = { x: i - halfLength + r, y: 0, z: 0 };
	newCircle.position.set(pos.x, pos.y, pos.z);

	orderedVerts.push({ vert: newCircle, currPos: {...pos}, ordPos: {...pos}, cubePos: verts[i] });

	E.addToScene(newCircle, 'main-scene', {
		askFor: [],
		onDraw: () => {
			newCircle.lookAt(E.camera.position);
		}
	});
}*/



const treeData = generateTree(nodeSet, branchRule);
const points = getVertexPositions(treeData.points);
const edges = getVertexPositions(treeData.edges);

console.log(points);
console.log(edges);
for (let i = 0; i < points.length; i += 1) {
	const newCircle = circle.clone();
	newCircle.position.set(points[i].x, points[i].y, points[i].z);
	E.addToScene(newCircle, 'main-scene', {
		askFor: [],
		onDraw: () => {
			newCircle.lookAt(E.camera.position);
		}
	});
}

const lineGeom = new THREE.Geometry();
lineGeom.vertices.push(...edges)
E.addToScene(
	new THREE.LineSegments(
		lineGeom,
		new THREE.LineBasicMaterial({ color: 0xffffff }),
	),
	'main-scene',
)

/*
var material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});

var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( 0, 10, 0 ),
	new THREE.Vector3( 10, 0, 0 )
);

var line = new THREE.Line( geometry, material );

E.addToScene(line, 'main-scene');*/

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