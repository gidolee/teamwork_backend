# teamwork_backend


A RESTful backend API for **Teamwork**, an internal social network for employees of an organisation. Admins create employee accounts, and employees post articles and GIFs, comment on each other's posts, and browse a shared feed of the most recent content.

Built with TypeScript, Express and PostgreSQL, secured with JSON Web Tokens, and covered by an automated test suite.

<!-- Optional: add CI and coverage badges once configured, e.g.
![CI](https://github.com/gidolee/teamwork_backend/actions/workflows/ci.yml/badge.svg)
-->

## Features

- **Authentication** — admins create employee user accounts; users sign in and receive a JWT.
- **Articles** — create, edit, delete and view articles.
- **GIFs** — post and delete GIFs, with image files stored on Cloudinary (only the URL is persisted).
- **Comments** — comment on colleagues' articles and GIF posts.
- **Feed** — view all articles and GIFs, most recent first, and view a single article or GIF with its comments.
- **Secured routes** — protected endpoints require a valid JWT.

## Tech stack

| Area | Technology |
|------|-----------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express 5 |
| Database | PostgreSQL (raw SQL via `pg` — no ORM) |
| Auth | JSON Web Tokens (JWT) |
| Media storage | Cloudinary |
| Testing | Mocha, Chai, Supertest |
| Coverage | nyc (Istanbul) |
| Quality | ESLint (Airbnb config), Prettier |
| Config | dotenv |

## Project structure

```
teamwork_backend/
├── .github/workflows/   # CI pipeline
├── src/                 # Application source (routes, controllers, db, middleware)
├── test/                # Mocha/Chai/Supertest test suites
├── .prettierrc.json     # Prettier config
├── eslint.config.js     # ESLint config
├── tsconfig.json        # TypeScript config
└── package.json
```

## Getting started

### Prerequisites

- Node.js (LTS)
- PostgreSQL (running locally or a hosted instance)
- A Cloudinary account (for GIF uploads)

### Installation

```bash
git clone https://github.com/gidolee/teamwork_backend.git
cd teamwork_backend
npm install
```

### Environment variables

Create a `.env` file in the project root. Adjust the names to match those used in your config:

```
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/teamwork
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the app

```bash
npm run dev     # development, with live reload (nodemon + ts-node)
npm run build   # compile TypeScript to dist/
npm start       # run the compiled build (node dist/server.js)
```

The API runs at `http://localhost:3000` (or your configured `PORT`).

## Testing

```bash
npm test                 # run the Mocha/Chai/Supertest suite
npx nyc npm test         # run tests with coverage (nyc / Istanbul)
```

## Linting & formatting

```bash
npm run lint      # report files that don't match the style rules
npm run format    # auto-format with Prettier + ESLint
```

## API endpoints

All routes are versioned under `/api/v1`. Protected routes require an `Authorization` token header.

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| POST | `/auth/create-user` | Admin creates an employee account | ✓ |
| POST | `/auth/signin` | Sign in, returns a JWT | – |
| POST | `/articles` | Create an article | ✓ |
| PATCH | `/articles/:articleId` | Edit an article | ✓ |
| DELETE | `/articles/:articleId` | Delete an article | ✓ |
| GET | `/articles/:articleId` | View a single article with comments | ✓ |
| POST | `/articles/:articleId/comment` | Comment on an article | ✓ |
| POST | `/gifs` | Post a GIF (uploaded to Cloudinary) | ✓ |
| DELETE | `/gifs/:gifId` | Delete a GIF | ✓ |
| GET | `/gifs/:gifId` | View a single GIF with comments | ✓ |
| POST | `/gifs/:gifId/comment` | Comment on a GIF | ✓ |
| GET | `/feed` | View all articles and GIFs, most recent first | ✓ |

Responses follow a consistent shape:

```json
{ "status": "success", "data": { } }
```
```json
{ "status": "error", "error": "relevant-error-message" }
```

## License

ISC
