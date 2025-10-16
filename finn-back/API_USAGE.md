# JWT Authentication - /api/users/me Endpoint

## Overview
The `/api/users/me` endpoint returns information about the currently authenticated user.

## How to Use

### 1. Login to get JWT tokens
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "access": "eyJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### 2. Use the access token to get current user info
**GET** `/api/users/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Response:**
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "user@example.com"
}
```

## Example with cURL

```bash
# 1. Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'

# 2. Get current user (replace YOUR_ACCESS_TOKEN with the token from step 1)
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Example with JavaScript/Axios

```javascript
// 1. Login
const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
  email: 'user@example.com',
  password: 'yourpassword'
});

const accessToken = loginResponse.data.access;

// 2. Get current user
const userResponse = await axios.get('http://localhost:8080/api/users/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

console.log(userResponse.data); // { id: 1, fullName: "John Doe", email: "user@example.com" }
```

## Security
- The endpoint requires a valid JWT access token in the Authorization header
- Tokens are validated on every request
- Access tokens expire after 15 minutes (configurable)
- If the token is invalid or expired, you'll get a 403 Forbidden response

---

## Delete User by Email

### Endpoint
**DELETE** `/api/users/email/{email}`

**Path Parameter:**
- `email` - The email address of the user to delete

**Example Request:**
```bash
# Delete user by email
curl -X DELETE http://localhost:8080/api/users/email/user@example.com
```

**Example with JavaScript/Axios:**
```javascript
await axios.delete('http://localhost:8080/api/users/email/user@example.com');
```

**Response:**
- Status: 200 OK (no body)
- If user not found: 500 Internal Server Error with message "User not found"

**Note:** This endpoint deletes the user from both PostgreSQL and MongoDB databases.
