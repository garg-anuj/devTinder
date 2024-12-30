const express = require("express");
const PORT = 3000;

//! FACTS
// 1 we can add multiple handlers inside it
// 2 ek baar client ko request send krdi toh wo change nhi kar skte

// const arrRouterHandlers = [
//   (req, res) => res.send("handler 1 response"),
//   (req, res) => res.send("handler 2 response"),
//   (req, res) => res.send("handler 3 response"),
// ];

const app = express();

// !-----------------commit-6 Middleware response/route Handler 42:00-50:00--------------------

// GET /user => it check all the app.xyz('matching') functions to send res
// GET /user => middleware chain  ==> request handler

// toh yeah sare /user route ko match krne ki kosis krega one by one

app.use("/", (req, res, next) => {
  // res.send("handle route here ");
  next();
});

app.get(
  "/user",
  (req, res, next) => next(),
  (req, res) => res.send("2nd handler of user"),
  (req, res) => res.send("3nd handler of user")
);

//

// !-----------------commit-5 Another Way To HAndle Multiple handlers 37:00 - 39:00 -----------

// app.use("/user", (req, res, next) => next());

// app.use("/user", (req, res, next) => next());

// app.use("/user", (req, res) => res.send("finally result of route handler"));

//

// !-----------------commit-5 handlers in array 31:00 - 33:00----------------------------------
// const routerHandlers = [
//   (req, res, next) => next(),
//   (req, res, next) => next(),
//   (req, res) => res.send("handler array  response"),
// ];
// app.use("/user", routerHandlers);

//

// !-----------------commit-4 Cannot GET /user  26:00 - 28:00 ---------------------------------

// nothing to show handler hi nhi hai ab jis last wala next() ke baad jisme
// express expecting you another routeHandler

// app.use(
//   "/user",
//   (req, res, next) => next(),
//   (req, res, next) => next(),
//   (req, res, next) => next()
// );

//

// !-----------------commit-3 next()  11:00-20:00----------------------------------------------

/* ek baar data client pr pauch gya fir hm dubara send kr rhe hai to wo
 use change nhi kar skta connection break hoo jata hai yeah error dikhayega
 lekin baki ke function backend pr chlenge client pr response send krne ke baad */

// app.use(
//   "/user",
//   (req, res, next) => {
//     next();
//     res.send("ab data dikha 1");
//   },
//   (req, res) => res.send("ab data dikha 2"),
//   (req, res) => {}
// );

// ek baar client ko request send krdi toh wo change nhi kar skte

// app.use(
//   "/user",
//   (req, res, next) => next(),
//   (req, res) => res.send("ab data dikha"),
//   (req, res) => {}
// ); // yeah next () ki wje se dusre handler kaa response show kr dega

// app.use(
//   "/user",
//   (req, res) => {},
//   (req, res) => res.send("handler 2 response"),
//   (req, res) => res.send("handler 3 response")
// ); // yeah again infinite saa chlta rhega res nhi dega koi req hang hoo jati hai

//

// !-----------------commit-2 Multiple Handlers 7:00 - 11:00-----------------------------------

// we can add multiple handlers inside it
// / first will run first  baki ki run nhi honge

// app.use(
//   "/user",
//   (req, res) => res.send("handler 1 response"),
//   (req, res) => res.send("handler 2 response"),
//   (req, res) => res.send("handler 3 response")
// );

//

// !-----------------commit-1  Empty routeHandler 4:00 ----------------------------------------

/* if we did not send any  response  we keep this Empty routeHandler 
then it will go infinite tk chlta rhega yeah kuch time tk  */

// app.use(
//   "/user",
//   (req, res) => {},
//   (req, res) => {}
// );

app.listen(PORT, () => {
  console.log("server successfully  listening on the port " + PORT);
});
