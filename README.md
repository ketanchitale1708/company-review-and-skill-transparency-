# ECOSCOPE Web Platform

Interactive, web-based implementation of the **ECOSCOPE - Company Review & Skill Transparency System**, unifying:
- **PL (Programming Languages & Data Structures)**: Circular FIFO Review Queue, LIFO Stack, Merge/Quick/Bubble Sorting, Binary & Linear Search.
- **PSOOP (Object-Oriented Programming)**: Polymorphic User Models (`StudentUser`, `EmployerUser`, `AdminUser`), access control, and domain entities.
- **CG (Computer Graphics & Canvas)**: Real-time animated neon radar logo, interactive 3D Metric Prism turntable, and DDA & Bresenham rasterizers with 4-bit Cohen-Sutherland line clipping (with decidable ranges and X-axis sorting).
- **COA (Computer Organization & Architecture)**: 64-bit CPU register HUD (`RAX`, `RBX`, `RCX`, `RDX`, `RFLAGS`) and interactive Win64 ABI assembly instruction execution with cycle trace logging.

---

## How to Run

### Option 1: Direct File Launch (Zero Dependencies)
Simply double-click or open **[`web/index.html`](index.html)** in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Python)
From this repository directory:
```bash
cd web
python -m SimpleHTTPServer 8080
# Or with Python 3:
# python -m http.server 8080
```
Then visit: `http://localhost:8080`

---

## Core Features & Screens

1. **Screen 0: Welcome / Landing Page**
   - High-resolution HTML5 Canvas animated employee radar logo with dual counter-rotating cyan/emerald energy rings, orbiting particles, and specular lighting.
   - Dynamic platform metrics (Verified Reviews, Partner Companies, Skill Transparency Index).
   - "GET STARTED" CTA leading to authentication.

2. **Screen 1: Authentication & Role Selection**
   - Polymorphic role selector: `STUDENT`, `EMPLOYER`, `ADMIN`.
   - Pre-filled one-click demo credentials (`student/1234`, `employer/1234`, `admin/admin123`).
   - Left glassmorphism branding card featuring the enlarged ECOSCOPE animated avatar.

3. **Screen 2: Main Application Portal (9 Interactive Modules)**
   - **`01 Dashboard`**: Overview metric cards, top ranked companies table, live activity audit feed.
   - **`02 Companies`**: Search by name/skill, filter by industry, company inspection cards, and modal to insert new partner companies.
   - **`03 Reviews`**:
     - *Write Review*: Multi-factor rating sliders (Overall, Work-Life, Culture, Growth) that enqueue into the custom FIFO Queue.
     - *Published Reviews*: Filterable list of peer insights.
     - *Verification Queue*: Visualized Bounded Circular FIFO Queue (Capacity: 30) with `Verify & Publish` (which recalculates company averages using `calc_avg64`) and `Reject`.
   - **`04 Skill Transparency`**: Candidate weighted benchmark calculator (C++, DSA, SQL, Python, Problem Solving, Communication) matched against company standards.
   - **`05 Salary Insights`**: Annual CTC breakdown, compensation bars, and Win64 ABI monthly-to-annualized salary calculator.
   - **`06 Compare Companies`**: Multi-company chips selector, head-to-head comparison matrix across all 6 core metrics.
   - **`07 Analytics & 3D`**:
     - *View A (Bar Comparison)*: 2D bar charts and pseudo-3D isometric bar charts with interactive click-to-inspect side panel.
     - *View B (3D Metric Prism)*: Interactive 3D Canvas turntable with mouse drag rotation, zoom (`+`/`-`), pitch/yaw/roll keys, and auto-spin toggle.
     - *View C (DDA & Bresenham Graphs)*: Full Cohen-Sutherland 4-bit outcode line clipping (`TOP=1000`, `BOTTOM=0100`) with:
       - Presets: `RANGE: FULL`, `FOCUS: TOP`, `RANGE: MID`, `RANGE: HIGH`, `RANGE: CUST`.
       - Granular `MIN` and `MAX` adjusters (`-` and `+`).
       - X-Axis Sorting: `SORT: ID`, `SORT: HIGH` (descending), and `SORT: LOW` (ascending).
   - **`08 Algorithm Lab`**:
     - 64-bit CPU register HUD: Live updates for `RAX`, `RBX`, `RCX`, `RDX`, and status flags `[CF] [ZF] [SF] [OF]`.
     - Interactive NASM instruction execution: `64-BIT ADD (add64)`, `COMPARE (compare64)`, `DIVIDE / AVG (calc_avg64)`, `COUNT >= B (count_ge64)`, `MULT_ADD LOOP (mult_add64)`, and `ASM STRLEN (asm_strlen)`.
     - Live cycle-by-cycle assembly trace terminal.
   - **`09 Profile & History`**: Active session metadata, polymorphic class lineage, and complete audit trail.
