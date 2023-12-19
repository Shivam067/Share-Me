# Share Me Web APP

This is a sample Blog Web App that allows users to create and share blogs along with photos. Developed using React, this project serves as a practical application while I was learning the React library for web development.

## Table of Contents
- [Deployment](#deployment)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Deployment

This project is already deployed on Vercel.  Access the live web app [here](https://share-me-ashen.vercel.app/).

## Features
- **User Authentication Integration:** Implemented secure user authentication via Appwrite services for a personalized and protected user experience.
- **Rich Text Editing with Tiny Cloud:** Integrated Tiny Cloud editor for effortless blog post creation, allowing users to compose and share visually appealing content.
- **State Management using React Redux-Toolkit:** Utilized React RTK to manage application state efficiently, ensuring optimal performance and a seamless user interface.
- **Dynamic Routing with React Router:** Implemented client-side routing through React Router, enabling smooth navigation across various sections of the blogging web app.
- **Efficient Form Handling with React-Hook-Form:** Employed React Hook Form for efficient form handling, improving the user experience in creating and editing blog posts.

## Technologies Used
- [React](https://react.dev/)
- [Appwrite](https://appwrite.io/)
- [React Hook Form](https://react-hook-form.com/)
- [Tiny Cloud](https://www.tiny.cloud/)
- [React Redux-Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)

## Getting Started

To run this app on your local system, follow these steps:

1. **Configure Appwrite Service:**
   - Before you start, make sure to set up your Appwrite service. If you don't have an Appwrite account, sign up [here](https://appwrite.io/) and create a new project.
   - Obtain your Appwrite API endpoint and API key.

```bash
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Change directory
cd your-project

# Install dependencies
npm install
```


2. **Create Environment Variables:**
   - In the project's root, create a new folder named `.env`.
   - Copy the contents of the provided `.env.sample` file into your newly created `.env` file.
   - Replace the placeholder values in the `.env` file with your Appwrite API endpoint and API key.

```base
# Run the project
npm run dev
```
