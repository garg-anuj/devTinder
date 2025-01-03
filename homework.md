- Create a repository
- Initialized the repository
- node_modules, package.json, package-lock.json
- Install express
- create a server
- Listen to port 3000
- Write request handlers for/test, /hello
- Insert nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between ^ and ~ 
-  Why Npm install


<!-- Ep-4 -->
- initialized git 
- .gitignore
- Create a remote repo on githup
- Push all code to remote origin
- Play with routes and route extension ex: /hello, / , hello/2, /xyz
- Order of the routes matter a lot
- Install Postman app make a workspace/collection > test API call
- Write logic to handle GET, POST , DELETE API calls and test them on postman
- Explore routing and use of ?, +, (), * in the routes
- Use of regex in routes /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic  routes


<!-- Ep-5 -->
- Multiple Route Handlers - play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rH1, rH2, rh3)
- What is a middleware? why do we need it?
- How to express js basically handles requests behind the scenes
- Difference  app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, expect / user/login 
- Error Handling using try{} catch


<!-- Ep-6 Database, Schema & Model Mongoose -->
- create free cluster
- install mongoose lib
- Connect Your application to Database "connectionUrl/devTinder"
- call the connectDb function and connect to database before starting application on 3000port
- create a userSchema & userModel
- Create POST /Signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try, catch


<!-- Ep-7 Diving into the apis -->
- js object vs JSON (difference)
- Add the express, json middleware to your app
- Make Your signup API dynamic to recive data  from the end user
- User, findOne with duplicate email ids, which object return first
- API - GET user by email
- API - Feed API GET/feed - get all the users from the database
- API - GET user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documents for Model methods
- what are option in a findOneUpdate, explore more about it
- API - update the user with email id


<!-- Ep-8 Data sanitization & schema validations -->

- Explore schemaType options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default 
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validations in each field in schema
- Add timestamp to the userSchema
- AddAPI level validations on patch request & Signup post api
- DAta sanitization - Add Api validation for each field
- Install validator
- Explore validator library function and use validator functions for password, email, linksUrl

<!-- Ep-9 Encrypting Password  -->
Validate data in SignUp API
Install bcrypt package
Create Password using bcrypt.hash & save the user is encrypted password
Create login API
Compare password and throw errors if email or password is invalid


<!-- Ep-10 Authentication, jwt & cookies  -->
- install cookies-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- In login API , after email and password validation, create JWT token and send it to user in cookies
- userAuth Middleware 
- Add the userAuth middle ware in profile API and a new sensConnectionRequest Api
- Set the express of JWT token and cookies to 7 days
- create userSchema method to getJWT()
- create userSchema method to comparePassword(passwordInputByUser, originalPasswordHash)


<!-- Ep-11 Diving into the APIs and express Router -->
Explore tinder APIS's
create a list of all API you can think of in Dev Tinder
Group multiple routes under respective routers
Read documentation for express.Router
Create routes folder for managing auth profile, request routers
Create authRouter, profileRouter , requestRouter
Import these routers in app.js