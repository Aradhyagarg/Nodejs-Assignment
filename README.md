Authentication System (Login and Signup) and Tax Management System

This README gives a summary of the Authentication System, its design decisions, and how it complies with the assignment's specifications. The system includes user registration and login functionality, ensuring secure password handling and authentication.

Table of Contents
Language Choice
Dockerization
Registration and Authentication
Data Storage

1. Language Selection
Using Node.js, the Authentication System is created. Based on the project's requirements and the development team's experience, a pragmatic language choice is made. Node.js is a good choice for this authentication system because it makes it possible to create effective server-side apps.

2. Dockerization
The project is delivered as a Docker project, following best practices for containerization. Dockerizing the application ensures that it can be easily set up and run in various environments without worrying about compatibility issues. The Dockerfile provided in the project repository is configured to build a Docker image of the application. Users can run the application using the following Docker commands:

bash
Copy code
* Build the Docker image
docker build -t express.

* Run the Docker container
docker run -p 8000:8000 express

This guarantees consistency in the environments for development and deployment. Despite not publishing the image to a public registry, the provided Dockerfile is enough to create and run the application.

3. Authentication and Registration
The system enables user login and registration features. During the registration process, users can create an account by entering a username and password. Before being stored in the database, the passwords are securely hashed using the bcrypt.js package. By ensuring that critical user data is not kept in plain text, this hashing improves security.

Users can log in by entering their username and password for authentication. The system compares the supplied credentials to the hashed password that is kept in the database. The user is authenticated and given a JWT (JSON Web Token) token if the credentials are legitimate. To access authorized endpoints, this token must be supplied in the headers of API calls.

4. Storage of Data
The usernames and hashed passwords of users are kept in a MongoDB database. MongoDB's scalability and versatility make it the ideal database technology. Information about users may be easily stored and retrieved thanks to it. The Node.js application communicates with the MongoDB database using the Mongoose library.

Finally, it should be noted that the Authentication System is created with Node.js, containerized with Docker for simple deployment, allows user registration with secure password hashing, and uses JWT-based authentication. These design decisions guarantee safety and a seamless user registration and login process.

I am creating the Tax Management System but getting time to implement but I have created the route, schema and some controllers for that
