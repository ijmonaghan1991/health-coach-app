# Vitality — Personal Health Coaching

A full-stack health coaching web application that helps users explore personalized wellness services, create an account, book coaching appointments, and interact with a wellness-focused chat assistant.

> **Project status:** Portfolio project / work in progress. The AI coach currently uses rule-based responses; integration with a live AI model is a planned enhancement.

## Project Overview

Vitality is a modern health coaching platform built to make wellness support more accessible. Users can browse coaching options focused on nutrition, fitness, stress management, sleep, and sustainable habits, then manage their appointments through a personal dashboard.

The application combines a React frontend, an Express REST API, and MongoDB for persistent storage. It is designed as a portfolio-ready full-stack project with room for additional coaching, scheduling, and AI features.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Development | npm, Nodemon, Git, GitHub |
| AI coaching | Rule-based wellness chat assistant (live AI API integration planned) |

## Key Features

- **User authentication:** Register, sign in, and access protected pages.
- **Coaching service catalog:** Explore service descriptions, session lengths, and prices.
- **Personal Health Coaching selections:** Choose from wellness coaching, nutrition, fitness, stress management, sleep, and accountability services.
- **Appointment booking:** Submit bookings for selected services.
- **Personal dashboard:** View appointments and cancel bookings.
- **Wellness chat assistant:** Ask general wellness questions and receive basic guidance.
- **Responsive interface:** Browse the site on desktop and mobile-sized screens.

### Example Coaching Services

| Service | Duration | Example Price |
| --- | ---: | ---: |
| Personal Health Coaching | 60 minutes | $95 |
| Nutrition & Healthy Eating | 45 minutes | $75 |
| Fitness & Movement Coaching | 45 minutes | $75 |
| Stress Management & Mindfulness | 45 minutes | $70 |
| Sleep & Recovery Coaching | 30 minutes | $55 |
| Healthy Habits & Accountability | 30 minutes | $50 |

*Prices are sample portfolio data and can be updated in the database.*

## AI-Powered Feature Description

Vitality includes a **wellness chat assistant** where signed-in users can ask questions about topics such as healthy habits, movement, nutrition, and sleep.

**Current implementation:** The backend generates rule-based responses based on the user's message. It is **not yet connected to a generative AI model**. The chat interface and `/api/ai/chat` endpoint provide a foundation for a future server-side AI integration.

**Planned enhancement:** Connect a supported AI API from the Express backend to offer more flexible, context-aware wellness conversations. Any API key should remain on the server, never in React client code.

**Health disclaimer:** The assistant provides general wellness information only. It is not a healthcare professional and does not diagnose conditions, prescribe treatment, or replace medical advice.

## Project Structure

```text
health-coach-app/
├── client/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── .env                  # Frontend configuration (local only)
├── server/                   # Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── services/
│   ├── server.js
│   └── .env                  # Backend secrets (local only)
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- A MongoDB Atlas account and database cluster
- Git (optional, for cloning and version control)

### 1. Clone the repository

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your GitHub details:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

If you already have the project on your computer, open its folder instead:

```bash
cd ~/Documents/health-coach-app
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

From the project root:

```bash
cd client
npm install
```

### 4. Configure environment variables

Create `server/.env`:

```env
PORT=5003
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER_HOST/healthcoach?retryWrites=true&w=majority
JWT_SECRET=REPLACE_WITH_A_LONG_RANDOM_SECRET
CLIENT_URL=http://127.0.0.1:5173
```

Create `client/.env`:

```env
VITE_API_URL=http://127.0.0.1:5003/api
```

**Important:** If `client/src/services/api.js` has a hard-coded `baseURL`, make sure it points to the same backend port (`5003`), or update it to read `import.meta.env.VITE_API_URL`.

In MongoDB Atlas, create a database user and allow your current development IP under **Network Access**.

## How to Run the Application

Use **two separate terminals** and leave both running.

### Terminal 1 — Backend

```bash
cd ~/Documents/health-coach-app/server
npm run dev
```

Expected output:

```text
MongoDB connected
Health Coach API running on http://localhost:5003
```

Test the API:

- Health check: http://127.0.0.1:5003/api/health
- Services: http://127.0.0.1:5003/api/services

### Terminal 2 — Frontend

```bash
cd ~/Documents/health-coach-app/client
npm run dev -- --host 127.0.0.1
```

Open the application:

- Home: http://127.0.0.1:5173/
- Services: http://127.0.0.1:5173/services
- Register: http://127.0.0.1:5173/register
- Dashboard: http://127.0.0.1:5173/dashboard
- AI Coach: http://127.0.0.1:5173/coach

### Add Sample Coaching Services (Optional)

If you created the service seed script:

```bash
cd ~/Documents/health-coach-app/server
node seed/personal-health-coaching-services.js
```

Only run a seed script after reviewing its contents. Some seed scripts delete existing service data; the upsert-based Personal Health Coaching script is intended to preserve existing services.

## Environment Variable Notes

| Variable | Location | Purpose |
| --- | --- | --- |
| `PORT` | `server/.env` | Express server port; locally set to `5003` to avoid macOS port 5000 conflicts |
| `MONGO_URI` | `server/.env` | MongoDB Atlas connection string |
| `JWT_SECRET` | `server/.env` | Secret used to sign and verify authentication tokens |
| `CLIENT_URL` | `server/.env` | Frontend origin for CORS configuration, if used by the server |
| `VITE_API_URL` | `client/.env` | Base URL of the backend API, if used by the Axios configuration |
| `OPENAI_API_KEY` | `server/.env` (future) | Only needed if a live OpenAI integration is implemented |

**Security:** Never commit real `.env` files, passwords, MongoDB connection strings, or API keys to GitHub. Add `.env` files and `node_modules/` to `.gitignore`. Variables beginning with `VITE_` are exposed to the browser and must never contain secrets.

## Deployment

The app can be deployed with a hosted React frontend, a Node.js backend, and MongoDB Atlas.

| Component | Suggested Platform | Link |
| --- | --- | --- |
| Frontend | Vercel | https://vercel.com |
| Backend | Render | https://render.com |
| Database | MongoDB Atlas | https://www.mongodb.com/atlas |
| Source code | GitHub | https://github.com |

### Deployment checklist

1. Push the repository to GitHub without secrets.
2. Deploy `client/` to Vercel using the Vite build command `npm run build` and output directory `dist`.
3. Deploy `server/` as a Node.js web service on Render using `npm install` and `npm start`.
4. Set `MONGO_URI`, `JWT_SECRET`, and the appropriate `CLIENT_URL` in the backend hosting environment.
5. Set `VITE_API_URL` to your **deployed backend API URL**, ending in `/api`, and rebuild the frontend.
6. Configure backend CORS to allow your deployed frontend domain; do not rely on localhost-only origins in production.
7. Configure MongoDB Atlas network access appropriately for the backend hosting environment.
8. Test registration, login, service browsing, booking, and dashboard functions after deployment.

### Live Links

Replace these placeholders after deployment:

- **Live Website:** `https://YOUR-APP.vercel.app`
- **Backend API:** `https://YOUR-API.onrender.com/api`
- **GitHub Repository:** `https://github.com/YOUR_USERNAME/YOUR_REPOSITORY`

## Future Improvements

- Integrate a live AI model through a secure server-side API.
- Add coach availability, time-slot selection, and double-booking prevention.
- Restrict service creation and editing to authorized administrators.
- Add appointment reminders and email notifications.
- Improve authentication and production security controls.
- Add automated tests and deployment monitoring.

## Disclaimer

Vitality is a health coaching portfolio project. Its content and chat assistant are for general educational and wellness purposes only and are not a substitute for professional medical advice.

## License

Add a license file and update this section if you plan to distribute the project under an open-source license.

## Explanation 

I ued chat gpt and aked it to help me wright the fron and back end code to create the app.  and for the best service to add to a helth professional app.that i used for the ervices page on my app.