# Async Task-Based API Architecture

### NestJS + BullMQ + Redis

This repository provides a **base implementation of an asynchronous, task-oriented API architecture**, inspired by Celery, designed for **NestJS** using **BullMQ** and **Redis**.

It is intended as a **starting point** for building APIs that handle **long-running, heavy, or asynchronous operations** without blocking HTTP requests.

---

## 🚀 What is this architecture?

This is a **Queue-Backed Async API** based on the **Producer / Consumer pattern**.

Instead of executing logic synchronously inside an HTTP request, the API:

1. Receives a request
2. Creates a **task (job)** with a unique UUID
3. Pushes the task to a queue (Redis)
4. Returns immediately with a `taskId`
5. Dedicated workers process the task asynchronously
6. Clients query task status and result using the UUID

This pattern is commonly used in:

- Background processing
- Data analysis
- File generation
- Security scans
- AI workloads
- Automation tools
- Utility APIs

---

### Bull Board Authentication

Bull Board is protected using HTTP Basic Authentication.
Credentials are configured via environment variables and intended
for administrative access only.

---

## 🧠 Core Concepts

### Components

- **API (Producer)**  
  Accepts HTTP requests and enqueues jobs

- **Redis (Coordinator)**  
  Stores queues, job states, locks and metadata

- **Workers (Consumers)**  
  Independent processes that execute jobs

---

## 🔁 Task Lifecycle

Client
↓
POST /tasks
↓
API enqueues task (UUID)
↓
Redis Queue
↓
Worker processes task
↓
Result stored in queue backend
↓
GET /tasks/{taskId}

---

## 📦 Why not a traditional API?

### Problems with synchronous APIs

- HTTP timeouts
- Blocked threads
- Poor scalability
- No retry mechanisms
- Hard to recover from crashes

### Benefits of this architecture

✅ Non-blocking HTTP requests  
✅ Horizontal scalability  
✅ Automatic retries  
✅ Fault tolerance  
✅ Worker isolation  
✅ Cloud-native friendly  
✅ Ideal for long-running tasks  

### 📦 Install

```bash
 git clone repo
 cd repo
 docker compose up -d --build
```

---

## 🧩 Task States

The API exposes the task states defined by the queue system:

```ts
waiting    // queued, waiting for a worker
active     // currently being processed
completed  // finished successfully
failed     // failed during execution
delayed    // scheduled for later execution
```

### 🔌 API Endpoints

#### Create a task

```bash
  curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'content-type: application/json' \
  --data '{
  "strategy": "calculation",
  "data": {
    "operation": "add",
    "v1": 10,
    "v2": 30
    }
  }
'
```

```bash
  curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'content-type: application/json' \
  --data '{
    "strategy": "calculation",
    "data": {
     "operation": "subtract",
     "v1": 110,
     "v2": 30
    }
   }
  '
```

```bash
  curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'content-type: application/json' \
  --data '{
  "strategy": "calculation",
  "data": {
    "operation": "multiply",
    "v1": 6,
    "v2": 7
  }
}
'
```

```bash
  curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'content-type: application/json' \
  --data '{
  "strategy": "qr",
  "data": {
    "text": "https://ironsofts.com",
    "size": 300
  }
}
'
```

#### Response

```json
{
  "taskId": "uuid",
  "status": "queued"
}
```

#### Get task status and result

```bash
curl --request GET \
  --url http://localhost:3000/tasks/057b101e-6f82-4415-b3f3-b9f735a96b06
}'
```

#### Response

```json
{
  "taskId": "uuid",
  "status": "completed",
  "result": { ... },
  "error": null
}
```

#### Get available task statuses

```bash
curl --request GET \
  --url http://localhost:3000/tasks/statuses
}'
```

#### Response

```json
{
  "statuses": [
    "waiting",
    "active",
    "completed",
    "failed",
    "delayed"
  ]
}

```

---

## 👤 Creator

**Gregorio Bolívar**

- 🔗 GitHub: <https://github.com/gbolivar/turbohive>  
- 🔗 LinkedIn: <https://www.linkedin.com/in/gregorio-bolivar/>

Software Engineer · Backend · DevSecOps  
Argentina

This project was created as an open-source contribution to demonstrate a scalable,
asynchronous task-based API architecture using NestJS, BullMQ, and Redis.
