# Event Scheduler - Client

This is the client-side component of the Event Scheduler application, built with React and Vite. It interacts with the backend API to manage events.

## Setup Instructions

1.  **Navigate to the client directory:**

    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    # or npm install
    ```

## Running the Client

To start the client development server, run the following command from the `client` directory:

```bash
yarn dev
# or npm run dev
```

This will typically start the application on `http://localhost:5173` (or another available port). The client will automatically proxy API requests to the backend server (expected to be running on `http://localhost:5000`).

## API Endpoints

The client interacts with the following backend API endpoints:

- **GET /api/v1/events?limit=5&page=1&category=other:** Fetch events with pagination and optional category filtering.
- **POST /api/v1/events:** Create a new event.
- **PUT /api/v1/events/:id:** Update an existing event (specifically for archiving/unarchiving).
- **DELETE /api/v1/events/:id:** Delete an event.
