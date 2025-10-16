# Finn Interview — Full Stack Application

> A production-ready full-stack app with Spring Boot (Java), React (TypeScript), PostgreSQL, MongoDB, Docker, AWS CloudFormation, and Kubernetes.

---

## 🚀 Tech Stack

**Backend**  
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?logo=springboot&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-JSON%20Web%20Tokens-000000?logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?logo=swagger&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)

**Frontend**  
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-5-764ABC?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=react-router&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)
![Tanstack](https://img.shields.io/badge/TanStack-Query-FF4154?logo=tanstack&logoColor=white)

**DevOps & Infrastructure**  
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-CloudFormation-FF9900?logo=amazonaws&logoColor=white)

---

## 📦 Project Structure

```
finn-interview/
├── finn-back/                 # Spring Boot backend
│   ├── src/main/java/         # Controllers, Services, Repos, Config
│   ├── src/main/resources/    # application.yml
│   └── Dockerfile
├── finn-front/                # React + Vite frontend
│   ├── src/                   # Components, Pages, Hooks, Store
│   ├── server.ts              # SSR runtime
│   └── Dockerfile
├── docker-compose.yml         # Local and production profiles
├── cloudformation-template.yaml  # AWS infrastructure as code
├── .env.example               # Environment variables template
└── ESPECIFICATIONS.md         # Detailed requirements and answers
```

---

## ⚡ Quick Start

### Prerequisites

- Docker & Docker Compose
- (Optional) Node.js 20+, Java 21+, psql, mongosh for local dev without containers

### 1. Clone and configure

```bash
git clone https://github.com/Raikonif/finn-interview.git
cd finn-interview

# Copy environment template and edit as needed
cp .env.example .env
```

### 2. Run locally (with local Postgres/Mongo)

```bash
docker compose --profile local up -d --build
```

- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:3000
- **Swagger UI**: http://localhost:8080/swagger-ui

### 3. Run production-like (expects external RDS/Mongo Atlas)

```bash
# Set POSTGRES_HOST, MONGO_URI, etc. in .env
docker compose --profile production up -d --build
```

### 4. Stop and clean up

```bash
# Stop containers
docker compose down

# Stop and wipe volumes (⚠️ deletes data)
docker compose down -v
```

---

## 🗄️ Database Access (Local)

### PostgreSQL

```bash
psql -h localhost -U admin -d app
# Password: admin (or value from .env)
```

### MongoDB

```bash
mongosh --host localhost -u admin -p admin --authenticationDatabase admin
```

---

## 🔐 Environment Variables

| Variable | Description | Default (local) | AWS Source |
|----------|-------------|-----------------|------------|
| `POSTGRES_HOST` | PostgreSQL host | `postgres` | RDS endpoint via Secrets Manager |
| `POSTGRES_USER` | Postgres username | `admin` | Secrets Manager |
| `POSTGRES_PASSWORD` | Postgres password | `admin` | Secrets Manager |
| `POSTGRES_DB` | Database name | `app` | RDS config |
| `MONGO_URI` | MongoDB connection string | `mongodb://admin:admin@mongodb:27017/app?authSource=admin` | Atlas or self-hosted |
| `JWT_SECRET` | JWT signing key | `change-me-please-and-make-it-long` | CloudFormation NoEcho param |
| `VITE_API_BASE_URL` | Frontend API base (build-time) | `http://backend:8080` | Set for ALB in AWS |
| `ENVIRONMENT` | Spring profile | `local` | `production` in AWS |

See `.env.example` for the full list.

---

## 🏗️ Features Implemented

### Backend (Java Spring Boot)
- [x] Full CRUD for User entity with dual persistence
- [x] PostgreSQL (JPA, source of truth) + MongoDB (document projection via `relationalId`)
- [x] RESTful APIs with Spring Web
- [x] JWT authentication with refresh tokens
- [x] Swagger/OpenAPI documentation
- [x] Health checks via Actuator

**Key files:**
- Config: `finn-back/src/main/resources/application.yml`
- Models: `finn-back/src/main/java/com/excercise/finnback/entity/UserEntity.java`, `...document/UserDocument.java`
- Repos: `finn-back/src/main/java/com/excercise/finnback/repository/UserPostgresRepository.java`, `...UserMongoRepository.java`
- Service: `finn-back/src/main/java/com/excercise/finnback/service/UserService.java`

### Frontend (React + TypeScript)
- [x] Responsive UI with header, footer, nav (4+ links)
- [x] Multiple pages with React Router
- [x] Data fetching and display from backend
- [x] Forms with validation
- [x] Redux for global state (auth: `finn-front/src/store/`)
- [x] CSS animations on hover and custom theme
- [x] SSR with React Router + Vite (`finn-front/server.ts`, `SSR_IMPLEMENTATION.md`)
- [ ] Real-time updates (Socket.io) — in progress

### Infrastructure & DevOps
- [x] Dockerized backend and frontend
- [x] Docker Compose with local/production profiles
- [x] AWS CloudFormation (EC2, RDS, ALB, VPC, SGs, Secrets Manager)
- [x] Secrets: local `.env` (git-ignored) + AWS Secrets Manager + NoEcho params
- [x] Dynamic env configuration
- [ ] Kubernetes manifests (Deployments, Services, Ingress) — in progress

---

## 📚 Documentation

- **[ESPECIFICATIONS.md](ASSESSMENTS.md)** — Requirements, architecture, persistence strategy, theoretical Q&A
- **[finn-front/SSR_IMPLEMENTATION.md](finn-front/SSR_IMPLEMENTATION.md)** — SSR with React Router/Vite
- **[finn-back/API_USAGE.md](finn-back/API_USAGE.md)** — Backend API endpoints

---

## 📖 Full Requirements & Answers

For detailed specifications, architecture, persistence strategy, and theoretical Q&A, see **[ESPECIFICATIONS.md](ESPECIFICATIONS.md)**.

Topics covered:
- Dependency Injection and Spring MVC vs. Spring Boot
- MongoDB vs. PostgreSQL comparison and when to use each
- AWS EC2 vs. ECS, High Availability strategies
- Microservices architecture and Kubernetes support

---

## 🤝 Contributing

This is an interview assessment project. For questions or feedback, open an issue or contact [@Raikonif](https://github.com/Raikonif).

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

---

**Made with ❤️ by Raikonif**
