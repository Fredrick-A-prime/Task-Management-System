const knex = require('../../DB/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../../middlewares/errorMiddleware');
// for user to be able to sign up using. username, email and password
// validate the email and password to be according to requirements
// hash the password
// store the hashed password on the database
// check if email exists and compare passwords
// create a token to send to client upon user successful sign in

const signUpUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await knex('User.Users').insert({
            username,
            email,
            password: hashedPassword
        }).returning('*');

        // console.log(user)
        res.status(201).json({
             message: 'User registered successfully',
             user,
        });
    } catch (err) {
        errorHandler(err);
        // res.status(400).json(errors); // Return an error response to the client
    }
}

module.exports = signUpUser;
