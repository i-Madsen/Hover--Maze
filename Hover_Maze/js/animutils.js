var keys0, keys1, keys2, keys3, keys4;

function evaluateKeyframes( iFrame, t ) {

	var interpedKeyVector = new THREE.Vector3();
	var interp;
	var beforeKeyIndex;
	var afterKeyIndex;
	var beforeVec;
	var afterVec;
	var keyIndex = 0;
	var keyframes;

	switch ( iFrame ) {

		case 0:
			keyframes = keys0;
			break;
		case 1:
			keyframes = keys1;
			break;
		case 2:
			keyframes = keys2;
			break;
		case 3:
			keyframes = keys3;
			break;
		case 4:
			keyframes = keys4;
			break;
		default:
			keyframes = keys0;
			break;

	}


	beforeKeyIndex = keyIndex;
	afterKeyIndex = keyIndex + 1;

	// Checks for edge cases for t being out of range or right at the first or last keyframe
	if ( t <= keyframes[ 0 ].t ) {

		// key 0
		return makeVectorFromKey( keyframes[ 0 ] );

	} else if ( t >= keyframes[ keyframes.length - 1 ].t ) {

		// last key
		return makeVectorFromKey( keyframes[ keyframes.length - 1 ] );

	}

	// This is basically just a search function, it finds the indexes for the keyframe immediately before t (keyframe.t < t) and for the keyframe immediately after t (keyframe.t > t)
	do {

		// Checks if there is actually a keyframe directly at time t
		if ( t == keyframes[ beforeKeyIndex ].t ) {

			return makeVectorFromKey( keyframes[ beforeKeyIndex ] );

		}
		beforeKeyIndex = keyIndex;
		afterKeyIndex = keyIndex + 1;

		if ( keyframes[ beforeKeyIndex ].t < t && keyframes[ afterKeyIndex ].t > t ) {

			keyIndex = keyframes.length;

		}

		keyIndex ++;

	} while ( keyframes[ beforeKeyIndex ].t < t && keyIndex < keyframes.length - 1 );

	// Uses the found indexes to make vectors from the positional values stored in the keyframes
	beforeVec = makeVectorFromKey( keyframes[ beforeKeyIndex ] );
	afterVec = makeVectorFromKey( keyframes[ afterKeyIndex ] );

	// Interp math to scale the keyframe times up so it's in the range 0 to 1
	interp = 1 / ( keyframes[ afterKeyIndex ].t - keyframes[ beforeKeyIndex ].t ) * ( t - keyframes[ beforeKeyIndex ].t );

	// Lerp between the vectors to get a final position using the interp for t
	interpedKeyVector.lerpVectors( beforeVec, afterVec, interp );

	return interpedKeyVector;

}

function makeKeyframes() {

	keys0 = [
		{ "t": 0, "posx": corridorSize * 13, "posy": 50, "posz": - corridorSize * 6.5 },
		{ "t": 0.5, "posx": corridorSize, "posy": 50, "posz": - corridorSize * 6.5 },
		{ "t": 1, "posx": corridorSize * 13, "posy": 50, "posz": - corridorSize * 6.5 }
	];

	keys1 = [
		{ "t": 0, "posx": corridorSize, "posy": 50, "posz": - corridorSize * 2.5 },
		{ "t": 0.5, "posx": corridorSize * 13, "posy": 50, "posz": - corridorSize * 2.5 },
		{ "t": 1, "posx": corridorSize, "posy": 50, "posz": - corridorSize * 2.5 }
	];

	keys2 = [
		{ "t": 0, "posx": corridorSize * 6, "posy": 50, "posz": corridorSize * 1.5 },
		{ "t": 0.25, "posx": corridorSize * 13, "posy": 50, "posz": corridorSize * 1.5 },
		{ "t": 0.75, "posx": corridorSize, "posy": 50, "posz": corridorSize * 1.5 },
		{ "t": 1, "posx": corridorSize * 6, "posy": 50, "posz": corridorSize * 1.5 }
	];

	keys3 = [
		{ "t": 0, "posx": corridorSize * 3, "posy": 50, "posz": corridorSize * 4.5 },
		{ "t": 0.4, "posx": corridorSize * 13, "posy": 50, "posz": corridorSize * 4.5 },
		{ "t": 0.8, "posx": corridorSize * 0, "posy": 50, "posz": corridorSize * 4.5 },
		{ "t": 1, "posx": corridorSize * 3, "posy": 50, "posz": corridorSize * 4.5 }
	];

	keys4 = [
		{ "t": 0, "posx": corridorSize * 13, "posy": 50, "posz": corridorSize * 7.5 },
		{ "t": 0.5, "posx": corridorSize, "posy": 50, "posz": corridorSize * 7.5 },
		{ "t": 1, "posx": corridorSize * 13, "posy": 50, "posz": corridorSize * 7.5 }
	];

}

function makeVectorFromKey( key ) {

	return new THREE.Vector3( key.posx, key.posy, key.posz );

}
