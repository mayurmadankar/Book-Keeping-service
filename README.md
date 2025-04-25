# 📚 Book-Keeping API

An inventory management backend for libraries built with **Node.js**, **Express.js**, and **MongoDB**, featuring secure **JWT-based authentication**, **role-based access control**, and **Multer-powered file uploads** for book images.

---

## 🌟 Features

- **Library Inventory Management**  
  Admin users can add, view, and remove books from a library's collection.

- **Image Uploads**  
  Upload and serve book cover images using Multer and a static uploads directory.

- **Authentication & Authorization**  
  Secure login and protected routes using JWT. Only users with `admin` role can manage inventories.

- **RESTful APIs**  
  Clean, structured RESTful API design with proper error handling and consistent response formats.

---

## 📦 Tech Stack

- **Node.js**: Backend JavaScript runtime for building the application.
- **Express.js**: Web framework used for creating scalable and modular RESTful APIs.
- **MongoDB**: NoSQL database for managing user data, posts, comments, likes, and friendships.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization.
- **Multer**: Middleware for handling file uploads (e.g., user avatars, post images).
- **bcrypt.js**: For hashing and securing user passwords.
- **Validator.js**: For input validation and sanitization to ensure security.
- **ES6 Modules**: For maintaining a modular and organized code structure.

---

## Fork the Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/36661483-babb869d-ace9-4fa7-a5bd-1f141fb53414?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D36661483-babb869d-ace9-4fa7-a5bd-1f141fb53414%26entityType%3Dcollection%26workspaceId%3D2266b7a1-5a3e-4d92-9c01-fd221829432f)

---

## ⚙️Setup for Backend

#### Install dependencies

```bash
  npm install
```

#### Create a .env file

```bash
  PORT=5000
  MONGODB_URL=your-mongodb-url
  JWT_SECRET=your-jwt-secret
```

#### Start the backend server

```bash
 npm start
```

---

## 📡 API Reference

### USER API

#### Register User

`POST /api/users/register`

#### Login User

`POST /api/users/login`

### Library API

#### Create Library

`POST /api/library/createLibrary`

#### Get All Libraries

`GET /api/library/getAllLibraries`

#### Get Library By ID

`GET /api/library/getLibraryBy/:id`

#### Update Library By ID

`PUT /api/library/updateLibraryByID/:id`

#### Delete Library By ID

`DELETE /api/library/deleteLibraryByID/:id`

### Books API

#### Create Book

`POST /api/books/createBook`

#### Get All Books

`GET /api/books/getAllBooks`

#### Get Book By ID

`GET /api/books/getBookByID/:id`

#### Update Book By ID

`PUT /api/books/updateBookByID/:id`

#### Delete Book By ID

`DELETE /api/books/deleteBookByID/:id`

### Borrow Book API

#### Borrow Book

`POST /api/borrow/borrowBook`

#### Return Books

`PUT /api/borrow/returnBook/:bookId`

### Inventory API

#### Get Books from Library Inventory By ID

`GET /api/inventory/getAllInventory/:id/inventory`

#### Add Book to Library Inventory By ID

`POST /api/inventory/addInventory/:id/inventory`

#### Delete Book from Library Inventory By ID

`DELETE /api/inventory/deleteInventory/:id/inventory/:BookId`

---

## Deployment

Project Deployed on Render.com

```bash
   https://book-keeping-service-z8wq.onrender.com
```

---

## Authors

- [Mayur Madankar](https://github.com/mayurmadankar)

---

## Contact me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayur-madankar/) [![LeetCode](https://img.shields.io/badge/-LeetCode-FFA116?style=for-the-badge&logo=LeetCode&logoColor=black)](https://leetcode.com/u/mayurmadankar/) [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:madankarmayur5@gmail.com)
[![Naukari](https://img.shields.io/badge/Naukri.com-0A66C2?style=for-the-badge&logo=Naukri.com&logoColor=white)](https://www.naukri.com/mnjuser/profile?id=&altresid)
