# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- Node.js installed
- MongoDB or your preferred database running locally or in the cloud

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Setting Up Database

To run the app with pre-configured users, follow these steps:

1. **Modify the user data:**
   - Navigate to the `data` folder located in the root of the project.
   - Open the `users.json` file (or the relevant database file) and update the user credentials as follows:

     ```json
     {
       "email": "user@example.com",
       "password": "123456"
     }
     ```

2. **Ensure the Database is Running:**
   - If you're using MongoDB, make sure it is running on your system or connected to the cloud.

### Example User Login Credentials

- **Email:** user@example.com
- **Password:** 123456

Use these credentials to log in and test the application.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note:** Once you `eject`, you can't go back! If you're satisfied with the build tool, you don't need to eject.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
