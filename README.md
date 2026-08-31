# 🤖 AI Business Manager

### A full-stack business management platform for invoices, inventory and AI-assisted workflows.

AI Business Manager is a full-stack application designed to simplify everyday business operations by combining traditional business management tools with AI-powered workflows.

The project separates the frontend and backend into independent applications, with the backend responsible for APIs, business logic, data access and integrations.

---

##  Features

###  Invoice Management

* Create and manage invoices
* Process invoice information
* Organize business records
* Automate repetitive invoice workflows

###  Inventory

* Track products and stock
* Monitor inventory levels
* Identify low-stock situations
* Manage inventory-related business data

###  AI Assistance

AI capabilities are integrated into business workflows to reduce repetitive manual work and make business information easier to interact with.

###  Authentication

* Authenticated API access
* User-specific application workflows
* Protected backend routes

---

##  Architecture

```text
                ┌──────────────────┐
                │    React UI      │
                └────────┬─────────┘
                         │
                      REST API
                         │
                ┌────────▼─────────┐
                │    FastAPI       │
                │     Backend      │
                └────────┬─────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
       Routes         Services        Models
          │              │              │
          └──────────────┼──────────────┘
                         │
                     Database
                         │
                  External / AI
                    Services
```

The backend is organized around separate routes, services, models, dependencies and utility components.

---

##  Tech Stack

### Frontend

`React` · `JavaScript` · `Framer Motion`

### Backend

`Python` · `FastAPI`

### Architecture

`REST API` · `Authentication` · `Service Layer` · `Database`

### AI / Automation

`OCR` · `AI-assisted workflows`

---
##  Project Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── dependencies/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── requirements.txt
│
└── frontend/
```

---

## Configuration

Create the backend environment file from the example:

```bash
cp backend/.env.example backend/.env
```

Add the required environment variables before starting the application.

---

##  Development

### Backend

```bash
cd backend

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt
```

Start the FastAPI application using the project's configured entry point.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Why I Built It

I wanted to explore what happens when AI is treated as part of a real application rather than as an isolated model.

The project combines:

```text
Business Logic
      +
Backend APIs
      +
Database
      +
AI
      +
Frontend
```

into a single end-to-end system.

---

## Status

This is an actively evolving project.

The architecture is being developed toward a more complete production-style application with stronger validation, testing, deployment and automation.

---

##  License

See the repository for licensing information.
