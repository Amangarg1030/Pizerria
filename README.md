# Pizzeria - MEAN Stack Project

A pizza ordering application built using the **MEAN stack**:

- **MongoDB** - Database
- **Express.js** - Backend API
- **Angular** - Frontend
- **Node.js** - Backend runtime

---

## Project Structure

```text
Pizzeria/
│
├── backend/
│   ├── app.js
│   ├── bin/
│   │   └── www
│   ├── routes/
│   ├── models/
│   ├── .env
│   └── package.json
│
└── Pizzeria/
    ├── src/
    ├── angular.json
    └── package.json
```

> Folder names may be different in your project. Use the folder that contains `package.json` for each part.

---

# Prerequisites

Make sure these are installed:

1. **Node.js**
2. **npm**
3. **Angular CLI**
4. **MongoDB**

Check Node.js and npm:

```bash
node -v
npm -v
```

Check Angular CLI:

```bash
ng version
```

Make sure MongoDB is installed and running.

---

# 1. Start MongoDB

Start your local MongoDB service before starting the backend.

The application uses:

```text
mongodb://localhost:27017/Pizzeria
```

If you are using a different MongoDB connection string, update it in the backend `.env` file.

---

# 2. Start the Backend

Open a terminal and go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Make sure the backend `.env` file contains:

```env
MONGO_URI=mongodb://localhost:27017/Pizzeria
PORT=3000
```

### Development mode

If `nodemon` is configured:

```bash
npm run dev
```

This automatically restarts the backend whenever backend files are changed.

### Normal mode

```bash
npm start
```

The backend will run on:

```text
http://localhost:3000
```

---

# 3. Start the Frontend

Open a **new terminal**. Keep the backend terminal running.

Go to the Angular frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Angular:

```bash
ng serve
```

Or:

```bash
npm start
```

if the frontend `package.json` contains an appropriate start script.

The frontend will normally run on:

```text
http://localhost:4200
```

Open this in your browser:

```text
http://localhost:4200
```

---

# 4. Running Both Together

You need **two terminals**.

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Expected output:

```text
MongoDB connected successfully
```

and the Express server will run on:

```text
http://localhost:3000
```

### Terminal 2 - Frontend

```bash
cd frontend
ng serve
```

Then open:

```text
http://localhost:4200
```

---

# 5. Backend API Routes

The backend currently provides APIs such as:

```text
GET    /api/pizzas
GET    /api/ingredients
```

Cart APIs are available under:

```text
/api/cart
```

The Angular frontend communicates with these Express APIs.

---

# 6. Important Development Notes

### Nodemon

For backend development, use:

```bash
npm run dev
```

Nodemon automatically restarts the Node.js server when backend files are changed.

You do **not** need to manually restart the backend after every code change.

### MongoDB

MongoDB should be running while the backend is running.

The application establishes the MongoDB connection when the backend starts.

---

# 7. If Dependencies Are Missing

For the backend:

```bash
cd backend
npm install
```

For the frontend:

```bash
cd frontend
npm install
```

If Angular CLI is not installed globally:

```bash
npm install -g @angular/cli
```

---

# 8. Quick Start

After MongoDB is running:

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
ng serve
```

Then visit:

```text
http://localhost:4200
```

---

# Technology Stack

| Technology | Purpose |
|---|---|
| Angular | Frontend |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| TypeScript | Angular development |
| HTML / CSS | UI |

---

## Author

Pizzeria - MEAN Stack Project
