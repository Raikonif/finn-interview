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
	- Secrets (e.g., DB credentials)
	- Database connections
	- Scalability and resilience