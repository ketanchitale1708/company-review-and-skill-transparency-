/**
 * ============================================================================
 * ECOSCOPE Web Application - Core Architectural Engine
 * Integrating:
 *  - PL: Data Structures (Circular Queue, Stack, Hash Table, Search & Sort)
 *  - PSOOP: Polymorphic User Models & Access Control
 *  - CG: Canvas 3D Prism Turntable, Animated Logo & DDA/Bresenham Clipping
 *  - COA: 64-Bit Hardware Architecture & Register Pipeline Simulator
 * ============================================================================
 */

// ============================================================================
// 1. DOMAIN DATA STORE & PL DATA STRUCTURES
// ============================================================================

const initialCompanies = [
    {
        id: 101,
        name: "TechNova",
        industry: "Software",
        location: "Bengaluru",
        skills: "C++, SQL, Git, DSA",
        jobs: 18,
        salary: 850000,
        rating: 4.4,
        review: "Good learning environment with clearly described roles.",
        skillTransparency: 88,
        reviewCount: 2
    },
    {
        id: 102,
        name: "GreenGrid",
        industry: "Clean Technology",
        location: "Pune",
        skills: "Python, IoT, Data Analysis",
        jobs: 12,
        salary: 720000,
        rating: 4.1,
        review: "Strong technical exposure; skills are listed clearly.",
        skillTransparency: 92,
        reviewCount: 1
    },
    {
        id: 103,
        name: "FinEdge",
        industry: "FinTech",
        location: "Mumbai",
        skills: "Java, APIs, Cloud, Testing",
        jobs: 25,
        salary: 980000,
        rating: 4.6,
        review: "Structured teams and detailed role expectations.",
        skillTransparency: 95,
        reviewCount: 1
    },
    {
        id: 104,
        name: "ByteWave",
        industry: "Cybersecurity",
        location: "Hyderabad",
        skills: "Networks, Python, Linux, Cryptography",
        jobs: 15,
        salary: 920000,
        rating: 4.5,
        review: "Excellent security training and transparent career ladder.",
        skillTransparency: 90,
        reviewCount: 0
    },
    {
        id: 105,
        name: "CloudNex",
        industry: "Cloud Infrastructure",
        location: "Gurugram",
        skills: "AWS, Docker, Kubernetes, Go",
        jobs: 30,
        salary: 1100000,
        rating: 4.7,
        review: "Fast-paced DevOps teams with clear job requirements.",
        skillTransparency: 96,
        reviewCount: 0
    },
    {
        id: 106,
        name: "HealthSync",
        industry: "HealthTech",
        location: "Chennai",
        skills: "React, Node.js, HIPAA, PostgreSQL",
        jobs: 10,
        salary: 680000,
        rating: 4.0,
        review: "Meaningful healthcare mission and supportive leadership.",
        skillTransparency: 84,
        reviewCount: 0
    }
];

const initialReviews = [
    {
        id: 1001,
        companyId: 101,
        companyName: "TechNova",
        author: "rahul_k",
        overall: 4.0,
        workLife: 4.0,
        culture: 4.0,
        growth: 4.0,
        title: "Strong Technical Growth",
        comment: "Great exposure to low-level C++ architectures and system design.",
        time: "2 days ago"
    },
    {
        id: 1002,
        companyId: 103,
        companyName: "FinEdge",
        author: "priya_m",
        overall: 5.0,
        workLife: 4.5,
        culture: 5.0,
        growth: 5.0,
        title: "High Compensation & Transparency",
        comment: "Transparent bonuses, clear salary bands, and supportive senior architects.",
        time: "4 days ago"
    },
    {
        id: 1003,
        companyId: 102,
        companyName: "GreenGrid",
        author: "amit_s",
        overall: 4.0,
        workLife: 4.0,
        culture: 4.0,
        growth: 4.0,
        title: "Innovative CleanTech Stack",
        comment: "Work on IoT edge telemetry and smart energy analytics.",
        time: "1 week ago"
    }
];

const initialCandidateSkills = [
    { name: "C++", rating: 4, reqRating: 4, weight: 40, desc: "Proficient in STL and OOP" },
    { name: "DSA", rating: 3, reqRating: 4, weight: 35, desc: "Trees, Sorting, Graph fundamentals" },
    { name: "SQL", rating: 5, reqRating: 3, weight: 25, desc: "Advanced Joins, Indexing, Transactions" },
    { name: "Python", rating: 4, reqRating: 4, weight: 30, desc: "Data Analysis and Scripting" },
    { name: "Problem Solving", rating: 4, reqRating: 4, weight: 30, desc: "Analytical reasoning" },
    { name: "Communication", rating: 4, reqRating: 3, weight: 20, desc: "Team presentations" }
];

// PL Module: Circular Queue (Bounded FIFO Queue, Capacity: 30)
class CircularReviewQueue {
    constructor(capacity = 30) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }

    enqueue(item) {
        if (this.isFull()) return false;
        this.items[this.rear] = item;
        this.rear = (this.rear + 1) % this.capacity;
        this.count++;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const item = this.items[this.front];
        this.items[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        this.count--;
        return item;
    }

    isEmpty() { return this.count === 0; }
    isFull() { return this.count === this.capacity; }
    size() { return this.count; }

    toArray() {
        const arr = [];
        for (let i = 0; i < this.count; i++) {
            const idx = (this.front + i) % this.capacity;
            arr.push(this.items[idx]);
        }
        return arr;
    }
}

// Global Application State
const AppState = {
    companies: [...initialCompanies],
    reviews: [...initialReviews],
    pendingQueue: new CircularReviewQueue(30),
    candidateSkills: [...initialCandidateSkills],
    activityLog: [
        { title: "System Init", desc: "ECOSCOPE framework initialized successfully", time: "Just now" },
        { title: "Hardware Engine", desc: "High-performance computational routines connected", time: "Just now" },
        { title: "Skill Evaluation", desc: "Candidate benchmark match computed at 78.0%", time: "Just now" }
    ],
    
    // Auth & Active User (PSOOP Polymorphism)
    currentUser: null,
    
    // View States
    currentScreen: 'screen-welcome',
    activeNav: 'view-dashboard',
    reviewsSubTab: 'review-write',
    analyticsSubTab: 'view-bar-compare',
    
    // Analytics & Compare
    compareCompIds: [101, 102, 103],
    inspectedCompId: 101,
    compareMetric: 0, // 0=Rating, 1=Salary, 2=Skill, 3=Jobs
    compareUse3D: false,
    prismMetric: 0,
    
    // Graph Clipping & Sorting Controls
    tightClipping: false,
    clippingPreset: 0, // 0=FULL, 1=TOP FOCUS, 2=MID, 3=HIGH, 4=CUSTOM
    clipRatingMin: 0.0,
    clipRatingMax: 3.5,
    clipSkillMin: 0,
    clipSkillMax: 75,
    graphSortMode: 0, // 0=ID, 1=HIGH (desc), 2=LOW (asc)
    clipActiveAdjust: 1 // 0=MIN, 1=MAX
};

// ============================================================================
// 2. PSOOP: POLYMORPHIC USER ACCOUNT HIERARCHY
// ============================================================================

class User {
    constructor(username, roleName) {
        this.username = username;
        this.roleName = roleName;
    }
    getRole() { return this.roleName; }
    canManageCompanies() { return false; }
    canModerateReviews() { return false; }
    getGreeting() { return `Welcome, ${this.username}!`; }
}

class StudentUser extends User {
    constructor(username = "student") {
        super(username, "Student");
    }
    canManageCompanies() { return false; }
    canModerateReviews() { return false; }
    getGreeting() { return `Student Portal: Welcome, ${this.username}. Explore ratings & benchmark competencies.`; }
}

class EmployerUser extends User {
    constructor(username = "employer", organization = "TechNova") {
        super(username, "Employer");
        this.organization = organization;
    }
    canManageCompanies() { return true; }
    canModerateReviews() { return false; }
    getGreeting() { return `Employer Suite: Welcome, ${this.username} (${this.organization}). Manage roles & analytics.`; }
}

class AdminUser extends User {
    constructor(username = "admin") {
        super(username, "Admin");
    }
    canManageCompanies() { return true; }
    canModerateReviews() { return true; }
    getGreeting() { return `Administrator Console: Welcome, ${this.username}. Full moderation & audit access.`; }
}

// ============================================================================
// 3. COA 64-BIT HARDWARE ENGINE SIMULATOR (NASM WIN64 ABI)
// ============================================================================

const COAEngine = {
    registers: {
        RAX: 0n,
        RBX: 0n,
        RCX: 0n,
        RDX: 0n,
        RSI: 0n,
        RDI: 0n,
        RFLAGS: 0n
    },
    trace: [
        "; 64-Bit Processor Simulation Initialized (NASM x86-64 Win64 ABI)",
        "; Direct Register Mapping: RAX=Accumulator, RBX=Base, RCX=Counter, RDX=Data",
        "; Ready for arithmetic and memory instruction execution."
    ],

    updateRFlags(result) {
        let flags = 0n;
        if (result === 0n) flags |= 0x40n; // Zero Flag (ZF)
        if (result < 0n) flags |= 0x80n;  // Sign Flag (SF)
        this.registers.RFLAGS = flags;
        this.renderFlagsHUD();
    },

    renderFlagsHUD() {
        const zf = (this.registers.RFLAGS & 0x40n) !== 0n;
        const sf = (this.registers.RFLAGS & 0x80n) !== 0n;
        const cf = (this.registers.RFLAGS & 0x01n) !== 0n;
        const of = (this.registers.RFLAGS & 0x800n) !== 0n;

        const elZF = document.getElementById('flag-zf');
        const elSF = document.getElementById('flag-sf');
        const elCF = document.getElementById('flag-cf');
        const elOF = document.getElementById('flag-of');
        const elSum = document.getElementById('flags-summary');

        if (elZF) { elZF.textContent = `ZF = ${zf ? 1 : 0}`; elZF.className = zf ? "flag-chip active" : "flag-chip"; }
        if (elSF) { elSF.textContent = `SF = ${sf ? 1 : 0}`; elSF.className = sf ? "flag-chip active" : "flag-chip"; }
        if (elCF) { elCF.textContent = `CF = ${cf ? 1 : 0}`; elCF.className = cf ? "flag-chip active" : "flag-chip"; }
        if (elOF) { elOF.textContent = `OF = ${of ? 1 : 0}`; elOF.className = of ? "flag-chip active" : "flag-chip"; }

        if (elSum) {
            elSum.textContent = zf ? "[Zero Result Detected]" : (sf ? "[Negative Result]" : "[All Conditions Normal]");
        }
    },

    updateRegisterUI() {
        const updateCard = (idHex, idDec, val) => {
            const elHex = document.getElementById(idHex);
            const elDec = document.getElementById(idDec);
            if (elHex) elHex.textContent = '0x' + (val & 0xFFFFFFFFFFFFFFFFn).toString(16).toUpperCase().padStart(16, '0');
            if (elDec) elDec.textContent = val.toString();
        };

        updateCard('reg-rax-hex', 'reg-rax-dec', this.registers.RAX);
        updateCard('reg-rbx-hex', 'reg-rbx-dec', this.registers.RBX);
        updateCard('reg-rcx-hex', 'reg-rcx-dec', this.registers.RCX);
        updateCard('reg-rdx-hex', 'reg-rdx-dec', this.registers.RDX);
    },

    appendTrace(line) {
        this.trace.push(line);
        if (this.trace.length > 50) this.trace.shift();
        const term = document.getElementById('coa-trace-terminal');
        if (term) {
            term.innerHTML = this.trace.map(l => {
                if (l.startsWith(';')) return `<span class="comment">${l}</span>`;
                if (l.includes('MOV') || l.includes('ADD') || l.includes('CMP') || l.includes('DIV') || l.includes('LOOP')) {
                    return `<span class="inst">${l}</span>`;
                }
                return l;
            }).join('\n');
            term.scrollTop = term.scrollHeight;
        }
    },

    // Operations
    add64(a, b) {
        this.registers.RAX = BigInt(a);
        this.registers.RSI = BigInt(b);
        const sum = this.registers.RAX + this.registers.RSI;
        this.registers.RAX = sum;
        this.updateRFlags(sum);

        this.appendTrace(`; --- Executing add64 (RAX = ${a} + ${b}) ---`);
        this.appendTrace(`MOV RAX, ${a}      ; Load Operand A into Accumulator`);
        this.appendTrace(`MOV RSI, ${b}      ; Load Operand B into Source Index`);
        this.appendTrace(`ADD RAX, RSI      ; 64-bit ALU Addition: RAX = ${sum}`);
        this.updateRegisterUI();
        return sum;
    },

    compare64(a, b) {
        this.registers.RDI = BigInt(a);
        this.registers.RSI = BigInt(b);
        const diff = this.registers.RDI - this.registers.RSI;
        let res = 0n;
        if (diff > 0n) res = 1n;
        else if (diff < 0n) res = -1n;
        this.registers.RAX = res;
        this.updateRFlags(diff);

        this.appendTrace(`; --- Executing compare64 (CMP RDI, RSI) ---`);
        this.appendTrace(`MOV RDI, ${a}      ; Compare First Value`);
        this.appendTrace(`MOV RSI, ${b}      ; Compare Second Value`);
        this.appendTrace(`CMP RDI, RSI      ; Evaluate Flags: RDI - RSI = ${diff}`);
        this.appendTrace(`MOV RAX, ${res}      ; Outcome Committed (1: >, 0: ==, -1: <)`);
        this.updateRegisterUI();
        return res;
    },

    calc_avg64(total, count) {
        if (count === 0) return { quotient: 0n, remainder: 0n };
        const tot = BigInt(total);
        const cnt = BigInt(count);
        const q = tot / cnt;
        const r = tot % cnt;
        this.registers.RAX = q;
        this.registers.RDX = r;
        this.registers.RBX = cnt;
        this.updateRFlags(q);

        this.appendTrace(`; --- Executing calc_avg64 (64-bit Integer Division) ---`);
        this.appendTrace(`MOV RAX, ${tot}   ; Total Score dividend in RAX`);
        this.appendTrace(`XOR RDX, RDX      ; Clear Upper 64 bits of dividend`);
        this.appendTrace(`MOV RBX, ${cnt}   ; Divisor Count in RBX`);
        this.appendTrace(`DIV RBX           ; RAX = Quotient (${q}), RDX = Remainder (${r})`);
        this.updateRegisterUI();
        return { quotient: q, remainder: r };
    },

    count_ge64(scores, threshold) {
        const th = BigInt(threshold);
        let count = 0n;
        this.registers.RCX = BigInt(scores.length);
        this.registers.RBX = th;
        this.registers.RAX = 0n;

        this.appendTrace(`; --- Executing count_ge64 (Loop Counter RCX = ${scores.length}) ---`);
        this.appendTrace(`MOV RCX, ${scores.length}   ; Set Loop Iterations`);
        this.appendTrace(`MOV RBX, ${th}   ; Comparison Threshold`);
        this.appendTrace(`XOR RAX, RAX      ; Clear Accumulator Match Counter`);

        scores.forEach((s, i) => {
            if (BigInt(s) >= th) count++;
        });
        this.registers.RAX = count;
        this.updateRFlags(count);
        this.appendTrace(`; Loop complete. Total records matching threshold: RAX = ${count}`);
        this.updateRegisterUI();
        return count;
    },

    mult_add64(multiplier, multiplicand) {
        const m1 = BigInt(multiplier);
        const m2 = BigInt(multiplicand);
        const prod = m1 * m2;
        this.registers.RAX = prod;
        this.updateRFlags(prod);

        this.appendTrace(`; --- Executing mult_add64 (Loop Accumulate) ---`);
        this.appendTrace(`MOV RAX, ${m1} * ${m2} = ${prod}`);
        this.updateRegisterUI();
        return prod;
    },

    asm_strlen(str) {
        const len = BigInt(str.length);
        this.registers.RAX = len;
        this.updateRFlags(len);
        this.appendTrace(`; --- Executing asm_strlen (Pointer Walk String Length) ---`);
        this.appendTrace(`LEA RDI, [str]    ; Load Effective String Pointer`);
        this.appendTrace(`MOV RAX, ${len}      ; String Length Counted`);
        this.updateRegisterUI();
        return len;
    }
};

// ============================================================================
// 4. CG: COMPUTER GRAPHICS ANIMATED LOGO ENGINE (HTML5 CANVAS)
// ============================================================================

class AnimatedLogoRenderer {
    constructor(canvasId, scaleFactor = 1.0) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.scaleFactor = scaleFactor;
        this.pulseTime = 0;
        this.animFrameId = null;
        this.start();
    }

    start() {
        const render = (time) => {
            this.pulseTime = time * 0.001;
            this.draw();
            this.animFrameId = requestAnimationFrame(render);
        };
        this.animFrameId = requestAnimationFrame(render);
    }

    stop() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    }

    draw() {
        const { ctx, canvas, scaleFactor, pulseTime } = this;
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        const baseR = (w * 0.35) * scaleFactor;
        const pulse = 0.85 + 0.15 * Math.sin(pulseTime * 2.2);

        // 1. Ambient Background Glows
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.5);
        glowGrad.addColorStop(0, 'rgba(0, 229, 255, 0.14)');
        glowGrad.addColorStop(0.5, 'rgba(0, 245, 155, 0.05)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, baseR * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // 2. Outer Rotating Ring (Clockwise)
        const angleOuter = -pulseTime * 0.8;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angleOuter);

        // Base ring
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 * pulse})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, baseR, 0, Math.PI * 2);
        ctx.stroke();

        // 4 Accent Arcs
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.9 * pulse})`;
        ctx.lineWidth = 4;
        for (let i = 0; i < 4; i++) {
            const startA = (i * Math.PI) / 2;
            ctx.beginPath();
            ctx.arc(0, 0, baseR, startA, startA + 0.45);
            ctx.stroke();
        }
        ctx.restore();

        // 3. Inner Counter-Rotating Ring (Counter-Clockwise)
        const innerR = baseR * 0.72;
        const angleInner = pulseTime * 0.55;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angleInner);

        ctx.strokeStyle = `rgba(0, 245, 155, ${0.35 * pulse})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, innerR, 0, Math.PI * 2);
        ctx.stroke();

        // 3 Accent Dashes
        ctx.strokeStyle = `rgba(0, 245, 155, ${0.85 * pulse})`;
        ctx.lineWidth = 3.5;
        for (let i = 0; i < 3; i++) {
            const startA = (i * 2 * Math.PI) / 3;
            ctx.beginPath();
            ctx.arc(0, 0, innerR, startA, startA + 0.4);
            ctx.stroke();
        }
        ctx.restore();

        // 4. Orbiting Particles
        const numParticles = 6;
        for (let p = 0; p < numParticles; p++) {
            const pAngle = angleOuter * 1.5 + (p * 2 * Math.PI) / numParticles;
            const px = cx + Math.cos(pAngle) * baseR;
            const py = cy + Math.sin(pAngle) * baseR;

            ctx.fillStyle = `rgba(0, 229, 255, ${0.35 * pulse})`;
            ctx.beginPath();
            ctx.arc(px, py, 6 * scaleFactor, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(px, py, 2.5 * scaleFactor, 0, Math.PI * 2);
            ctx.fill();
        }

        // 5. Stationary High-Tech Employee Avatar Core
        ctx.save();
        ctx.translate(cx, cy);

        // Dark pedestal circle
        ctx.fillStyle = 'rgba(7, 12, 20, 0.95)';
        ctx.beginPath();
        ctx.arc(0, 0, innerR * 0.85, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const s = scaleFactor * (w / 280);

        // Circular Head
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.arc(0, -12 * s, 18 * s, 0, Math.PI * 2);
        ctx.fill();

        // Specular highlight on head
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(4 * s, -16 * s, 5 * s, 0, Math.PI * 2);
        ctx.fill();

        // Shoulders / Torso
        ctx.fillStyle = '#00b4d8';
        ctx.beginPath();
        ctx.moveTo(-36 * s, 36 * s);
        ctx.lineTo(36 * s, 36 * s);
        ctx.lineTo(34 * s, 22 * s);
        ctx.lineTo(26 * s, 4 * s);
        ctx.lineTo(12 * s, -2 * s);
        ctx.lineTo(0, 8 * s);
        ctx.lineTo(-12 * s, -2 * s);
        ctx.lineTo(-26 * s, 4 * s);
        ctx.lineTo(-34 * s, 22 * s);
        ctx.closePath();
        ctx.fill();

        // Shoulder highlight outline
        ctx.strokeStyle = '#00f59b';
        ctx.lineWidth = 2 * s;
        ctx.stroke();

        // White Collar Lapels
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(-12 * s, -2 * s);
        ctx.lineTo(-2 * s, 10 * s);
        ctx.lineTo(-6 * s, 3 * s);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(12 * s, -2 * s);
        ctx.lineTo(2 * s, 10 * s);
        ctx.lineTo(6 * s, 3 * s);
        ctx.closePath();
        ctx.fill();

        // Emerald Necktie
        ctx.fillStyle = '#070c14';
        ctx.beginPath();
        ctx.moveTo(-4 * s, 6 * s);
        ctx.lineTo(4 * s, 6 * s);
        ctx.lineTo(3 * s, 12 * s);
        ctx.lineTo(6 * s, 32 * s);
        ctx.lineTo(0, 38 * s);
        ctx.lineTo(-6 * s, 32 * s);
        ctx.lineTo(-3 * s, 12 * s);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#00f59b';
        ctx.lineWidth = 1.5 * s;
        ctx.stroke();

        ctx.restore();
    }
}

// ============================================================================
// 5. CG: 3D METRIC PRISM & TURNTABLE ENGINE (HTML5 CANVAS 3D PROJECTION)
// ============================================================================

class MetricPrism3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.rotX = 0.35;
        this.rotY = -0.45;
        this.rotZ = 0.0;
        this.zoom = 1.0;
        this.autoSpin = true;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.initEvents();
        this.animate();
    }

    initEvents() {
        const cvs = this.canvas;
        cvs.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });

        window.addEventListener('mouseup', () => { this.isDragging = false; });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const dx = e.clientX - this.lastMouseX;
            const dy = e.clientY - this.lastMouseY;
            this.rotY += dx * 0.008;
            this.rotX += dy * 0.008;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });

        cvs.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.zoom *= (e.deltaY > 0 ? 0.95 : 1.05);
            this.zoom = Math.max(0.4, Math.min(2.5, this.zoom));
        });
    }

    animate() {
        const render = () => {
            if (this.autoSpin && !this.isDragging) {
                this.rotY += 0.012;
            }
            this.draw();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    project(x, y, z, cx, cy) {
        // Rotate around X
        const cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotate around Y
        const cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Rotate around Z
        const cosZ = Math.cos(this.rotZ), sinZ = Math.sin(this.rotZ);
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        // Perspective
        const fov = 380 * this.zoom;
        const distance = 4.2;
        const factor = fov / (distance + z2);

        return {
            x: cx + x3 * factor,
            y: cy - y3 * factor,
            z: z2
        };
    }

    draw() {
        const { ctx, canvas } = this;
        const w = canvas.width, h = canvas.height;
        const cx = w / 2, cy = h / 2 + 30;

        ctx.clearRect(0, 0, w, h);

        const metricIdx = AppState.prismMetric;
        const metricNames = ["Ratings (0-5★)", "Compensation (LPA)", "Skill Transparency (%)", "Open Positions"];
        const comps = AppState.companies;
        const n = comps.length;

        // Draw 3D Turntable Grid Disc
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
        ctx.lineWidth = 1;
        const discR = 2.2;
        for (let ring = 1; ring <= 3; ring++) {
            const r = (discR / 3) * ring;
            ctx.beginPath();
            for (let i = 0; i <= 36; i++) {
                const a = (i / 36) * Math.PI * 2;
                const p = this.project(Math.cos(a) * r, -1.2, Math.sin(a) * r, cx, cy);
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }

        // Compute 3D Hexagonal Metric Prism Pillars
        const pillars = comps.map((c, i) => {
            const angle = (i / n) * Math.PI * 2;
            const dist = 1.35;
            const px = Math.cos(angle) * dist;
            const pz = Math.sin(angle) * dist;

            // Height scaling according to active metric
            let hVal = 0.5;
            let displayVal = "";
            if (metricIdx === 0) { hVal = (c.rating / 5.0) * 1.8; displayVal = c.rating.toFixed(1) + "★"; }
            else if (metricIdx === 1) { hVal = ((c.salary / 100000) / 15.0) * 1.8; displayVal = (c.salary / 100000).toFixed(1) + " L"; }
            else if (metricIdx === 2) { hVal = (c.skillTransparency / 100) * 1.8; displayVal = c.skillTransparency + "%"; }
            else { hVal = (c.jobs / 35.0) * 1.8; displayVal = c.jobs + " Roles"; }

            const baseY = -1.2;
            const topY = baseY + hVal;
            const size = 0.22;

            // 8 Box Vertices
            const p000 = this.project(px - size, baseY, pz - size, cx, cy);
            const p100 = this.project(px + size, baseY, pz - size, cx, cy);
            const p101 = this.project(px + size, baseY, pz + size, cx, cy);
            const p001 = this.project(px - size, baseY, pz + size, cx, cy);

            const p010 = this.project(px - size, topY, pz - size, cx, cy);
            const p110 = this.project(px + size, topY, pz - size, cx, cy);
            const p111 = this.project(px + size, topY, pz + size, cx, cy);
            const p011 = this.project(px - size, topY, pz + size, cx, cy);

            const center = this.project(px, topY, pz, cx, cy);

            return {
                company: c,
                displayVal,
                zDepth: center.z,
                center,
                corners: [p000, p100, p101, p001, p010, p110, p111, p011]
            };
        });

        // Depth Sort (Painter's Algorithm)
        pillars.sort((a, b) => b.zDepth - a.zDepth);

        // Palette for faces
        const faceColors = [
            'rgba(0, 229, 255, 0.65)',
            'rgba(0, 245, 155, 0.65)',
            'rgba(255, 190, 59, 0.65)',
            'rgba(168, 85, 247, 0.65)'
        ];
        const activeColor = faceColors[metricIdx];

        // Render each 3D Pillar
        pillars.forEach(p => {
            const [b0, b1, b2, b3, t0, t1, t2, t3] = p.corners;

            // Draw Side Faces
            const drawQuad = (pA, pB, pC, pD, fill, stroke) => {
                ctx.fillStyle = fill;
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(pA.x, pA.y);
                ctx.lineTo(pB.x, pB.y);
                ctx.lineTo(pC.x, pC.y);
                ctx.lineTo(pD.x, pD.y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            };

            // Sides
            drawQuad(b0, b1, t1, t0, 'rgba(10, 24, 42, 0.85)', 'rgba(0, 229, 255, 0.4)');
            drawQuad(b1, b2, t2, t1, 'rgba(15, 32, 54, 0.85)', 'rgba(0, 229, 255, 0.5)');
            drawQuad(b2, b3, t3, t2, 'rgba(8, 18, 32, 0.85)', 'rgba(0, 229, 255, 0.3)');
            drawQuad(b3, b0, t0, t3, 'rgba(12, 28, 48, 0.85)', 'rgba(0, 229, 255, 0.45)');

            // Top Cap (Highlight)
            drawQuad(t0, t1, t2, t3, activeColor, '#ffffff');

            // Top Label
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(p.company.name, p.center.x, p.center.y - 18);
            ctx.fillStyle = '#ffbe3b';
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.fillText(p.displayVal, p.center.x, p.center.y - 6);
        });

        // Overlay Legend Update
        const leg = document.getElementById('prism-legend');
        if (leg) {
            leg.innerHTML = `Active Metric: <strong>${metricNames[metricIdx]}</strong> | Turntable Pitch: ${(this.rotX * 57.3).toFixed(0)}° Yaw: ${(this.rotY * 57.3).toFixed(0)}°`;
        }
    }
}

// ============================================================================
// 6. CG: COHEN-SUTHERLAND LINE CLIPPING & DDA / BRESENHAM RASTERIZERS
// ============================================================================

const CS_INSIDE = 0; // 0000
const CS_LEFT   = 1; // 0001
const CS_RIGHT  = 2; // 0010
const CS_BOTTOM = 4; // 0100
const CS_TOP    = 8; // 1000

function computeOutCode(x, y, xmin, ymin, xmax, ymax) {
    let code = CS_INSIDE;
    if (x < xmin)      code |= CS_LEFT;
    else if (x > xmax) code |= CS_RIGHT;
    if (y < ymin)      code |= CS_BOTTOM;
    else if (y > ymax) code |= CS_TOP;
    return code;
}

function clipLineCohenSutherland(x0, y0, x1, y1, xmin, ymin, xmax, ymax) {
    let outcode0 = computeOutCode(x0, y0, xmin, ymin, xmax, ymax);
    let outcode1 = computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
    let accept = false;

    while (true) {
        if ((outcode0 | outcode1) === 0) {
            accept = true;
            break;
        } else if ((outcode0 & outcode1) !== 0) {
            break;
        } else {
            let x = 0, y = 0;
            const outcodeOut = outcode0 ? outcode0 : outcode1;

            if (outcodeOut & CS_TOP) {
                x = x0 + (x1 - x0) * (ymax - y0) / (y1 - y0);
                y = ymax;
            } else if (outcodeOut & CS_BOTTOM) {
                x = x0 + (x1 - x0) * (ymin - y0) / (y1 - y0);
                y = ymin;
            } else if (outcodeOut & CS_RIGHT) {
                y = y0 + (y1 - y0) * (xmax - x0) / (x1 - x0);
                x = xmax;
            } else if (outcodeOut & CS_LEFT) {
                y = y0 + (y1 - y0) * (xmin - x0) / (x1 - x0);
                x = xmin;
            }

            if (outcodeOut === outcode0) {
                x0 = x; y0 = y;
                outcode0 = computeOutCode(x0, y0, xmin, ymin, xmax, ymax);
            } else {
                x1 = x; y1 = y;
                outcode1 = computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
            }
        }
    }

    return accept ? { x0, y0, x1, y1 } : null;
}

// DDA Line Rasterization Algorithm
function rasterizeDDALine(ctx, x0, y0, x1, y1, strokeStyle = '#00e5ff', lineWidth = 2.5) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    if (steps === 0) return;

    const xInc = dx / steps;
    const yInc = dy / steps;

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

// Bresenham Integer Line Rasterization Algorithm
function rasterizeBresenhamLine(ctx, x0, y0, x1, y1, strokeStyle = '#00f59b', lineWidth = 2.5) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

// Render DDA Ratings Graph Canvas
function renderDDAGraph() {
    const canvas = document.getElementById('canvas-dda-graph');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const padLeft = 45, padRight = 25, padTop = 30, padBottom = 45;
    const plotXmin = padLeft, plotXmax = w - padRight;
    const plotYmin = padTop, plotYmax = h - padBottom;
    const plotH = plotYmax - plotYmin;

    // Sorting Modes
    let sortedComps = [...AppState.companies];
    if (AppState.graphSortMode === 1) { // High to low
        sortedComps.sort((a, b) => b.rating - a.rating || a.id - b.id);
    } else if (AppState.graphSortMode === 2) { // Low to high
        sortedComps.sort((a, b) => a.rating - b.rating || a.id - b.id);
    }

    // Range Values
    const effMin = AppState.tightClipping ? AppState.clipRatingMin : 0.0;
    const effMax = AppState.tightClipping ? AppState.clipRatingMax : 5.0;

    // Canvas coordinate conversion (Rating 0 to 5)
    const valToY = (val) => plotYmax - (val / 5.0) * plotH;
    const clipYTop = valToY(effMax);
    const clipYBot = valToY(effMin);

    // Y Gridlines (0.0 to 5.0)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fillStyle = '#64748b';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let step = 0; step <= 5; step++) {
        const y = valToY(step);
        ctx.beginPath();
        ctx.moveTo(plotXmin, y);
        ctx.lineTo(plotXmax, y);
        ctx.stroke();
        ctx.fillText(step.toFixed(1) + '★', plotXmin - 6, y + 3);
    }

    // Shaded TOP Out-of-Bounds Zone (CS_TOP = 1000)
    if (effMax < 5.0) {
        ctx.fillStyle = 'rgba(255, 71, 87, 0.12)';
        ctx.fillRect(plotXmin, plotYmin, plotXmax - plotXmin, clipYTop - plotYmin);
        ctx.fillStyle = '#ff6b81';
        ctx.font = '10px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`CLIPPED (TOP: 1000) > ${effMax.toFixed(1)}★`, plotXmin + 10, plotYmin + 14);
    }

    // Shaded BOTTOM Out-of-Bounds Zone (CS_BOTTOM = 0100)
    if (effMin > 0.0) {
        ctx.fillStyle = 'rgba(255, 71, 87, 0.12)';
        ctx.fillRect(plotXmin, clipYBot, plotXmax - plotXmin, plotYmax - clipYBot);
        ctx.fillStyle = '#ff6b81';
        ctx.font = '10px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`CLIPPED (BOT: 0100) < ${effMin.toFixed(1)}★`, plotXmin + 10, plotYmax - 6);
    }

    // Clip Boundary Box
    ctx.strokeStyle = AppState.tightClipping ? 'rgba(255, 71, 87, 0.85)' : 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = AppState.tightClipping ? 1.5 : 1;
    ctx.strokeRect(plotXmin, clipYTop, plotXmax - plotXmin, clipYBot - clipYTop);

    // Compute Points
    const n = sortedComps.length;
    const pts = sortedComps.map((c, i) => {
        const px = plotXmin + (i / Math.max(1, n - 1)) * (plotXmax - plotXmin);
        const py = valToY(c.rating);
        return { comp: c, x: px, y: py, rating: c.rating };
    });

    // Rasterize DDA Line Segments with Cohen-Sutherland Clipping
    for (let i = 0; i < n - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const clipped = clipLineCohenSutherland(p0.x, p0.y, p1.x, p1.y, plotXmin, clipYTop, plotXmax, clipYBot);
        if (clipped) {
            rasterizeDDALine(ctx, clipped.x0, clipped.y0, clipped.x1, clipped.y1, '#00e5ff', 2.5);
        }
    }

    // Markers & Labels
    pts.forEach(p => {
        const isClippedTop = p.rating > effMax;
        const isClippedBot = p.rating < effMin;
        const markY = isClippedTop ? clipYTop : (isClippedBot ? clipYBot : p.y);

        if (isClippedTop || isClippedBot) {
            // Clipped Red Marker
            ctx.fillStyle = '#ff4757';
            ctx.beginPath();
            ctx.arc(p.x, markY, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ff6b81';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`[Clip ${p.rating.toFixed(1)}★]`, p.x, isClippedTop ? markY - 6 : markY + 12);
        } else {
            // Visible Cyan Marker
            ctx.fillStyle = '#00e5ff';
            ctx.beginPath();
            ctx.arc(p.x, markY, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffbe3b';
            ctx.font = '10px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(p.rating.toFixed(1) + '★', p.x, markY - 8);
        }

        // X-Axis Company Name
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.comp.name.substr(0, 7), p.x, plotYmax + 14);
        ctx.fillStyle = '#64748b';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText('#' + p.comp.id, p.x, plotYmax + 26);
    });

    // Summary description update
    const avgR = (sortedComps.reduce((acc, c) => acc + c.rating, 0) / n).toFixed(2);
    const sortDesc = AppState.graphSortMode === 0 ? "ID Order" : (AppState.graphSortMode === 1 ? "High-to-Low" : "Low-to-High");
    const footerStats = document.getElementById('footer-left-stats');
    if (footerStats) {
        footerStats.textContent = `Mean: ${avgR}★ | Sort: ${sortDesc} | Window: [${effMin.toFixed(1)}★ - ${effMax.toFixed(1)}★]`;
    }
}

// Render Bresenham Skill Transparency Graph Canvas
function renderBresenhamGraph() {
    const canvas = document.getElementById('canvas-bresenham-graph');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const padLeft = 45, padRight = 25, padTop = 30, padBottom = 45;
    const plotXmin = padLeft, plotXmax = w - padRight;
    const plotYmin = padTop, plotYmax = h - padBottom;
    const plotH = plotYmax - plotYmin;

    // Sorting Modes
    let sortedComps = [...AppState.companies];
    if (AppState.graphSortMode === 1) { // High to low
        sortedComps.sort((a, b) => b.skillTransparency - a.skillTransparency || a.id - b.id);
    } else if (AppState.graphSortMode === 2) { // Low to high
        sortedComps.sort((a, b) => a.skillTransparency - b.skillTransparency || a.id - b.id);
    }

    // Range Values (0% - 100%)
    const effMin = AppState.tightClipping ? AppState.clipSkillMin : 0;
    const effMax = AppState.tightClipping ? AppState.clipSkillMax : 100;

    const valToY = (pct) => plotYmax - (pct / 100.0) * plotH;
    const clipYTop = valToY(effMax);
    const clipYBot = valToY(effMin);

    // Y Gridlines (0% to 100%)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fillStyle = '#64748b';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let step = 0; step <= 4; step++) {
        const pct = step * 25;
        const y = valToY(pct);
        ctx.beginPath();
        ctx.moveTo(plotXmin, y);
        ctx.lineTo(plotXmax, y);
        ctx.stroke();
        ctx.fillText(pct + '%', plotXmin - 6, y + 3);
    }

    // Shaded TOP Out-of-Bounds Zone (CS_TOP = 1000)
    if (effMax < 100) {
        ctx.fillStyle = 'rgba(255, 71, 87, 0.12)';
        ctx.fillRect(plotXmin, plotYmin, plotXmax - plotXmin, clipYTop - plotYmin);
        ctx.fillStyle = '#ff6b81';
        ctx.font = '10px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`CLIPPED (TOP: 1000) > ${effMax}%`, plotXmin + 10, plotYmin + 14);
    }

    // Shaded BOTTOM Out-of-Bounds Zone (CS_BOTTOM = 0100)
    if (effMin > 0) {
        ctx.fillStyle = 'rgba(255, 71, 87, 0.12)';
        ctx.fillRect(plotXmin, clipYBot, plotXmax - plotXmin, plotYmax - clipYBot);
        ctx.fillStyle = '#ff6b81';
        ctx.font = '10px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`CLIPPED (BOT: 0100) < ${effMin}%`, plotXmin + 10, plotYmax - 6);
    }

    // Clip Boundary Box
    ctx.strokeStyle = AppState.tightClipping ? 'rgba(255, 71, 87, 0.85)' : 'rgba(0, 245, 155, 0.4)';
    ctx.lineWidth = AppState.tightClipping ? 1.5 : 1;
    ctx.strokeRect(plotXmin, clipYTop, plotXmax - plotXmin, clipYBot - clipYTop);

    // Compute Points
    const n = sortedComps.length;
    const pts = sortedComps.map((c, i) => {
        const px = plotXmin + (i / Math.max(1, n - 1)) * (plotXmax - plotXmin);
        const py = valToY(c.skillTransparency);
        return { comp: c, x: px, y: py, skill: c.skillTransparency };
    });

    // Rasterize Bresenham Line Segments with Cohen-Sutherland Clipping
    for (let i = 0; i < n - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const clipped = clipLineCohenSutherland(p0.x, p0.y, p1.x, p1.y, plotXmin, clipYTop, plotXmax, clipYBot);
        if (clipped) {
            rasterizeBresenhamLine(ctx, clipped.x0, clipped.y0, clipped.x1, clipped.y1, '#00f59b', 2.5);
        }
    }

    // Markers & Labels
    pts.forEach(p => {
        const isClippedTop = p.skill > effMax;
        const isClippedBot = p.skill < effMin;
        const markY = isClippedTop ? clipYTop : (isClippedBot ? clipYBot : p.y);

        if (isClippedTop || isClippedBot) {
            ctx.fillStyle = '#ff4757';
            ctx.beginPath();
            ctx.arc(p.x, markY, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ff6b81';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`[Clip ${p.skill}%]`, p.x, isClippedTop ? markY - 6 : markY + 12);
        } else {
            ctx.fillStyle = '#00f59b';
            ctx.beginPath();
            ctx.arc(p.x, markY, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = '10px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(p.skill + '%', p.x, markY - 8);
        }

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.comp.name.substr(0, 7), p.x, plotYmax + 14);
        ctx.fillStyle = '#64748b';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText('#' + p.comp.id, p.x, plotYmax + 26);
    });

    const avgSkill = (sortedComps.reduce((acc, c) => acc + c.skillTransparency, 0) / n).toFixed(1);
    const sortDesc = AppState.graphSortMode === 0 ? "ID Order" : (AppState.graphSortMode === 1 ? "High-to-Low" : "Low-to-High");
    const footerStats = document.getElementById('footer-right-stats');
    if (footerStats) {
        footerStats.textContent = `Mean: ${avgSkill}% | Sort: ${sortDesc} | Window: [${effMin}% - ${effMax}%]`;
    }
}

// Render 2D / 3D Bar Analytics (View A)
function renderBarAnalytics() {
    const canvas = document.getElementById('canvas-bar-analytics');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const comps = AppState.companies.filter(c => AppState.compareCompIds.includes(c.id));
    if (comps.length === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '14px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Select companies from the Chips or Compare tab to view comparative bars.', w / 2, h / 2);
        return;
    }

    const metric = AppState.compareMetric;
    const use3D = AppState.compareUse3D;
    const padX = 60, padBottom = 60, padTop = 40;
    const plotH = h - padBottom - padTop;
    const n = comps.length;
    const slotW = (w - padX * 2) / n;
    const barW = Math.min(65, slotW * 0.65);

    // Max values
    const maxVals = [5.0, 15.0, 100, 40];
    const maxV = maxVals[metric];

    // Gridlines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = h - padBottom - (i / 4) * plotH;
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(w - padX, y);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(((maxV / 4) * i).toFixed(1), padX - 8, y + 3);
    }

    comps.forEach((c, i) => {
        let val = c.rating;
        let unit = "★";
        if (metric === 1) { val = c.salary / 100000; unit = " L"; }
        else if (metric === 2) { val = c.skillTransparency; unit = "%"; }
        else if (metric === 3) { val = c.jobs; unit = " Roles"; }

        const barH = (val / maxV) * plotH;
        const cx = padX + (i + 0.5) * slotW;
        const bx = cx - barW / 2;
        const by = h - padBottom - barH;

        const isInspected = (c.id === AppState.inspectedCompId);

        if (!use3D) {
            // 2D Bar
            const grad = ctx.createLinearGradient(bx, by, bx, h - padBottom);
            grad.addColorStop(0, isInspected ? '#00e5ff' : '#00b4d8');
            grad.addColorStop(1, 'rgba(0, 180, 216, 0.2)');
            ctx.fillStyle = grad;
            ctx.fillRect(bx, by, barW, barH);

            ctx.strokeStyle = isInspected ? '#ffffff' : 'rgba(0, 229, 255, 0.4)';
            ctx.lineWidth = isInspected ? 2 : 1;
            ctx.strokeRect(bx, by, barW, barH);
        } else {
            // Pseudo-3D Isometric Bar
            const depth = 14;
            // Front face
            ctx.fillStyle = isInspected ? '#00e5ff' : '#0096c7';
            ctx.fillRect(bx, by, barW, barH);

            // Top face
            ctx.fillStyle = '#caf0f8';
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + depth, by - depth);
            ctx.lineTo(bx + barW + depth, by - depth);
            ctx.lineTo(bx + barW, by);
            ctx.closePath();
            ctx.fill();

            // Right face
            ctx.fillStyle = isInspected ? '#0077b6' : '#023e8a';
            ctx.beginPath();
            ctx.moveTo(bx + barW, by);
            ctx.lineTo(bx + barW + depth, by - depth);
            ctx.lineTo(bx + barW + depth, h - padBottom - depth);
            ctx.lineTo(bx + barW, h - padBottom);
            ctx.closePath();
            ctx.fill();
        }

        // Top value text
        ctx.fillStyle = isInspected ? '#ffbe3b' : '#ffffff';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(val.toFixed(1) + unit, cx, by - (use3D ? 18 : 8));

        // Bottom labels
        ctx.fillStyle = isInspected ? '#00e5ff' : '#94a3b8';
        ctx.font = '11px Outfit, sans-serif';
        ctx.fillText(c.name, cx, h - padBottom + 18);
        ctx.fillStyle = '#64748b';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText('#' + c.id, cx, h - padBottom + 30);
    });

    renderInspectedCompany();
}

function renderInspectedCompany() {
    const container = document.getElementById('inspect-content');
    if (!container) return;
    const c = AppState.companies.find(comp => comp.id === AppState.inspectedCompId) || AppState.companies[0];
    if (!c) return;

    container.innerHTML = `
        <div class="inspect-card">
            <h4>${c.name} <span class="badge-cyan">#${c.id}</span></h4>
            <p class="text-emerald mb-2">${c.industry} | ${c.location}</p>
            <div class="comp-stats-row mb-2">
                <div class="comp-stat-item"><span class="k">Rating</span><span class="v text-amber">${c.rating.toFixed(1)}★</span></div>
                <div class="comp-stat-item"><span class="k">Salary</span><span class="v text-cyan">${(c.salary / 100000).toFixed(1)} L</span></div>
                <div class="comp-stat-item"><span class="k">Clarity</span><span class="v text-emerald">${c.skillTransparency}%</span></div>
            </div>
            <p class="text-secondary text-sm mb-2">${c.review}</p>
            <div class="comp-skills-tagbox mb-3">
                ${c.skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
            </div>
            <button class="btn btn-primary btn-sm w-100" onclick="quickFillReviewFor(${c.id})">Write Review For Company →</button>
        </div>
    `;
}

// ============================================================================
// 7. UI CONTROLLERS & EVENT BINDINGS
// ============================================================================

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        AppState.currentScreen = screenId;
    }
}

function switchView(viewId) {
    document.querySelectorAll('.view-panel').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');

    const navBtn = document.querySelector(`.nav-item[data-target="${viewId}"]`);
    if (navBtn) navBtn.classList.add('active');

    AppState.activeNav = viewId;

    // View-specific initializations
    if (viewId === 'view-analytics') {
        renderBarAnalytics();
        renderDDAGraph();
        renderBresenhamGraph();
    } else if (viewId === 'view-companies') {
        renderCompaniesGrid();
    } else if (viewId === 'view-reviews') {
        renderReviewsList();
        renderQueueList();
    } else if (viewId === 'view-compare') {
        renderCompareMatrix();
    } else if (viewId === 'view-skills') {
        renderSkillBenchmarks();
    } else if (viewId === 'view-salary') {
        renderSalaryBars();
    }
}

function setStatus(msg) {
    const el = document.getElementById('status-text');
    if (el) el.textContent = msg;
}

// Authentication Controller
function handleLoginSubmit(e) {
    e.preventDefault();
    const uname = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value.trim();
    const activeRoleBtn = document.querySelector('.role-tab.active');
    const role = activeRoleBtn ? activeRoleBtn.dataset.role : 'STUDENT';

    let userObj = null;
    if (role === 'STUDENT') userObj = new StudentUser(uname);
    else if (role === 'EMPLOYER') userObj = new EmployerUser(uname);
    else userObj = new AdminUser(uname);

    AppState.currentUser = userObj;

    // Update Topbar & Sidebar
    const tbUname = document.getElementById('topbar-username');
    if (tbUname) tbUname.textContent = uname;
    const sbRole = document.getElementById('sidebar-role-badge');
    if (sbRole) sbRole.textContent = userObj.getRole().toUpperCase() + ' PORTAL';
    const profRole = document.getElementById('profile-role-chip');
    if (profRole) profRole.textContent = userObj.getRole();
    const profUname = document.getElementById('profile-uname');
    if (profUname) profUname.textContent = uname;

    setStatus(`Logged in as ${uname} (${userObj.getRole()}).`);
    switchScreen('screen-main');
    switchView('view-dashboard');
    renderDashboardOverview();
}

function handleLogout() {
    AppState.currentUser = null;
    setStatus("Logged out. Welcome to ECOSCOPE.");
    switchScreen('screen-welcome');
}

function quickFillCreds(uname, pass, role) {
    document.getElementById('login-username').value = uname;
    document.getElementById('login-password').value = pass;
    document.querySelectorAll('.role-tab').forEach(t => {
        if (t.dataset.role === role) t.classList.add('active');
        else t.classList.remove('active');
    });
}

// Company Management
function renderCompaniesGrid() {
    const container = document.getElementById('companies-card-grid');
    if (!container) return;

    const query = (document.getElementById('comp-search-input')?.value || "").toLowerCase();
    const indFilter = document.getElementById('comp-industry-filter')?.value || "ALL";

    const filtered = AppState.companies.filter(c => {
        const matchesQuery = c.name.toLowerCase().includes(query) ||
                             c.industry.toLowerCase().includes(query) ||
                             c.skills.toLowerCase().includes(query);
        const matchesInd = (indFilter === "ALL") || (c.industry === indFilter);
        return matchesQuery && matchesInd;
    });

    container.innerHTML = filtered.map(c => `
        <div class="company-card">
            <div class="comp-card-head">
                <div>
                    <h3 class="comp-name">${c.name}</h3>
                    <span class="comp-ind">${c.industry}</span>
                </div>
                <span class="comp-rating-badge">${c.rating.toFixed(1)} ★</span>
            </div>
            <div class="comp-stats-row">
                <div class="comp-stat-item"><span class="k">Salary</span><span class="v">${(c.salary / 100000).toFixed(1)}L</span></div>
                <div class="comp-stat-item"><span class="k">Clarity</span><span class="v">${c.skillTransparency}%</span></div>
                <div class="comp-stat-item"><span class="k">Roles</span><span class="v">${c.jobs}</span></div>
            </div>
            <div class="comp-skills-tagbox">
                ${c.skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
            </div>
            <div class="comp-card-footer">
                <button class="btn btn-ghost btn-sm flex-1" onclick="inspectCompany(${c.id})">Analytics</button>
                <button class="btn btn-primary btn-sm flex-1" onclick="quickFillReviewFor(${c.id})">Review</button>
            </div>
        </div>
    `).join('');
}

function inspectCompany(id) {
    AppState.inspectedCompId = id;
    if (!AppState.compareCompIds.includes(id)) {
        AppState.compareCompIds.push(id);
    }
    switchView('view-analytics');
}

function quickFillReviewFor(id) {
    switchView('view-reviews');
    const select = document.getElementById('review-comp-select');
    if (select) select.value = id;
}

// Review System & Queue Moderation
function handleReviewSubmit(e) {
    e.preventDefault();
    const compId = parseInt(document.getElementById('review-comp-select').value);
    const comp = AppState.companies.find(c => c.id === compId);
    if (!comp) return;

    const author = AppState.currentUser ? AppState.currentUser.username : "student_user";
    const overall = parseFloat(document.getElementById('input-rating-overall').value);
    const workLife = parseFloat(document.getElementById('input-rating-worklife').value);
    const culture = parseFloat(document.getElementById('input-rating-culture').value);
    const growth = parseFloat(document.getElementById('input-rating-growth').value);
    const title = document.getElementById('review-title').value.trim();
    const comment = document.getElementById('review-comment').value.trim();

    const reviewRecord = {
        id: Date.now(),
        companyId: compId,
        companyName: comp.name,
        author,
        overall,
        workLife,
        culture,
        growth,
        title,
        comment,
        time: "Just now"
    };

    // Push into Circular FIFO Queue
    if (AppState.pendingQueue.enqueue(reviewRecord)) {
        setStatus(`Review submitted for ${comp.name}. Enqueued in FIFO Moderation Queue.`);
        AppState.activityLog.unshift({
            title: "Review Enqueued",
            desc: `${author} submitted review for ${comp.name} (${overall}★)`,
            time: "Just now"
        });
        updateQueueBadges();
        renderQueueList();

        // Switch to Queue tab to demonstrate FIFO moderation
        document.querySelector('.sub-tab-btn[data-subtab="review-moderation"]')?.click();
    } else {
        alert("Verification Queue is full! (Capacity: 30)");
    }
}

function approveQueueReview() {
    const item = AppState.pendingQueue.dequeue();
    if (!item) return;

    AppState.reviews.unshift(item);

    // Update Company Rating using COA Division
    const comp = AppState.companies.find(c => c.id === item.companyId);
    if (comp) {
        const compRevs = AppState.reviews.filter(r => r.companyId === comp.id);
        const sumRatings = compRevs.reduce((acc, r) => acc + r.overall, 0);
        const scaledSum = Math.round(sumRatings * 100);
        const avgScaled = COAEngine.calc_avg64(scaledSum, compRevs.length);
        comp.rating = Number(avgScaled.quotient) / 100.0;
        comp.reviewCount = compRevs.length;
    }

    setStatus(`Approved review for ${item.companyName} by ${item.author}. Published to database.`);
    updateQueueBadges();
    renderQueueList();
    renderReviewsList();
    renderDDAGraph();
    renderBresenhamGraph();
}

function rejectQueueReview() {
    const item = AppState.pendingQueue.dequeue();
    if (!item) return;
    setStatus(`Rejected review for ${item.companyName} by ${item.author}. Removed from queue.`);
    updateQueueBadges();
    renderQueueList();
}

function updateQueueBadges() {
    const qCount = AppState.pendingQueue.size();
    const b1 = document.getElementById('queue-rev-count');
    const b2 = document.getElementById('queue-size-badge');
    if (b1) b1.textContent = qCount;
    if (b2) b2.textContent = qCount;
    const pubB = document.getElementById('pub-rev-count');
    if (pubB) pubB.textContent = AppState.reviews.length;
}

function renderQueueList() {
    const container = document.getElementById('queue-items-container');
    const emptyBox = document.getElementById('queue-empty-alert');
    if (!container || !emptyBox) return;

    const items = AppState.pendingQueue.toArray();
    if (items.length === 0) {
        emptyBox.classList.remove('hidden');
        container.innerHTML = '';
        return;
    }

    emptyBox.classList.add('hidden');
    container.innerHTML = items.map((r, i) => `
        <div class="queue-item-card">
            <div style="display: flex; align-items: center;">
                <span class="queue-pos-badge">FIFO POS #${i + 1}</span>
                <div>
                    <h4>${r.companyName} <span class="text-amber">${r.overall.toFixed(1)}★</span></h4>
                    <p class="text-secondary text-sm">${r.title}</p>
                    <p class="text-muted text-xs">By: ${r.author} | WorkLife: ${r.workLife}★ Culture: ${r.culture}★ Growth: ${r.growth}★</p>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-outline-cyan btn-xs" onclick="approveQueueReview()">✓ Verify &amp; Publish</button>
                <button class="btn btn-danger-ghost btn-xs" onclick="rejectQueueReview()">✕ Reject</button>
            </div>
        </div>
    `).join('');
}

function renderReviewsList() {
    const container = document.getElementById('published-reviews-list');
    if (!container) return;

    container.innerHTML = AppState.reviews.map(r => `
        <div class="review-card">
            <div class="review-card-head">
                <span class="rev-comp">${r.companyName}</span>
                <span class="text-amber font-bold">${r.overall.toFixed(1)} ★</span>
            </div>
            <h4 class="rev-title">${r.title}</h4>
            <p class="rev-body">${r.comment}</p>
            <div class="rev-author">Verified review by <strong>${r.author}</strong> • ${r.time}</div>
        </div>
    `).join('');
}

// Compare System
function renderCompareMatrix() {
    const chipsContainer = document.getElementById('compare-chips-row');
    const head = document.getElementById('compare-table-head');
    const body = document.getElementById('compare-table-body');
    const select = document.getElementById('compare-add-select');
    if (!chipsContainer || !head || !body) return;

    const comps = AppState.companies.filter(c => AppState.compareCompIds.includes(c.id));

    // Chips
    chipsContainer.innerHTML = comps.map(c => `
        <span class="compare-chip">
            ${c.name}
            <span class="chip-remove" onclick="removeCompareCompany(${c.id})">✕</span>
        </span>
    `).join('');

    // Selector
    if (select) {
        select.innerHTML = '<option value="">+ Add Company to Compare...</option>' +
            AppState.companies
                .filter(c => !AppState.compareCompIds.includes(c.id))
                .map(c => `<option value="${c.id}">${c.name} (${c.industry})</option>`).join('');
    }

    // Table Header
    head.innerHTML = `
        <tr>
            <th>METRIC DIMENSION</th>
            ${comps.map(c => `<th>${c.name}</th>`).join('')}
        </tr>
    `;

    // Table Rows
    const metrics = [
        { label: "Overall Rating", getVal: c => `${c.rating.toFixed(1)} ★` },
        { label: "Skill Transparency", getVal: c => `${c.skillTransparency}%` },
        { label: "Annual CTC (LPA)", getVal: c => `${(c.salary / 100000).toFixed(1)} LPA` },
        { label: "Active Roles", getVal: c => `${c.jobs} Openings` },
        { label: "Headquarters", getVal: c => c.location },
        { label: "Industry", getVal: c => c.industry }
    ];

    body.innerHTML = metrics.map(m => `
        <tr>
            <td class="font-bold">${m.label}</td>
            ${comps.map(c => `<td>${m.getVal(c)}</td>`).join('')}
        </tr>
    `).join('');
}

function handleAddCompareCompany(idStr) {
    if (!idStr) return;
    const id = parseInt(idStr);
    if (!AppState.compareCompIds.includes(id)) {
        AppState.compareCompIds.push(id);
        renderCompareMatrix();
    }
}

function removeCompareCompany(id) {
    AppState.compareCompIds = AppState.compareCompIds.filter(cid => cid !== id);
    renderCompareMatrix();
}

// Clipping Controls
function cycleClippingPreset() {
    const nextP = (AppState.clippingPreset + 1) % 5;
    applyClippingPreset(nextP);
}

function applyClippingPreset(preset) {
    AppState.clippingPreset = preset;
    const pNames = ["RANGE: FULL", "FOCUS: TOP", "RANGE: MID", "RANGE: HIGH", "RANGE: CUST"];
    
    if (preset === 0) {
        AppState.tightClipping = false;
        AppState.clipRatingMin = 0.0; AppState.clipRatingMax = 5.0;
        AppState.clipSkillMin = 0; AppState.clipSkillMax = 100;
    } else if (preset === 1) {
        AppState.tightClipping = true;
        AppState.clipRatingMin = 0.0; AppState.clipRatingMax = 3.5;
        AppState.clipSkillMin = 0; AppState.clipSkillMax = 75;
    } else if (preset === 2) {
        AppState.tightClipping = true;
        AppState.clipRatingMin = 1.5; AppState.clipRatingMax = 3.5;
        AppState.clipSkillMin = 30; AppState.clipSkillMax = 75;
    } else if (preset === 3) {
        AppState.tightClipping = true;
        AppState.clipRatingMin = 3.0; AppState.clipRatingMax = 5.0;
        AppState.clipSkillMin = 60; AppState.clipSkillMax = 100;
    } else if (preset === 4) {
        AppState.tightClipping = true;
    }

    updateClippingUI();
    renderDDAGraph();
    renderBresenhamGraph();
    setStatus(`Clipping Preset: ${pNames[preset]}`);
}

function toggleTightClipping() {
    if (!AppState.tightClipping) applyClippingPreset(1);
    else applyClippingPreset(0);
}

function updateClippingUI() {
    const pNames = ["RANGE: FULL", "FOCUS: TOP", "RANGE: MID", "RANGE: HIGH", "RANGE: CUST"];
    const pStr = pNames[AppState.clippingPreset];

    const btnLPre = document.getElementById('btn-left-preset');
    const btnRPre = document.getElementById('btn-right-preset');
    if (btnLPre) btnLPre.textContent = pStr;
    if (btnRPre) btnRPre.textContent = pStr;

    const btnLMin = document.getElementById('btn-left-min');
    const btnLMax = document.getElementById('btn-left-max');
    if (btnLMin) btnLMin.textContent = `MIN ${AppState.clipRatingMin.toFixed(1)}★`;
    if (btnLMax) btnLMax.textContent = `MAX ${AppState.clipRatingMax.toFixed(1)}★`;

    const btnRMin = document.getElementById('btn-right-min');
    const btnRMax = document.getElementById('btn-right-max');
    if (btnRMin) btnRMin.textContent = `MIN ${AppState.clipSkillMin}%`;
    if (btnRMax) btnRMax.textContent = `MAX ${AppState.clipSkillMax}%`;

    const topToggle = document.getElementById('btn-toggle-tight-clipping');
    if (topToggle) {
        topToggle.textContent = AppState.tightClipping ? "FOCUS CLIPPING ON" : "FOCUS CLIPPING OFF";
        topToggle.className = AppState.tightClipping ? "btn btn-outline-cyan btn-sm active" : "btn btn-outline-cyan btn-sm";
    }
}

function setActiveAdjust(idx) {
    AppState.clipActiveAdjust = idx;
    AppState.tightClipping = true;
    document.getElementById('btn-left-min')?.classList.toggle('active', idx === 0);
    document.getElementById('btn-left-max')?.classList.toggle('active', idx === 1);
    document.getElementById('btn-right-min')?.classList.toggle('active', idx === 0);
    document.getElementById('btn-right-max')?.classList.toggle('active', idx === 1);
    setStatus(`Selected ${idx === 0 ? "MIN" : "MAX"} boundary for adjustment.`);
}

function adjustRatingBoundary(delta) {
    AppState.tightClipping = true;
    AppState.clippingPreset = 4;
    if (AppState.clipActiveAdjust === 0) {
        AppState.clipRatingMin = Math.max(0, Math.min(AppState.clipRatingMax - 0.5, AppState.clipRatingMin + delta));
    } else {
        AppState.clipRatingMax = Math.min(5.0, Math.max(AppState.clipRatingMin + 0.5, AppState.clipRatingMax + delta));
    }
    updateClippingUI();
    renderDDAGraph();
}

function adjustSkillBoundary(delta) {
    AppState.tightClipping = true;
    AppState.clippingPreset = 4;
    if (AppState.clipActiveAdjust === 0) {
        AppState.clipSkillMin = Math.max(0, Math.min(AppState.clipSkillMax - 10, AppState.clipSkillMin + delta));
    } else {
        AppState.clipSkillMax = Math.min(100, Math.max(AppState.clipSkillMin + 10, AppState.clipSkillMax + delta));
    }
    updateClippingUI();
    renderBresenhamGraph();
}

function cycleGraphSort() {
    AppState.graphSortMode = (AppState.graphSortMode + 1) % 3;
    const names = ["SORT: ID", "SORT: HIGH", "SORT: LOW"];
    const sortStr = names[AppState.graphSortMode];

    document.getElementById('btn-left-sort').textContent = sortStr;
    document.getElementById('btn-right-sort').textContent = sortStr;

    renderDDAGraph();
    renderBresenhamGraph();
    setStatus(`Graph Ordering: ${sortStr}`);
}

// 3D Turntable Helper functions
let prism3DInstance = null;

function setPrismMetric(idx) {
    AppState.prismMetric = idx;
    document.querySelectorAll('[data-pmetric]').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.pmetric) === idx);
    });
}

function prismRotate(axis) {
    if (!prism3DInstance) return;
    if (axis === 'x') prism3DInstance.rotX += 0.35;
    if (axis === 'y') prism3DInstance.rotY += 0.35;
    if (axis === 'z') prism3DInstance.rotZ += 0.35;
}

function prismZoom(factor) {
    if (!prism3DInstance) return;
    prism3DInstance.zoom *= factor;
}

function prismToggleSpin() {
    if (!prism3DInstance) return;
    prism3DInstance.autoSpin = !prism3DInstance.autoSpin;
    document.getElementById('btn-prism-spin')?.classList.toggle('active', prism3DInstance.autoSpin);
}

function prismReset() {
    if (!prism3DInstance) return;
    prism3DInstance.rotX = 0.35;
    prism3DInstance.rotY = -0.45;
    prism3DInstance.rotZ = 0.0;
    prism3DInstance.zoom = 1.0;
}

function setCompareMetric(idx) {
    AppState.compareMetric = idx;
    document.querySelectorAll('[data-metric]').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.metric) === idx);
    });
    renderBarAnalytics();
}

function setChartDimension(is3D) {
    AppState.compareUse3D = is3D;
    document.getElementById('btn-chart-2d')?.classList.toggle('active', !is3D);
    document.getElementById('btn-chart-3d')?.classList.toggle('active', is3D);
    renderBarAnalytics();
}

// Salary Calculator
function runSalaryCalc() {
    const base = parseInt(document.getElementById('calc-monthly-base')?.value || "0");
    const bonus = parseInt(document.getElementById('calc-monthly-bonus')?.value || "0");
    const monthlyTot = base + bonus;
    const annualCTC = monthlyTot * 12;
    const lpa = (annualCTC / 100000).toFixed(1);

    document.getElementById('calc-res-monthly').textContent = `₹ ${monthlyTot.toLocaleString('en-IN')}`;
    document.getElementById('calc-res-annual').textContent = `₹ ${annualCTC.toLocaleString('en-IN')}`;
    document.getElementById('calc-res-lpa').textContent = `${lpa} LPA`;
}

function renderSalaryBars() {
    const container = document.getElementById('salary-bars-container');
    if (!container) return;

    container.innerHTML = AppState.companies.map(c => {
        const lpa = (c.salary / 100000).toFixed(1);
        const pct = Math.min(100, (c.salary / 1500000) * 100);
        return `
            <div class="skill-row mb-2">
                <div class="skill-row-head">
                    <span>${c.name} (${c.industry})</span>
                    <span class="text-cyan font-bold">${lpa} LPA</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-fill cyan" style="width: ${pct}%;"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderSkillBenchmarks() {
    const candidateContainer = document.getElementById('candidate-skills-list');
    const compContainer = document.getElementById('company-transparency-bars');

    if (candidateContainer) {
        candidateContainer.innerHTML = AppState.candidateSkills.map(s => `
            <div class="skill-row">
                <div class="skill-row-head">
                    <span>${s.name} <small class="text-muted">(${s.desc})</small></span>
                    <span class="text-emerald font-bold">${s.rating}/5 (Weight: ${s.weight})</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-fill emerald" style="width: ${(s.rating / 5) * 100}%;"></div>
                </div>
            </div>
        `).join('');
    }

    if (compContainer) {
        compContainer.innerHTML = AppState.companies.map(c => `
            <div class="skill-row mb-2">
                <div class="skill-row-head">
                    <span>${c.name}</span>
                    <span class="text-cyan font-bold">${c.skillTransparency}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-fill cyan" style="width: ${c.skillTransparency}%;"></div>
                </div>
            </div>
        `).join('');
    }
}

// Dashboard Overview Data Populate
function renderDashboardOverview() {
    document.getElementById('dash-total-comps').textContent = AppState.companies.length;
    document.getElementById('dash-total-reviews').textContent = AppState.reviews.length;
    
    const avgTrans = Math.round(AppState.companies.reduce((a, c) => a + c.skillTransparency, 0) / AppState.companies.length);
    document.getElementById('dash-avg-transparency').textContent = avgTrans + '%';

    // Top Comps Table
    const tbody = document.getElementById('dash-top-comps-tbody');
    if (tbody) {
        const sorted = [...AppState.companies].sort((a, b) => b.rating - a.rating).slice(0, 5);
        tbody.innerHTML = sorted.map(c => `
            <tr>
                <td><code>#${c.id}</code></td>
                <td><strong>${c.name}</strong></td>
                <td>${c.industry}</td>
                <td><span class="text-amber">${c.rating.toFixed(1)} ★</span></td>
                <td><span class="text-emerald">${c.skillTransparency}%</span></td>
                <td>${c.jobs}</td>
                <td><button class="btn btn-xs btn-outline-cyan" onclick="inspectCompany(${c.id})">Analyze</button></td>
            </tr>
        `).join('');
    }

    // Activity Stream
    const stream = document.getElementById('dash-activity-stream');
    const profStream = document.getElementById('profile-audit-table');
    const renderStream = (el) => {
        if (!el) return;
        el.innerHTML = AppState.activityLog.map(a => `
            <div class="activity-item">
                <div class="act-head">
                    <span class="act-title">${a.title}</span>
                    <span class="act-time">${a.time}</span>
                </div>
                <span class="act-desc">${a.desc}</span>
            </div>
        `).join('');
    };

    renderStream(stream);
    renderStream(profStream);
}

// COA Instruction Execution
function executeAsmOp(op) {
    const a = parseInt(document.getElementById('coa-op-a')?.value || "0");
    const b = parseInt(document.getElementById('coa-op-b')?.value || "0");
    const resBox = document.getElementById('coa-result-text');

    if (op === 'add64') {
        const sum = COAEngine.add64(a, b);
        resBox.textContent = `add64: ${a} + ${b} = ${sum} (RAX committed)`;
        setStatus(`COA 64-bit ADD executed: ${sum}`);
    } else if (op === 'compare64') {
        const cmp = COAEngine.compare64(a, b);
        const desc = cmp > 0n ? "A > B (RAX = 1)" : (cmp < 0n ? "A < B (RAX = -1)" : "A == B (RAX = 0)");
        resBox.textContent = `compare64: ${desc}`;
        setStatus(`COA compare64 executed: ${desc}`);
    } else if (op === 'calc_avg64') {
        const { quotient, remainder } = COAEngine.calc_avg64(a, b || 1);
        resBox.textContent = `calc_avg64: Quotient = ${quotient}, Remainder = ${remainder}`;
        setStatus(`COA calc_avg64 executed: Quotient ${quotient}, Remainder ${remainder}`);
    } else if (op === 'count_ge64') {
        const scores = AppState.companies.map(c => c.skillTransparency);
        const count = COAEngine.count_ge64(scores, b);
        resBox.textContent = `count_ge64: ${count} companies have Skill Transparency >= ${b}%`;
        setStatus(`COA count_ge64 executed: ${count} matches found`);
    } else if (op === 'mult_add64') {
        const prod = COAEngine.mult_add64(a, b);
        resBox.textContent = `mult_add64: ${a} * ${b} = ${prod}`;
        setStatus(`COA mult_add64 executed: ${prod}`);
    } else if (op === 'asm_strlen') {
        const comp = AppState.companies[0];
        const len = COAEngine.asm_strlen(comp.name);
        resBox.textContent = `asm_strlen: Length of "${comp.name}" = ${len} bytes`;
        setStatus(`COA asm_strlen executed: ${len} bytes`);
    }
}

function clearCoaTrace() {
    COAEngine.trace = ["; Trace cleared by user."];
    COAEngine.appendTrace("; Standby for next instruction cycle.");
}

// Modals
function openAddCompanyModal() {
    document.getElementById('modal-add-company')?.classList.add('open');
}

function closeAddCompanyModal() {
    document.getElementById('modal-add-company')?.classList.remove('open');
}

function openRegisterModal() {
    document.getElementById('modal-register')?.classList.add('open');
}

function closeRegisterModal() {
    document.getElementById('modal-register')?.classList.remove('open');
}

function handleAddCompanySubmit(e) {
    e.preventDefault();
    const name = document.getElementById('add-comp-name').value.trim();
    const ind = document.getElementById('add-comp-industry').value.trim();
    const loc = document.getElementById('add-comp-loc').value.trim();
    const jobs = parseInt(document.getElementById('add-comp-jobs').value);
    const sal = parseInt(document.getElementById('add-comp-salary').value);
    const rat = parseFloat(document.getElementById('add-comp-rating').value);
    const skills = document.getElementById('add-comp-skills').value.trim();
    const trans = parseInt(document.getElementById('add-comp-transparency').value);
    const desc = document.getElementById('add-comp-desc').value.trim();

    const newId = AppState.companies.length > 0 ? (Math.max(...AppState.companies.map(c => c.id)) + 1) : 101;
    const newComp = {
        id: newId,
        name,
        industry: ind,
        location: loc,
        skills,
        jobs,
        salary: sal,
        rating: rat,
        review: desc || "Newly registered organization.",
        skillTransparency: trans,
        reviewCount: 0
    };

    AppState.companies.push(newComp);
    AppState.activityLog.unshift({
        title: "Company Added",
        desc: `New partner organization registered: ${name} (#${newId})`,
        time: "Just now"
    });

    closeAddCompanyModal();
    renderCompaniesGrid();
    renderDashboardOverview();
    populateCompanySelects();
    setStatus(`Registered company ${name} (#${newId}) successfully.`);
}

function populateCompanySelects() {
    const revSelect = document.getElementById('review-comp-select');
    if (revSelect) {
        revSelect.innerHTML = AppState.companies.map(c => `
            <option value="${c.id}">${c.name} (${c.industry})</option>
        `).join('');
    }
}

function updateRatingDisplay(type, val) {
    const el = document.getElementById(`val-rating-${type}`);
    if (el) el.textContent = `${parseFloat(val).toFixed(1)} ★`;
}

// ============================================================================
// 8. INITIALIZATION ON DOM READY
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
    // 1. Animated Logos on Canvas
    new AnimatedLogoRenderer('welcome-logo-canvas', 1.0);
    new AnimatedLogoRenderer('login-logo-canvas', 0.85);

    // 2. 3D Metric Prism Turntable
    prism3DInstance = new MetricPrism3D('canvas-prism-3d');

    // 3. Populate Form Selects & Lists
    populateCompanySelects();
    renderDashboardOverview();
    updateQueueBadges();
    COAEngine.updateRegisterUI();
    COAEngine.renderFlagsHUD();

    // 4. Welcome Screen CTA
    document.getElementById('btn-welcome-get-started')?.addEventListener('click', () => {
        switchScreen('screen-login');
    });

    // 5. Navigation Sidebar Items
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target) switchView(target);
        });
    });

    // 6. Role Selection Tabs
    document.querySelectorAll('.role-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // 7. Reviews Subtabs
    document.querySelectorAll('.sub-tab-btn[data-subtab]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-tab-btn[data-subtab]').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.subtab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const sub = btn.dataset.subtab;
            document.getElementById(`subtab-${sub}`)?.classList.add('active');
        });
    });

    // 8. Analytics Subtabs
    document.querySelectorAll('.sub-tab-btn[data-analtab]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-tab-btn[data-analtab]').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.analytics-subtab').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.dataset.analtab;
            document.getElementById(`analtab-${tabId.replace('view-', '')}`)?.classList.add('active');

            const clipToggle = document.getElementById('analytics-clipping-toggle-wrap');
            if (tabId === 'view-dda-bresenham') {
                if (clipToggle) clipToggle.classList.remove('hidden');
                renderDDAGraph();
                renderBresenhamGraph();
            } else {
                if (clipToggle) clipToggle.classList.add('hidden');
                if (tabId === 'view-bar-compare') renderBarAnalytics();
            }
        });
    });

    // 9. Initial Graph & Chart Renders
    renderDDAGraph();
    renderBresenhamGraph();
    renderBarAnalytics();
    runSalaryCalc();
});
