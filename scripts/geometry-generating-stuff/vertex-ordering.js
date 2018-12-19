// Do a binary sort on items
export function VertexLexicOrder (vertices, allowMultiplicity = true, order = ['x', 'y', 'z']) {
	if (vertices.length <= 1) { return; }

	if (!vertices instanceof Array) {
		console.info('LEXICOGRAPHIC ORDER: Items need to be in an array.');
		return;
	} 

	if (order.length !== 3
			&& (!order.includes('x')
			|| !order.includes('y')
			|| !order.includes('z'))
	) {
		order = ['x', 'y', 'z'];
	}

	let head = undefined;
	let trav = undefined;
	for (const v of vertices) {
		const newNode = { value: v, multiplicity: 1, left: undefined, right: undefined, visited: false };

		if (!head) {
			head = newNode;
			trav = head;
		} else {
			let foundLeaf = false;
			trav = head;
			while (!foundLeaf) {
				foundLeaf = true;
				const rel = findRelation(trav.value, newNode.value, order);

				if (rel === 'greater') {

					if (!trav.left) {
						trav.left = newNode;
					} else {
						trav = trav.left;
						foundLeaf = false;
					}

				} else if(rel === 'less') {

					if (!trav.right) {
						trav.right = newNode;
					} else {
						trav = trav.right;
						foundLeaf = false;
					}

				} else if (allowMultiplicity) {
					trav.multiplicity += 1;
				}
			}
		}
	}

	// do an inorder search
	const stack = [head];
	const list = [];
	while (stack.length > 0) {
		const n = stack[stack.length - 1];

		if (!n.left || n.left.visited) {
			n.visited = true;

			for (let i = 0; i < n.multiplicity; i += 1){
				list.push({...n.value});
			}
			
			stack.pop();

			if (n.right && !n.right.visited) {
				stack.push(n.right);
			}

		} else {
			stack.push(n.left);
		}

	}

	return list; 
}

function findRelation(n1, n2, order) {
	let equalityCount = 0;
	for (const d of order) {

		if (n1[d] < n2[d]) {
			return 'less';
		} else if (n1[d] > n2[d]) {
			return 'greater';
		} else {
			equalityCount += 1;

			if (equalityCount === 3) {
				return 'equal';
			}
		}

	}
}
