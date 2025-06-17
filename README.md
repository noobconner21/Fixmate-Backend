
# 🌟 Ifixpro Backend API 🌟
## 📜 Overview

Welcome to the **Ifixpro Backend API** for the **Ifixpro** mobile app. This API is built using **Express** and **Supabase** as the database service. 🚀

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








