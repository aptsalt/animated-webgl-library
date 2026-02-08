/**
 * Revolutionary WebGL Theme and Color System
 * 
 * A comprehensive theme and color system for human figure visualizations
 * Provides 10 figure themes and 15 color palettes with smooth transitions
 */

class HumanFigureThemeSystem {
    constructor() {
        this.currentTheme = 'minimal';
        this.currentPalette = 'charcoal-cyan';
        this.transitionDuration = 2000; // 2 seconds
        this.isTransitioning = false;
        
        this.themes = this.initializeThemes();
        this.palettes = this.initializePalettes();
        
        this.setupUI();
    }

    /**
     * Initialize 10 human figure theme variations
     */
    initializeThemes() {
        return {
            'grainy-dots': {
                name: 'Grainy/Dots',
                description: 'Data-driven life/DNA resemblance',
                particleCount: 3000,
                particleSize: 0.03,
                particleOpacity: 0.6,
                renderMode: 'particles',
                blending: THREE.AdditiveBlending,
                animation: 'dna-helix',
                noiseIntensity: 0.2
            },
            'moving-dots': {
                name: 'Moving Dots',
                description: 'Data points seeing larger picture',
                particleCount: 2000,
                particleSize: 0.05,
                particleOpacity: 0.8,
                renderMode: 'flowing-particles',
                blending: THREE.NormalBlending,
                animation: 'growth-lines',
                flowSpeed: 0.02
            },
            'minimal': {
                name: 'Minimal Aesthetic',
                description: 'Clean, simple forms',
                particleCount: 800,
                particleSize: 0.08,
                particleOpacity: 0.7,
                renderMode: 'geometric',
                blending: THREE.NormalBlending,
                animation: 'breathing',
                simplicity: true
            },
            'memory-dots': {
                name: 'Memory Dots',
                description: 'Scattered memory fragments',
                particleCount: 1500,
                particleSize: 0.06,
                particleOpacity: 0.4,
                renderMode: 'salt-grains',
                blending: THREE.MultiplyBlending,
                animation: 'floating',
                irregularShape: true
            },
            'silhouette-grid': {
                name: 'Silhouette Grid',
                description: 'Structured human forms',
                particleCount: 500,
                particleSize: 0.1,
                particleOpacity: 0.9,
                renderMode: 'flat-silhouette',
                blending: THREE.NormalBlending,
                animation: 'poses',
                gridLayout: true
            },
            'solitary-walker': {
                name: 'Solitary Walker',
                description: 'Individual journey',
                particleCount: 1000,
                particleSize: 0.07,
                particleOpacity: 0.8,
                renderMode: 'walking-figure',
                blending: THREE.NormalBlending,
                animation: 'walking',
                isolation: true
            },
            'particle-explosion': {
                name: 'Particle Explosion',
                description: 'Forming letters/words',
                particleCount: 4000,
                particleSize: 0.04,
                particleOpacity: 0.6,
                renderMode: 'explosive-particles',
                blending: THREE.AdditiveBlending,
                animation: 'explosion-reform',
                explosive: true
            },
            'liquid-metal': {
                name: 'Liquid Metal',
                description: 'Fluid metallic forms',
                particleCount: 2500,
                particleSize: 0.05,
                particleOpacity: 0.9,
                renderMode: 'liquid',
                blending: THREE.NormalBlending,
                animation: 'fluid-motion',
                metallic: true
            },
            'gradient-mesh': {
                name: 'Gradient Mesh',
                description: 'Smooth color transitions',
                particleCount: 1800,
                particleSize: 0.06,
                particleOpacity: 0.7,
                renderMode: 'mesh',
                blending: THREE.NormalBlending,
                animation: 'gradient-flow',
                gradientMesh: true
            },
            'constellation': {
                name: 'Constellation',
                description: 'Connected star patterns',
                particleCount: 1200,
                particleSize: 0.08,
                particleOpacity: 0.8,
                renderMode: 'constellation',
                blending: THREE.AdditiveBlending,
                animation: 'star-connection',
                connections: true
            }
        };
    }

    /**
     * Initialize 15 color palettes based on dominant colors
     */
    initializePalettes() {
        return {
            'charcoal-cyan': {
                name: 'Charcoal Cyan',
                description: 'Dark charcoal with cyan/purple/green gradient',
                primary: '#1a1a1a',
                secondary: '#00bcd4',
                accent: '#9c27b0',
                background: '#f0f0f0',
                gradient: ['#1a1a1a', '#00bcd4', '#9c27b0', '#4caf50']
            },
            'earth-tones': {
                name: 'Earth Tones',
                description: 'Blue-green-yellow earth tones',
                primary: '#2e7d32',
                secondary: '#1976d2',
                accent: '#fbc02d',
                background: '#f8f8f8',
                gradient: ['#2e7d32', '#1976d2', '#fbc02d', '#795548']
            },
            'cosmic-purple': {
                name: 'Cosmic Purple',
                description: 'Purple-blue cosmic palette',
                primary: '#512da8',
                secondary: '#3f51b5',
                accent: '#e91e63',
                background: '#fafafa',
                gradient: ['#512da8', '#3f51b5', '#673ab7', '#e91e63']
            },
            'mint-lavender': {
                name: 'Mint Lavender',
                description: 'Mint green with lavender',
                primary: '#26a69a',
                secondary: '#ba68c8',
                accent: '#66bb6a',
                background: '#f5f5f5',
                gradient: ['#26a69a', '#ba68c8', '#66bb6a', '#e1bee7']
            },
            'teal-sage': {
                name: 'Teal Sage',
                description: 'Teal and sage green',
                primary: '#00695c',
                secondary: '#4db6ac',
                accent: '#8bc34a',
                background: '#fafafa',
                gradient: ['#00695c', '#4db6ac', '#8bc34a', '#a5d6a7']
            },
            'electric-purple': {
                name: 'Electric Purple',
                description: 'Deep purple with electric blue',
                primary: '#4527a0',
                secondary: '#2196f3',
                accent: '#e040fb',
                background: '#f0f0f0',
                gradient: ['#4527a0', '#2196f3', '#e040fb', '#7c4dff']
            },
            'sunset-orange': {
                name: 'Sunset Orange',
                description: 'Warm orange-red sunset',
                primary: '#e65100',
                secondary: '#ff5722',
                accent: '#ffc107',
                background: '#fff8e1',
                gradient: ['#e65100', '#ff5722', '#ffc107', '#ffab40']
            },
            'cool-gray': {
                name: 'Cool Gray',
                description: 'Cool gray with accent colors',
                primary: '#424242',
                secondary: '#78909c',
                accent: '#26c6da',
                background: '#fafafa',
                gradient: ['#424242', '#78909c', '#26c6da', '#b0bec5']
            },
            'ocean-blues': {
                name: 'Ocean Blues',
                description: 'Ocean blues and teals',
                primary: '#0277bd',
                secondary: '#00acc1',
                accent: '#26a69a',
                background: '#e1f5fe',
                gradient: ['#0277bd', '#00acc1', '#26a69a', '#4dd0e1']
            },
            'forest-greens': {
                name: 'Forest Greens',
                description: 'Deep forest greens',
                primary: '#1b5e20',
                secondary: '#388e3c',
                accent: '#689f38',
                background: '#e8f5e8',
                gradient: ['#1b5e20', '#388e3c', '#689f38', '#8bc34a']
            },
            'desert-terracotta': {
                name: 'Desert Terracotta',
                description: 'Desert sand and terracotta',
                primary: '#8d6e63',
                secondary: '#ff8a65',
                accent: '#ffcc02',
                background: '#fff8e1',
                gradient: ['#8d6e63', '#ff8a65', '#ffcc02', '#d7ccc8']
            },
            'midnight-gold': {
                name: 'Midnight Gold',
                description: 'Midnight blue with gold',
                primary: '#1a237e',
                secondary: '#303f9f',
                accent: '#ffd600',
                background: '#f3f4f6',
                gradient: ['#1a237e', '#303f9f', '#ffd600', '#3f51b5']
            },
            'pastel-rainbow': {
                name: 'Pastel Rainbow',
                description: 'Soft pastel colors',
                primary: '#f8bbd9',
                secondary: '#b39ddb',
                accent: '#a5d6a7',
                background: '#ffffff',
                gradient: ['#f8bbd9', '#b39ddb', '#a5d6a7', '#ffcc80']
            },
            'monochrome': {
                name: 'Monochrome',
                description: 'Grayscale spectrum',
                primary: '#212121',
                secondary: '#616161',
                accent: '#9e9e9e',
                background: '#fafafa',
                gradient: ['#212121', '#424242', '#616161', '#9e9e9e']
            },
            'neon-cyberpunk': {
                name: 'Neon Cyberpunk',
                description: 'Bright neon colors',
                primary: '#e91e63',
                secondary: '#00e5ff',
                accent: '#76ff03',
                background: '#121212',
                gradient: ['#e91e63', '#00e5ff', '#76ff03', '#ff6ec7']
            }
        };
    }

    /**
     * Setup UI controls in the top right corner
     */
    setupUI() {
        // Remove existing UI if present
        const existingUI = document.querySelector('.theme-system-ui');
        if (existingUI) existingUI.remove();

        // Create UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'theme-system-ui';
        uiContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            font-family: 'Inter', system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: rgba(255, 255, 255, 0.95);
            padding: 15px;
            border-radius: 12px;
            border: 1px solid rgba(26, 26, 26, 0.1);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            min-width: 200px;
        `;

        // Theme selector
        const themeLabel = document.createElement('label');
        themeLabel.textContent = 'Figure Theme:';
        themeLabel.style.cssText = `
            font-size: 12px;
            font-weight: 500;
            color: #1a1a1a;
            margin-bottom: 2px;
        `;

        const themeSelect = document.createElement('select');
        themeSelect.className = 'theme-selector';
        themeSelect.style.cssText = `
            padding: 8px 12px;
            border: 1px solid rgba(26, 26, 26, 0.2);
            border-radius: 8px;
            background: white;
            font-size: 12px;
            cursor: pointer;
            outline: none;
            transition: border-color 0.2s ease;
        `;

        Object.entries(this.themes).forEach(([key, theme]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = theme.name;
            option.selected = key === this.currentTheme;
            themeSelect.appendChild(option);
        });

        // Color palette selector
        const paletteLabel = document.createElement('label');
        paletteLabel.textContent = 'Color Palette:';
        paletteLabel.style.cssText = `
            font-size: 12px;
            font-weight: 500;
            color: #1a1a1a;
            margin-bottom: 2px;
            margin-top: 5px;
        `;

        const paletteSelect = document.createElement('select');
        paletteSelect.className = 'palette-selector';
        paletteSelect.style.cssText = `
            padding: 8px 12px;
            border: 1px solid rgba(26, 26, 26, 0.2);
            border-radius: 8px;
            background: white;
            font-size: 12px;
            cursor: pointer;
            outline: none;
            transition: border-color 0.2s ease;
        `;

        Object.entries(this.palettes).forEach(([key, palette]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = palette.name;
            option.selected = key === this.currentPalette;
            paletteSelect.appendChild(option);
        });

        // Theme description
        const themeDescription = document.createElement('div');
        themeDescription.className = 'theme-description';
        themeDescription.style.cssText = `
            font-size: 11px;
            color: #666;
            font-style: italic;
            margin-top: 5px;
            line-height: 1.4;
        `;
        this.updateThemeDescription(themeDescription);

        // Event listeners
        themeSelect.addEventListener('change', (e) => {
            this.setTheme(e.target.value);
            this.updateThemeDescription(themeDescription);
        });

        paletteSelect.addEventListener('change', (e) => {
            this.setPalette(e.target.value);
        });

        // Assemble UI
        uiContainer.appendChild(themeLabel);
        uiContainer.appendChild(themeSelect);
        uiContainer.appendChild(paletteLabel);
        uiContainer.appendChild(paletteSelect);
        uiContainer.appendChild(themeDescription);

        document.body.appendChild(uiContainer);
    }

    /**
     * Update theme description text
     */
    updateThemeDescription(element) {
        const theme = this.themes[this.currentTheme];
        const palette = this.palettes[this.currentPalette];
        element.textContent = `${theme.description} • ${palette.description}`;
    }

    /**
     * Set active theme with smooth transition
     */
    setTheme(themeKey) {
        if (this.isTransitioning || !this.themes[themeKey]) return;
        
        this.isTransitioning = true;
        const oldTheme = this.currentTheme;
        this.currentTheme = themeKey;
        
        // Emit theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { 
                oldTheme, 
                newTheme: themeKey, 
                theme: this.themes[themeKey],
                palette: this.palettes[this.currentPalette]
            }
        }));

        // Reset transition flag after duration
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    /**
     * Set active color palette with smooth transition
     */
    setPalette(paletteKey) {
        if (!this.palettes[paletteKey]) return;
        
        this.currentPalette = paletteKey;
        
        // Emit palette change event
        window.dispatchEvent(new CustomEvent('paletteChanged', {
            detail: { 
                palette: this.palettes[paletteKey],
                theme: this.themes[this.currentTheme]
            }
        }));
    }

    /**
     * Get current theme configuration
     */
    getCurrentTheme() {
        return {
            ...this.themes[this.currentTheme],
            key: this.currentTheme
        };
    }

    /**
     * Get current palette configuration
     */
    getCurrentPalette() {
        return {
            ...this.palettes[this.currentPalette],
            key: this.currentPalette
        };
    }

    /**
     * Apply theme to scene materials
     */
    applyThemeToMaterials(scene, materials = []) {
        const theme = this.getCurrentTheme();
        const palette = this.getCurrentPalette();
        
        // Update scene background
        if (scene.background) {
            scene.background.setHex(parseInt(palette.background.replace('#', ''), 16));
        }

        // Update materials
        materials.forEach((material, index) => {
            if (material.color) {
                const colorIndex = index % palette.gradient.length;
                const color = palette.gradient[colorIndex];
                material.color.setHex(parseInt(color.replace('#', ''), 16));
                material.opacity = theme.particleOpacity;
                material.transparent = true;
                material.blending = theme.blending;
            }
        });
    }

    /**
     * Create complete human figure based on current theme
     */
    createFigure(scene) {
        const theme = this.getCurrentTheme();
        const palette = this.getCurrentPalette();
        
        switch (theme.key) {
            case 'grainy-dots':
                return this.createSoulThreadsFigure(scene, theme, palette);
            case 'moving-dots':
                return this.createMovingDotsFigure(scene, theme, palette);
            case 'memory-dots':
                return this.createMemoryDotsFigure(scene, theme, palette);
            case 'silhouette-grid':
                return this.createSilhouetteGridFigure(scene, theme, palette);
            case 'solitary-walker':
                return this.createSolitaryWalkerFigure(scene, theme, palette);
            case 'particle-explosion':
                return this.createParticleExplosionFigure(scene, theme, palette);
            case 'liquid-metal':
                return this.createLiquidMetalFigure(scene, theme, palette);
            case 'gradient-mesh':
                return this.createGradientMeshFigure(scene, theme, palette);
            case 'constellation':
                return this.createConstellationFigure(scene, theme, palette);
            default:
                return this.createSoulThreadsFigure(scene, theme, palette);
        }
    }

    /**
     * Create Soul Threads figure (simple human silhouettes with connecting threads)
     */
    createSoulThreadsFigure(scene, theme, palette) {
        const soulCount = 25;
        const souls = [];
        const group = new THREE.Group();
        
        for (let i = 0; i < soulCount; i++) {
            const soulGroup = new THREE.Group();
            
            const material = new THREE.MeshBasicMaterial({
                color: parseInt(palette.primary.replace('#', ''), 16),
                transparent: true,
                opacity: 0.6
            });
            
            // Body
            const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 6);
            const body = new THREE.Mesh(bodyGeometry, material.clone());
            
            // Head
            const headGeometry = new THREE.SphereGeometry(0.25, 6, 6);
            const head = new THREE.Mesh(headGeometry, material.clone());
            head.position.y = 0.85;
            
            soulGroup.add(body);
            soulGroup.add(head);
            
            // Random position in 3D space
            soulGroup.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20
            );
            
            soulGroup.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.01
                ),
                phase: Math.random() * Math.PI * 2
            };
            
            group.add(soulGroup);
            souls.push(soulGroup);
        }
        
        group.userData = { souls, type: 'soul-threads' };
        return group;
    }

    /**
     * Create Moving Dots figure (identical to Soul Threads for this implementation)
     */
    createMovingDotsFigure(scene, theme, palette) {
        return this.createSoulThreadsFigure(scene, theme, palette);
    }

    /**
     * Create Memory Dots figure (salt grains that transform into human figures)
     */
    createMemoryDotsFigure(scene, theme, palette) {
        const memoryCount = 30;
        const figureCount = 8;
        const group = new THREE.Group();
        const memories = [];
        const humanFigures = [];
        
        // Create salt grain geometry
        const createSaltGrainGeometry = () => {
            const geometry = new THREE.IcosahedronGeometry(1, 0);
            const positions = geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] *= (0.8 + Math.random() * 0.4);
                positions[i + 1] *= (0.7 + Math.random() * 0.6);
                positions[i + 2] *= (0.8 + Math.random() * 0.4);
            }
            
            geometry.attributes.position.needsUpdate = true;
            geometry.computeVertexNormals();
            return geometry;
        };
        
        // Create memory grains
        for (let i = 0; i < memoryCount; i++) {
            const geometry = createSaltGrainGeometry();
            const material = new THREE.MeshBasicMaterial({
                color: parseInt(palette.primary.replace('#', ''), 16),
                transparent: true,
                opacity: Math.random() * 0.2 + 0.1,
                wireframe: Math.random() > 0.7
            });
            
            const grain = new THREE.Mesh(geometry, material);
            const scale = Math.random() * 0.8 + 0.4;
            grain.scale.set(scale, scale * 1.2, scale);
            
            grain.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 40
            );
            
            grain.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.03,
                    (Math.random() - 0.5) * 0.03,
                    (Math.random() - 0.5) * 0.03
                ),
                phase: Math.random() * Math.PI * 2,
                baseOpacity: material.opacity
            };
            
            group.add(grain);
            memories.push(grain);
        }
        
        // Create human figures (detailed anatomical structure)
        for (let i = 0; i < figureCount; i++) {
            const figureGroup = new THREE.Group();
            
            const material = new THREE.MeshBasicMaterial({
                color: parseInt(palette.primary.replace('#', ''), 16),
                transparent: true,
                opacity: 0
            });
            
            // Head
            const head = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), material.clone());
            head.position.y = 1.05;
            
            // Neck
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.08, 6), material.clone());
            neck.position.y = 0.94;
            
            // Torso
            const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.35, 8), material.clone());
            torso.position.y = 0.72;
            
            // Arms
            const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.2, 6), material.clone());
            leftUpperArm.position.set(-0.12, 0.8, 0);
            leftUpperArm.rotation.z = 0.15;
            
            const rightUpperArm = leftUpperArm.clone();
            rightUpperArm.position.set(0.12, 0.8, 0);
            rightUpperArm.rotation.z = -0.15;
            
            // Legs
            const leftUpperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.35, 6), material.clone());
            leftUpperLeg.position.set(-0.08, 0.25, 0);
            
            const rightUpperLeg = leftUpperLeg.clone();
            rightUpperLeg.position.set(0.08, 0.25, 0);
            
            figureGroup.add(head, neck, torso, leftUpperArm, rightUpperArm, leftUpperLeg, rightUpperLeg);
            
            figureGroup.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 40
            );
            
            figureGroup.scale.set(2, 2, 2);
            figureGroup.visible = false;
            
            figureGroup.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                phase: Math.random() * Math.PI * 2,
                targetOpacity: 0.4
            };
            
            group.add(figureGroup);
            humanFigures.push(figureGroup);
        }
        
        group.userData = { memories, humanFigures, type: 'memory-dots' };
        return group;
    }

    /**
     * Create Silhouette Grid figure (flat silhouettes in different poses)
     */
    createSilhouetteGridFigure(scene, theme, palette) {
        const group = new THREE.Group();
        const silhouettes = [];
        const rows = 5;
        const cols = 8;
        const spacing = 3;
        
        const createPose = (poseType) => {
            const poseGroup = new THREE.Group();
            const material = new THREE.MeshBasicMaterial({
                color: parseInt(palette.primary.replace('#', ''), 16),
                side: THREE.DoubleSide
            });
            
            // Head
            const head = new THREE.Mesh(new THREE.CircleGeometry(0.2, 8), material.clone());
            head.position.y = 1.7;
            poseGroup.add(head);
            
            // Body
            const body = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.8), material.clone());
            body.position.y = 1;
            poseGroup.add(body);
            
            // Arms
            const leftArm = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.6), material.clone());
            leftArm.position.set(-0.25, 1, 0);
            poseGroup.add(leftArm);
            
            const rightArm = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.6), material.clone());
            rightArm.position.set(0.25, 1, 0);
            poseGroup.add(rightArm);
            
            // Legs
            const leftLeg = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.8), material.clone());
            leftLeg.position.set(-0.1, 0.4, 0);
            poseGroup.add(leftLeg);
            
            const rightLeg = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.8), material.clone());
            rightLeg.position.set(0.1, 0.4, 0);
            poseGroup.add(rightLeg);
            
            // Apply pose-specific transformations
            switch(poseType % 8) {
                case 1: // Walking
                    body.rotation.z = 0.1;
                    leftArm.rotation.z = 0.3;
                    rightArm.rotation.z = -0.3;
                    leftLeg.rotation.z = -0.2;
                    rightLeg.rotation.z = 0.2;
                    break;
                case 2: // Arms raised
                    leftArm.position.set(-0.35, 1.4, 0);
                    leftArm.rotation.z = -0.8;
                    rightArm.position.set(0.35, 1.4, 0);
                    rightArm.rotation.z = 0.8;
                    break;
                case 3: // Running
                    body.rotation.z = 0.2;
                    leftArm.rotation.z = 0.6;
                    rightArm.rotation.z = -0.6;
                    leftLeg.rotation.z = -0.4;
                    rightLeg.rotation.z = 0.4;
                    break;
            }
            
            return poseGroup;
        };
        
        let poseIndex = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const silhouette = createPose(poseIndex);
                
                silhouette.position.x = (col - cols / 2) * spacing + spacing / 2;
                silhouette.position.y = (rows / 2 - row) * spacing - spacing / 2;
                
                silhouette.userData = {
                    originalY: silhouette.position.y,
                    floatOffset: Math.random() * Math.PI * 2,
                    floatSpeed: 0.5 + Math.random() * 0.5
                };
                
                group.add(silhouette);
                silhouettes.push(silhouette);
                poseIndex++;
            }
        }
        
        group.userData = { silhouettes, type: 'silhouette-grid' };
        return group;
    }

    /**
     * Create Solitary Walker figure (detailed 3D walking figure)
     */
    createSolitaryWalkerFigure(scene, theme, palette) {
        const group = new THREE.Group();
        
        const material = new THREE.MeshBasicMaterial({
            color: parseInt(palette.primary.replace('#', ''), 16),
            side: THREE.DoubleSide
        });
        
        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 6), material.clone());
        head.position.y = 1.75;
        head.castShadow = true;
        group.add(head);
        
        // Torso
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.8, 6), material.clone());
        torso.position.y = 1.1;
        torso.castShadow = true;
        group.add(torso);
        
        // Arms
        const leftArmGroup = new THREE.Group();
        const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 4), material.clone());
        upperArm.position.y = -0.2;
        const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 4), material.clone());
        lowerArm.position.y = -0.6;
        leftArmGroup.add(upperArm, lowerArm);
        leftArmGroup.position.set(-0.25, 1.3, 0);
        leftArmGroup.userData = { type: 'leftArm' };
        group.add(leftArmGroup);
        
        const rightArmGroup = leftArmGroup.clone();
        rightArmGroup.position.set(0.25, 1.3, 0);
        rightArmGroup.userData = { type: 'rightArm' };
        group.add(rightArmGroup);
        
        // Legs
        const leftLegGroup = new THREE.Group();
        const upperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 4), material.clone());
        upperLeg.position.y = -0.25;
        const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.5, 4), material.clone());
        lowerLeg.position.y = -0.75;
        leftLegGroup.add(upperLeg, lowerLeg);
        leftLegGroup.position.set(-0.12, 0.7, 0);
        leftLegGroup.userData = { type: 'leftLeg' };
        group.add(leftLegGroup);
        
        const rightLegGroup = leftLegGroup.clone();
        rightLegGroup.position.set(0.12, 0.7, 0);
        rightLegGroup.userData = { type: 'rightLeg' };
        group.add(rightLegGroup);
        
        group.userData = { type: 'solitary-walker' };
        return group;
    }

    /**
     * Create Particle Explosion figure (human figure made of particles that can explode)
     */
    createParticleExplosionFigure(scene, theme, palette) {
        const group = new THREE.Group();
        const bodyParts = [];
        const colors = palette.gradient.map(color => parseInt(color.replace('#', ''), 16));
        
        // Head particles
        for (let i = 0; i < 50; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.8
            });
            
            const particle = new THREE.Mesh(new THREE.SphereGeometry(0.02, 4, 3), material);
            
            const phi = Math.acos(-1 + (2 * i) / 50);
            const theta = Math.sqrt(50 * Math.PI) * phi;
            const radius = 0.4;
            
            particle.position.set(
                radius * Math.cos(theta) * Math.sin(phi),
                2.5 + radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi)
            );
            
            particle.userData = {
                originalPos: particle.position.clone(),
                bodyPart: 'head',
                explosionVelocity: particle.position.clone().normalize().multiplyScalar(5 + Math.random() * 10)
            };
            
            group.add(particle);
            bodyParts.push(particle);
        }
        
        // Torso particles
        for (let i = 0; i < 80; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.8
            });
            
            const particle = new THREE.Mesh(new THREE.SphereGeometry(0.025, 4, 3), material);
            
            const angle = (i / 80) * Math.PI * 2;
            const height = (i / 80) * 1.5;
            const radius = 0.3 + Math.sin(height * 2) * 0.1;
            
            particle.position.set(
                Math.cos(angle) * radius + (Math.random() - 0.5) * 0.2,
                2 - height,
                Math.sin(angle) * radius + (Math.random() - 0.5) * 0.2
            );
            
            particle.userData = {
                originalPos: particle.position.clone(),
                bodyPart: 'torso',
                explosionVelocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15
                )
            };
            
            group.add(particle);
            bodyParts.push(particle);
        }
        
        // Limb particles
        ['leftArm', 'rightArm', 'leftLeg', 'rightLeg'].forEach((limb, limbIndex) => {
            for (let i = 0; i < 30; i++) {
                const material = new THREE.MeshBasicMaterial({
                    color: colors[Math.floor(Math.random() * colors.length)],
                    transparent: true,
                    opacity: 0.8
                });
                
                const particle = new THREE.Mesh(new THREE.SphereGeometry(0.02, 4, 3), material);
                
                let basePos;
                switch(limb) {
                    case 'leftArm':
                        basePos = new THREE.Vector3(-0.5 - i * 0.02, 1.8 - i * 0.01, 0);
                        break;
                    case 'rightArm':
                        basePos = new THREE.Vector3(0.5 + i * 0.02, 1.8 - i * 0.01, 0);
                        break;
                    case 'leftLeg':
                        basePos = new THREE.Vector3(-0.15, 0.5 - i * 0.03, 0);
                        break;
                    case 'rightLeg':
                        basePos = new THREE.Vector3(0.15, 0.5 - i * 0.03, 0);
                        break;
                }
                
                particle.position.copy(basePos).add(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 0.1,
                        (Math.random() - 0.5) * 0.1,
                        (Math.random() - 0.5) * 0.1
                    )
                );
                
                particle.userData = {
                    originalPos: particle.position.clone(),
                    bodyPart: limb,
                    explosionVelocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20
                    )
                };
                
                group.add(particle);
                bodyParts.push(particle);
            }
        });
        
        group.userData = { bodyParts, type: 'particle-explosion' };
        return group;
    }

    /**
     * Create Liquid Metal figure (metallic human figure with flowing liquid effects)
     */
    createLiquidMetalFigure(scene, theme, palette) {
        const group = new THREE.Group();
        
        const material = new THREE.MeshPhongMaterial({
            color: parseInt(palette.secondary.replace('#', ''), 16),
            transparent: true,
            opacity: 0.9,
            shininess: 100,
            specular: 0x444444
        });
        
        // Human figure structure
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12), material.clone());
        head.position.y = 2.2;
        
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.2, 12), material.clone());
        torso.position.y = 1.2;
        
        const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8), material.clone());
        leftArm.position.set(-0.5, 1.6, 0);
        leftArm.rotation.z = 0.4;
        
        const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8), material.clone());
        rightArm.position.set(0.5, 1.6, 0);
        rightArm.rotation.z = -0.4;
        
        const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.0, 8), material.clone());
        leftLeg.position.set(-0.15, 0.3, 0);
        
        const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.0, 8), material.clone());
        rightLeg.position.set(0.15, 0.3, 0);
        
        group.add(head, torso, leftArm, rightArm, leftLeg, rightLeg);
        
        // Liquid drops
        const liquidDrops = [];
        for (let i = 0; i < 50; i++) {
            const drop = new THREE.Mesh(
                new THREE.SphereGeometry(0.05 + Math.random() * 0.03, 8, 6),
                new THREE.MeshPhongMaterial({
                    color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.3, 0.8),
                    transparent: true,
                    opacity: 0,
                    shininess: 200
                })
            );
            
            const angle = (i / 50) * Math.PI * 2;
            const radius = 0.5 + Math.random() * 0.3;
            drop.position.set(
                Math.cos(angle) * radius,
                3 + Math.random() * 0.5,
                Math.sin(angle) * radius
            );
            
            drop.userData = {
                startY: drop.position.y,
                speed: 0.02 + Math.random() * 0.03,
                delay: i * 0.05,
                flowing: false
            };
            
            group.add(drop);
            liquidDrops.push(drop);
        }
        
        group.userData = { liquidDrops, type: 'liquid-metal' };
        return group;
    }

    /**
     * Create Gradient Mesh figure (wireframe figure with gradient mesh layers)
     */
    createGradientMeshFigure(scene, theme, palette) {
        const group = new THREE.Group();
        
        // Main wireframe figure
        const material = new THREE.MeshBasicMaterial({
            color: parseInt(palette.accent.replace('#', ''), 16),
            transparent: true,
            opacity: 0.8,
            wireframe: true
        });
        
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12), material.clone());
        head.position.y = 2.2;
        
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.2, 12), material.clone());
        torso.position.y = 1.2;
        
        const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8), material.clone());
        leftArm.position.set(-0.5, 1.6, 0);
        leftArm.rotation.z = 0.3;
        
        const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8), material.clone());
        rightArm.position.set(0.5, 1.6, 0);
        rightArm.rotation.z = -0.3;
        
        const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.0, 8), material.clone());
        leftLeg.position.set(-0.15, 0.3, 0);
        
        const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.0, 8), material.clone());
        rightLeg.position.set(0.15, 0.3, 0);
        
        group.add(head, torso, leftArm, rightArm, leftLeg, rightLeg);
        
        // Gradient mesh layers
        const meshLayers = [];
        for (let layer = 0; layer < 5; layer++) {
            const meshLayer = new THREE.Group();
            const radius = 3 + layer * 0.8;
            
            const geometry = new THREE.SphereGeometry(radius, 32, 16);
            const vertices = geometry.attributes.position.array;
            const colors = [];
            
            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const y = vertices[i + 1];
                const z = vertices[i + 2];
                
                const hue = (layer * 0.2 + Math.atan2(z, x) / (Math.PI * 2) + 0.5) % 1;
                const saturation = 0.8;
                const lightness = 0.3 + (y / radius + 1) * 0.3;
                
                const color = new THREE.Color().setHSL(hue, saturation, lightness);
                colors.push(color.r, color.g, color.b);
            }
            
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            
            const meshMaterial = new THREE.MeshBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0,
                wireframe: true,
                side: THREE.DoubleSide
            });
            
            const mesh = new THREE.Mesh(geometry, meshMaterial);
            mesh.userData = {
                layer: layer,
                targetOpacity: 0.3 - layer * 0.05,
                rotationSpeed: 0.01 + layer * 0.002
            };
            
            meshLayer.add(mesh);
            group.add(meshLayer);
            meshLayers.push(meshLayer);
        }
        
        group.userData = { meshLayers, type: 'gradient-mesh' };
        return group;
    }

    /**
     * Create Constellation figure (human figure made of connected star points)
     */
    createConstellationFigure(scene, theme, palette) {
        const group = new THREE.Group();
        const humanStars = [];
        const connectionLines = [];
        
        // Define human constellation points
        const starPositions = [
            { x: 0, y: 2.5, z: 0, name: 'crown' },
            { x: -0.2, y: 2.3, z: 0.1, name: 'left_temple' },
            { x: 0.2, y: 2.3, z: 0.1, name: 'right_temple' },
            { x: 0, y: 1.8, z: 0, name: 'throat' },
            { x: -0.2, y: 1.5, z: 0, name: 'left_shoulder' },
            { x: 0.2, y: 1.5, z: 0, name: 'right_shoulder' },
            { x: 0, y: 1.2, z: 0, name: 'heart' },
            { x: 0, y: 0.8, z: 0, name: 'solar_plexus' },
            { x: -0.6, y: 1.4, z: 0, name: 'left_elbow' },
            { x: 0.6, y: 1.4, z: 0, name: 'right_elbow' },
            { x: -0.15, y: 0, z: 0, name: 'left_hip' },
            { x: 0.15, y: 0, z: 0, name: 'right_hip' },
            { x: -0.2, y: -0.6, z: 0, name: 'left_knee' },
            { x: 0.2, y: -0.6, z: 0, name: 'right_knee' },
            { x: -0.15, y: -1.2, z: 0, name: 'left_foot' },
            { x: 0.15, y: -1.2, z: 0, name: 'right_foot' }
        ];
        
        // Create stars
        starPositions.forEach((pos, index) => {
            const star = new THREE.Mesh(
                new THREE.SphereGeometry(0.05, 8, 6),
                new THREE.MeshBasicMaterial({
                    color: parseInt(palette.secondary.replace('#', ''), 16),
                    transparent: true,
                    opacity: 0.9
                })
            );
            
            star.position.set(pos.x, pos.y, pos.z);
            star.userData = {
                originalPos: star.position.clone(),
                name: pos.name,
                pulseSpeed: 0.02 + Math.random() * 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            };
            
            group.add(star);
            humanStars.push(star);
        });
        
        // Define connections
        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 3], // Head
            [0, 3], [3, 6], [6, 7], // Main body line
            [3, 4], [3, 5], // Shoulders
            [4, 8], [5, 9], // Arms
            [7, 10], [7, 11], // Hips
            [10, 12], [12, 14], // Left leg
            [11, 13], [13, 15] // Right leg
        ];
        
        // Create connection lines
        connections.forEach(connection => {
            const [startIndex, endIndex] = connection;
            const startPos = humanStars[startIndex].position;
            const endPos = humanStars[endIndex].position;
            
            const geometry = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
            const material = new THREE.LineBasicMaterial({
                color: parseInt(palette.secondary.replace('#', ''), 16),
                transparent: true,
                opacity: 0
            });
            
            const line = new THREE.Line(geometry, material);
            line.userData = {
                startIndex: startIndex,
                endIndex: endIndex,
                targetOpacity: 0.6
            };
            
            group.add(line);
            connectionLines.push(line);
        });
        
        group.userData = { humanStars, connectionLines, type: 'constellation' };
        return group;
    }

    /**
     * Create constellation geometry with connection points
     */
    createConstellationGeometry(theme) {
        const geometry = this.createParticleGeometry(theme);
        
        // Add connection data
        const connections = [];
        const positions = geometry.attributes.position.array;
        
        for (let i = 0; i < theme.particleCount; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            const y = positions[i3 + 1];
            const z = positions[i3 + 2];
            
            // Find nearby particles for connections
            for (let j = i + 1; j < theme.particleCount; j++) {
                const j3 = j * 3;
                const dx = positions[j3] - x;
                const dy = positions[j3 + 1] - y;
                const dz = positions[j3 + 2] - z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < 1.5 && Math.random() < 0.1) {
                    connections.push([i, j]);
                }
            }
        }
        
        geometry.userData.connections = connections;
        return geometry;
    }

    /**
     * Get animation function for current theme
     */
    getAnimationFunction() {
        const theme = this.getCurrentTheme();
        
        switch (theme.animation) {
            case 'dna-helix':
                return this.animateDNAHelix.bind(this);
            case 'growth-lines':
                return this.animateGrowthLines.bind(this);
            case 'breathing':
                return this.animateBreathing.bind(this);
            case 'floating':
                return this.animateFloating.bind(this);
            case 'poses':
                return this.animatePoses.bind(this);
            case 'walking':
                return this.animateWalking.bind(this);
            case 'explosion-reform':
                return this.animateExplosionReform.bind(this);
            case 'fluid-motion':
                return this.animateFluidMotion.bind(this);
            case 'gradient-flow':
                return this.animateGradientFlow.bind(this);
            case 'star-connection':
                return this.animateStarConnection.bind(this);
            default:
                return this.animateBreathing.bind(this);
        }
    }

    /**
     * Animation functions for different themes - updated to work with actual figure structures
     */
    animateDNAHelix(figure, time) {
        if (figure.userData?.type === 'soul-threads' && figure.userData.souls) {
            figure.userData.souls.forEach((soul, index) => {
                // Gentle drift
                soul.position.add(soul.userData.velocity);
                
                // Boundary check
                if (Math.abs(soul.position.x) > 20) soul.userData.velocity.x *= -1;
                if (Math.abs(soul.position.y) > 15) soul.userData.velocity.y *= -1;
                if (Math.abs(soul.position.z) > 10) soul.userData.velocity.z *= -1;
                
                // Breathing motion
                soul.position.y += Math.sin(time + soul.userData.phase) * 0.02;
                
                // Rotation
                soul.rotation.y = Math.sin(time * 0.5 + index) * 0.2;
                
                // Opacity pulse
                soul.children.forEach(child => {
                    child.material.opacity = 0.4 + Math.sin(time + soul.userData.phase) * 0.2;
                });
            });
        }
    }

    animateGrowthLines(figure, time) {
        // Same as DNA helix for this implementation
        this.animateDNAHelix(figure, time);
    }

    animateBreathing(figure, time) {
        const scale = 1 + Math.sin(time * 0.5) * 0.05;
        figure.scale.set(scale, scale, scale);
        figure.rotation.y = Math.sin(time * 0.2) * 0.1;
    }

    animateFloating(figure, time) {
        if (figure.userData?.type === 'memory-dots') {
            // Animate salt grains
            if (figure.userData.memories) {
                figure.userData.memories.forEach((grain) => {
                    grain.position.add(grain.userData.velocity);
                    
                    grain.rotation.x += 0.01;
                    grain.rotation.y += 0.01;
                    grain.rotation.z += 0.01;
                    
                    // Boundary check
                    if (Math.abs(grain.position.x) > 40) grain.userData.velocity.x *= -1;
                    if (Math.abs(grain.position.y) > 40) grain.userData.velocity.y *= -1;
                    if (Math.abs(grain.position.z) > 20) grain.userData.velocity.z *= -1;
                    
                    // Breathing effect
                    grain.position.x += Math.sin(time + grain.userData.phase) * 0.015;
                    grain.position.y += Math.cos(time * 0.8 + grain.userData.phase) * 0.015;
                    
                    // Damping
                    grain.userData.velocity.multiplyScalar(0.998);
                    
                    // Scale breathing
                    const breathScale = 1 + Math.sin(time * 0.7 + grain.userData.phase) * 0.1;
                    grain.scale.y = breathScale * 1.2;
                });
            }
            
            // Animate human figures when visible
            if (figure.userData.humanFigures) {
                figure.userData.humanFigures.forEach((humanFig) => {
                    if (humanFig.visible) {
                        humanFig.position.add(humanFig.userData.velocity);
                        
                        // Walking animation
                        humanFig.rotation.y = Math.sin(time * 2 + humanFig.userData.phase) * 0.1;
                        humanFig.position.y += Math.abs(Math.sin(time * 3 + humanFig.userData.phase)) * 0.05;
                        
                        // Fade in/out
                        humanFig.children.forEach(child => {
                            child.material.opacity += (humanFig.userData.targetOpacity - child.material.opacity) * 0.05;
                        });
                        
                        humanFig.userData.velocity.multiplyScalar(0.995);
                    }
                });
            }
        } else {
            figure.position.y += Math.sin(time + (figure.userData?.phase || 0)) * 0.01;
            figure.rotation.x = Math.sin(time * 0.3) * 0.05;
            figure.rotation.z = Math.cos(time * 0.4) * 0.05;
        }
    }

    animatePoses(figure, time) {
        if (figure.userData?.type === 'silhouette-grid' && figure.userData.silhouettes) {
            figure.userData.silhouettes.forEach((silhouette, index) => {
                const data = silhouette.userData;
                
                // Gentle floating
                silhouette.position.y = data.originalY + Math.sin(time * data.floatSpeed + data.floatOffset) * 0.05;
                
                // Very subtle rotation
                silhouette.rotation.z = Math.sin(time * 0.5 + index * 0.1) * 0.02;
            });
        } else {
            const poseTime = Math.floor(time * 0.1) % 8;
            figure.rotation.y = poseTime * Math.PI / 4;
        }
    }

    animateWalking(figure, time) {
        if (figure.userData?.type === 'solitary-walker') {
            const walkCycle = time * 0.03;
            
            // Walking animation for limbs
            const leftArm = figure.children.find(c => c.userData?.type === 'leftArm');
            const rightArm = figure.children.find(c => c.userData?.type === 'rightArm');
            const leftLeg = figure.children.find(c => c.userData?.type === 'leftLeg');
            const rightLeg = figure.children.find(c => c.userData?.type === 'rightLeg');
            
            // Arm swing
            if (leftArm) leftArm.rotation.x = Math.sin(walkCycle) * 0.4;
            if (rightArm) rightArm.rotation.x = -Math.sin(walkCycle) * 0.4;
            
            // Leg movement
            if (leftLeg) leftLeg.rotation.x = -Math.sin(walkCycle) * 0.5;
            if (rightLeg) rightLeg.rotation.x = Math.sin(walkCycle) * 0.5;
            
            // Subtle body movement
            figure.position.y = Math.abs(Math.sin(walkCycle * 2)) * 0.05;
            figure.rotation.y = Math.sin(time * 0.5) * 0.1;
            
            // Forward movement
            figure.position.z = Math.sin(time * 0.3) * 2;
            figure.position.x = Math.cos(time * 0.2) * 3;
        } else {
            const walkCycle = Math.sin(time * 2);
            figure.rotation.z = walkCycle * 0.1;
            figure.position.y += Math.abs(walkCycle) * 0.02;
        }
    }

    animateExplosionReform(figure, time) {
        if (figure.userData?.type === 'particle-explosion' && figure.userData.bodyParts) {
            figure.userData.bodyParts.forEach((particle, index) => {
                // Idle breathing animation
                const breathe = Math.sin(time * 0.8 + index * 0.01) * 0.02;
                particle.position.copy(particle.userData.originalPos);
                particle.position.y += breathe;
                
                // Gentle color shifting
                const hue = 0.08 + Math.sin(time * 0.5 + index * 0.1) * 0.02;
                particle.material.color.setHSL(hue, 0.8, 0.6);
                particle.material.opacity = 0.8;
                particle.scale.setScalar(1);
            });
        }
    }

    animateFluidMotion(figure, time) {
        if (figure.userData?.type === 'liquid-metal') {
            // Animate human figure - slight movements
            figure.rotation.y = Math.sin(time * 0.2) * 0.1;
            figure.children.forEach((part, index) => {
                if (part.isGroup) return; // Skip liquid drops
                
                const breathe = Math.sin(time * 0.6 + index * 0.2) * 0.02;
                part.scale.setScalar(1 + breathe);
                
                // Metallic color shifting
                const metallic = 0.7 + Math.sin(time * 0.5 + index) * 0.2;
                if (part.material?.color) {
                    part.material.color.setHSL(0, 0, metallic);
                }
            });
            
            // Animate liquid drops if flowing
            if (figure.userData.liquidDrops) {
                figure.userData.liquidDrops.forEach((drop, index) => {
                    if (drop.userData.flowing) {
                        // Flow downward with gravity
                        drop.position.y -= drop.userData.speed;
                        
                        // Add turbulence
                        drop.position.x += Math.sin(time * 2 + index) * 0.002;
                        drop.position.z += Math.cos(time * 2 + index) * 0.002;
                        
                        // Color shifting
                        const hue = 0.6 + Math.sin(time + index * 0.1) * 0.1;
                        drop.material.color.setHSL(hue, 0.3, 0.8);
                        
                        // Reset when drop reaches bottom
                        if (drop.position.y < -3) {
                            drop.position.y = drop.userData.startY;
                            drop.scale.set(1, 1, 1);
                        }
                    }
                });
            }
        } else {
            figure.rotation.y = time * 0.1;
            const scale = 1 + Math.sin(time * 0.3) * 0.1;
            figure.scale.set(scale, 1, scale);
        }
    }

    animateGradientFlow(figure, time) {
        if (figure.userData?.type === 'gradient-mesh') {
            // Animate main wireframe figure
            figure.rotation.y = Math.sin(time * 0.3) * 0.2;
            figure.children.forEach((part, index) => {
                if (part.userData?.layer !== undefined) return; // Skip mesh layers
                
                const breathe = Math.sin(time * 0.8 + index * 0.2) * 0.02;
                part.scale.setScalar(1 + breathe);
                
                // Color shifting for wireframe
                const hue = (time * 0.1 + index * 0.1) % 1;
                part.material.color.setHSL(hue, 0.8, 0.6);
            });
            
            // Animate mesh layers
            if (figure.userData.meshLayers) {
                figure.userData.meshLayers.forEach((layer, layerIndex) => {
                    const mesh = layer.children[0];
                    if (mesh) {
                        // Rotation
                        mesh.rotation.y += mesh.userData.rotationSpeed;
                        mesh.rotation.x = Math.sin(time * 0.1 + layerIndex) * 0.1;
                        
                        // Scale breathing
                        const scale = 1 + Math.sin(time * 0.5 + layerIndex * 0.5) * 0.05;
                        mesh.scale.setScalar(scale);
                    }
                });
            }
        }
    }

    animateStarConnection(figure, time) {
        if (figure.userData?.type === 'constellation') {
            // Animate constellation stars
            if (figure.userData.humanStars) {
                figure.userData.humanStars.forEach((star, index) => {
                    // Gentle breathing motion
                    const breathe = Math.sin(time * 0.8 + index * 0.1) * 0.05;
                    star.position.copy(star.userData.originalPos);
                    star.position.y += breathe;
                    
                    // Pulsing brightness
                    const pulse = Math.sin(time * star.userData.pulseSpeed + star.userData.pulsePhase);
                    star.material.opacity = 0.7 + pulse * 0.3;
                    
                    // Color shifting
                    const hue = 0.65 + Math.sin(time * 0.1 + index * 0.2) * 0.1;
                    star.material.color.setHSL(hue, 0.8, 0.7);
                    
                    // Scale pulsing
                    const scale = 1 + pulse * 0.2;
                    star.scale.setScalar(scale);
                });
            }
            
            // Update connection lines
            if (figure.userData.connectionLines) {
                figure.userData.connectionLines.forEach((line, index) => {
                    // Update line geometry based on star positions
                    const startPos = figure.userData.humanStars[line.userData.startIndex].position;
                    const endPos = figure.userData.humanStars[line.userData.endIndex].position;
                    line.geometry.setFromPoints([startPos, endPos]);
                    
                    // Gentle pulsing
                    const pulse = Math.sin(time * 0.5 + index * 0.3) * 0.2;
                    line.material.opacity = Math.max(0, line.userData.targetOpacity + pulse);
                });
            }
            
            // Slow orbit
            const radius = 15;
            figure.position.x = Math.cos(time * 0.05) * 2;
            figure.position.z = Math.sin(time * 0.05) * 2;
            figure.position.y = Math.sin(time * 0.03) * 1;
        }
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HumanFigureThemeSystem;
} else {
    window.HumanFigureThemeSystem = HumanFigureThemeSystem;
}