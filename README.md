# Natours

Natours is a backend RESTful APIs server with [server-side rendering web application](https://kritapas-natours.up.railway.app) that allows users to book tours for various outdoor activities.

## Tech Stack

Key libraries that this project uses include:

- **ExpressJS**, a framework for building RESTful APIs server in NodeJS.
- **Json Web Token**, a module for signing and verifying Json Web Token (JWT).
- **Mongoose**, a MongoDB object modeling tool.
- **Multer**, a middleware for handling file uploads in ExpressJS.
- **Nodemailer**, a module for sending emails from NodeJS applications.
- **Pug**, a template engine for NodeJS.
- **Stripe**, a module for processing online payment.

## Status

Natours is currently in active development. While many API routes have been implemented, some may still be improved or updated, and new routes may be added in the future.

The [server-side rendering web application](https://kritapas-natours.up.railway.app) included in the project is a demo meant to showcase the available APIs and how they can be used to build a web application. Please note that the current version is not fully functional and does not represent the full range of usage scenarios for the APIs.

## Usage

Natours provides a variety of APIs for managing tours, users, bookings, and reviews. To use the APIs, consult this [API documentation](https://documenter.getpostman.com/view/26000414/2s93CLttiy) and send HTTP requests to the appropriate endpoints with the required parameters.

Here are the APIs that Natours provides:

**Tour APIs**

_Allow to all users_

- Get all tours
- Get a tour
- Get top 5 cheapest tours
- Get tour statistics
- Get tours within the radius of a specific geographical position
- Get tours' distance from a specific geographical position

_Restrict to logged in users with 'admin' and 'lead guide' privilege_

- Create a tour
- Update a tour
- Delete a tour

> Images will automatically be resized and compressed if they are uploaded.

_Restrict to logged in users with 'admin', 'lead guide', and 'guide' privilege_

- Get monthly plan

**User APIs**

_Allow to all users_

- Sign up
- Log in
- Log out
- Forgot password
- Reset password

> JWT (stored on browser's cookie) and resetPasswordToken (sent via email) are used to ensure security of these processes.

> Test users: [users.txt](https://github.com/KritapasSuwannawin/Natours/blob/main/users.txt)

_Restrict to logged in users_

- Get user's information
- Update user's information
- Update user's password
- Deactivate account

_Restrict to logged in users with 'admin' privilege_

- Get all users
- Get a user
- Update a user
- Delete a user

**Booking APIs**

_Restrict to logged in users_

- Get checkout session

> Stripe's checkout session with tour's and user's information will be sent back.

_Restrict to logged in users with 'admin' and 'lead guide' privilege_

- Get all bookings
- Get a booking
- Create a booking
- Update a booking
- Delete a booking

**Review APIs**

_Restrict to logged in users_

- Get all reviews
- Get a review
- Get a specific tour's all reviews

_Restrict to logged in users with 'user' privilege_

- Create a review
- Create a specific tour's review

_Restrict to logged in users with 'admin' and 'user' privilege_

- Update a review
- Delete a review

## Acknowledgment

I would like to express my gratitude to Jonas Schmedtmann, the instructor of the [NodeJS, Express, MongoDB & More: The Complete Bootcamp 2023](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp) course on Udemy, for providing me with valuable knowledge and skills in developing this project.

For verification, my certificate of completion for the course is available at https://www.udemy.com/certificate/UC-fe5ddb58-025a-4f2c-91d5-81f1ed6d400b.

## Roadmap

Future plan for this project are divided into 3 aspects: development of APIs, development of server-side rendering web application, and integration with a frontend web application.

Here are the things that I plan to develop for each aspect:

**Development of APIs**

- Implement restriction that users can only review a tour that they have actually booked.
- Implement nested booking routes: /tours/:id/bookings and /users/:id/bookings.
- Improve tour dates by adding a participants and a soldOut field to each date. So, when a user wants to book, the server will have to check whether the tour on the selected date is still available.
- Implement advanced authentication features such as confirm user email and keep users logged in with refresh tokens.

**Development of server-side rendering web application**

- Implement a sign up form.
- On the tour detail page, if a user has taken a tour, allow them add a review directly on the website.
- Hide the entire booking section on the tour detail page if current user has already booked the tour.
- On the user account page, implement the “My Reviews” page, where all reviews are displayed, and a user can edit them.
- For administrators, implement all the “Manage” pages, where they can CRUD (create, read, update, delete) tours, users, reviews, and bookings.

**Integration with a frontend web application**

- Develop a frontend web application (possibly by using ReactJS) that utilize all the available APIs provided by this project.
