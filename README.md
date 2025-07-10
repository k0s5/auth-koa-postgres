### **Auth Service**

A modern user authentication service built with TypeScript, Koa.js, Prisma ORM, and PostgreSQL.

🚀 **Features**

- JWT authentication with access/refresh tokens
- Secure storage of refresh tokens in HTTP-only cookies
- Session management with device tracking
- Data validation using Joi
- Logging with Winston and file rotation
- TypeScript for type safety
- Prisma ORM for database operations

📋 **Requirements**

- Node.js >= 22.17.0
- PNPM >= 10.12.4
- PostgreSQL 17.5+
- Docker & Docker Compose (optional)

🛠 **Tech Stack**

- **Framework:** Koa.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Access + Refresh tokens)
- **Validation:** Joi
- **Logging:** Winston with daily rotation
- **Security:** Rate limiting, CORS, security headers
- **Containerization:** Docker

---

TODO:

- refreshToken cookie encryption
- rate limiter
- headers security
- email verification
- redis cache
- docker containerization
