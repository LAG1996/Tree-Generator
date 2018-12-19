/*
--------------------------------------
Inputs:
	1. A list of integers where each integers denotes the amount of children in a node.
		- The ordering of these integers should give the node sequence in post-order
	2. A function that returns the position for the next node
		- The function can optionally accept as parameters:
			* parent: <Node>
			* root: <Node>
--------------------------------------
Description:
	given some rules, generate a tree
	the node rule needs to provide
	1. whether a node is drawn or not
	2. the location of the next node
--------------------------------------
	Outputs:
	1. A list of floating point values. Every consecutive 3-tuple is a 3-dimensional coordinate.
	2. A list of floating point values. Every consecutive 6-tuple gives the endpoints of an edge.
--------------------------------------
*/

export function generateTree(nodeSequence, nodeRule) {
	const origin = {
		parent: undefined,
		position: [0, 0, 0],
		children: [],
		depth: 0,
	};

	const points = [...origin.position];
	const edges = [];

	const parentQ = [origin];

	for (const k of nodeSequence) {
		const p = parentQ.pop();

		const newNodes = [];
		for (let i = 0; i < k; i += 1) {
			const newNode = { parent: p, position: nodeRule(p, origin), children: [], depth: p.depth + 1};
			p.children.push(newNode);
			newNodes.push(newNode);

			points.push(...newNode.position);
			edges.push(...p.position, ...newNode.position);
		}

		parentQ.push(...newNodes.reverse());
	}

	return { points, edges };
}
