# User Authentication API

## Signup

- **POST** `/api/auth/signup`
- **Body:**
  - `fullName` (string, required)
  - `userName` (string, required, unique)
  - `phone` (string, required, unique)
  - `email` (string, required, unique)
  - `password` (string, required, min 6 chars)
  - `confirmPassword` (string, must match password)
- **Response:**
  - `201 Created` on success
  - `409 Conflict` if username/email/phone exists
  - `400 Bad Request` for validation errors

## Login

- **POST** `/api/auth/login`
- **Body:**
  - `identifier` (string, required; can be email, username, or phone)
  - `password` (string, required)
- **Response:**
  - `200 OK` with `{ token, user }` on success
  - `401 Unauthorized` for invalid credentials

## Notes

- Passwords are hashed with bcrypt
- JWT token is returned on successful login
- MongoDB URI and JWT secret are loaded from `.env`
