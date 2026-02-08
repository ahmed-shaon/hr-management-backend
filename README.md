# HR Management Backend

Node.js/Express/TypeScript API for HR management: authentication, employee CRUD, attendance tracking, and monthly attendance reports.

## Prerequisites

- **Node.js** (v18 or later recommended)
- **PostgreSQL** (v12 or later)
- **npm** (comes with Node.js)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ahmed-shaon/hr-management-backend.git
cd hr-management-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Copy the example env file and edit it with your values:

```bash
cp .env.example .env
```

Edit `.env` and set:

| Variable    | Description                          | Example                                              |
| ----------- | ------------------------------------ | ---------------------------------------------------- |
| `PORT`      | Server port                          | `3000`                                               |
| `DB_URL`    | PostgreSQL connection string         | `postgresql://user:password@localhost:5432/hr-management-system` |
| `JWT_SECRET`| Secret used to sign JWT tokens       | Use a long, random string in production              |

### 4. Database

Create a PostgreSQL database (e.g. `hr-management-system`), then run migrations and seeds:

```bash
# Run all migrations (creates tables)
npm run migrate

# Seed data (HR users, employees, attendance)
npm run seed
```

**Optional – seed individually:**

- `npm run seed:hr_user` – HR users only (e.g. admin@example.com / admin123)
- `npm run seed:employees` – Employees only
- `npm run seed:attendance` – Attendance only (requires employees to exist)

## Running the project

**Development (with ts-node):**

```bash
npm start
```

Server runs at `http://localhost:<PORT>` (default `http://localhost:3000`).

**Production build:**

```bash
npm run build
node dist/server.js
```

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm start`        | Start dev server (ts-node)      |
| `npm run build`    | Compile TypeScript to `dist/`   |
| `npm run migrate` | Run database migrations        |
| `npm run migrate:rollback` | Rollback last migration |
| `npm run seed`     | Run all seeds                   |
| `npm run seed:hr_user`    | Seed HR users only       |
| `npm run seed:employees`  | Seed employees only      |
| `npm run seed:attendance` | Seed attendance only     |
| `npm run lint`     | Lint `src/**/*.ts`              |
| `npm run lint:fix` | Lint and auto-fix               |
| `npm run format`   | Format code with Prettier       |
| `npm run format:check` | Check formatting            |

## API overview

### Authentication

- **POST /auth/login** – Login with email and password. Returns JWT. Use the token in the `Authorization: Bearer <token>` header for protected routes.

### Employees (all require JWT)

- **GET /employees** – List employees (pagination, optional `search` by name).
- **POST /employees** – Create employee (optional photo via `multipart/form-data`, field `photo`).
- **GET /employees/:id** – Get one employee.
- **PUT /employees/:id** – Update employee (full body; optional photo).
- **DELETE /employees/:id** – Soft-delete employee.

### Attendance (all require JWT)

- **GET /attendance** – List attendance (optional `employee_id`, `from`, `to`, pagination).
- **POST /attendance** – Create or upsert attendance (body: `employee_id`, `date`, `check_in_time`).
- **GET /attendance/:id** – Get one attendance entry.
- **DELETE /attendance/:id** – Delete attendance entry.

### Reports (require JWT)

- **GET /reports/attendance** – Monthly attendance summary. Query: `month=YYYY-MM` (required), optional `employee_id`. Response: per-employee `days_present` and `times_late` (late = check-in after 09:45).

For pagination and filter details, see [docs/API_PAGINATION_AND_FILTERS.md](docs/API_PAGINATION_AND_FILTERS.md).

## Tech stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** PostgreSQL with Knex.js
- **Auth:** JWT (jsonwebtoken), bcryptjs
- **Validation:** express-validator
- **File upload:** Multer (employee photos)

## License

ISC
