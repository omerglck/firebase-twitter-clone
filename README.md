# Firebase Twitter-Clone

## Technologies

- Frontend: React.js

- Backend: Firebase

- Storage: Firebase Storage

- Login and Authentication: Firebase Authentication

## Features

- User Login and Registration: Users can login to the application with Google or register with email and password. Firebase Authentication provides this process easily.

- Password Reset: Users can reset their password by entering their e-mail address when they forget their password.

- Tweet Sending: Users can share their text-based tweets through the application. These tweets are stored using Firebase services such as Firebase Firestore or Realtime Database.

- Liking: Users can add likes to tweets.

- Responsive Construction: It provides responsive design to increase the usability of your application on mobile devices.

## Libraries

- react-router-dom

- firebase

- react-icons

- moment

- react-toastify
<!--

## notes

- Kullanıcının yetkisi olmadan girmeye çalıştığı sayfalara erişimini engellemek için route 'u bir route ile sarmaladık ve protected routeda onAuthStateChanged komutu ile aktif oturumdaki değişikliği izleyip kullanıcının yetkisi yok ise Navigate ile login sayfasına yönlendirdik. Protected route içinde childrenları Outlet ile ekrana basarız. -->

## Gif

<img src="/public/screen.gif"/>
