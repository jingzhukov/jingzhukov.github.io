// Advanced particle animation system with shape morphing based on scroll
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.autoRotate = true;
        this.shapeRadius = 150;
        this.currentShape = 'globe'; // globe, box, torus, pyramid, cylinder
        this.shapePosition = 'center'; // left, center, right
        this.morphProgress = 0;
        this.targetShape = 'globe';
        this.targetPosition = 'center';
        
        // Simple color scheme
        this.colors = {
            default: '#ffffff',   // White
            defaultDim: '#888888' // Gray
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Mouse controls rotation when not auto-rotating
            if (!this.autoRotate) {
                this.rotation.y = (e.clientX - this.canvas.width / 2) * 0.003;
                this.rotation.x = (e.clientY - this.canvas.height / 2) * 0.003;
            }
        });
        
        // Toggle auto-rotation on click
        this.canvas.addEventListener('click', () => {
            this.autoRotate = !this.autoRotate;
        });
        
        // Detect scroll position for shape morphing
        window.addEventListener('scroll', () => this.handleScroll());
        
        this.createParticles();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.shapeRadius = Math.min(this.canvas.width, this.canvas.height) / 4;
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const section = Math.floor(scrollY / windowHeight);

        // Keep all shapes centered, only change the shape type
        if (section === 0) {
            this.targetShape = 'globe';
        } else if (section === 1) {
            this.targetShape = 'box';
        } else if (section === 2) {
            this.targetShape = 'torus';
        } else if (section === 3) {
            this.targetShape = 'pyramid';
        } else {
            this.targetShape = 'cylinder';
        }

        // Always keep shapes centered
        this.targetPosition = 'center';
    }
    
    createParticles() {
        const numPoints = 2400;
        
        for (let i = 0; i < numPoints; i++) {
            const particle = {
                // Base coordinates (will be calculated based on shape)
                x: 0,
                y: 0,
                
                // Target 3D coordinates for each shape
                globeCoords: { x: 0, y: 0, z: 0 },
                boxCoords: { x: 0, y: 0, z: 0 },
                torusCoords: { x: 0, y: 0, z: 0 },
                pyramidCoords: { x: 0, y: 0, z: 0 },
                cylinderCoords: { x: 0, y: 0, z: 0 },
                
                // Current 3D position (for morphing)
                x3d: 0,
                y3d: 0,
                z3d: 0,
                
                // Visual properties
                radius: 0.8,
                baseRadius: 0.8,
                color: Math.random() > 0.5 ? this.colors.default : this.colors.defaultDim,
                opacity: 0,
                index: i,
                
                // Animation
                startTime: Date.now(),
                delay: i * 2  // Reduced delay for faster animation
            };
            
            // Calculate positions for each shape
            this.setGlobeCoords(particle, i, numPoints);
            this.setBoxCoords(particle, i, numPoints);
            this.setTorusCoords(particle, i, numPoints);
            this.setPyramidCoords(particle, i, numPoints);
            this.setCylinderCoords(particle, i, numPoints);
            
            // Start particles off-screen for flying-in animation
            particle.startX = (Math.random() - 0.5) * this.canvas.width * 3;
            particle.startY = (Math.random() - 0.5) * this.canvas.height * 3;
            particle.startZ = Math.random() * 1000 - 500;

            // Set initial position to start position
            particle.x3d = particle.startX;
            particle.y3d = particle.startY;
            particle.z3d = particle.startZ;
            
            this.particles.push(particle);
        }
        
        // Add floating ambient particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 0.5,
                color: this.colors.defaultDim,
                opacity: 0.1,
                ambient: true
            });
        }
    }
    
    setGlobeCoords(particle, index, total) {
        // Fibonacci sphere distribution
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const y = 1 - (index / (total - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = goldenAngle * index;
        
        particle.globeCoords.x = Math.cos(theta) * radiusAtY * this.shapeRadius;
        particle.globeCoords.y = y * this.shapeRadius;
        particle.globeCoords.z = Math.sin(theta) * radiusAtY * this.shapeRadius;
    }
    
    setBoxCoords(particle, index, total) {
        // Distribute points on box surfaces
        const pointsPerFace = Math.floor(total / 6);
        const faceIndex = Math.floor(index / pointsPerFace);
        const pointIndex = index % pointsPerFace;

        const gridSize = Math.sqrt(pointsPerFace);
        const row = Math.floor(pointIndex / gridSize);
        const col = pointIndex % gridSize;

        // Make box smaller for denser nodes
        const boxSize = this.shapeRadius * 0.8;
        const u = (col / gridSize - 0.5) * 2 * boxSize;
        const v = (row / gridSize - 0.5) * 2 * boxSize;
        
        switch(faceIndex) {
            case 0: // Front
                particle.boxCoords.x = u;
                particle.boxCoords.y = v;
                particle.boxCoords.z = boxSize;
                break;
            case 1: // Back
                particle.boxCoords.x = u;
                particle.boxCoords.y = v;
                particle.boxCoords.z = -boxSize;
                break;
            case 2: // Top
                particle.boxCoords.x = u;
                particle.boxCoords.y = -boxSize;
                particle.boxCoords.z = v;
                break;
            case 3: // Bottom
                particle.boxCoords.x = u;
                particle.boxCoords.y = boxSize;
                particle.boxCoords.z = v;
                break;
            case 4: // Left
                particle.boxCoords.x = -boxSize;
                particle.boxCoords.y = v;
                particle.boxCoords.z = u;
                break;
            case 5: // Right
            default:
                particle.boxCoords.x = boxSize;
                particle.boxCoords.y = v;
                particle.boxCoords.z = u;
                break;
        }
    }
    
    setTorusCoords(particle, index, total) {
        // Torus parametric equations
        const majorRadius = this.shapeRadius * 0.7;
        const minorRadius = this.shapeRadius * 0.3;

        const u = (index / total) * Math.PI * 2 * 8; // More wraps for better coverage
        const v = ((index * 13) / total) * Math.PI * 2; // Prime number for better distribution

        particle.torusCoords.x = (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u);
        particle.torusCoords.y = (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u);
        particle.torusCoords.z = minorRadius * Math.sin(v);
    }

    setPyramidCoords(particle, index, total) {
        // Create a 3-sided pyramid (tetrahedron)
        const size = this.shapeRadius;

        // Distribute points on 4 faces (1 base triangle + 3 side triangles)
        const pointsPerFace = Math.floor(total / 4);
        const faceIndex = Math.floor(index / pointsPerFace);
        const pointIndex = index % pointsPerFace;

        // Create triangular grid for each face
        const gridSize = Math.ceil(Math.sqrt(pointsPerFace));
        const row = Math.floor(pointIndex / gridSize);
        const col = pointIndex % gridSize;

        // Normalize to 0-1 range
        const u = col / Math.max(1, gridSize - 1);
        const v = row / Math.max(1, gridSize - 1);

        // Define vertices of a regular tetrahedron
        // Base triangle vertices (equilateral triangle tilted)
        const baseY = size * 0.5;
        const baseVertices = [
            { x: 0, y: baseY, z: -size },                    // Front vertex
            { x: -size * 0.866, y: baseY, z: size * 0.5 },   // Back-left vertex (0.866 = sqrt(3)/2)
            { x: size * 0.866, y: baseY, z: size * 0.5 }     // Back-right vertex
        ];

        // Apex vertex (top of pyramid)
        const apex = { x: 0, y: -size, z: 0 };

        // Apply rotation to tilt the tetrahedron
        const tiltAngleX = Math.PI / 8;  // Tilt 22.5 degrees around X axis
        const tiltAngleY = Math.PI / 6;  // Rotate 30 degrees around Y axis

        // Helper function to rotate a point
        const rotateVertex = (vertex) => {
            let { x, y, z } = vertex;

            // Rotate around X axis
            let newY = y * Math.cos(tiltAngleX) - z * Math.sin(tiltAngleX);
            let newZ = y * Math.sin(tiltAngleX) + z * Math.cos(tiltAngleX);
            y = newY;
            z = newZ;

            // Rotate around Y axis
            let newX = x * Math.cos(tiltAngleY) - z * Math.sin(tiltAngleY);
            newZ = x * Math.sin(tiltAngleY) + z * Math.cos(tiltAngleY);
            x = newX;
            z = newZ;

            return { x, y, z };
        };

        // Apply rotation to all vertices
        const rotatedBase = baseVertices.map(rotateVertex);
        const rotatedApex = rotateVertex(apex);

        if (faceIndex === 0) {
            // Base triangle - distribute points on the base
            const v1 = rotatedBase[0];
            const v2 = rotatedBase[1];
            const v3 = rotatedBase[2];

            // Barycentric coordinates for triangle interpolation
            const w = 1 - u - v;

            // Only use points inside the triangle
            if (w >= 0 && u >= 0 && v >= 0 && w <= 1 && u <= 1 && v <= 1) {
                particle.pyramidCoords.x = v1.x * w + v2.x * u + v3.x * v;
                particle.pyramidCoords.y = v1.y * w + v2.y * u + v3.y * v;
                particle.pyramidCoords.z = v1.z * w + v2.z * u + v3.z * v;
            } else {
                // Place outside points on the nearest edge
                if (u > 1 - v) {
                    // Closest to v2-v3 edge
                    const t = v;
                    particle.pyramidCoords.x = v2.x * (1 - t) + v3.x * t;
                    particle.pyramidCoords.y = v2.y * (1 - t) + v3.y * t;
                    particle.pyramidCoords.z = v2.z * (1 - t) + v3.z * t;
                } else if (v > 1 - u) {
                    // Closest to v1-v3 edge
                    const t = u;
                    particle.pyramidCoords.x = v1.x * (1 - t) + v3.x * t;
                    particle.pyramidCoords.y = v1.y * (1 - t) + v3.y * t;
                    particle.pyramidCoords.z = v1.z * (1 - t) + v3.z * t;
                } else {
                    // Closest to v1-v2 edge
                    const t = u / Math.max(0.01, u + v);
                    particle.pyramidCoords.x = v1.x * (1 - t) + v2.x * t;
                    particle.pyramidCoords.y = v1.y * (1 - t) + v2.y * t;
                    particle.pyramidCoords.z = v1.z * (1 - t) + v2.z * t;
                }
            }
        } else {
            // Side faces - each connects apex to two base vertices
            let v1, v2;

            if (faceIndex === 1) {
                // Face 1: apex, base[0], base[1]
                v1 = rotatedBase[0];
                v2 = rotatedBase[1];
            } else if (faceIndex === 2) {
                // Face 2: apex, base[1], base[2]
                v1 = rotatedBase[1];
                v2 = rotatedBase[2];
            } else {
                // Face 3: apex, base[2], base[0]
                v1 = rotatedBase[2];
                v2 = rotatedBase[0];
            }

            // Barycentric coordinates for triangle (apex, v1, v2)
            const w = 1 - u - v;

            if (w >= 0 && u >= 0 && v >= 0 && w <= 1 && u <= 1 && v <= 1) {
                particle.pyramidCoords.x = rotatedApex.x * w + v1.x * u + v2.x * v;
                particle.pyramidCoords.y = rotatedApex.y * w + v1.y * u + v2.y * v;
                particle.pyramidCoords.z = rotatedApex.z * w + v1.z * u + v2.z * v;
            } else {
                // Place outside points on the nearest edge
                if (u > 1 - v) {
                    // Closest to v1-v2 edge
                    const t = v / Math.max(0.01, u + v);
                    particle.pyramidCoords.x = v1.x * (1 - t) + v2.x * t;
                    particle.pyramidCoords.y = v1.y * (1 - t) + v2.y * t;
                    particle.pyramidCoords.z = v1.z * (1 - t) + v2.z * t;
                } else if (v > 1 - u) {
                    // Closest to apex-v2 edge
                    const t = u / Math.max(0.01, 1 - v);
                    particle.pyramidCoords.x = rotatedApex.x * (1 - t) + v2.x * t;
                    particle.pyramidCoords.y = rotatedApex.y * (1 - t) + v2.y * t;
                    particle.pyramidCoords.z = rotatedApex.z * (1 - t) + v2.z * t;
                } else {
                    // Closest to apex-v1 edge
                    const t = v / Math.max(0.01, 1 - u);
                    particle.pyramidCoords.x = rotatedApex.x * (1 - t) + v1.x * t;
                    particle.pyramidCoords.y = rotatedApex.y * (1 - t) + v1.y * t;
                    particle.pyramidCoords.z = rotatedApex.z * (1 - t) + v1.z * t;
                }
            }
        }
    }

    setCylinderCoords(particle, index, total) {
        // Create a cylinder shape
        const radius = this.shapeRadius * 0.7;
        const height = this.shapeRadius * 1.8;

        // Distribute points on cylinder surface and caps
        const capPoints = Math.floor(total * 0.3); // 30% for both caps
        const sidePoints = total - capPoints;
        const capPointsEach = Math.floor(capPoints / 2);

        if (index < capPointsEach) {
            // Top cap
            const r = Math.sqrt(Math.random()) * radius; // Random radius for even distribution
            const theta = Math.random() * Math.PI * 2;

            particle.cylinderCoords.x = r * Math.cos(theta);
            particle.cylinderCoords.y = -height / 2;
            particle.cylinderCoords.z = r * Math.sin(theta);
        } else if (index < capPointsEach * 2) {
            // Bottom cap
            const r = Math.sqrt(Math.random()) * radius;
            const theta = Math.random() * Math.PI * 2;

            particle.cylinderCoords.x = r * Math.cos(theta);
            particle.cylinderCoords.y = height / 2;
            particle.cylinderCoords.z = r * Math.sin(theta);
        } else {
            // Cylinder sides
            const sideIndex = index - capPoints;
            const heightRatio = sideIndex / sidePoints;
            const theta = (sideIndex * 2.5) % (Math.PI * 2); // Spiral distribution

            particle.cylinderCoords.x = radius * Math.cos(theta);
            particle.cylinderCoords.y = height * (heightRatio - 0.5);
            particle.cylinderCoords.z = radius * Math.sin(theta);
        }
    }

    rotatePoint(x, y, z) {
        // Rotate around Y axis
        let tempX = x * Math.cos(this.rotation.y) - z * Math.sin(this.rotation.y);
        let tempZ = x * Math.sin(this.rotation.y) + z * Math.cos(this.rotation.y);
        x = tempX;
        z = tempZ;
        
        // Rotate around X axis
        let tempY = y * Math.cos(this.rotation.x) - z * Math.sin(this.rotation.x);
        tempZ = y * Math.sin(this.rotation.x) + z * Math.cos(this.rotation.x);
        y = tempY;
        z = tempZ;
        
        return { x, y, z };
    }
    
    update() {
        const currentTime = Date.now();

        // Always center the shapes
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Auto-rotate
        if (this.autoRotate) {
            this.rotation.y += 0.002;
            this.rotation.x = Math.sin(currentTime * 0.00005) * 0.15;
        }
        
        // Smooth morphing
        if (this.targetShape !== this.currentShape || this.targetPosition !== this.shapePosition) {
            this.morphProgress += 0.02;
            if (this.morphProgress >= 1) {
                this.morphProgress = 0;
                this.currentShape = this.targetShape;
                this.shapePosition = this.targetPosition;
            }
        }
        
        this.particles.forEach((particle) => {
            if (particle.ambient) {
                // Floating ambient particles
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
                
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    particle.vx += dx * 0.00001;
                    particle.vy += dy * 0.00001;
                }
            } else {
                // Morph between shapes
                let targetCoords;
                let currentCoords;
                
                // Get current shape coordinates
                if (this.currentShape === 'globe') {
                    currentCoords = particle.globeCoords;
                } else if (this.currentShape === 'box') {
                    currentCoords = particle.boxCoords;
                } else if (this.currentShape === 'torus') {
                    currentCoords = particle.torusCoords;
                } else if (this.currentShape === 'pyramid') {
                    currentCoords = particle.pyramidCoords;
                } else {
                    currentCoords = particle.cylinderCoords;
                }

                // Get target shape coordinates
                if (this.targetShape === 'globe') {
                    targetCoords = particle.globeCoords;
                } else if (this.targetShape === 'box') {
                    targetCoords = particle.boxCoords;
                } else if (this.targetShape === 'torus') {
                    targetCoords = particle.torusCoords;
                } else if (this.targetShape === 'pyramid') {
                    targetCoords = particle.pyramidCoords;
                } else {
                    targetCoords = particle.cylinderCoords;
                }
                
                // Initial animation - fly in from random positions
                const animTime = currentTime - particle.startTime - particle.delay;
                const flyInProgress = Math.min(1, Math.max(0, animTime / 2000)); // Faster animation

                if (animTime > 0) {
                    // Particle has started animating
                    if (flyInProgress < 1) {
                        // Still flying in - interpolate from start position to globe shape
                        const easeProgress = this.easeInOutCubic(flyInProgress);
                        particle.x3d = particle.startX + (particle.globeCoords.x - particle.startX) * easeProgress;
                        particle.y3d = particle.startY + (particle.globeCoords.y - particle.startY) * easeProgress;
                        particle.z3d = particle.startZ + (particle.globeCoords.z - particle.startZ) * easeProgress;
                    } else {
                        // Flying in complete - now handle shape morphing
                        if (this.morphProgress > 0) {
                            const easeProgress = this.easeInOutCubic(this.morphProgress);
                            particle.x3d = currentCoords.x + (targetCoords.x - currentCoords.x) * easeProgress;
                            particle.y3d = currentCoords.y + (targetCoords.y - currentCoords.y) * easeProgress;
                            particle.z3d = currentCoords.z + (targetCoords.z - currentCoords.z) * easeProgress;
                        } else {
                            particle.x3d = currentCoords.x;
                            particle.y3d = currentCoords.y;
                            particle.z3d = currentCoords.z;
                        }
                    }

                    // Rotate the 3D point
                    const rotated = this.rotatePoint(particle.x3d, particle.y3d, particle.z3d);

                    // Project 3D to 2D with perspective
                    const perspective = 500;
                    const scale = perspective / (perspective + rotated.z);

                    let targetX = centerX + rotated.x * scale;
                    let targetY = centerY + rotated.y * scale;

                    // Mouse interaction
                    const dx = this.mouse.x - targetX;
                    const dy = this.mouse.y - targetY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const force = (150 - distance) / 150;
                        const angle = Math.atan2(dy, dx);
                        const pushDistance = force * 30;

                        targetX -= Math.cos(angle) * pushDistance;
                        targetY -= Math.sin(angle) * pushDistance;
                    }

                    // Update position
                    particle.x = targetX;
                    particle.y = targetY;

                    // Update particle size based on z-depth
                    particle.radius = particle.baseRadius * (0.7 + 0.3 * scale);

                    // Adjust opacity for depth and animation progress
                    particle.opacity = flyInProgress * (0.7 + 0.3 * scale);

                    // Store z-depth for sorting
                    particle.zDepth = rotated.z;
                }
            }
        });
        
        // Sort particles by z-depth
        this.particles.sort((a, b) => {
            const aZ = a.zDepth || 1000;
            const bZ = b.zDepth || 1000;
            return aZ - bZ;
        });
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw particles
        this.particles.forEach(particle => {
            if (particle.opacity > 0) {
                this.ctx.fillStyle = particle.color;
                this.ctx.globalAlpha = particle.opacity;
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.globalAlpha = 1;
            }
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when page loads
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem();
});