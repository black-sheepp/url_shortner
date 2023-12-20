# URL Shortening Assignment

## Description

This project implements a URL shortening service using Node.js, Express, and MongoDB as the tech stack. JWT (JSON Web Token) authentication is implemented for user authentication and authorization. The project also utilizes a dotenv file for configuration, where environment variables like `PORT`, `MONGODB_URL`, and `JWT_SECRET_KEY` are defined.

## Tech Stack

- **Node.js:** JavaScript runtime
- **Express:** Web application framework for Node.js
- **MongoDB:** NoSQL database for storing URL data
- **JWT:** JSON Web Token for user authentication
- **Bcrypt:** Library for hashing passwords

## Project Structure

- **Config:** Contains middleware (`jwt_middleware.js`) for JWT authentication and MongoDB connection setup (`mongoose.js`).
- **Controller:** Holds controllers for handling user authentication (`user.js`), URL creation (`url.js`), and home route (`home.js`).
- **Model:** Defines MongoDB schemas for the `User` and `Url` models.
- **Routes:** Contains route definitions using Express in `index.js`.
- **.env:** Configuration file with environment variables (`PORT`, `MONGODB_URL`, `JWT_SECRET_KEY`).

## Routes

### Home

- **GET /:** Renders the home page.

### User Authentication

- **POST /sign-up:** Registers a new user. Requires `name`, `email`, and `password`.
- **POST /sign-in:** Logs in a user. Requires `email` and `password`.

### URL Shortening

- **POST /shorten:** Creates a shortened URL. Requires a valid JWT token for authentication.
- **GET /:shortURL:** Redirects to the original URL corresponding to the provided short URL. Requires a valid JWT token for authorization.

## Middleware

### JWT Authentication Middleware (`jwt_middleware.js`)

- Verifies the JWT token provided in the request headers.
- Checks for the existence and validity of the token.
- Extracts the user ID from the token and attaches it to the request object.

## Controllers

### User Controller (`user.js`)

- **signUp:** Handles user registration. Checks for existing email, hashes the password, creates a new user, and returns a JWT token.
- **signIn:** Handles user login. Validates email and password, returns a JWT token upon successful authentication.

### URL Controller (`url.js`)

- **createUrl:** Handles the creation of shortened URLs. Requires a valid JWT token for user authorization.
- **redirectToOriginalUrl:** Redirects to the original URL based on the provided short URL. Requires a valid JWT token for user authorization.

## MongoDB Schema

### `Url` Schema (`url.js`)

- **shortURL:** String, represents the shortened URL.
- **redirectURL:** String, stores the original URL to which the short URL redirects.
- **user:** ObjectId, references the user who created the shortened URL (one-to-many relationship).

### `User` Schema (`user.js`)

- **name:** String, represents the user's name.
- **email:** String, represents the user's email (unique).
- **password:** String, represents the hashed password.
- **timestamps:** Automatically tracks the creation and modification timestamps.

## Running the Application

1. Create a `.env` file and set the following variables:
   ```
   PORT=8080
   MONGODB_URL=mongodb+srv://your_username:your_password@cluster0.your_mongodb.net/your_database_name
   JWT_SECRET_KEY=your_secret_key
   ```
2. Run the MongoDB database using the provided connection string.
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Access the application at `http://localhost:8080 (Locally) or https://url-shortner-ayo6.onrender.com/ (Deployed Website)`


Certainly! Below is a sample API request for testing the `/shorten` endpoint, including headers and a token. This example assumes you have successfully obtained a valid JWT token during the user authentication process.

### Test API Sample

 Access the website at `http://localhost:8080 (Locally) or https://url-shortner-ayo6.onrender.com/ (Deployed Website)`


#### Create Shortened URL

**Endpoint:** `POST /shorten`

**Request Headers:**
- Content-Type: application/json
- Authorization: Bearer `<Your JWT Token>`

**Request Body:**
```json
{
  "redirectURL": "https://www.example.com"
}
```

**Response:**
```json
{
  "shortURL": "abc123",
  "redirectURL": "https://www.example.com"
}
```

### Obtaining JWT Token

To obtain a valid JWT token for testing, you can follow these steps:

1. **Register a new user:**
   - **Endpoint:** `POST /sign-up`
   - **Request Body:**
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "testpassword"
     }
     ```
   - After a successful registration, you will receive a JWT token in the response.

2. **Log in with the registered user:**
   - **Endpoint:** `POST /sign-in`
   - **Request Body:**
     ```json
     {
       "email": "test@example.com",
       "password": "testpassword"
     }
     ```
   - After a successful login, you will receive a new JWT token in the response.

3. **Use the obtained token in the `/shorten` endpoint:**
   - Copy the JWT token from the login response.
   - Include it in the `Authorization` header of subsequent requests to protected endpoints.

**Note:** Make sure to replace `<Your JWT Token>` with the actual JWT token obtained during the authentication process.

This test API sample demonstrates how to create a shortened URL by sending a POST request to the `/shorten` endpoint with the required headers and a valid JWT token. Adjust the values accordingly based on your actual implementation and testing requirements.
