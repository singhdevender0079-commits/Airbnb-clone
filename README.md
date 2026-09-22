# 🏠 Airbnb Clone

A full-stack **Airbnb Clone** built using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

This project is created for learning and practicing full-stack web development concepts such as **CRUD operations, RESTful routing, MongoDB database management, server-side rendering, authentication, middleware, and MVC architecture**.

> **Note:** This project uses **EJS instead of React** for the frontend.

---

## 🚀 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Technologies & Packages

* EJS-Mate
* Method-Override
* Express-Session
* Connect-Mongo
* Joi
* Dotenv
* Nodemon
* Font Awesome

---

## ✨ Features

* 🏠 Create new property listings
* 📋 View all available listings
* 🔍 View individual listing details
* ✏️ Edit existing listings
* 🗑️ Delete listings
* 🖼️ Property image support
* 💾 MongoDB database integration
* 🔄 Full CRUD functionality
* 📱 Responsive UI
* 🎨 Bootstrap-based design
* 🧩 EJS reusable layouts and partials
* 🔐 Environment variable support
* ⚡ Nodemon development server
* 🛡️ Server-side validation
* 🏗️ MVC-style project structure

---

## 📂 Project Structure

```text
Airbnb-clone/
│
├── controllers/
│   └── listing.js
│
├── init/
│   └── data.js
│
├── models/
│   └── listing.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── routes/
│   └── listing.js
│
├── utils/
│   └── ExpressError.js
│
├── views/
│   ├── includes/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   └── listings/
│       ├── index.ejs
│       ├── new.ejs
│       ├── edit.ejs
│       └── show.ejs
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Airbnb-clone.git
```

### 2. Go to the Project Directory

```bash
cd Airbnb-clone
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_secret_key
```

> Never upload your `.env` file to GitHub.

### 5. Start MongoDB

Make sure your MongoDB database is running or configure your MongoDB Atlas connection.

### 6. Start the Server

For development:

```bash
npx nodemon app.js
```

Or:

```bash
npm start
```

### 7. Open in Browser

```text
http://localhost:8080
```

---

## 🗄️ Database

This project uses **MongoDB** with **Mongoose**.

Example MongoDB connection:

```javascript
mongoose.connect(process.env.ATLASDB_URL);
```

The main database model is:

```text
Listing
```

A listing contains information such as:

```text
title
description
image
price
location
country
```

---

## 🔄 CRUD Operations

The application implements complete CRUD functionality.

| Operation | Description           |
| --------- | --------------------- |
| Create    | Add a new property    |
| Read      | View properties       |
| Update    | Edit property details |
| Delete    | Remove a property     |

Example routes:

```text
GET     /listings
GET     /listings/new
POST    /listings
GET     /listings/:id
GET     /listings/:id/edit
PUT     /listings/:id
DELETE  /listings/:id
```

---

## 🧩 Architecture

The project follows an MVC-style architecture:

```text
             Browser
                │
                ▼
             Express
                │
        ┌───────┴───────┐
        ▼               ▼
     Routes        Controllers
        │               │
        └───────┬───────┘
                ▼
             Models
                │
                ▼
             MongoDB
```

The frontend pages are rendered using **EJS**.

```text
MongoDB
   ↓
Mongoose
   ↓
Express / Node.js
   ↓
EJS
   ↓
HTML/CSS/JavaScript
   ↓
Browser
```

---

## 🖥️ Pages

### Home / Listings Page

Displays all available property listings.

### New Listing Page

Allows users to create a new property listing.

### Show Listing Page

Displays complete information about a particular property.

### Edit Listing Page

Allows users to modify an existing listing.

---

## 📦 Important Dependencies

Some major dependencies used in the project:

```json
{
  "express": "^5.x",
  "mongoose": "^8.x",
  "ejs": "^3.x",
  "ejs-mate": "^4.x",
  "method-override": "^3.x",
  "dotenv": "^16.x",
  "nodemon": "^3.x"
}
```

> Dependency versions may differ from the versions in your current `package.json`.

---

## 🛠️ Concepts Practiced

This project helped me practice:

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* REST APIs
* CRUD Operations
* MVC Architecture
* Express Routing
* Middleware
* EJS Partials
* EJS Layouts
* Form Handling
* HTTP Methods
* Method Override
* Server-side Validation
* Error Handling
* Environment Variables
* Git & GitHub
* Bootstrap
* Database Integration

---

## 🔮 Future Improvements

Some features planned for future versions:

* 🔐 User Authentication
* 👤 User Profiles
* ⭐ Reviews & Ratings
* ❤️ Wishlist
* 🔎 Search & Filters
* 📍 Map Integration
* 💳 Online Payment
* 📅 Booking System
* ☁️ Cloud Image Storage
* 📱 Better Mobile UI
* 🔒 Improved Authorization

---

## 🎯 Learning Goal

The main goal of this project is to strengthen my understanding of **backend development and full-stack web development** by building a real-world application.

It demonstrates how:

```text
Frontend
   +
Backend
   +
Database
   +
RESTful Routes
   +
MVC Architecture
```

work together to create a complete web application.

---

## 👨‍💻 Author

**Devender Singh**

BTech CSE Student
Global Institute of Technology, Jaipur

### Skills

```text
Java | C | JavaScript | HTML | CSS
Node.js | Express.js | MongoDB | Mongoose
EJS | Bootstrap | Git | GitHub
```

---

## ⭐ Support

If you find this project useful for learning, consider giving the repository a ⭐ on GitHub.

---

## 📜 Disclaimer

This project is created for **educational and learning purposes** and is not affiliated with or endorsed by Airbnb.
