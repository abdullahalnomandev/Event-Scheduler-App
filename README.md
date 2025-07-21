# 📅 Event Scheduler App

![Event Scheduler App Screenshot](https://res.cloudinary.com/dzghsspe7/image/upload/v1753061424/Screenshot_33_mpdnhj.jpg)

## Overview

A full-stack **Event Scheduler** application that enables users to:

- **Add** events
- **Filter** events by category
- **Categorize** events as **Work**, **Personal**, or **Other**

## AI Categorization

Events are automatically categorized using a basic AI feature that relies on keyword recognition.

### Keywords Used for Categorization

- **Work**: Includes keywords like `work`, `project`, `client`, `meeting`, etc.
- **Personal**: Includes keywords like `birthday`, `family`, `holiday`, `anniversary`, etc.
- **Other**: Any event that does not match the above keywords.

---

## Features

- Add and manage events
- Filter events by category
- Automatically categorize events using AI logic
- Persistent storage (MongoDB)
- Built with **Node.js**, **Express**, **Mongoose**, **React**, and **Tailwind CSS**

---

## AI Categorization Logic

The application uses simple keyword-based logic to categorize events into three types:

- **Work**: keywords like `work`, `project`, `client`, `meeting`, etc.
- **Personal**: keywords like `birthday`, `family`, `holiday`, `anniversary`, etc.
- **Other**: if none of the keywords match

The AI considers both the event title and notes (if any) to determine the category.

---

## 📁 Project Structure

### Backend (`/server`)

- Built with Node.js, Express, and ZOD
- All routes under `/api/events`

### Frontend (`/client`)

- Built with React + TypeScript
- Tailwind CSS for styling
- Event list with filters and "Add Event" functionality

---

## Local Setup Instructions

### Prerequisites

- Node.js (v18 or higher)

---

## API Endpoints

- **POST /events**: Create a new event (title, date, time, notes, archived status, category).
- **GET /events**: Retrieve all events, sorted by date and time.
- **PUT /events/:id**: Update an event’s archived status to true.
- **DELETE /events/:id**: Delete an event.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-scheduler-app.git
cd event-scheduler-app
```
