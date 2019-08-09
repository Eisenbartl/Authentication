const mysql = require('mysql');
const mySqlConfig = require('./authConfig.js');
const connection = mysql.createConnection(mySqlConfig);
const bcrypt = require('bcryptjs');

connection.connect(err => {
    if (err) {
        console.log('Error: ', err);
    } else {
        console.log('Connection established');
    }
});

const addNewUser = (obj, cb) => {
    connection.query(`INSERT INTO user_profiles (username, email, user_password) VALUES ("${obj.username}", "${obj.email}","${obj.password}");`, (err, data) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            cb(null, data);
        }
    });
};

const checkIfExists = (obj, cb) => {
    connection.query(`SELECT username, email FROM user_profiles WHERE username="${obj.username}" OR email="${obj.email}";`, (err, data) => {
        if (err) {
            cb(err)
        } else {
            cb(null, data);
        }
    });
};

const loginUser = (user, cb) => {
    connection.query(`SELECT * FROM user_profiles WHERE username="${user.username}";`, (err, data) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            console.log(data);
            console.log(user.password)
            // password is the plain txt pass, user.password is the hashed pass from the db
            bcrypt.compare(user.password, data[0].user_password, (err, isMatch) => {
                if(err) throw err;

                if(isMatch) {
                    return cb(null, user);
                } else {
                    return cb(null, false);
                }
            });
        }
    });
};

module.exports = {addNewUser, checkIfExists, loginUser};
