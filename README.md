# AI Flow App — MERN Stack

A visual AI chat tool built with React Flow where you type a prompt into a node, click **Run Flow**, and see the AI response in a connected node. Includes a live **Online Store** preview that displays your saved messages as a banner.

---

## Tech Stack

- **Frontend** — React + React Flow + React Router
- **Backend** — Node.js + Express.js
- **Database** — MongoDB + Mongoose
- **AI** — OpenRouter API (free model)

---

## Project Structure

```
ai-flow-app/
├── backend/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── server.js
│   └── src/
│       ├── DB/
│       │   └── CennectoDbInsatnce.js
│       ├── models/
│       │   └── ConversationModel.js
│       └── Routes/
│           └── Router.js
├── frontend/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.js
│       ├── InputNode.js
│       ├── reportWebVitals.js
│       ├── ResultNode.js
│       ├── setupTests.js
│       └── StorePage.js
└── README.md
```

---

## Prerequisites

Make sure you have these installed before starting:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- An [OpenRouter](https://openrouter.ai/) account with a free API key

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-flow-app
```

---

### 2. Backend setup

```bash
cd backend
pnpm install
```

Create a `.env` file inside the `backend/` folder:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
MONGODB_URI=mongodb://localhost:27017/aiflowdb
PORT=5000
```

> **Get your free OpenRouter API key:** Go to [openrouter.ai](https://openrouter.ai) → Sign up → Keys → Create Key

> **Using MongoDB Atlas instead of local?** Replace `MONGODB_URI` with your Atlas connection string:
> `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aiflowdb`

---

### 3. Frontend setup

```bash
cd ../frontend
pnpm install
```

---

## Running the App

You need **two terminals** running at the same time.

### Terminal 1 — Start MongoDB (skip if using Atlas)

```bash
mongod
```

### Terminal 2 — Start the Backend

```bash
cd backend
pnpm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### Terminal 3 — Start the Frontend

```bash
cd frontend
pnpm start
```

The app will open at **http://localhost:3000**

---

## How to Use

### AI Flow Dashboard (`/`)

1. Type any prompt into the **Your Prompt** node (e.g. `Sale 50% Off`)
2. Click **▶ Run Flow** — the AI response appears in the **AI Response** node
3. Click **💾 Save to DB** — saves the prompt and response to MongoDB
4. Click **🏪 View Store** — opens the online store preview

### Online Store Preview (`/store`)

- The purple banner at the top shows your **latest saved message** from MongoDB
- It auto-refreshes every 3 seconds — save a new message on the dashboard and watch it update live

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ask-ai` | Sends prompt to OpenRouter, returns AI response |
| POST | `/api/save` | Saves prompt + response to MongoDB |
| GET | `/api/latest-message` | Returns the most recent saved prompt (used by store banner) |

---

## Deployment

### Backend — Render.com

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. Set **Build Command** to `pnpm install`
6. Set **Start Command** to `pnpm run start`
7. Add environment variables:
   - `OPENROUTER_API_KEY`
   - `MONGODB_URI` (use MongoDB Atlas URI for production)
   - `PORT` = `5000`

### Frontend — Render.com (Static Site)

1. Go to [render.com](https://render.com) → New → Static Site
2. Connect your GitHub repo
3. Set **Root Directory** to `frontend`
4. Set **Build Command** to `pnpm install && pnpm run build`
5. Set **Publish Directory** to `build`
6. Update the API URLs in `App.js` and `StorePage.js` from `http://localhost:5000` to your Render backend URL

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key | `sk-or-v1-...` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/aiflowdb` |
| `PORT` | Backend server port | `5000` |

---

## Troubleshooting

**Cannot type in the input node**
— Make sure you are using the fixed `App.js` where `handleInputChange` is defined before `makeNodes`.

**OpenRouter 404 error**
— The model ID may be deprecated. Use `openrouter/free` as the model which always picks a working free model automatically.

**Store banner not updating**
— Visit `http://localhost:5000/api/latest-message` directly in your browser. If you see `Cannot GET`, restart the backend server.

**MongoDB connection error**
— Make sure `mongod` is running locally, or use a MongoDB Atlas URI in your `.env` file.

---

## License

MIT