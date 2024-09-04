# 🦇 EMME Frontend
<img alt="banner-emme" src="./src/assets/img/banner-EMME.png">

EMME is a revolutionary social network emerging from the shadows, inspired by the enigmatic and powerful figure of the bat. Much like the iconic Batman, EMME represents the duality between introspection and expression, providing a space where ideas can fly freely and connect people in innovative ways. Our violet color evokes the mystery and creativity of twilight, symbolizing an environment where each user can find their unique voice and share their vision with the world. With EMME, darkness becomes a canvas full of infinite possibilities, where wisdom and imagination come together to illuminate the path towards a more connected future.

## 🌐 Social Network Frontend System
This project is designed to develop the frontend system for a dynamic social network application. The system is built to facilitate a smooth user experience while ensuring robust data management and security.

## 🛠️ Features
The social network offers the following features:

**User Authentication:** Users can register and log in to the application. Registration involves creating a new account with email and password, while logging in generates a token for authenticated access.

**User Management:** Authenticated users can view and update their own profiles. Superadmins can view all users, and users can update their profiles with new details such as first name, last name, nickname, email, and password.

**Post Management:** Users can create, update, and delete posts. Each post includes a description and an optional image. Users can view their own posts, all posts, or posts by other users. Additionally, users can like or unlike posts to express their preferences.

**Error Handling:** The system includes comprehensive error handling to manage issues like invalid user credentials, missing required fields, and failed database operations.

## ⚙️ Stack
<img alt="react logo" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">

## 📸 Screenshots

| Page        | Screenshot                                       |
|-------------|--------------------------------------------------|
| **Home Page**   | ![Home Page](https://i.postimg.cc/fR30Dmhy/Captura-de-pantalla-2024-09-02-a-la-s-22-31-04.png)   |
| **Profile**   | ![Profile](https://i.postimg.cc/9FQ7gs8G/Captura-de-pantalla-2024-09-02-a-la-s-22-30-15.png)     |
| **Editing Profile info**  | ![Editing Profile Info](https://i.postimg.cc/65bGkzgF/Captura-de-pantalla-2024-09-02-a-la-s-22-30-41.png)  |
| **Edit users**| ![Edit Users](https://i.postimg.cc/mg01Dkbw/Captura-de-pantalla-2024-09-02-a-la-s-22-31-40.png)|
| **Edit Posts**     | ![Edit Posts](https://i.postimg.cc/LXVJNVjC/Captura-de-pantalla-2024-09-02-a-la-s-22-32-11.png)         |

## 🧑‍💻 Local Installation

### 1. Clone this repository
```git clone https://github.com/More-Pe/frontend-SocialMedia```
### 2. Install dependencies
```npm install -y```
### 3. Configure the environment
Backend Connection: Ensure that the backend is running properly on your local machine or on an accessible server.
In the .env file in the frontend, specify the backend URL.
### 4. Start the development server
```npm run dev```
### 5. User Credentials
To perform tests, you can use the following pre-registered users that are defined in the backend seeders:

**Superadmin**

Email: admin@admin.com
Password: 123456789

**Regular User:**
Email: johndoe@example.com
Password: 123456789

You can use these credentials to log in and explore the system's functionalities.

### 6. Testing the System
Once the development server is running, open your browser and navigate to http://localhost:5173 (or the port indicated in your terminal). From there, you can interact with the application.

## 🗄️ Connecting to the Backend

Read the instructions by going to:

[Backend Social Media](https://github.com/More-Pe/backend-SocialMedia)




