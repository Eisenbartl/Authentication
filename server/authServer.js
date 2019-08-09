const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey23456';
const db = require("../authDatabase/authDatabase.js");
const port = process.env.port || 3001;

// passport
require('../config/passport')(passport);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());
app.use(express.json());
app.use(router);

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", require("../serverRoutes/index.js"));
app.use("/users", require("../serverRoutes/users.js"));

// post request
app.post("/register", (req, res) => {
  let body = req.body.newUser;
  let errors = [];

  // registration errors
  if (!body.username || !body.email | !body.password || !body.password2) {
    errors.push("Please fill in all fields");
  }

  if (body.password !== body.password2) {
    errors.push("Passwords do not match");
  }

  if (body.password.length < 6) {
    errors.push("Password must contain at least 6 characters");
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    // check if the user exists
    db.checkIfExists(body, (err, data) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        //  if an empty array is sent back, then the user does not exist, so create a new user
        if (data.length === 0) {
        let newPassword = body;

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id: newPassword.username }, SECRET_KEY, {
            expiresIn:  expiresIn
        });

        // encrypt password
          bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newPassword.password, salt, (err, hash) => {
                if(err) throw err;

               newPassword.password = hash;
               db.addNewUser(newPassword, (err, data) => {
                if (err) {
                  res.end();
                } else {
                    res.send({ "username":  newPassword.username, "access_token":  accessToken, "expires_in":  expiresIn          
                });
                }
              });
          }));
        } else {
            res.send('username already exists');
        }
      }
    });
  }
});

app.post('/login', (req, res) => {
    let user = req.body;
    db.loginUser(user, (err, data) => {
        if (err) {
            res.send(Alert('No username found'));
        } else {
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id: user.username }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.send({ "username": user, "access_token": accessToken, "expires_in": expiresIn });
        }
    })
});

app.listen(port, () => console.log("Listening on port: ", port));