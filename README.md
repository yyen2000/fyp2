This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# fypbotfinal
 FYPBot is a personalized recommendation system that utilizes deep learning (DL) algorithm with great power engine to suggest new and relevant Final Year Project (FYP) topic ideas to the upcoming final year students.

    User Manual: Running the FYPBot Application
    This guide provides step-by-step instructions on how to run the fypbot application in development mode.

    Prerequisites
    Before you start, ensure you have the following installed on your machine:
    1. Node.js (LTS version recommended)
    2. npm (Node Package Manager, comes with Node.js)

    Steps to Run the Application
    1. Open Command Prompt or Terminal:
    > Windows: Press Win + R, type cmd, and press Enter.
    > Mac/Linux: Open Terminal from the Applications folder or via the spotlight search.

    2. Navigate to the Project Directory:
    > Use the cd (change directory) command to navigate to the project directory where your fypbot application is located.

    3. Install Dependencies:
    If you haven't installed the project dependencies yet, run the following command to install them. This step ensures that all required packages are available for your application to run (in User Manual or Chapter 4)

    4. Run the Application in Development Mode:
    > Execute the following command to start the application in development mode.
    Example: 
        npm run dev

    5. Access the Application:
    > After running the command, the application will start, and you should see output indicating that the development server is running. By default, Next.js applications run on http://localhost:3000. Open your web browser and navigate to:
        http://localhost:3000
        

 If these steps are not working:
 Troubleshooting
    1. Command Not Found: If you encounter an error saying command not found, ensure that Node.js and npm are correctly installed and added to your system's PATH.
    2. Port Already in Use: If you receive an error indicating that the port is already in use, you can specify a different port by setting the PORT environment variable before running the command.
Use:
PORT=3001 npm run dev

User Manual: Running the Flask API for FYPBot:
Prerequisites
Before you start, ensure you have the following installed on your machine:

Python (version 3.6 or higher)
pip (Python package installer)
pip flask 
pip flask CORS

Steps to Run the Flask API
1. Open a New Command Prompt or Terminal:
    Windows: Press Win + R, type cmd, and press Enter.
    Mac/Linux: Open Terminal from the Applications folder or via the spotlight search.

2. Navigate to the Flask API Directory:
    Use the cd (change directory) command to navigate to the Flask API directory where your bot.py script is located.
    Example:
    cd ~/Documents/fypbot/fypbot-app/fypbotfinal/fyp/src/app/api/flask

 3. Run the Flask Application:
    Execute the following command to start the Flask application:
        python bot.py

