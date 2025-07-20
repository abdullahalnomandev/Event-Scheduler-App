# Event Scheduler - Server

This is the server-side component of the Event Scheduler application. It handles event management, currently using in-memory storage for simplicity.

## Setup Instructions

1.  **Navigate to the server directory:**

    ```bash
    cd server
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    # or npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `server` directory based on `example.env`. For this simplified version, you might not need all variables if the application is solely using in-memory storage.

    ```
    PORT=5000
    # Add any other environment variables as needed, though they might not be strictly necessary for in-memory storage.
    ```

## Running the Server

To start the server, run the following command from the `server` directory:

```bash
yarn start
# or npm start
```

The server should now be running, typically on `http://localhost:5000` (or the port specified in your `.env` file).

## In-Memory Storage

Please note that this version of the server uses **in-memory storage** for events. This means:

- All event data will be lost when the server restarts.
- There is no persistent database connection.

This setup is intended to keep the task simple and focused on basic event management logic without database complexities.
