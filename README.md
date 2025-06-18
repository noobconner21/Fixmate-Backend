
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

### 2. **Get all the posts** (`GET /api/v1/post/`)

This endpoint is used for fetch all the posts in database.
#### ⚙️ Request Format:
- **Method**: `GET`
- **Endpoint**: `/api/v1/post/`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "Post fetched",
    "success": true,
    "data": [
        {
            "post_id": "5280803c-5993-4a50-ae15-882f61804146",
            "post_title": "wwwwww",
            "post_description": "Ram notkjghgh",
            "post_comment_count": 0,
            "post_react": 0,
            "post_author_id": "lakasdasdssadhan",
            "post_images": [
                "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750227877/post_images/post_images/lakasdasdssadhan/1750227877080.png"
            ],
            "author_name": {
                "user_name": "yournamsade"
            },
            "author_profile_pic": {
                "profile_pic": ""
            }
        },
        {
            "post_id": "8edfaadb-930a-41b0-b899-a9478dcebf18",
            "post_title": "wwwwww",
            "post_description": "Ram notkjghgh",
            "post_comment_count": 0,
            "post_react": 0,
            "post_author_id": "lakasdasdssadhan",
            "post_images": [
                "http://res.cloudinary.com/ddrglwmsx/image/upload/v1750228657/post_images/post_images/lakasdasdssadhan/1750228656185.png"
            ],
            "author_name": {
                "user_name": "yournamsade"
            },
            "author_profile_pic": {
                "profile_pic": ""
            }
        }
    ]
  }

  ```

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "success": false,
    "message": "Post not found"
  }

  ```


### 3. **Get User profile info** (`GET /api/v1/user/profile/:user_id`)

This endpoint is used for fetch user profile
#### ⚙️ Request Format:
- **Method**: `GET`
- **Endpoint**: `/api/v1/user/profile/:user_id`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "User fetched",
    "success": true,
    "data": {
        "user_id": "lakasdasdssadhan",
        "user_name": "yournamsade",
        "user_email": "yourasdsadnaasdme@asdname.com",
        "created_at": "2025-06-17T20:45:14.743882",
        "profile_pic": ""
    }
  }

  ```

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "success": false,
    "message": "user cannot find"
  }

  ```

### 4. **Update user profile** (`PUT /api/v1/user/update-profile`)

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

### 5. **Create new post** (`POST /api/v1/post/create`)

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

### 6. **Fetch all post via userid** (`GET /api/v1/post/get-posts/:user_id`)

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


### 6. **Delete post** (`DELETE /api/v1/post/delete-post/:post_id`)

This endpoint is used for DELETE specific post by post id.
#### ⚙️ Request Format:
- **Method**: `DELETE`
- **Endpoint**: `/api/v1/post/delete-post/:post_id`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "Post deleted",
    "success": true,
    "data": {}
  }

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "success": false,
    "message": "Cant find post"
  }

  ```



### 7. **Updadte a post** (`PUT /api/v1/post/update/:post_id`)

This endpoint is used for update user profile.
#### ⚙️ Request Format:
- **Method**: `POST`
- **Endpoint**: `/api/v1/post/update/:post_id`
- **Required Headers**:
  - `x-api-key: <your-valid-api-key>`
  
  - **Required Fields**:
  ```json
  {
    "title": "Blue screen issue windows 10",  // Post title
    "description": "A Blue Screen of Death (BSOD) in Windows indicates a critical error that the system cannot recover from, causing the computer to restart abruptly to prevent data loss or hardware damage",  // Post Description
  }
  ```

- **✅ Success Response (200 OK)**:
  ```json
  {
    "message": "Post updated",
    "success": true,
    "data": {}
  }

  ```

- **❌ Error Response (400 Bad Request / 500 Internal Server Error)**
  ```json
  {
    "success": false,
    "message": "Something went wrong went updating posts"
  }

  ```











