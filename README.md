# 🚀 Distributed Job Scheduler

A scalable and distributed job scheduling system built using **Node.js, Express.js, BullMQ, Redis, MySQL, Sequelize, and React**. The application supports asynchronous job execution, batch processing, recurring jobs, worker monitoring, retry mechanisms, and a dashboard for real-time metrics.

---

## 📌 Features

- 🔐 JWT Authentication
- 🏢 Organization Management
- 📁 Project Management
- 📋 Job CRUD Operations
- 📦 Batch Job Scheduling
- ⏰ Delayed Job Scheduling
- 🔄 Recurring Jobs (Cron)
- ⚡ BullMQ Queue Management
- 📡 Redis Integration
- 👷 Worker Processing
- ❤️ Worker Heartbeat Monitoring
- 🔁 Automatic Retry with Exponential Backoff
- 🚨 Dead Letter Queue (DLQ)
- 📊 Metrics Dashboard
- 🛑 Graceful Shutdown
- 💾 MySQL Database using Sequelize ORM
- 🌐 React Dashboard

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js
- BullMQ
- Redis
- Sequelize ORM
- MySQL
- JWT Authentication

## Frontend
- React
- Vite
- Axios
- React Router DOM
- React Icons

## Database
- MySQL

---

# 📂 Project Structure

```
Distributed-Job-Scheduler
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── scheduler
│   ├── services
│   ├── workers
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🗄 Database Setup

Create the database:

```sql
CREATE DATABASE distributed_job_scheduler;
```

Configure the `.env` file.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=distributed_job_scheduler
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_secret

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

# 📡 REST APIs

## Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

## Jobs

- POST `/api/jobs`
- POST `/api/jobs/batch`
- POST `/api/jobs/recurring`
- GET `/api/jobs`
- GET `/api/jobs/:id`
- PUT `/api/jobs/:id`
- DELETE `/api/jobs/:id`

## Workers

- GET `/api/workers`

## Queues

- GET `/api/queues`

## Organizations

- CRUD Operations

## Projects

- CRUD Operations

## Metrics

- GET `/api/metrics`

---

# 📊 Dashboard

The React dashboard provides:

- Total Jobs
- Running Jobs
- Completed Jobs
- Failed Jobs
- Queued Jobs
- Workers
- Online Workers
- Queue Statistics

---

# 🔄 Job Execution Flow

```
React Dashboard
        │
        ▼
Express REST API
        │
        ▼
BullMQ Queue
        │
        ▼
Redis
        │
        ▼
Worker
        │
        ▼
MySQL Database
```

---

# ✅ Reliability Features

- BullMQ Queue
- Redis
- Worker Heartbeat
- Automatic Retry
- Exponential Backoff
- Dead Letter Queue
- Graceful Shutdown
- Concurrent Job Processing

---

# 👨‍💻 Author

**Raushan Kumar**

Distributed Job Scheduler Project
