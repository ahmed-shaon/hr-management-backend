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
- `npm run seed:attendance` – Attendance only

**Note:** The attendance seed references specific `employee_id` values. If those employees do not exist in the `employees` table, the attendance seed will fail with a foreign key error. Run the employees seed first, or run `npm run seed` to run all seeds in order.

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

## API reference

All successful responses use this shape:

```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Success",
  "success": true
}
```

Validation or client errors (4xx) return:

```json
{
  "statusCode": 400,
  "data": { "errors": [ { "field": "name", "message": "Name is required" } ] },
  "message": "Validation failed",
  "success": false
}
```

Protected routes require header: `Authorization: Bearer <token>` (from login).

---

### Authentication

#### POST /auth/login

Login with email and password. Returns a JWT for protected routes.

**Request**

- **Content-Type:** `application/json`
- **Body:**

| Field     | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `email`   | string | Yes      | Valid email  |
| `password`| string | Yes      | Password     |

**Example request body:**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response**

- **200** – Success. `data` contains:
  - `token` (string) – JWT to send in `Authorization: Bearer <token>`
  - `user` – `{ id, email, name }`
- **400** – Validation failed or invalid credentials. `data.errors` has field-level messages.

---

### Employees

All employee routes require JWT.

#### GET /employees

List employees with optional search and pagination.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Query:**

| Query   | Type   | Required | Description                                |
| ------- | ------ | -------- | ------------------------------------------ |
| `search`| string | No       | Filter by name (partial, case-insensitive) |
| `page`  | number | No       | Page number (default 1)                     |
| `limit` | number | No       | Items per page (default 10, max 100)       |

**Response**

- **200** – Success. `data` is a paginated list:
  - `items` – Array of employee objects (`id`, `name`, `age`, `designation`, `hiring_date`, `date_of_birth`, `salary`, `photo_path`, `created_at`, `updated_at`, `deleted_at`)
  - `total` – Total count of matching employees
  - `page`, `limit` – Current page and limit

#### POST /employees

Create an employee. Optional photo upload.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data` (if including photo) or `application/json` (no photo)
- **Body (form fields or JSON):**

| Field           | Type   | Required | Description / format                    |
| --------------- | ------ | -------- | -------------------------------------- |
| `name`          | string | Yes      | Non-empty                               |
| `age`           | number | Yes      | Integer 18–120                          |
| `designation`   | string | Yes      | Non-empty                               |
| `hiring_date`   | string | Yes      | Date YYYY-MM-DD                         |
| `date_of_birth` | string | Yes      | Date YYYY-MM-DD                         |
| `salary`        | string | Yes      | Non-empty, numeric, ≥ 0                 |
| `photo`         | file   | No       | Image file (max 5MB); form field name `photo` |

**Response**

- **201** – Created. `data` is the created employee object.
- **400** – Validation failed. `data.errors` lists field errors.

#### GET /employees/:id

Get a single employee by ID.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Params:** `id` – integer, employee ID

**Response**

- **200** – Success. `data` is the employee object.
- **400** – Invalid `id` (e.g. not an integer).
- **404** – Employee not found or soft-deleted.

#### PUT /employees/:id

Update an employee (full replace). All body fields required; optional new photo.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data` or `application/json`
- **Params:** `id` – integer, employee ID
- **Body:** Same fields as POST /employees (all required). Optional `photo` file to replace existing.

**Response**

- **200** – Success. `data` is the updated employee object.
- **400** – Validation failed.
- **404** – Employee not found.

#### DELETE /employees/:id

Soft-delete an employee.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Params:** `id` – integer, employee ID

**Response**

- **204** – No content (success).
- **400** – Invalid `id`.
- **404** – Employee not found or already deleted.

---

### Attendance

All attendance routes require JWT.

#### GET /attendance

List attendance entries with optional filters and pagination.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Query:**

| Query        | Type   | Required | Description / format     |
| ------------ | ------ | -------- | ----------------------- |
| `employee_id`| number | No       | Filter by employee ID   |
| `from`       | string | No       | Start date YYYY-MM-DD   |
| `to`         | string | No       | End date YYYY-MM-DD; must be ≥ `from` |
| `page`       | number | No       | Page (default 1)       |
| `limit`      | number | No       | Per page (default 10, max 100) |

**Response**

- **200** – Success. `data` has `items` (array of attendance: `id`, `employee_id`, `date`, `check_in_time`, `created_at`), `total`, `page`, `limit`.
- **400** – Validation failed (e.g. invalid date format or `to` < `from`).

#### POST /attendance

Create or upsert attendance. If a row exists for the same `employee_id` and `date`, only `check_in_time` is updated.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `application/json`
- **Body:**

| Field          | Type   | Required | Description / format        |
| -------------- | ------ | -------- | -------------------------- |
| `employee_id`  | number | Yes      | Positive integer (must exist in employees) |
| `date`         | string | Yes      | Date YYYY-MM-DD             |
| `check_in_time`| string | Yes      | ISO 8601 date or datetime  |

**Example:**

```json
{
  "employee_id": 1,
  "date": "2025-01-15",
  "check_in_time": "2025-01-15T09:30:00.000Z"
}
```

**Response**

- **201** – Success. `data` is the created or updated attendance row.
- **400** – Validation failed.

#### GET /attendance/:id

Get a single attendance entry.

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Params:** `id` – integer, attendance ID

**Response**

- **200** – Success. `data` is the attendance object.
- **400** – Invalid `id`.
- **404** – Attendance not found.

#### DELETE /attendance/:id

Delete an attendance entry (hard delete).

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Params:** `id` – integer, attendance ID

**Response**

- **204** – No content (success).
- **400** – Invalid `id`.
- **404** – Attendance not found.

---

### Reports

#### GET /reports/attendance

Monthly attendance summary per employee: days present and times late (check-in after 09:45 counts as late).

**Request**

- **Headers:** `Authorization: Bearer <token>`
- **Query:**

| Query        | Type   | Required | Description / format   |
| ------------ | ------ | -------- | --------------------- |
| `month`      | string | Yes      | Month YYYY-MM (e.g. 2025-08) |
| `employee_id`| number | No       | Limit to one employee |

**Response**

- **200** – Success. `data` is an array of:
  - `employee_id` (number)
  - `name` (string)
  - `days_present` (number)
  - `times_late` (number)
- **400** – Validation failed (e.g. invalid or missing `month`).
- **404** – Only when `employee_id` is provided and that employee does not exist.

**Example:** `GET /reports/attendance?month=2025-01` or `GET /reports/attendance?month=2025-01&employee_id=3`

---

For more on pagination and filters, see [docs/API_PAGINATION_AND_FILTERS.md](docs/API_PAGINATION_AND_FILTERS.md).

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
