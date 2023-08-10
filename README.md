# Chatter - real-time chat application (v. 1.0.0)

## Deployment: [https://chatter-project.herokuapp.com/](https://chatter-project.herokuapp.com/)

## Main functionality

- **Registration and Authentication:** Users can create accounts and log in with a username and password.
- **Secure password storage:** Password is stored in database in encrypted form.
- **Indication of online users:** Users who have entered the chat are highlighted in green (the highlight disappears if the online connection is interrupted, for example, if the smartphone switches to sleep mode, but resumes when connection restores).
- **Sending private messages:** Registered users can select other users from the list and send text messages to the private chat.
- **Message displaying:** Messages are displayed in real time and display the username, online status and message content. In addition, the message history is stored in the database and is available to users at any time while using the application.

## Optimisation

The application is optimized for screens of different devices and sizes, including landscape view on mobile devices.

## Technology stack

The project was developed using the MERN stack. More:

- **Frontend:** HTML, SCSS, TypeScript, React, Bootstrap, Redux, react-hook-form
- **Backend:** Node.js, Express.js
- **Security:** JWT, Bcrypt
- **Bundler:** Vite
- **Database and model:** MongoDB, Mongoose
- **Real-time data exchange:** Socket.IO
- **Linters and helpers:** Eslint, Prettier, Husky

## Author

Artem Prygunov
