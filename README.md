# ❤️ MatchMe – Full Stack Matchmaking Platform

MatchMe is a modern full-stack matchmaking platform designed to help users discover compatible partners through intelligent matching, personalized preferences, and secure communication. The application provides a seamless user experience with authentication, profile management, real-time interactions, and premium features.

The project was built to demonstrate scalable full-stack application development using the MERN stack along with modern web development practices.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes
- Persistent Login Sessions

---

## 👤 Profile Management

- Create User Profile
- Update Personal Information
- Upload Profile Picture
- Education Details
- Occupation Details
- About Me Section
- Lifestyle Preferences
- Interests & Hobbies
- Location Information

---

## ❤️ Partner Preferences

Users can define their ideal partner by specifying:

- Age Range
- Height Range
- Education
- Profession
- Religion
- Marital Status
- Location
- Lifestyle Preferences

---

## 🎯 Intelligent Matching

The platform calculates compatibility between users based on:

- Personal Preferences
- Interests
- Lifestyle
- Education
- Profession
- Location
- Profile Completion

Each recommendation includes:

- Match Percentage
- Trust Percentage
- Compatibility Score

---

## 🔍 Search & Filters

Search users using filters like:

- Name
- Age
- Gender
- City
- Religion
- Occupation
- Education
- Premium Users
- Recently Joined

---

## 💬 Real-Time Chat

- Private Messaging
- Real-Time Communication
- Socket.IO Integration
- Online Status
- Message History

---

## ⭐ Premium Membership

Premium users receive additional benefits:

- Unlimited Chats
- Unlimited Profile Views
- Advanced Filters
- Priority Match Recommendations
- Premium Badge

---

## 🛡️ Security

- JWT Authentication
- Password Hashing
- Protected APIs
- Secure Database Queries
- Input Validation
- Authentication Middleware

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Context API
- React Hooks
- Vite

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary
- Socket.IO
- dotenv
- CORS

---

# 📂 Project Structure

```
MatchMe
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── hooks
│   │   ├── services
│   │   ├── routes
│   │   ├── utils
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── utils
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/MatchMe.git
```

```bash
cd MatchMe
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=xxxx

CLOUDINARY_API_KEY=xxxx

CLOUDINARY_API_SECRET=xxxx
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run application

```bash
npm run dev
```

---

# 🌐 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## User

```
GET /api/users/profile

PUT /api/users/profile

GET /api/users/:id
```

---

## Preferences

```
GET /api/preferences

PUT /api/preferences
```

---

## Matches

```
GET /api/matches

GET /api/matches/:id
```

---

## Chat

```
POST /api/chat

GET /api/chat/:conversationId
```

---

# 🗄️ Database Schema

## User

- Name
- Email
- Password
- Gender
- Date of Birth
- Religion
- Occupation
- Education
- Location
- Profile Picture
- Interests
- About
- Premium Status

---

## Preferences

- Preferred Age
- Preferred Height
- Religion
- Education
- Occupation
- City
- Lifestyle

---

## Chat

- Sender
- Receiver
- Message
- Timestamp
- Read Status

---

# 🔄 Application Flow

```
User Registration
        │
        ▼
Complete Profile
        │
        ▼
Add Partner Preferences
        │
        ▼
Discover Matches
        │
        ▼
View Match Score
        │
        ▼
Start Chat
        │
        ▼
Upgrade to Premium (Optional)
```

---

# 📈 Future Enhancements

- Video Calling
- Voice Messages
- AI Match Recommendations
- Email Notifications
- Push Notifications
- Mobile Application
- Dark Mode
- Google Authentication
- Facebook Authentication
- Aadhaar Verification
- Personality Assessment Quiz
- Location-based Match Suggestions
- Admin Dashboard
- User Reporting System
- Block & Unblock Users

---

# 🧪 Testing

Run frontend

```bash
npm run dev
```

Run backend

```bash
npm run dev
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

- Full Stack Web Development
- REST API Design
- Authentication & Authorization
- MongoDB Data Modeling
- State Management
- Cloud Image Uploads
- Real-Time Communication using Socket.IO
- Responsive UI Development
- Secure Backend Architecture
- Component-Based Frontend Development

---

# 👨‍💻 Author

**Kartik Garg**

- GitHub: https://github.com/Scriptkiddie8
- LinkedIn: https://www.linkedin.com/in/kartik-garg-t26/

---

# 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub!
