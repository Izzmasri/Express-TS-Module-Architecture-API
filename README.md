# (Express + TypeScript)

A simple API with **Users, Authentication, and Courses** modules.

Built with **Express + TypeScript**, using layered architecture.

---

## 🚀 Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
npm start
```

---

## 📂 Project Structure

```
src/
 ├── auth/        # login/register
 ├── users/       # users module
 ├── courses/     # courses module
 ├── shared/      # common utils, errors, middlewares
 └── app.ts       # entrypoint
 └── server.ts    # starting server
 uploads/         # uploaded images
```

---

## 🔑 Authentication

- Register user
- Login returns JWT
- Protected routes require `Authorization: Bearer <token>`
- Role-based access (ADMIN, COACH, STUDENT)

---

## 🛠️ API Routes

### Auth

- `POST /auth/register` → Register new user
- `POST /auth/login` → Login user

### Users

- `GET /users/me` → Get my profile
- `PATCH /users/me` → Update my profile
- `POST /users/coach` → Create a coach (ADMIN only)

### Courses

- `POST /courses` → Create a new course (COACH/ADMIN only, supports image upload)
  - Form-data:
    - `title: string`
    - `description: string`
    - `image: file`
- `GET /courses` → List all courses
- `GET /courses/:id` → Get course by id
- `PATCH /courses/:id` → Update a course (creator or ADMIN only)
- `DELETE /courses/:id` → Delete a course (creator or ADMIN only)

---

## 📸 File Upload

Courses can have an **image** uploaded using **multer**.

Uploaded files are stored in `/shared/uploads/` and served via `/uploads/<filename>`.
