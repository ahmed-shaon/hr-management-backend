# API: Pagination and filters (reference)

Use this when implementing GET /employees and GET /attendance.

## Pagination

- **GET /employees** – Support pagination (e.g. `page`, `limit` query params).
- **GET /attendance** – Support pagination (e.g. `page`, `limit` query params).

## Filters

### GET /employees

- **Search by name:** filter employees by name using **ILIKE** (partial match, case-insensitive).
- Example: `GET /employees?search=rahim&page=1&limit=10`

### GET /attendance

- **Filter by date range:** `from` and `to` (e.g. `from=2025-08-01&to=2025-08-31`).
- Optionally filter by `employee_id` as in: `GET /attendance?employee_id=12&from=2025-08-01&to=2025-08-31`
- When implementing: add **pagination** (page, limit) in addition to these filters.
