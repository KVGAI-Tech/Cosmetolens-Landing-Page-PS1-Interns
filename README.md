# Cosmetolens – Landing Page Redesign

## Overview

This repository is part of the PS1 Internship Program.

The goal of this project is to redesign and improve the Cosmetolens landing page with a modern, engaging, responsive, and production-ready user experience.

One team member will first create the complete landing page structure and push it to the `main` branch. After that, each student will improve specific components and contribute their changes through Pull Requests.

---

## ⚠️ Contributing — Git Workflow (READ THIS FIRST)

**Never develop on, or push to, `main`.** `main` is the protected, reviewed code. All your work happens on your own branch, and changes only reach `main` through a Pull Request that an admin reviews and merges.

Follow these steps exactly:

```bash
# 1. Clone the repository (you've been added as a collaborator)
git clone https://github.com/KVGAI-Tech/Cosmetolens-Landing-Page-PS1-Interns.git

# 2. Go into the project folder
cd Cosmetolens-Landing-Page-PS1-Interns

# 3. Make sure your local main is up to date with the latest code
git checkout main
git pull origin main

# 4. Create YOUR OWN branch off main — just use your name
#    e.g. rahul
git checkout -b <your-name>

# 5. Develop locally on YOUR branch. When committing, mention the feature you worked on
git add .
git commit -m "<feature you worked on> — what you changed"

# 6. Push YOUR branch to GitHub (NOT main)
git push -u origin <your-name>
```

After pushing, open a Pull Request (`<your-name> → main`) and wait for an admin to review and merge it.

---

## Tech Stack

* **React 19** + **TypeScript**
* **Vite** (dev server & build)
* **Tailwind CSS** (styling)
* **lucide-react** (icons)

## Local Setup

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint
```

If the project needs environment variables, copy `.env.example` to `.env` and fill in the values.

---

## Project Workflow

### Step 1: Base Landing Page

A base landing page will be created and pushed to the `main` branch.

This will be the starting point for all contributors.

---

### Step 2: Create Your Own Branch

Do not work on the `main` branch.

Create a branch using your name.

Example:

```bash
git checkout -b kartik-jain
```

All your work should happen inside your personal branch.

---

### Step 3: Choose a Component

Coordinate with your teammates and choose a component to improve.

Examples:

* Navbar
* Hero Section
* Problem Statement Section
* How It Works Section
* AI Analysis Section
* Ingredient Recommendation Section
* Product Intelligence Section
* Rewards Section
* Knowledge Hub Section
* Footer
* Mobile Responsiveness
* Animations & Interactions

---

## Before You Push

Always get the latest changes from the main branch before pushing your work.

```bash
git checkout main
git pull origin main

git checkout your-name
git merge main
```

Then push your updated branch:

```bash
git push origin your-name
```

This helps prevent merge conflicts when creating your Pull Request.

---

## Submit Your Changes

### Add Files

```bash
git add .
```

### Commit Changes

```bash
git commit -m "Improved Navbar UI"
```

### Push Changes

```bash
git push origin your-name
```

---

## Raise a Pull Request

After completing your work:

1. Push your branch.
2. Create a Pull Request (PR).
3. Select:

```text
your-name → main
```

4. Add a brief description of your changes.
5. Submit the PR.

---

## Important Rules

✅ Create your own branch.

✅ Work only on your own branch.

✅ Pull latest changes regularly.

✅ Raise a Pull Request for all changes.

✅ Keep designs modern, responsive, and professional.

❌ Do not push directly to `main`.

❌ Do not merge your own PR.

❌ Do not delete another contributor's work.

❌ Do not make changes directly on someone else's branch.

---

## Review Process

All Pull Requests will be reviewed by Kartik.

Only approved changes will be merged into the `main` branch.

The `main` branch will be treated as the production branch.

---

## Design Goal

The final landing page should be:

* Modern
* Premium
* Professional
* Mobile Responsive
* User Friendly
* AI-Focused
* Skincare-Focused
* Production Ready

---

## Additional Information

Detailed product documentation and business requirements will be shared in the WhatsApp group once the team is finalized.

Please review the provided documentation before starting development.

---

## Repository

Cosmetolens Landing Page – PS1 Interns

Repository URL:

https://github.com/KVGAI-Tech/Cosmetolens-Landing-Page-PS1-Interns
