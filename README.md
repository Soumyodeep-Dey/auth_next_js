# Next.js Authentication App

This is a full-featured authentication system built with [Next.js](https://nextjs.org), supporting user registration, login, email verification, password reset, and profile management. The app is styled with Tailwind CSS and uses MongoDB for data storage.

**Live Demo:** [https://auth-next-js-zeta.vercel.app/login](https://auth-next-js-zeta.vercel.app/login)

---

## Features

- **User Registration & Login**
  - Sign up with username, email, and password
  - Secure login with JWT-based authentication (token stored in HTTP-only cookies)
- **Email Verification**
  - Users must verify their email before accessing protected routes
  - Verification link sent via email
- **Password Management**
  - Forgot password: request a reset link via email
  - Reset password: set a new password using the emailed link
  - Change password: update password from the profile page
- **Profile Management**
  - View and manage your profile
  - See verification status
- **Session Management**
  - Logout functionality
  - Middleware to protect routes and redirect based on authentication status
- **Responsive UI**
  - Modern, accessible design using Tailwind CSS

---

## Tech Stack

- **Frontend:** Next.js (App Router, TypeScript, React 19)
- **Backend:** Next.js API routes
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (jsonwebtoken), bcryptjs for password hashing
- **Email:** Nodemailer (Mailtrap for development)
- **Styling:** Tailwind CSS

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/Soumyodeep-Dey/auth_next_js>
   cd auth_next_js
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env` file with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string [I used MongoDb Atlas]
     TOKEN_SECRET=your_jwt_token_secret
     DOMAIN=http://localhost:3000
     MAIL_TRAP_USER=your_mailtrap_user (signup and get it)
     MAIL_TRAP_PASS=your_mailtrap_pass (signup and get it)
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## API Endpoints

- `POST /api/users/signup` — Register a new user
- `POST /api/users/login` — Login and receive JWT token
- `GET /api/users/logout` — Logout and clear session
- `POST /api/users/forgotpassword` — Request password reset email
- `POST /api/users/resetpassword` — Reset password with token
- `POST /api/users/changepassword` — Change password (authenticated)
- `POST /api/users/verifyemail` — Verify email with token
- `GET /api/users/me` — Get current user profile (authenticated)

---

## Deployment

This app is deployed on Vercel: [https://auth-next-js-zeta.vercel.app/login](https://auth-next-js-zeta.vercel.app/login)

To deploy your own version, connect your repo to [Vercel](https://vercel.com/) and set the required environment variables in the dashboard.

AND ALL SET :)
