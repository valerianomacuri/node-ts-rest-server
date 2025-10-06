# REST Server Documentation - Node.js with TypeScript

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js (v16 or higher recommended)

### Initial Setup

1. **Clone environment variables**
   ```bash
   cp .env.template .env
   ```

2. **Configure variables in `.env`**
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   PUBLIC_PATH=public

   # PostgreSQL Configuration
   POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO
   POSTGRES_USER=postgres
   POSTGRES_DB=TODO
   POSTGRES_PORT=5432
   POSTGRES_PASSWORD=123456
   ```

3. **Start services with Docker**
   ```bash
   docker compose up -d
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```

## 🛠️ Available Scripts

```bash
npm run dev          # Development mode with hot-reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run compiled version
npm run lint         # Check code with ESLint
npm test             # Run tests
```

## 🗄️ Database

### PostgreSQL Connection
The application connects to PostgreSQL using the `POSTGRES_URL` environment variable:
```
postgresql://postgres:123456@localhost:5432/TODO
```

## 🔧 Docker Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# View logs
docker compose logs -f

# Restart services
docker compose restart
```

## 🐳 Docker Services

- **PostgreSQL Database**: Port 5432
- **Node.js Application**: Port 3000
