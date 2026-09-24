# Virtual STEM Lab

> An interactive web-based virtual laboratory platform for learning Science, Technology, Engineering and Mathematics through simulations, experiments and structured learning experiences.

## Project Overview

Virtual STEM Lab is an interactive educational platform designed to help students understand STEM concepts through virtual experiments and visual simulations.

The platform provides a digital laboratory environment where students can explore scientific concepts without depending entirely on physical laboratory equipment. It combines structured learning content with interactive experiments to make STEM education more engaging, visual and accessible.

The project is being developed as a full-stack web application with a modern React frontend and a FastAPI backend.

The platform is designed to:

- Provide access to virtual STEM experiments
- Help students understand concepts through interactive simulations
- Organize experiments by subject and difficulty
- Track learning progress
- Provide course-based learning experiences
- Maintain a personalized student laboratory area
- Support future assignments, quizzes and assessments
- Reduce dependency on physical laboratory infrastructure

---

## 1. Purpose of the Project

Traditional laboratory-based learning can be limited by factors such as availability of equipment, laboratory access, cost and time constraints.

Virtual STEM Lab aims to provide students with a digital environment where they can explore experiments and understand scientific principles interactively.

Instead of only reading theoretical explanations, students can interact with virtual laboratory components and observe how changing experimental parameters affects the results.

The project focuses on creating a learning experience that combines:

- Theory
- Interactive experiments
- Visual simulations
- Progress tracking
- Course-based learning

---

## 2. Key Features

### Interactive Dashboard

The dashboard provides an overview of the student's learning activity.

It includes:

- Learning statistics
- Experiment progress
- Recent activities
- Backend connection status
- Quick access to experiments and learning sections

### Experiments

The Experiments section provides a catalog of virtual STEM experiments.

Students can:

- Search experiments
- Filter experiments by subject
- View difficulty levels
- View estimated experiment duration
- Track experiment progress
- Open available interactive laboratories

Current experiment categories include:

- Physics
- Chemistry
- Biology

### Interactive Ohm's Law Laboratory

One of the implemented virtual experiments is an interactive Ohm's Law laboratory.

The experiment allows students to work with:

- Voltage
- Resistance
- Current
- Electrical switch
- Ammeter visualization
- Current-flow animation
- Experiment readings

The platform calculates current using:

**I = V / R**

For example:

```text
Voltage = 10 V
Resistance = 5 Ω
Current = 2 A


============================SYSTEM ARCHITECTURE===================================

                    ┌─────────────────────────┐
                    │     Virtual STEM Lab    │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                 │
        ┌───────▼────────┐               ┌────────▼────────┐
        │    Frontend    │               │     Backend     │
        │                │               │                 │
        │ React          │               │ FastAPI         │
        │ TypeScript     │◄─────────────►│ Python          │
        │ Tailwind CSS   │     REST      │ Uvicorn         │
        │ Three.js       │     API       │                 │
        └───────┬────────┘               └────────┬────────┘
                │                                 │
                │                         ┌───────▼────────┐
                │                         │   PostgreSQL   │
                │                         │    Planned     │
                │                         └────────────────┘
                │
        ┌───────▼─────────────┐
        │ Interactive Learning│
        │                     │
        │ Experiments         │
        │ Courses             │
        │ My Lab              │
        │ Progress            │
        │ Assignments         │
        └─────────────────────┘


=================================PROJECT STRUCTURE===========================================

VIRTUAL-STEM-LAB/
│
├── Api/
│
├── Backend/
│   ├── main.py
│   ├── .venv/
│   └── ...
│
├── Database/
│
├── Docs/
│
├── Frontend/
│   │
│   ├── public/
│   │   └── images/
│   │       ├── labs/
│   │       ├── experiments/
│   │       └── hero/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── ExperimentCard.tsx
│   │   │   ├── OhmLawScene.tsx
│   │   │   └── BackendStatus.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Experiments.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── OhmsLaw.tsx
│   │   │   └── MyLab.tsx
│   │   │
│   │   ├── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   │
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── Simulations/
│
├── .gitignore
├── docker-compose.yml
└── README.md
