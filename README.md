# Simple Backend API - DevOps Learning Project

A TypeScript/Express.js REST API for a Todo application, designed for DevOps learning and practice.

## 🎯 Learning Objectives

This project demonstrates:
- RESTful API design and implementation
- TypeScript backend development
- Docker containerization
- PostgreSQL database integration
- Environment configuration
- CORS handling
- API testing and validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Local Development
```bash
# Install dependencies
npm install

# Start PostgreSQL with Docker
docker-compose up -d postgres

# Start development server
npm run dev
```

The API will be available at `http://localhost:5001`

## 📁 Project Structure

```
simple-backend-api/
├── src/
│   ├── server.ts          # Express server setup
│   └── todo.ts            # Todo business logic
├── docker/
│   └── docker-compose.yml # PostgreSQL container
├── .env                   # Environment variables
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## 🔧 Environment Variables

Create a `.env` file:
```env
PORT=5001
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/todoapp
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server status

### Todo Operations
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/toggle` - Toggle completion
- `DELETE /api/todos/:id` - Delete todo

### Example Requests
```bash
# Get all todos
curl http://localhost:5001/api/todos

# Create todo
curl -X POST http://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn DevOps"}'

# Update todo
curl -X PUT http://localhost:5001/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Master DevOps"}'

# Delete todo
curl -X DELETE http://localhost:5001/api/todos/1
```

## 🐳 Docker Setup

### PostgreSQL Container
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Connect to database
docker exec -it postgres_container psql -U user -d todoapp
```

### Backend Container (Future Enhancement)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]
```

## 🗄️ Database Schema (PostgreSQL)

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:5001/api/health

# Test CRUD operations
npm run test  # (when tests are implemented)
```

## 🔄 DevOps Pipeline (Future)

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
```

## 📚 DevOps Learning Topics

1. **Containerization**: Docker, Docker Compose
2. **Database**: PostgreSQL, migrations, connection pooling
3. **CI/CD**: GitHub Actions, automated testing
4. **Monitoring**: Health checks, logging, metrics
5. **Security**: Environment variables, CORS, input validation
6. **Deployment**: Cloud platforms, load balancing
7. **Infrastructure**: Kubernetes, Helm charts

## 🛠️ Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Start production server
npm run lint     # Lint code
npm run format   # Format code
```

## 🔗 Related Projects

- [Simple Frontend UI](../simple-frontend-ui) - React TypeScript frontend
- Docker Compose setup for full-stack deployment
- Kubernetes manifests for container orchestration

## 📝 Next Steps for DevOps Learning

1. Add PostgreSQL integration
2. Implement database migrations
3. Add comprehensive testing
4. Set up CI/CD pipeline
5. Add monitoring and logging
6. Containerize the application
7. Deploy to cloud platform
8. Set up infrastructure as code