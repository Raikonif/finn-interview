# Start the containers in detached mode
docker compose up -d

# Start the containers in detached mode with build (Local profile)
docker compose --profile local up -d --build

# Start the containers in detached mode with build (Production profile)
docker compose --profile production up -d --build

# Check logs if needed
docker compose logs -f

# Stop the containers
docker compose down

# Stop and remove volumes as well (⚠️ wipes data)
docker compose down -v


# Postgres from host
psql -h localhost -U myuser -d mydatabase

# Mongo from host
mongo --host localhost -u myuser -p mypassword --authenticationDatabase admin

