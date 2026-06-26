# ConnectX

ConnectX is a backend API for a developer discovery and connection app. It helps developers sign up, manage profiles, send or review connection requests, and view feeds or existing connections.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- Nodemailer for emails
- Scalar API reference

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=8000
DB_URL=your_mongodb_connection_url
ACCESSTOKEN_SECRET=your_access_token_secret
REFRESHTOKEN_SECRET=your_refresh_token_secret
EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start the built server:

```bash
npm start
```

## API

Base URL:

```text
http://localhost:8000
```

Health check:

```text
GET /
```

API reference:

```text
GET /reference
```

Current route groups:

- `/auth` - sign up, sign in, sign out, password change, forgot password, reset password
- `/profile` - view and edit user profile
- `/request` - send and review connection requests
- `/user` - received requests, sent requests, connections, and feed

## Planned Features

- One-to-one chat between connected developers
- Real-time messaging support
- Message read status
- Better developer matching and feed filters
- Notifications
- Improved profile details and search

## Project Structure

```text
src/
  config/        Database configuration
  controllers/   Route handlers
  middlewares/   Authentication middleware
  models/        Mongoose models
  routes/        Express routes
  types/         TypeScript types
  utils/         Shared helpers and OpenAPI file
```

## Author

Kunal Kumar Arya
