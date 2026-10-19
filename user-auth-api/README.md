# User Authentication API

A REST API built with Node.js, Express, MongoDB, Mongoose, bcrypt, and JWT.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT access token with configurable expiry
- Protected current-user endpoint
- Input validation and duplicate-email handling
- Environment-based configuration

## Setup

1. Install Node.js (LTS) and MongoDB, or create a MongoDB Atlas database.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and update `MONGO_URI` and `JWT_SECRET`.
4. Start development server:

   ```bash
   npm run dev
   ```

API runs at `http://localhost:5000`.

## Endpoints

### `POST /api/auth/register`

```json
{
  "name": "Asha Sharma",
  "email": "asha@example.com",
  "password": "StrongPass123"
}
```

### `POST /api/auth/login`

```json
{
  "email": "asha@example.com",
  "password": "StrongPass123"
}
```

### `GET /api/auth/me`

Header:

```text
Authorization: Bearer <your-jwt-token>
```

Registration/login responses include a `token` and safe `user` object. Password hashes are never returned.

## HTTP statuses

- `201`: registration successful
- `200`: login/profile successful
- `400`: validation failure
- `401`: invalid credentials or missing/invalid token
- `404`: user or route not found
- `409`: email already registered
- `500`: unexpected server error

## Security notes

- Never commit `.env`.
- Use a long, random `JWT_SECRET`.
- Use HTTPS in production.
- For browser applications, consider secure, HttpOnly cookies and CSRF protections depending on your deployment architecture.
