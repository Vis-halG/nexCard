# NexCard Project

This project has been restructured into a monorepo for better scalability.

## Project Structure

- `frontend/`: Contains the Next.js application (UI/UX logic).
- `backend/`: Contains the server-side logic (Express API).

## Getting Started

### Prerequisites

- Node.js installed
- npm or yarn

### Installation

Install dependencies for both frontend and backend from the root directory:

```bash
npm install
```

### Running the Project

To run the frontend:

```bash
npm run dev
```

To run both frontend and backend (if available):

```bash
npm run dev:all
```

## Folder Details

### Frontend
The frontend is built with Next.js, React, and Tailwind CSS. All UI components, themes, and client-side logic reside in `frontend/app`.

### Backend
The backend is an Express server located in `backend/`. This is where you can implement your API endpoints, database integrations, and other server-side logic.