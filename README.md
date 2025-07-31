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
    " Home": {
        "page": "home",
        "submenu": None
    },
    "Rubrics": {
        "page": "rubrics",
        "submenu": [
            "Browse All Rubics",
            "My Rubrics",
            "Create New",
            "Review Submission",
            "Archived"
        ]
    },
    "Benchmark Cases": {
        "page": "cases",
        "submenu": [
             "Browse All Cases",
            "Versioning & Audits"
        ]
    },
    "Test Cases": {
        "page": "test_cases",
        "submenu": [
            "Run LLM Evaluation",
            "Upload Case Data",
            "Manage Test Sets"
        ]
    },
    "Analytics": {
        "page": "analytics",
        "submenu": [
            "Performance Trends",
            "Agreement Metrics",
            "Reviewer Stats"
        ]
    },
    "Settings": {
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
1. Clone the repo
```bash
git clone https://github.com/ellaquan-ihealth/rubric-manager.git
cd rubric-manager
```
2. Install dependencies
```bash
npm install
```
3. Start the app locally
```bash
npm run dev
```
App will be available at: http://localhost:8080


## 📁 Folder Structure

```bash
/src
  ├── components       # UI components (cards, buttons, layout, etc.)
  ├── context          # Global state for rubrics (RubricProvider)
  ├── pages
  │   └── rubrics      # BrowseAll.tsx, RubricsLayout.tsx, etc.
  ├── styles           # Global CSS (e.g., Tailwind config)
  └── utils            # CSV parsing, filtering, etc.
```
