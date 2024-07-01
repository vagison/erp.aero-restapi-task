This file describes the installation process of the Node.js technical task for ERP.aero.
========================================================================================

## Pre-installation Setup
1. You need to have Node runtime version 20.x or higher. Please navigate to ```nodejs.org``` and download the appropriate version.
2. Create a MySQL server instance to serve as the database. In the .env file, assign the variables listed in .env.dist with your credentials.

## Installation
To install the API, follow these steps:
1. Clone the repository:

    ```git clone git@github.com:vagison/erp.aero-restapi-task.git```

2. Navigate to the project directory:

    ```cd erp.aero-restapi-task```

3. Install the dependencies:

    ```npm i```

## Running
To run the API, follow these steps:
1. To start the compiled application located in the dist directory using Node you have to run the following commands:

    ```npm run build``` and ```npm start```

3. Alternatively to run the app in development mode with nodemon you have to run the following command:

    ```npm run dev```
   
5. To clean the dist directory, you can use the following command: 

    ```npm run clean```

## Environment Configuration
Create a .env file in the root of the project and configure the environment variables listed in .env.dist:

## API description
app.js is the entry point of the app. It starts the server, initiates the the database connection and more:

The folder structure of the project is self explanatory. Here's a brief introduction to it:
-------------------------------------------------------------------------------------------
* Config: Contains all configurations required for database connection, CORS, JWT and other settings.
* Controllers: Houses the actual implementations of server-side functions.
* Middleware: Includes functions meant to be executed when Routes attempt to access Controllers. This also contains error-handling logic, cookie parser, Express validators and more.
* Models: Defines the schemas for server-side entities.
* Routes: Represents server-side endpoints that expect calls from the client-side. Routes redirect these calls to Controllers.
* Util: Serves as a folder to store helper functions, validator schemas, database initializing logic and more.

There are some files in the root directory apart from app.js:
-------------------------------------------------------------
* .babelrc.json - contains configuration settings for Babel, a JavaScript compiler that converts ES6+ code into a backward-compatible version of JavaScript that can run in older environments.
* .env.dist - serves as a template for environment variables, providing a sample configuration for the .env file.
* .eslintrc.json - contains configuration settings for ESLint, which is used to identify and fix problems in JavaScript code.
* .gitignore - used to exclude files from being pushed to the repository.
* package.json - includes a list of the packages and their versions used for this project.

Server-side entities
---------------------
* User
* RefreshToken
* BearerToken
* File

## Using API endpoints
To use the endpoints, you can visit the Postman URL below and then either fork or download the collection:

https://www.postman.com/grey-equinox-5383/workspace/erp-aero/collection/24141891-4ef03b87-c158-43ac-ba8c-7fa168abe643?action=share&creator=24141891

The request names are self-explanatory, and any additional information can be found within the requests themselves.

Note that the local variable "baseURL" should be manually set in your Postman client according to your usage (default is http://localhost:3000) other variables are set during API calls.
