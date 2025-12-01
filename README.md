# Pair Programming App (Real-Time Collaboration + AI Autocomplete)

A real-time collaborative coding environment built using FastAPI,
WebSockets, React, Monaco Editor, and an AI Autocomplete system powered
by your custom /autocomplete API.

This app allows multiple users to join a room, write code together live,
and receive intelligent autocomplete suggestions.

------------------------------------------------------------------------

# Features

### Real-Time Collaboration

-   Multiple users can edit the same file at the same time\
-   Every keystroke syncs instantly using WebSockets\
-   Cursor position preserved for each user\
-   Stable syncing without flicker or overwrite issues

### AI Autocomplete

-   Autocomplete triggered at cursor position\
-   Monaco popup positioned correctly under the caret\
-   Smooth appearance and disappearance\
-   Debounced API calls to avoid unnecessary backend load

### Rooms System

-   Create rooms\
-   Join rooms using direct URLs\
-   MySQL backend stores room information

### Architecture

-   Clean and modular FastAPI routers\
-   Editor code separated into clear components\
-   Scalable WebSocket manager design

------------------------------------------------------------------------

# Tech Stack

### Frontend

-   React + Vite\
-   Monaco Editor\
-   WebSockets\
-   Optional: TailwindCSS

### Backend

-   FastAPI\
-   SQLAlchemy\
-   MySQL (XAMPP)\
-   Pydantic\
-   WebSockets

------------------------------------------------------------------------

# Installation Guide

## 1. Clone Repository

    git clone https://github.com/kartavya512/pair-programming-app.git
    cd pair-programming-app

## 2. Backend Setup

Install dependencies:

    cd backend
    pip install -r requirements.txt

Start MySQL using XAMPP: - Start Apache\
- Start MySQL\
- Open phpMyAdmin\
- Create database:

    pair_programming

Create required table:

    CREATE TABLE rooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      code LONGTEXT DEFAULT ''
    );

Run the backend:

    uvicorn app.main:app --reload


------------------------------------------------------------------------

## 3. Frontend Setup

    cd frontend
    npm install
    npm run dev


------------------------------------------------------------------------

# System Architecture

Frontend (React) - Monaco Editor - WebSocket Client - Autocomplete UI

Backend (FastAPI) - Rooms Router - Autocomplete Router - WebSocket
Manager - MySQL Database

------------------------------------------------------------------------

# Notes on Implementation Quality

The project is structured with a focus on clean architecture and
accurate behavior:

-   Stable editor syncing without cursor jump issues\
-   Autocomplete suggestions positioned correctly using Monaco cursor
    metrics\
-   WebSocket architecture designed around room-based communication\
-   SQLAlchemy models aligned with MySQL schema\
-   Separate routes for rooms and autocomplete\
-   Debounced API calls for smooth autocomplete experience

------------------------------------------------------------------------

# API Endpoints

### Rooms

    GET  /rooms
    POST /rooms
    GET  /rooms/{id}

### AI Autocomplete

    POST /autocomplete

------------------------------------------------------------------------

# Future Improvements

-   Inline ghost text (like GitHub Copilot)\
-   Multi-cursor presence indicators\
-   Chat system\
-   Voice call integration\
-   File explorer\
-   Terminal sharing

------------------------------------------------------------------------

# Author

Kartavya Gupta
