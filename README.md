# Task Manager - Technical Assessment

A simple Task Manager application built with Next.js, Apollo GraphQL, KnexJS, and PostgreSQL.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine
- NodeJS
- Npm (or other NodeJS package manager)

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd full-stack-software-engineer-exercice
```

#### 2. Database Setup
Start the PostgreSQL database using Docker:
```bash
docker compose up
```

#### 3. Backend Setup
Navigate to the backend folder and set up the database:
```bash
cd backend
npm install
npm run migrate
npm run seed
```

#### 4. Frontend Setup
In a new terminal, navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

### Running the Application

#### Start the Backend
From the `backend` folder:
```bash
npm run dev
```

#### Start the Frontend
In a new terminal, from the `frontend` folder:
```bash
npm run dev
```

#### Access the Application
- Frontend: http://localhost:3000
- GraphQL Playground: http://localhost:4000/graphql

## Project Structure

```
├── backend/
│   ├── server.js       # Express + Apollo Server
│   ├── db.js           # Database connection
│   ├── schema.js       # GraphQL schema
│   ├── resolvers.js    # GraphQL resolvers
│   ├── knexfile.js     # Knex configuration
│   ├── migrations/     # Database migrations
│   └── seeds/          # Seed data
├── frontend/
│   ├── pages/
│   │   └── index.tsx   # Main page
│   ├── next.config.js  # Next.js configuration
│   └── tsconfig.json   # TypeScript configuration
└── docker-compose.yml
```

## Your Tasks

### 1. Find and Fix Bugs

The application has several bugs in both the backend and frontend. Your task is to:

- Identify the bugs
- Fix them
- Explain why they were bugs

### 2. Make Improvements

After fixing the bugs, make at least **two improvements** from the following:

- Remove inefficient queries (N+1 problems)
- Add validation and error handling
- Fix database insert return values
- Proper async/await handling
- Frontend re-render optimization
- Optimistic UI updates or proper refetching

### 3. Explain Trade-offs

As you work, explain your thought process:

- What are you prioritizing and why?
- What trade-offs are you making?
- How would you approach this differently in a production environment?

## Expected Deliverables

1. Working code with bugs fixed
2. At least 2 meaningful improvements
3. Clear explanation of changes made

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express, Apollo Server
- **Database**: PostgreSQL with KnexJS
- **Infrastructure**: Docker, Docker Compose

Good luck!
