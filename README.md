
# 🌟 Fixmate Backend API 🌟
## 📜 Overview

Welcome to the **Fixmate Backend API** for the **Fixmate** mobile app. This API is built using **Express** and **Supabase** as the database service. 🚀

🔑 **Important**: All routes require a valid `x-api-key` in the request header for authentication.  

### Base URL:
The base URL for all API routes is: `/api/v1/`

---
## 🔑 Required Header
For all requests, include the following header:

`x-api-key`: `<your-valid-api-key>`

---

## 🛠️ Endpoints

### 1. **User Registration** (`POST /api/v1/register`)

This endpoint is used for registering a new user in the system. It requires specific fields to be sent in the request body.

#### ⚙️ Request Format:
- **Method**: `POST`
- **Endpoint**: `/api/v1/register`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`
- **Required Fields**:
  ```json
  {
    "user_id": "FE4oxPgWwio<u%E",  // Firebase user ID (Valid ID)
    "name": "yourname",               // User's name
    "email": "yourname@name.com"  // User's email address
  }
  ```

- **✅ Success Response (200 OK)**:
  ```json
  {
  "message": "User registered successfully",
  "success": true,
  "data": {
    "user_name": "yourname"
    }
  }

  ```

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "success": false,
    "message": "User already exists!!"
  }

  ```

### 2. **User profile and all posts fetch** (`GET /api/v1/user/:id`)

This endpoint is used for fetch user profile info and all the posts in database.
#### ⚙️ Request Format:
- **Method**: `GET`
- **Endpoint**: `/api/v1/user`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "Succuss",
    "success": true,
    "data": {
        "user": {
            "user_id": "12d3sss4ss0sasdsasdsds",
            "user_name": "lasssskshan",
            "user_email": "dumiddsgsmssssasdsadssdddail.com",
            "created_at": "2025-06-17T07:50:56.424558",
            "profile_pic": ""
        },
        "posts": [
            {
                "post_id": "82f9a28a-f49a-4b1e-ba4b-f93790a4d4e7",
                "created_at": "2025-06-17T10:13:53.41209+00:00",
                "post_title": "Ram not working",
                "post_description": "ram is my not working",
                "post_comment_count": 0,
                "post_react": 0,
                "post_author_id": "12d3sss4ss0sasdsasdsds",
                "post_images": [
                    "https://readme.so/editor"
                ]
            }
        ]
    }
  }

  ```

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "succuss": false,
    "message": "Invalid user id"
  }

  ```

### 3. **Update user profile** (`PUT /api/v1/user/update-profile`)

This endpoint is used for update user profile.
#### ⚙️ Request Format:
- **Method**: `PUT`
- **Endpoint**: `/api/v1/user/update-profile`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`
  
  - **Required Fields**:
  ```json
  {
    "image": `<form-field>`,  // Form field
    "user_id": "FE4oxPgWwio<u%E", // Firebase user ID (Valid ID)
    "name": "yourname"  // Updated name
  }
  ```

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "Profile updated!!",
    "success": true,
    "data": {
        "user_id": "12340",
        "user_name": "dumidu lakshan",
        "user_email": "dumidgmail.com",
        "created_at": "2025-06-17T07:06:22.574546",
        "profile_pic": "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750163720/profilepic/profilepic/12340/1750163718067.jpg"
    }
  }

  ```

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "success": false,
    "message": "Name field required"
  }

  ```

### 4. **Create new post** (`POST /api/v1/post/create`)

This endpoint is used for update user profile.
#### ⚙️ Request Format:
- **Method**: `POST`
- **Endpoint**: `/api/v1/post/create`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`
  
  - **Required Fields**:
  ```json
  {
    "images": `<form-field>`,  // Form field | max 3 images
    "user_id": "FE4oxPgWwio<u%E", // Firebase user ID (Valid ID)
    "title": "Blue screen issue windows 10",  // Post title
    "description": "A Blue Screen of Death (BSOD) in Windows indicates a critical error that the system cannot recover from, causing the computer to restart abruptly to prevent data loss or hardware damage",  // Post Description
  }
  ```

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "Post creasted!!",
    "success": true,
    "data": {
        "post_id": "4de78e69-819a-4a71-b960-33154ca52671",
        "created_at": "2025-06-17T15:34:17.572971+00:00",
        "post_title": "sdsad",
        "post_description": "asdsad",
        "post_comment_count": 0,
        "post_react": 0,
        "post_author_id": "12340",
        "post_images": []
    }
  }

  ```

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "success": false,
    "message": "All fields are required"
  }

  ```

  ### 5. **Fetch all post via userid** (`GET /api/v1/post/get-posts/:user_id`)

This endpoint is used for fetch all the posts that user posts.
#### ⚙️ Request Format:
- **Method**: `GET`
- **Endpoint**: `/api/v1/post/get-posts/:user_id`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "Post fetched",
    "success": true,
    "data": []
  }

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "message": "Cannot find posts related to this user",
    "success": true,
    "data": null
  }










