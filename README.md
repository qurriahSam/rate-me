# Rate-me Web

<a target="_blank" href="https://github.com/qurriahSam/rate-me"><img src="https://img.shields.io/github/last-commit/qurriahSam/rate-me?logo=github&color=609966&logoColor=fff" alt="Last commit"/></a>
<a href="https://github.com/qurriahSam/shoppingify/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-609966?logo=opensourceinitiative&logoColor=fff" alt="License MIT"/></a>

A web application that allows users to **add their projects** and enables others to **rate them**.
This app includes **authentication** for logging in and out, ensuring secure access to project management and ratings.

## 🚀 Features

✅ User authentication (login & logout)  
✅ Add new projects with descriptions  
✅ Rate other users' projects  
✅ Real-time updates using Firestore  
✅ Responsive UI built with Angular  
✅ State management using RxJS

## 🛠️ Built With

- **Angular** – Frontend framework for a dynamic UI
- **RxJS** – Reactive programming for handling asynchronous operations
- **Firebase Firestore** – NoSQL database for storing projects & ratings
- **Firebase Authentication** – Secure user authentication

## 📸 Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/qurriahSam/shoppingify/main/src/assets/screenshot.png" alt="Rate-me" width="85%"/>
  </p>

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/project-rating-app.git
cd project-rating-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore Database** & **Authentication** (Google, Email/Password, etc.).
3. Copy your Firebase config and add it to `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  },
};
```

### 4️⃣ Run the Application

```bash
ng serve
```

Access the app in your browser at `http://localhost:4200`.

## 📌 Usage

1. **Sign up / Log in** to the application.
2. **Add a project** with details and submit.
3. **Rate other projects** with a 1-5 star rating.
4. **Logout securely** when done.

## 🔐 Authentication

This app uses Firebase Authentication to allow users to **sign up, log in, and log out** securely. Authentication is required to add projects and rate them.

## ⚡ Firebase Firestore Structure

```
/projects
  ├── projectId1
  │   ├── name: "Project A"
  │   ├── description: "Description of Project A"
  │   ├── rating: 4.5
  │   ├── userId: "user123"
  │   ├── ratings: {
  │       user456: 5,
  │       user789: 4
  │   }
  ├── projectId2
  │   ├── ...
```

## 🛡️ Security Rules

Make sure Firestore rules are secure to allow authenticated users to add projects and rate them:

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /projects/{projectId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎯 Future Enhancements

🔹 Allow users to **edit & delete** their projects  
🔹 Implement **comments & discussions** on projects  
🔹 Add **leaderboard & trending projects** feature  
🔹 Improve UI/UX with animations & theme support

## 🤝 Contributing

Contributions are welcome! If you’d like to contribute:

1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "Added new feature"`)
4. **Push** the branch (`git push origin feature-branch`)
5. Open a **Pull Request**

## 📜 License

This project is **open-source** and available under the **MIT License**.

---

### 👨‍💻 Developed by **Your Name**

🚀 Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/sam-kuria/).

---
