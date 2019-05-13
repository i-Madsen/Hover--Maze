var walls = [];
var wallColliders = [];

/* Creates walls based on parameters
	worldPivot (Vector3) - Centered pivot that would be spaceApart/2 away from every wall if all are created
	spaceApart (float) - The distance between walls on the same axis (distance from up to down and from left to right)
	left, down, up, right (boolean) - Booleans for which walls to create
		- left is -Z
		- up is +X
		- right is +Z
		- down is -X
	material (material) - The material to apply to the wall meshes
*/
function makeWalls( worldPivot, spaceApart, left, up, right, down, material ) {

	var object;
	var box;

	// right
	if ( right ) {

		object = new THREE.Mesh( new THREE.BoxBufferGeometry( spaceApart, WallLength, WallThickness, 4, 4, 4 ), material );
		object.position.set( worldPivot.x, 50, worldPivot.z + spaceApart / 2 );
		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}

	// up
	if ( up ) {

		object = new THREE.Mesh( new THREE.BoxBufferGeometry( spaceApart, WallLength, WallThickness, 4, 4, 4 ), material );
		object.position.set( worldPivot.x + spaceApart / 2, 50, worldPivot.z );
		object.rotateY( THREE.Math.degToRad( 90 ) );

		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}

	// left
	if ( left ) {

		object = new THREE.Mesh( new THREE.BoxBufferGeometry( spaceApart, WallLength, WallThickness, 4, 4, 4 ), material );
		object.position.set( worldPivot.x, 50, worldPivot.z - spaceApart / 2 );
		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}

	// down
	if ( down ) {

		object = new THREE.Mesh( new THREE.BoxBufferGeometry( spaceApart, WallLength, WallThickness, 4, 4, 4 ), material );
		object.position.set( worldPivot.x - spaceApart / 2, 50, worldPivot.z );
		object.rotateY( THREE.Math.degToRad( 90 ) );
		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}

}


/* Calls makeWalls() in order to make straight section by creating two walls
	isHorizontal (boolean) - If true, makes top and bottom walls, if false, makes left and right walls
*/
function makeStraightSection( worldPivot, isHorizontal, spaceApart, material ) {

	if ( isHorizontal ) {

		makeWalls( worldPivot, spaceApart, false, true, false, true, material );

	} else {

		makeWalls( worldPivot, spaceApart, true, false, true, false, material );

	}

}

/*

	topLeft -> \	/ <- topRight
 bottomLeft -> /    \ <- bottomRight

 Creates wall corners based on parameters
	worldPivot (Vector3) - Centered pivot that would be spaceApart/2 away from every wall if all are created
	spaceApart (float) - The distance between walls on the same axis (distance from up to down and from left to right)
	bottomLeft, topLeft, topRight, bottomRight (boolean) - Booleans for which wall corners to create
		- bottomLeft is -X and -Z
		- topLeft is +X and -Z
		- topRight is +X and +Z
		- down is -X and +Z
	material (material) - The material to apply to the wall meshes

*/
function makeCorners( worldPivot, spaceApart, bottomLeft, topLeft, topRight, bottomRight, material ) {

	var object;
	var box;

	if ( bottomLeft ) {

		object = new THREE.Mesh( new THREE.CylinderGeometry( WallThickness / 2 - 2.25, WallThickness / 2 - 2.25, WallLength, 3 ), material );
		object.position.set( worldPivot.x - spaceApart / 2 + WallThickness / 8 + 0.275, 50, worldPivot.z - spaceApart / 2 - 2.75 );
		object.rotateY( THREE.Math.degToRad( 45 + 150 ) );
		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}


	if ( topLeft ) {

		object = new THREE.Mesh( new THREE.CylinderGeometry( WallThickness / 2 - 2.25, WallThickness / 2 - 2.25, WallLength, 3 ), material );
		object.position.set( worldPivot.x + spaceApart / 2 - WallThickness / 8 + 0.275, 50, worldPivot.z - spaceApart / 2 - 2.75 );
		object.rotateY( THREE.Math.degToRad( 45 ) );
		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}

	if ( topRight ) {

		object = new THREE.Mesh( new THREE.CylinderGeometry( WallThickness / 2 - 2.25, WallThickness / 2 - 2.25, WallLength, 3 ), material );
		object.position.set( worldPivot.x + spaceApart / 2 - WallThickness / 8 + 0.275, 50, worldPivot.z + spaceApart / 2 + 2.75 );
		object.rotateY( THREE.Math.degToRad( - 100 ) );
		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}

	if ( bottomRight ) {

		object = new THREE.Mesh( new THREE.CylinderGeometry( WallThickness / 2 - 2.25, WallThickness / 2 - 2.25, WallLength, 3 ), material );
		object.position.set( worldPivot.x - spaceApart / 2 + WallThickness / 8 + 0.275, 50, worldPivot.z + spaceApart / 2 + 2.75 );
		object.rotateY( THREE.Math.degToRad( - 135 ) );
		scene.add( object );
		walls.push( object );

		box = new THREE.Box3();
		box.setFromObject( object );
		wallColliders.push( box );

	}

}

/* Creates wall decals based on parameters
	worldPivot (Vector3) - Centered pivot that would be spaceApart/2 away from every wall if all are created
	spaceApart (float) - The distance between walls on the same axis (distance from up to down and from left to right)
	left, down, up, right (boolean) - Booleans for which walls to create
		- left is -Z
		- up is +X
		- right is +Z
		- down is -X
	decalNum (int) - Number selection for which texture to use for the decal
*/
function makeWallDecals( worldPivot, spaceApart, left, up, right, down, decalNum ) {

	var texture;
	var object;

	if ( decalNum == 1 ) {

		texture = new THREE.TextureLoader().load( 'data/prussian_shield.png' );

	} else if ( decalNum == 2 ) {

		texture = new THREE.TextureLoader().load( 'data/red_banner.jpg' );

	} else {

		texture = new THREE.TextureLoader().load( 'data/crossed_swords_shield.png' );

	}


	var material = new THREE.MeshBasicMaterial(
		{
			color: 0xffffff,
			map: texture,
			transparent: true,
		} );


	if ( left ) {

		object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 40, 40, 4, 4 ), material );
		object.position.set( worldPivot.x, 50, worldPivot.z - spaceApart / 2 + ( WallThickness / 2 + 0.25 ) );
		scene.add( object );

		var light = new THREE.PointLight( 0x707070, 0.5, spaceApart / 2 );
		light.position.set( worldPivot.x, 50, worldPivot.z - spaceApart / 4 );
		scene.add( light );

	}

	if ( up ) {

		object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 40, 40, 4, 4 ), material );
		object.position.set( worldPivot.x + spaceApart / 2 - ( WallThickness / 2 + 0.25 ), 50, worldPivot.z );
		object.rotateY( THREE.Math.degToRad( - 90 ) );
		scene.add( object );

		var light = new THREE.PointLight( 0x707070, 0.5, spaceApart / 2 );
		light.position.set( worldPivot.x + spaceApart / 4, 50, worldPivot.z );
		scene.add( light );

	}

	if ( right ) {

		object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 40, 40, 4, 4 ), material );
		object.position.set( worldPivot.x, 50, worldPivot.z + spaceApart / 2 - ( WallThickness / 2 + 0.25 ) );
		object.rotateY( THREE.Math.degToRad( - 180 ) );
		scene.add( object );

		var light = new THREE.PointLight( 0x707070, 0.5, spaceApart / 2 );
		light.position.set( worldPivot.x, 50, worldPivot.z + spaceApart / 4 );
		scene.add( light );

	}

	if ( down ) {

		object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 40, 40, 4, 4 ), material );
		object.position.set( worldPivot.x - spaceApart / 2 + ( WallThickness / 2 + 0.25 ), 50, worldPivot.z );
		object.rotateY( THREE.Math.degToRad( - 270 ) );
		scene.add( object );

		var light = new THREE.PointLight( 0x707070, 0.5, spaceApart / 2 );
		light.position.set( worldPivot.x - spaceApart / 4, 50, worldPivot.z );
		scene.add( light );

	}


}

// Create the entire maze (z is horizontal, x is vertical)
function makeMaze() {

	var textureWall = new THREE.TextureLoader().load( "data/stone.png" );
	textureWall.wrapS = THREE.MirroredRepeatWrapping;
	textureWall.wrapT = THREE.RepeatWrapping;
	textureWall.repeat.set( 5, 1 );
	textureWall.anisotropy = 8;
	textureWall.minFilter = THREE.NearestMipMapNearestFilter;


	var materialWall = new THREE.MeshLambertMaterial(
		{
			map: textureWall
		} );


	// Moving walls
	for ( var i = 0; i < 5; i ++ ) {

		var object = new THREE.Mesh( new THREE.BoxBufferGeometry( corridorSize, WallLength, WallThickness, 4, 4, 4 ), materialWall );
		scene.add( object );
		walls.push( object );
		movingWalls.push( object );

		var movingBoxCollider = new THREE.Box3();
		movingBoxCollider.setFromObject( object );
		wallColliders.push( movingBoxCollider );
		movingBoxColliders.push( movingBoxCollider );

	}


	// Start
	makeWalls( new THREE.Vector3( - corridorSize, 0, 0 ), corridorSize, true, false, false, true, materialWall );
	makeWalls( new THREE.Vector3( - corridorSize, 0, corridorSize ), corridorSize, false, false, true, true, materialWall );
	makeCorners( new THREE.Vector3( - corridorSize, 0, corridorSize ), corridorSize, false, true, false, false, materialWall );
	makeCorners( new THREE.Vector3( 0, 0, corridorSize ), corridorSize, true, false, false, false, materialWall );
	makeCorners( new THREE.Vector3( 0, 0, - corridorSize ), corridorSize, false, false, false, true, materialWall );

	// Entrance
	makeWalls( new THREE.Vector3( 0, 0, 0 ), corridorSize, false, true, false, false, materialWall );

	// Entrance -> right
	for ( var i = 0; i < 9; i ++ ) {

		makeStraightSection( new THREE.Vector3( 0, 0, ( corridorSize * ( 1 + i ) ) ), true, corridorSize, materialWall );
		if ( i == 8 ) {

			makeWalls( new THREE.Vector3( 0, 0, ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 6 ) {

			makeWallDecals( new THREE.Vector3( 0, 0, ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, 3 );

		}

	}

	// Entrance -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 7 ) {

			makeWalls( new THREE.Vector3( 0, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, true, materialWall );

		} else {

			makeStraightSection( new THREE.Vector3( 0, 0, - ( corridorSize * ( 1 + i ) ) ), true, corridorSize, materialWall );

		}

		if ( i == 6 ) {

			makeCorners( new THREE.Vector3( 0, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

	}

	// Row 1 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 ) {

			makeWalls( new THREE.Vector3( corridorSize, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 9 ) {

			makeWalls( new THREE.Vector3( corridorSize, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 1 ) {

			makeCorners( new THREE.Vector3( corridorSize * 1, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 8 ) {

			makeCorners( new THREE.Vector3( corridorSize * 1, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 5 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 1, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, 1 );

		}

	}

	// Row 1 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 ) {
			// Do nothing
		} else if ( i == 6 ) {

			makeWalls( new THREE.Vector3( corridorSize, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 7 ) {

			makeStraightSection( new THREE.Vector3( corridorSize, 0, - ( corridorSize * ( 1 + i ) ) ), false, corridorSize, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 1 ) {

			makeCorners( new THREE.Vector3( corridorSize * 1, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 1, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 3 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 1, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, 1 );

		}

	}

	// Row 2 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 ) {

			makeStraightSection( new THREE.Vector3( corridorSize * 2, 0, ( corridorSize * ( i ) ) ), false, corridorSize, materialWall );

		} else if ( i == 1 || i == 4 ) {
			// Do nothing
		} else if ( i == 5 || i == 8 || i == 9 ) {

			makeWalls( new THREE.Vector3( corridorSize * 2, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 2, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 2 || i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 2, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 3 || i == 4 || i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 2, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 1 || i == 6 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 2, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, 2 );

		} else if ( i == 5 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 2, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, 2 );

		}

	}

	// Row 2 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 || i == 3 || i == 5 || i == 6 || i == 7 ) {

			makeWalls( new THREE.Vector3( corridorSize * 2, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 4 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 2, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 0 || i == 2 || i == 4 ) {

			makeCorners( new THREE.Vector3( corridorSize * 2, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 2, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 4 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 2, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, 0 );

		}

	}

	// Row 3 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 1 ) {

			makeWalls( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else if ( i == 2 ) {

			makeWalls( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 5 || i == 8 || i == 9 ) {

			makeWalls( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 0 || i == 6 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 2 ) {

			makeCorners( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, true, false, materialWall );

		} else if ( i == 4 ) {

			makeCorners( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, true, materialWall );

		} else if ( i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 8 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 3, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, 2 );

		}

	}

	// Row 3 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 ) {

			makeWalls( new THREE.Vector3( corridorSize * 3, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, true, false, materialWall );

		} else if ( i == 1 ) {

			makeWalls( new THREE.Vector3( corridorSize * 3, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 3, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 1 ) {

			makeCorners( new THREE.Vector3( corridorSize * 3, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, true, materialWall );

		} else if ( i == 3 || i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 3, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 4 ) {

			makeCorners( new THREE.Vector3( corridorSize * 3, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 5 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 3, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, 2 );

		}

	}

	// Row 4 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 1 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 4, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 1 || i == 3 || i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 4, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 4, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, materialWall );

		}

	}

	// Row 4 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 4, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 0 || i == 2 ) {

			makeCorners( new THREE.Vector3( corridorSize * 4, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 4, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 4, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

	}

	// Row 5 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 1 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 5, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 8 ) {

			makeCorners( new THREE.Vector3( corridorSize * 5, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 9 ) {

			makeCorners( new THREE.Vector3( corridorSize * 5, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 6 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 5, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, 0 );

		}

	}

	// Row 5 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 || i == 5 ) {
			// Do nothing
		} else if ( i == 6 ) {

			makeWalls( new THREE.Vector3( corridorSize * 5, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 5, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 5, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, true, materialWall );

		} else if ( i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 5, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 6 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 5, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, 0 );

		}

	}

	// Row 6 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 1 || i == 8 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 6, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 8 ) {

			makeCorners( new THREE.Vector3( corridorSize * 6, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 9 ) {

			makeCorners( new THREE.Vector3( corridorSize * 6, 0, ( corridorSize * ( i ) ) ), corridorSize, true, true, false, false, materialWall );

		}

		if ( i == 3 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 6, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, 2 );

		}

	}

	// Row 6 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 || i == 6 ) {
			// Do nothing
		} else if ( i == 7 ) {

			makeWalls( new THREE.Vector3( corridorSize * 6, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 6, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 5 || i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 6, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 6, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 3 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 6, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, 2 );

		} else if ( i == 6 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 6, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, 3 );

		}


	}

	// Row 7 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 1 ) {
			// Do nothing
		} else if ( i == 8 ) {

			makeWalls( new THREE.Vector3( corridorSize * 7, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 9 ) {

			makeWalls( new THREE.Vector3( corridorSize * 7, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, true, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 7, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 8 ) {

			makeCorners( new THREE.Vector3( corridorSize * 7, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 9 ) {

			makeCorners( new THREE.Vector3( corridorSize * 7, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

	}

	// Row 7 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 ) {
			// Do nothing
		} else if ( i == 6 ) {

			makeWalls( new THREE.Vector3( corridorSize * 7, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 7, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 7, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 7, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, materialWall );

		}

		if ( i == 6 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 7, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, 1 );

		}

	}

	// Row 8 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 1 || i == 7 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 8, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 8, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 8 ) {

			makeCorners( new THREE.Vector3( corridorSize * 8, 0, ( corridorSize * ( i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else if ( i == 9 ) {

			makeCorners( new THREE.Vector3( corridorSize * 8, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 8 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 8, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, 0 );

		}

	}

	// Row 8 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 || i == 5 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 8, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 8, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, true, materialWall );

		} else if ( i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 8, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 5 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 8, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, 3 );

		}

	}

	// Row 9 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 1 ) {

			makeWalls( new THREE.Vector3( corridorSize * 9, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 2 ) {

			makeWalls( new THREE.Vector3( corridorSize * 9, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, true, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 9, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 9, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 8 ) {

			makeCorners( new THREE.Vector3( corridorSize * 9, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

	}

	// Row 9 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 ) {

			makeWalls( new THREE.Vector3( corridorSize * 9, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 1 ) {

			makeWalls( new THREE.Vector3( corridorSize * 9, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 9, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

	}

	// Row 10 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 1 || i == 2 ) {
			// Do nothing
		} else {

			makeWalls( new THREE.Vector3( corridorSize * 10, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 2 ) {

			makeCorners( new THREE.Vector3( corridorSize * 10, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, true, materialWall );

		}

		if ( i == 5 || i == 6 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 10, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, true, 1 );

		}

	}

	// Row 10 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 || i == 1 || i == 3 ) {

			makeWalls( new THREE.Vector3( corridorSize * 10, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 2 || i == 4 ) {

			makeWalls( new THREE.Vector3( corridorSize * 10, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 10, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 0 ) {

			makeCorners( new THREE.Vector3( corridorSize * 10, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 1 || i == 3 ) {

			makeCorners( new THREE.Vector3( corridorSize * 10, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 4 ) {

			makeCorners( new THREE.Vector3( corridorSize * 10, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, materialWall );

		}

		if ( i == 1 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 10, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, 0 );

		}

	}

	// Row 11 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 7 ) {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, true, false, materialWall );

		} else if ( i == 1 || i == 4 ) {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 2 ) {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, true, materialWall );

		} else if ( i == 3 ) {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 5 || i == 6 ) {

			makeStraightSection( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), true, corridorSize, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		}

		if ( i == 0 || i == 4 ) {

			makeCorners( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 1 ) {

			makeCorners( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 2 || i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 3 || i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, materialWall );

		}

		if ( i == 2 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, 0 );

		} else if ( i == 8 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 11, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, 2 );

		}

	}

	// Row 11 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 1 ) {
			// Do nothing
		} else if ( i == 2 || i == 3 || i == 4 ) {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		} else if ( i == 5 ) {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 11, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 0 ) {

			makeCorners( new THREE.Vector3( corridorSize * 11, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 2 ) {

			makeCorners( new THREE.Vector3( corridorSize * 11, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 4 ) {

			makeCorners( new THREE.Vector3( corridorSize * 11, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 3 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 11, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, 2 );

		}

	}

	// Row 12 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 1 || i == 4 ) {
			// Do nothing
		} else if ( i == 2 || i == 8 ) {

			makeWalls( new THREE.Vector3( corridorSize * 12, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, true, false, materialWall );

		} else if ( i == 3 || i == 9 ) {

			makeWalls( new THREE.Vector3( corridorSize * 12, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else {

			makeStraightSection( new THREE.Vector3( corridorSize * 12, 0, ( corridorSize * ( i ) ) ), true, corridorSize, materialWall );

		}

		if ( i == 0 ) {

			makeCorners( new THREE.Vector3( corridorSize * 12, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, true, false, materialWall );

		} else if ( i == 1 || i == 3 || i == 7 ) {

			makeCorners( new THREE.Vector3( corridorSize * 12, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 2 || i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 12, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 2 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 12, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, 1 );

		}

	}

	// Row 12 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 0 || i == 6 ) {

			makeWalls( new THREE.Vector3( corridorSize * 12, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else if ( i == 1 || i == 7 ) {

			makeWalls( new THREE.Vector3( corridorSize * 12, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 2 ) {
			// Do nothing
		} else {

			makeStraightSection( new THREE.Vector3( corridorSize * 12, 0, - ( corridorSize * ( 1 + i ) ) ), true, corridorSize, materialWall );

		}

		if ( i == 3 ) {

			makeCorners( new THREE.Vector3( corridorSize * 12, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, true, false, materialWall );

		} else if ( i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 12, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 4 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 12, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, 2 );

		}

	}

	// Row 13 -> right
	for ( var i = 0; i <= 9; i ++ ) {

		if ( i == 0 || i == 3 || i == 9 ) {

			makeWalls( new THREE.Vector3( corridorSize * 13, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, true, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 13, 0, ( corridorSize * ( i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 2 ) {

			makeCorners( new THREE.Vector3( corridorSize * 13, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, true, materialWall );

		} else if ( i == 5 ) {

			makeCorners( new THREE.Vector3( corridorSize * 13, 0, ( corridorSize * ( i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 8 ) {

			makeCorners( new THREE.Vector3( corridorSize * 13, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, materialWall );

		}

		if ( i == 2 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 13, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, 2 );

		} else if ( i == 7 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 13, 0, ( corridorSize * ( i ) ) ), corridorSize, false, false, false, true, 1 );

		}

	}

	// Row 13 -> left
	for ( var i = 0; i <= 7; i ++ ) {

		if ( i == 1 || i == 7 ) {

			makeWalls( new THREE.Vector3( corridorSize * 13, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, true, false, false, materialWall );

		} else {

			makeWalls( new THREE.Vector3( corridorSize * 13, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, true, false, false, materialWall );

		}

		if ( i == 0 ) {

			makeCorners( new THREE.Vector3( corridorSize * 13, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		} else if ( i == 3 ) {

			makeCorners( new THREE.Vector3( corridorSize * 13, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, materialWall );

		} else if ( i == 6 ) {

			makeCorners( new THREE.Vector3( corridorSize * 13, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, true, false, false, false, materialWall );

		}

		if ( i == 4 ) {

			makeWallDecals( new THREE.Vector3( corridorSize * 13, 0, - ( corridorSize * ( 1 + i ) ) ), corridorSize, false, false, false, true, 0 );

		}

	}


}
