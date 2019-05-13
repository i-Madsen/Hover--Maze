function Particle( geometry, material, startVelocity, startPosition, lifespan, startDelay ) {

	THREE.Points.call( this, geometry, material );
	this.mass = 0.01;

	var startVel = new THREE.Vector3( 0, 0, 0 );
	startVel.copy( startVelocity );
	var rand = ( Math.random() - 0.5 ) / 10;
	var len = startVel.length();
	var newLen = len + rand;
	this.velocity = startVel.multiplyScalar( ( newLen / len ) );

	this.startVelocity = new THREE.Vector3( 0, 0, 0 );
	this.startVelocity.copy( this.velocity );

	this.startPosition = startPosition;
	this.position.set( startPosition.x, startPosition.y, startPosition.z );

	this.startDelay = startDelay;
	this.lifespan = lifespan + startDelay;
	this.age = 0;

}


Particle.prototype = Object.create( THREE.Points.prototype );
Particle.prototype.constructor = Particle;

Particle.prototype.update = function ( delta ) {

	this.age += delta;

	// If the age reaches the delay time, begin simulating the particle
	if ( this.age >= this.startDelay ) {

		this.material.opacity = 1.0 - ( ( this.age - this.startDelay ) / ( this.lifespan - this.startDelay ) );

		// Remove particle from the system if it has reached the end of its lifespan
		if ( this.age >= this.lifespan ) {

			this.parent.remove( this );

		} else {

			var accel = new THREE.Vector3( 0, - 0.9, 0 );

			accel.multiplyScalar( delta );
			this.velocity.add( accel );
			var accelVelocity = new THREE.Vector3( 0, 0, 0 );
			accelVelocity.copy( this.velocity );
			accelVelocity.multiplyScalar( delta );
			this.position.add( accelVelocity );

		}

	} else {

		this.material.opacity = 0.0;

	}

};



function ParticleSystem() {

	THREE.Object3D.call( this );
	this.emitLoop = 0.0;
	this.emitTime = 0.0;
	this.systemAge = 0.0;
	this.systemDelay = 0.0;
	this.allParticles = [];

}


ParticleSystem.prototype = Object.create( THREE.Object3D.prototype );
ParticleSystem.prototype.constructor = ParticleSystem;
ParticleSystem.prototype.update = function ( delta ) {

	//console.log(this.systemAge + " age : delay " + this.systemDelay);
	this.systemAge += delta;

	// If system age reaches the delay time, begin simulating the particle system
	if ( this.systemAge >= this.systemDelay ) {

		for ( var i = 0; i < this.children.length; i ++ ) {

			var object = this.children[ i ];
			if ( object instanceof Particle ) {

				object.update( delta );

			}

		}

		// If enabled, restarts the particle system at the end of the loop
		if ( this.emitLoop != 0 ) {

			this.emitTime += delta;
			if ( this.emitTime >= this.emitLoop ) {

				this.resetEmit();
				this.emitTime -= this.emitLoop;

			}

		}

	}

};

ParticleSystem.prototype.addParticle = function ( particle ) {

	this.add( particle );
	this.allParticles.push( particle );	// Holds array of all the particles so we can reuse them
	particle.material.opacity = 0.0;

};

ParticleSystem.prototype.setEmitLoop = function ( emitTime ) {

	this.emitLoop = emitTime;
	this.emitTime = this.emitLoop;	// Make the system call a reset the the first time it simulates (after systemDelay);

};

ParticleSystem.prototype.setDelay = function ( delay ) {

	this.systemAge = 0;
	this.systemDelay = delay;

};

ParticleSystem.prototype.resetEmit = function () {

	// Reset the Particle System and start it again from the beginning
	for ( var i = 0; i < this.allParticles.length; i ++ ) {

		// Remove from the Particle System if still attached
		if ( this.allParticles[ i ].parent != null ) {

			this.allParticles[ i ].parent.remove( this.allParticles[ i ] );

		}
		// Reset the velocity, age, and position
		this.allParticles[ i ].velocity.set( this.allParticles[ i ].startVelocity.x, this.allParticles[ i ].startVelocity.y, this.allParticles[ i ].startVelocity.z );
		this.allParticles[ i ].age = 0;
		this.allParticles[ i ].position.set( this.allParticles[ i ].startPosition.x, this.allParticles[ i ].startPosition.y, this.allParticles[ i ].startPosition.z );
		// Add back to the Particle System
		this.add( this.allParticles[ i ] );

	}

};



