# Part 1 · Full Stack Application

## Backend (Java Spring)

- [x] Build a Spring Boot app with full CRUD for a basic entity (User).
- [x] Use MongoDB and PostgreSQL. Explain persistence for each.

### Persistence (short, with links)

- PostgreSQL (source of truth, JPA): `UserEntity` with constraints; `UserPostgresRepository` for CRUD.
	- Config: `finn-back/src/main/resources/application.yml`
	- Model: `finn-back/src/main/java/com/excercise/finnback/entity/UserEntity.java`
	- Repo: `finn-back/src/main/java/com/excercise/finnback/repository/UserPostgresRepository.java`
- MongoDB (document projection): `UserDocument` linked via `relationalId`; `UserMongoRepository` for CRUD.
	- Model: `finn-back/src/main/java/com/excercise/finnback/document/UserDocument.java`
	- Repo: `finn-back/src/main/java/com/excercise/finnback/repository/UserMongoRepository.java`
- Orchestration: Service keeps Mongo in sync with Postgres on create/update/delete; CRUD reads come from Postgres.
	- Service: `finn-back/src/main/java/com/excercise/finnback/service/UserService.java`
- Runtime
	- Local: `docker-compose.yml` (local profile) starts Postgres/Mongo and injects env vars.
	- AWS: RDS for Postgres; Mongo via Atlas or self-hosted; EC2 UserData writes `.env` consumed by Compose.

- [x] Expose RESTful APIs using Spring Web.
- [x] Implement authentication using JWT.

## Frontend (React) ✅

- [x] Header, footer, nav bar (≥ 4 links)
- [x] At least two pages with React Router
- [x] Component fetches data from backend API and displays it
- [x] Form to submit new data
- [ ] Real-time updates to a list (bonus: Socket.io)
- [x] React Hooks for state management
- [x] CSS hover animations on nav
- [x] Custom design theme with CSS
- Redux (global state)
	- Store: `finn-front/src/store/store.ts`
	- Slice: `finn-front/src/store/authSlice.ts`
	- Middleware: `finn-front/src/store/middleware.ts`
- SSR with React Router/Vite
	- Server entry: `finn-front/src/entry-server.tsx`
	- Root for SSR: `finn-front/src/RootServer.tsx`
	- Router: `finn-front/src/routers/AppRouter.tsx`
	- Server runtime: `finn-front/server.ts` or `finn-front/server.mjs`
	- Notes: `finn-front/SSR_IMPLEMENTATION.md`

# Part 2 · Infrastructure & DevOps

## AWS Infrastructure

Provision to run the Spring Boot backend (CloudFormation/Terraform):

- [x] EC2 for app hosting
- [x] RDS for PostgreSQL
- [x] MongoDB Atlas (or self-hosted)
- [x] Security best practices (IAM roles, VPC, SGs)

## Kubernetes (Bonus)

- [x] Containerize backend and frontend
- [ ] Manifests:
	- Deployments
	- Services
	- Ingress
- Show how you manage:
- [x] Secrets (e.g., DB credentials)
- [x] Database connections
	- Scalability and resilience

### How secrets and database connections are managed

- Local (docker-compose)
	- Env files: `.env` (git-ignored) with defaults in `.env.example`.
	- Compose reads `.env` via `env_file` and injects variables to services: `docker-compose.yml`.
	- Backend env vars consumed by Spring:
		- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `SPRING_DATA_MONGODB_URI`, `JWT_SECRET`.
	- Frontend API base (build-time): `VITE_API_BASE_URL` (passed as build arg in `finn-front/Dockerfile`).

- AWS (CloudFormation)
	- RDS password stored in Secrets Manager (`DBSecret`) and fetched in EC2 UserData.
	- JWT secret provided via `JWTSecret` (NoEcho) and appended to `.env` in UserData; file is restricted with `chmod 600`.
	- Optional MongoDB Atlas URI via `MongoDBAtlasConnectionString` (NoEcho). If present, the compose Mongo service is auto-commented in UserData.
	- See `cloudformation-template.yaml` for: `Parameters` (JWTSecret, MongoDBAtlasConnectionString), `DBSecret`, and `AppLaunchTemplate` UserData that writes `.env`.

- Spring Boot binding
	- `finn-back/src/main/resources/application.yml` maps those env vars to Spring Data JPA (Postgres) and Spring Data MongoDB (Mongo URI), with safe defaults for local.


# Part 3 · Theoretical Questions

## Java Spring Framework
- What is Dependency Injection, and why is it important? ✅
	- DI lets the framework provide a class’s dependencies (services, repositories) instead of creating them manually. It improves modularity, testability, and maintainability by decoupling implementations from their consumers.
- What’s the difference between Spring MVC and Spring Boot? ✅
	- Spring MVC is the web framework (controllers, request mapping, view rendering). Spring Boot is an opinionated layer that auto-configures Spring apps, provides starters, and embeds servers to reduce boilerplate.

## Databases
- Compare MongoDB vs. PostgreSQL: data model, queries, scalability. ✅
	- Data model: MongoDB = document (flexible JSON/BSON); PostgreSQL = relational tables with constraints.
	- Queries: MongoDB uses document queries/aggregation; PostgreSQL uses SQL with joins, CTEs, window functions (plus JSONB for hybrid cases).
	- Scalability: MongoDB favors horizontal sharding; PostgreSQL excels at consistency and vertical scaling with replication; extensions help horizontal scale.
- When would you choose one over the other? ✅
	- PostgreSQL: strong consistency, complex transactions/joins, analytics.
	- MongoDB: evolving schemas, rapid iteration, high write throughput with eventual consistency.

## AWS
- Compare EC2 and ECS. ✅
	- EC2: virtual machines you manage (OS, patches, scaling). ECS: managed container orchestration (tasks/services) running on EC2 or Fargate.
- How would you ensure high availability and fault tolerance? ✅
	- Multi-AZ subnets, ALB across AZs, health checks, Auto Scaling Groups (min > 1), RDS Multi-AZ, rolling/blue-green deployments, backups and tested restores, least-privilege IAM, and CloudWatch alarms with automated recovery.

## Microservices & Kubernetes
- Define microservices and their benefits. ✅
	- Small, independently deployable services around bounded contexts; benefits: independent scaling/deployments, fault isolation, team autonomy. Trade-offs: distributed complexity and observability.
- How Kubernetes supports microservices. ✅
	- Declarative deployments, self-healing (probes), service discovery and routing (Services/Ingress), autoscaling (HPA), ConfigMaps/Secrets, rolling updates/rollbacks, namespaces/RBAC.

## Bonus (Optional)
- Implement Redux for global state management in the React app. ✅
- Add a real-time chat feature using Socket.io. 
- Implement SSR for the React app using React Router/Vite. ✅

