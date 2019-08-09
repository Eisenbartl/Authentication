const mysql = require('mysql');
const mySqlConfig = require('../authDatabase/authConfig.js');
const connection = mysql.createConnection(mySqlConfig);
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ username: 'username' }, (username, password, done) => {
            // find user
            connection.query(`SELECT username FROM user_profiles WHERE email="${obj.username}";`, (err, data) => {
                if (err) {
                    console.log('Error: ', err);
                } else {
                    // password is the plain txt pass, user.password is the hashed pass from the db
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
                }
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
  
