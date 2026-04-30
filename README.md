# Community Connect

Full-stack collaboration platform for communities with real-time chat, discussions, and role-based membership.

## Folder Structure
- `backend/` Express + MongoDB + Socket.io API server
- `frontend/` React + Tailwind client

## Features
- JWT auth (signup/login), bcrypt hashing, profile endpoint
- Public/private communities with invite code and member roles
- Community chat + direct messages via Socket.io
- Typing indicator, timestamps, read receipt event
- Discussion board with posts, threaded comments, votes model, solved-answer field
- Notifications endpoint scaffold and mention-ready architecture
- Search for communities and posts; tag filter endpoint support
- File upload for posts/messages (local disk storage)
- Security middleware: helmet, rate limiting, mongo sanitize, xss-clean
- Dark mode toggle + responsive dashboard layout

## Local Setup
1. Copy `.env.example` to `.env`.
2. Install backend deps:
   ```bash
   cd backend && npm install
   ```
3. Install frontend deps:
   ```bash
   cd ../frontend && npm install
   ```
4. Run backend:
   ```bash
   cd ../backend && npm run dev
   ```
5. Run frontend:
   ```bash
   cd ../frontend && npm run dev
   ```

## Deployment
- Frontend: deploy `frontend/` to Vercel. Set `VITE_API_URL` and `VITE_SOCKET_URL`.
- Backend: deploy `backend/` to Render. Add env vars from `.env.example` and attach MongoDB Atlas.

## API Documentation
### Auth
- `POST /api/auth/signup` body: `{ name, email, password }` -> `{ token, user }`
- `POST /api/auth/login` body: `{ email, password }` -> `{ token, user }`
- `GET /api/auth/profile` (Bearer token) -> `user`

### Communities
- `GET /api/communities?q=term` -> list communities
- `POST /api/communities` body: `{ name, description, rules, visibility, tags[] }` -> created community
- `POST /api/communities/:id/join` -> join a community
- `POST /api/communities/join/code` body: `{ code }` -> join by invite code

### Posts/Help
- `GET /api/posts?community=<id>&tag=<tag>&q=<search>` -> list posts
- `POST /api/posts` multipart body: `community,title,content,tags,file` -> created post
- `POST /api/posts/:id/comment` body: `{ content, parentComment? }` -> updated post

### Messages
- `GET /api/messages?communityId=<id>` -> community chat history
- `GET /api/messages?recipient=<userId>` -> private message history

### Notifications
- `GET /api/notifications` -> notification feed (stub ready for persistence)

## Socket Events
- `register-user(userId)`
- `join-community(communityId)`
- `typing({ room })`
- `send-message({ sender, recipient?, community?, content, fileUrl? })`
- `new-message` event broadcast
- `read-message({ messageId, userId })` -> emits `read-receipt`

## Notes / Extensions
- Email verification and forgot-password flow can be added with a token collection and email provider (SendGrid/Resend).
- Cloudinary support can replace local upload middleware with signed upload flow.
