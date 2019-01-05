// this position rule picks points that are in or on the boundary of an l^p unit sphere

export default function spherePosition(
	p,
	radius,
	startTheta,
	startPhi,
	thetaStep,
	phiStep,
	maxThetaRot,
) {
	let rotCount = 0;
	let maxRotCount = Math.ceil(maxThetaRot / thetaStep);


	/* parameter list:
	*		-  pNode: the parent node for the new node
	*		-  oNode: the origin node for the tree
	*		-  lindex: the new node's local index
	*   -  gindex: the new node's global index
	*/
	return (function (pNode, oNode, lindex, gindex) {
		console.log(`Rotation count: ${rotCount}`);
		console.log(`Maximum rotation count: ${maxRotCount}`);
		const threeVec = new THREE.Vector3().setFromSphericalCoords(
			1,
			//startPhi + rotCount * phiStep,
			startPhi,
			startTheta + thetaStep * rotCount,
		);

		const vec = normalizeVector([threeVec.x, threeVec.y, threeVec.z], p);
		
		if (rotCount === maxRotCount) {
			rotCount = 0;
		} else {
			rotCount += 1;
		}

		return [
			pNode.position[0] + vec[0],
			pNode.position[1] + vec[1],
			pNode.position[2] + vec[2]
		];
	});
}

// expecting the vector in array format
function normalizeVector(vector, p) {
	let mag = Math.pow(powerSum(vector, p), p);
	return [vector[0] / mag, vector[1] / mag, vector[2] / mag];
}

function powerSum(vector, p) {
	let sum = 0;
	for (const e of vector) {
		sum += Math.pow(e, p);
	}

	return Math.pow(sum, p);
}