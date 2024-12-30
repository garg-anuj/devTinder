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