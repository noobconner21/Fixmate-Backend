
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

### 1. **User Registration** (`POST /api/v1/auth/register`)

This endpoint is used for registering a new user in the system. It requires specific fields to be sent in the request body.

#### ⚙️ Request Format:
- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/register`
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
            "user_id": "O1JNcBcCamWypk8J5vdjGUQUYti2",
            "user_name": "shay",
            "user_email": "shay@gmail.com",
            "created_at": "2025-06-17T19:08:04.736236",
            "profile_pic": ""
        },
        "posts": [
            {
                "post_id": "a89506ed-2012-4d48-bee9-5cdd9ff00f7a",
                "post_title": "Ram not",
                "post_description": "Ram not",
                "post_comment_count": 0,
                "post_react": 0,
                "post_author_id": "4xEmXvn4GHdWvZEosx6NoTkz2F12",
                "post_images": [
                    "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750187180/post_images/post_images/4xEmXvn4GHdWvZEosx6NoTkz2F12/1750187178033.jpg",
                    "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750187182/post_images/post_images/4xEmXvn4GHdWvZEosx6NoTkz2F12/1750187181819.jpg",
                    "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750187184/post_images/post_images/4xEmXvn4GHdWvZEosx6NoTkz2F12/1750187183623.jpg"
                ],
                "author_name": {
                    "author_name": "dumi"
                }
            },
            {
                "post_id": "1cbee2c9-96a3-4618-8cb2-54c56f19df06",
                "post_title": "wwwwww",
                "post_description": "Ram notkjghgh",
                "post_comment_count": 21,
                "post_react": 256,
                "post_author_id": "O1JNcBcCamWypk8J5vdjGUQUYti2",
                "post_images": [
                    "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750187327/post_images/post_images/O1JNcBcCamWypk8J5vdjGUQUYti2/1750187325381.jpg",
                    "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750187329/post_images/post_images/O1JNcBcCamWypk8J5vdjGUQUYti2/1750187328861.jpg",
                    "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750187330/post_images/post_images/O1JNcBcCamWypk8J5vdjGUQUYti2/1750187330242.jpg"
                ],
                "author_name": {
                    "user_name": "shay"
                }
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

  ```











