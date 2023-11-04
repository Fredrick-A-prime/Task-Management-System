const knex = require('../../DB/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
// console.log(process.env)
const { errorHandler } = require('../../middlewares/errorMiddleware');

const maxAge = Math.floor(Date.now() / 1000) + (60 * 60 * 60)

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: maxAge
    })
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            res.status(400).send("email and password required");
          }

        const user = await knex.withSchema('User').from('Users').where({ email: email }).first()

        // console.log(user)

        if (user) {
            const match = await bcrypt.compare(password, user.password)

            if (match) {
                const token = createToken(user._id)
                // console.log(token)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({
                    message: 'User logged in successfully',
                    token
                });

            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch(err) {
        errorHandler(err);
    }
}

module.exports = signIn