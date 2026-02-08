// Particle Being Library - Apply particle transformation effects to any Three.js mesh
// This library transforms solid meshes into living particle systems with various states

class ParticleBeingSystem {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.beings = [];
        this.ambientParticles = [];
        this.time = 0;
        
        // Default options that can be overridden
        this.options = {
            particleCount: 200,
            particleSize: 0.08,
            ambientParticleCount: 100,
            speedMultiplier: 1.0,
            colorRange: { h: 0, s: 0, lMin: 0.1, lMax: 0.4 },
            states: ['forming', 'stable', 'dissolving', 'scattered'],
            stateTimings: {
                forming: 4,
                stable: 3,
                dissolving: 3,
                scattered: 2
            },
            attractionForces: {
                forming: 0.04,
                stable: 0.024,
                dissolving: 0.008,
                scattered: 0.004
            },
            turbulenceStrength: 0.008,
            oscillationSpeed: 0.016,
            ...options
        };
    }

    // Convert any mesh or geometry into a particle being
    convertToParticleBeing(mesh, position = { x: 0, y: 0, z: 0 }, customOptions = {}) {
        const beingOptions = { ...this.options, ...customOptions };
        const being = {
            particles: [],
            userData: {
                index: this.beings.length,
                transformationPhase: Math.random() * Math.PI * 2,
                transformationSpeed: (0.3 + Math.random() * 0.2) * beingOptions.speedMultiplier,
                state: 'forming',
                stateTimer: 0,
                basePosition: new THREE.Vector3(position.x, position.y, position.z),
                originalMesh: mesh,
                options: beingOptions
            }
        };

        // Extract vertices from the mesh geometry
        const points = this.extractPointsFromMesh(mesh, beingOptions.particleCount);
        
        // Create particles for each point
        points.forEach((point, i) => {
            const particle = this.createParticle(point, position, beingOptions);
            particle.userData.beingIndex = this.beings.length;
            particle.userData.particleIndex = i;
            
            this.scene.add(particle);
            being.particles.push(particle);
        });

        // Hide original mesh if provided
        if (mesh) {
            mesh.visible = false;
        }

        this.beings.push(being);
        return being;
    }

    // Extract evenly distributed points from a mesh
    extractPointsFromMesh(mesh, targetCount) {
        const points = [];
        
        if (!mesh || !mesh.geometry) {
            // If no mesh provided, create a default human silhouette
            return this.generateHumanSilhouettePoints(targetCount);
        }

        const geometry = mesh.geometry;
        
        // For BufferGeometry
        if (geometry.isBufferGeometry) {
            const positions = geometry.attributes.position;
            const step = Math.max(1, Math.floor(positions.count / targetCount));
            
            for (let i = 0; i < positions.count && points.length < targetCount; i += step) {
                points.push(new THREE.Vector3(
                    positions.getX(i),
                    positions.getY(i),
                    positions.getZ(i)
                ));
            }
        }
        
        // Fill remaining with interpolated points if needed
        while (points.length < targetCount && points.length > 0) {
            const idx1 = Math.floor(Math.random() * points.length);
            const idx2 = Math.floor(Math.random() * points.length);
            const interpolated = new THREE.Vector3().lerpVectors(
                points[idx1],
                points[idx2],
                Math.random()
            );
            points.push(interpolated);
        }
        
        return points.length > 0 ? points : this.generateHumanSilhouettePoints(targetCount);
    }

    // Generate human silhouette points (various body types and poses)
    generateHumanSilhouettePoints(count, bodyType = 'adult') {
        const points = [];
        const variations = {
            child: { height: 0.6, width: 0.7, headSize: 1.2 },
            teen: { height: 0.85, width: 0.85, headSize: 1.0 },
            adult: { height: 1.0, width: 1.0, headSize: 1.0 },
            elderly: { height: 0.95, width: 1.0, headSize: 1.0 },
            athletic: { height: 1.05, width: 1.1, headSize: 0.95 },
            pregnant: { height: 1.0, width: 1.3, headSize: 1.0 }
        };
        
        const config = variations[bodyType] || variations.adult;
        
        // Head
        const headCount = Math.floor(count * 0.15);
        for (let i = 0; i < headCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 0.7 * config.headSize;
            
            points.push(new THREE.Vector3(
                radius * Math.sin(phi) * Math.cos(theta) * config.width,
                (3.5 + radius * Math.cos(phi)) * config.height,
                radius * Math.sin(phi) * Math.sin(theta)
            ));
        }
        
        // Torso
        const torsoCount = Math.floor(count * 0.35);
        for (let i = 0; i < torsoCount; i++) {
            const y = 1 + Math.random() * 2;
            const radius = (0.4 + (2 - y) * 0.2) * config.width;
            const angle = Math.random() * Math.PI * 2;
            
            points.push(new THREE.Vector3(
                radius * Math.cos(angle),
                y * config.height,
                radius * Math.sin(angle)
            ));
        }
        
        // Arms
        const armCount = Math.floor(count * 0.25);
        for (let arm = 0; arm < 2; arm++) {
            const side = arm === 0 ? -1 : 1;
            for (let i = 0; i < armCount / 2; i++) {
                const t = i / (armCount / 2 - 1);
                const armLength = 2.5 * config.height;
                const x = side * (0.8 + t * armLength * Math.cos(0.3)) * config.width;
                const y = (2.5 - t * armLength * Math.sin(0.3)) * config.height;
                const z = (Math.random() - 0.5) * 0.3;
                
                points.push(new THREE.Vector3(x, y, z));
            }
        }
        
        // Legs
        const legCount = count - points.length;
        for (let leg = 0; leg < 2; leg++) {
            const side = leg === 0 ? -0.3 : 0.3;
            for (let i = 0; i < legCount / 2; i++) {
                const t = i / (legCount / 2 - 1);
                const legLength = 2.8 * config.height;
                const x = (side + (Math.random() - 0.5) * 0.2) * config.width;
                const y = (1 - t * legLength) * config.height;
                const z = (Math.random() - 0.5) * 0.3;
                
                points.push(new THREE.Vector3(x, y, z));
            }
        }
        
        return points;
    }

    // Create individual particle
    createParticle(targetPoint, basePosition, options) {
        const particleGeometry = new THREE.SphereGeometry(options.particleSize, 6, 6);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(
                options.colorRange.h,
                options.colorRange.s,
                options.colorRange.lMin + Math.random() * (options.colorRange.lMax - options.colorRange.lMin)
            ),
            transparent: true,
            opacity: 0.7 + Math.random() * 0.3
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Set initial scattered position
        const scatteredPos = new THREE.Vector3(
            basePosition.x + (Math.random() - 0.5) * 20,
            Math.random() * 15,
            basePosition.z + (Math.random() - 0.5) * 20
        );
        particle.position.copy(scatteredPos);
        
        // Target position (formed shape)
        const targetPos = new THREE.Vector3(
            basePosition.x + targetPoint.x,
            basePosition.y + targetPoint.y + 2,
            basePosition.z + targetPoint.z
        );
        
        particle.userData = {
            targetPosition: targetPos,
            scatteredPosition: scatteredPos.clone(),
            velocity: new THREE.Vector3(0, 0, 0),
            originalOpacity: particle.material.opacity,
            oscillationPhase: Math.random() * Math.PI * 2
        };
        
        return particle;
    }

    // Create ambient floating particles
    createAmbientParticles(count = null) {
        const particleCount = count || this.options.ambientParticleCount;
        
        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 4, 4);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: 0x666666,
                transparent: true,
                opacity: 0.1 + Math.random() * 0.2
            });
            
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 60,
                Math.random() * 20,
                (Math.random() - 0.5) * 60
            );
            
            particle.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.08,
                    (Math.random() - 0.5) * 0.04,
                    (Math.random() - 0.5) * 0.08
                ),
                drift: new THREE.Vector3(
                    Math.sin(Math.random() * Math.PI * 2) * 0.008,
                    Math.cos(Math.random() * Math.PI * 2) * 0.004,
                    Math.sin(Math.random() * Math.PI * 2) * 0.008
                )
            };
            
            this.scene.add(particle);
            this.ambientParticles.push(particle);
        }
    }

    // Update particle being state and animation
    updateBeing(being, deltaTime) {
        const userData = being.userData;
        const options = userData.options;
        
        userData.transformationPhase += userData.transformationSpeed * deltaTime;
        userData.stateTimer += deltaTime;
        
        // State transitions
        const currentStateTiming = options.stateTimings[userData.state];
        if (userData.stateTimer > currentStateTiming + Math.random() * 2) {
            const states = options.states;
            const currentIndex = states.indexOf(userData.state);
            userData.state = states[(currentIndex + 1) % states.length];
            userData.stateTimer = 0;
        }
        
        // Update each particle
        being.particles.forEach((particle, index) => {
            this.updateParticle(particle, userData, deltaTime);
        });
    }

    // Update individual particle
    updateParticle(particle, beingData, deltaTime) {
        const particleData = particle.userData;
        const options = beingData.options;
        let targetPos;
        let targetOpacity;
        let attractionForce = options.attractionForces[beingData.state] || 0.02;
        
        switch (beingData.state) {
            case 'forming':
                targetPos = particleData.targetPosition.clone();
                targetOpacity = particleData.originalOpacity;
                break;
                
            case 'stable':
                targetPos = particleData.targetPosition.clone();
                const breathe = Math.sin(beingData.transformationPhase * 2) * 0.1;
                targetPos.multiplyScalar(1 + breathe);
                targetPos.add(beingData.basePosition);
                targetOpacity = particleData.originalOpacity;
                break;
                
            case 'dissolving':
                const dissolveProgress = beingData.stateTimer / options.stateTimings.dissolving;
                targetPos = new THREE.Vector3().lerpVectors(
                    particleData.targetPosition,
                    particleData.scatteredPosition,
                    dissolveProgress
                );
                targetOpacity = particleData.originalOpacity * (1 - dissolveProgress);
                break;
                
            case 'scattered':
                targetPos = particleData.scatteredPosition.clone();
                targetPos.add(new THREE.Vector3(
                    Math.sin(beingData.transformationPhase + particleData.particleIndex) * 5,
                    Math.cos(beingData.transformationPhase * 0.5 + particleData.particleIndex) * 3,
                    Math.sin(beingData.transformationPhase * 0.7 + particleData.particleIndex) * 5
                ));
                targetOpacity = particleData.originalOpacity * 0.3;
                break;
                
            default:
                targetPos = particleData.targetPosition.clone();
                targetOpacity = particleData.originalOpacity;
        }
        
        // Apply forces
        const direction = targetPos.clone().sub(particle.position);
        const distance = direction.length();
        
        if (distance > 0.1) {
            direction.normalize().multiplyScalar(attractionForce * Math.min(distance, 5));
            particleData.velocity.add(direction);
        }
        
        // Add turbulence
        const turbulence = new THREE.Vector3(
            Math.sin(this.time * 2.4 + particleData.particleIndex * 0.1) * options.turbulenceStrength,
            Math.cos(this.time * 1.6 + particleData.particleIndex * 0.15) * options.turbulenceStrength,
            Math.sin(this.time * 2 + particleData.particleIndex * 0.12) * options.turbulenceStrength
        );
        particleData.velocity.add(turbulence);
        
        // Apply damping
        particleData.velocity.multiplyScalar(0.95);
        
        // Update position
        particle.position.add(particleData.velocity);
        
        // Update opacity
        particle.material.opacity += (targetOpacity - particle.material.opacity) * 0.05;
        
        // Oscillation
        particleData.oscillationPhase += options.oscillationSpeed;
        const oscillation = Math.sin(particleData.oscillationPhase) * 0.05;
        particle.position.y += oscillation;
        
        // Prevent particles from going too far
        const maxDistance = 25;
        const distanceFromBase = particle.position.distanceTo(beingData.basePosition);
        if (distanceFromBase > maxDistance) {
            const pullBack = beingData.basePosition.clone().sub(particle.position).normalize();
            particleData.velocity.add(pullBack.multiplyScalar(0.01));
        }
    }

    // Update all ambient particles
    updateAmbientParticles(deltaTime) {
        this.ambientParticles.forEach(particle => {
            particle.userData.velocity.add(particle.userData.drift);
            particle.position.add(particle.userData.velocity);
            particle.userData.velocity.multiplyScalar(0.98);
            
            // Wrap around boundaries
            if (particle.position.x > 30) particle.position.x = -30;
            if (particle.position.x < -30) particle.position.x = 30;
            if (particle.position.z > 30) particle.position.z = -30;
            if (particle.position.z < -30) particle.position.z = 30;
            if (particle.position.y > 20) particle.position.y = 0;
            if (particle.position.y < 0) particle.position.y = 20;
            
            // Subtle pulsing
            const pulse = Math.sin(this.time * 2 + particle.position.x * 0.1) * 0.1;
            particle.material.opacity = (0.1 + Math.random() * 0.2) * (1 + pulse);
        });
    }

    // Main update function
    update(deltaTime = 0.016) {
        this.time += deltaTime;
        
        this.beings.forEach(being => {
            this.updateBeing(being, deltaTime);
        });
        
        this.updateAmbientParticles(deltaTime);
    }

    // Apply mouse influence
    applyMouseInfluence(mouseX, mouseY, strength = 1.0) {
        const mouseInfluence = new THREE.Vector3(mouseX * 2, mouseY * 2, 0);
        
        this.beings.forEach(being => {
            being.particles.forEach(particle => {
                const distance = particle.position.distanceTo(
                    new THREE.Vector3(mouseInfluence.x * 10, mouseInfluence.y * 10 + 5, 0)
                );
                if (distance < 10) {
                    const force = mouseInfluence.clone()
                        .sub(particle.position)
                        .normalize()
                        .multiplyScalar(0.01 * strength);
                    particle.userData.velocity.add(force);
                }
            });
        });
    }

    // Clean up
    dispose() {
        this.beings.forEach(being => {
            being.particles.forEach(particle => {
                particle.geometry.dispose();
                particle.material.dispose();
                this.scene.remove(particle);
            });
            if (being.userData.originalMesh) {
                being.userData.originalMesh.visible = true;
            }
        });
        
        this.ambientParticles.forEach(particle => {
            particle.geometry.dispose();
            particle.material.dispose();
            this.scene.remove(particle);
        });
        
        this.beings = [];
        this.ambientParticles = [];
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleBeingSystem;
}