Product Requirement Document for Rubric Manager

## 1. Overview

- A website that allows users to easily search and filter rubrics by **domain, subdomain, category**, or **keyword**.
- Users can e**dit** a rubric. These edits are **submitted to a review queue** (`/rubrics/review`) for oversight.
- User can view the content of a patient case, and be able to add/modify case-specific criteria, and shows list of broad category criteria that apply to this case. We can also add a "auto-gen" feature on this page.
- User can directly evaluate the LLM responses against a set of rules using our evaluation tool.
- 
- Will likely be deployed as a standalone app for RDs and internal use

## 2. Objectives

- Create and edit rubrics
- Version control and audit trails
- LLM Evaluation integration
- Rubric templates and ai suggestions
- Collaboration and review
- Search and browse
- Export

## 3. User Stories

- As a RD/reviewer, I want to quickly browse available rubrics related to a domain, so I can apply the same standards across benchmark cases.

## 4. Functional Requirements

# Technical details (concerns)

- Should Next.js be used or can we get away with regular javascript (not even react)
- Handling authentication, oAuth or iHealth’s in-house authentication

# Dashboard Integration

```jsx
sidebar_navigation = {
    "🏠 Home": {
        "page": "home",
        "submenu": None
    },
    "📚 Rubrics": {
        "page": "rubrics",
        "submenu": [
            "Browse All",
            "My Rubrics",
            "Create New",
            "Archived"
        ]
    },
    "🧪 Test Cases": {
        "page": "test_cases",
        "submenu": [
            "Run LLM Evaluation",
            "Upload Case Data",
            "Manage Test Sets"
        ]
    },
    "🧠 Criteria & Logic": {
        "page": "criteria_logic",
        "submenu": [
            "Rule Builder",
            "LLM Suggestions",
            "Versioning & Audits"
        ]
    },
    "📈 Analytics": {
        "page": "analytics",
        "submenu": [
            "Performance Trends",
            "Agreement Metrics",
            "Reviewer Stats"
        ]
    },
    "⚙️ Settings": {
        "page": "settings",
        "submenu": [
            "User Preferences",
            "Export/Import",
            "System Logs"
        ]
    }
}

```

Git Repo https://github.com/ellaquan-ihealth/rubricmanager

```jsx
Scaffolded folder Design 
rubric-manager/
│
├── frontend/                  # React or Next.js frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components (Table, Dropdown, Modal)
│   │   ├── pages/             # Page routes (e.g., index.tsx, rubric/[id].tsx)
│   │   ├── lib/               # Frontend utilities (API client, helper funcs)
│   │   ├── types/             # TypeScript types/interfaces for rubric schema
│   │   └── styles/            # Tailwind or CSS modules
│   ├── .env.local             # API URL, auth keys
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/               # FastAPI routes
│   │   │   ├── rubric.py      # /rubrics endpoint (CRUD)
│   │   │   └── auth.py
│   │   ├── core/              # Core configs
│   │   │   └── settings.py    # env vars, config loader
│   │   ├── db/                # Database setup
│   │   │   ├── base.py
│   │   │   └── models.py      # Rubric, User, Label models
│   │   ├── schemas/           # Pydantic schemas (request/response validation)
│   │   ├── services/          # Business logic (versioning, filtering)
│   │   └── main.py            # FastAPI app entrypoint
│   ├── .env
│   └── requirements.txt
│
├── prisma/ or alembic/        # DB migrations (Prisma or Alembic/SQLAlchemy)
│
├── docs/                      # API docs or rubric design specs
│
├── scripts/                   # Optional CLI tools for rubric import/export
│
└── README.md

```
