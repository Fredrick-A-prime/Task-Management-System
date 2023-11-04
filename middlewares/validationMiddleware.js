const { body, validationResult, ValidationChain } = require('express-validator');
const { check, oneOf} = require('express-validator');
const knex = require('../DB/db');
require('dotenv').config()


const tokenRetrieval = (req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        req.token = token
    }
    next()
}


const tokenValidation = (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if(token) {
            jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
                if(err) {
                    console.log(err.message)
                    res.locals.user = null

                    res.status(401).json({ message: 'Token is not valid' });

                    next()
                } else {

                    let user = await knex.withSchema('User').from('Users').select(decodedToken._id)

                    res.locals.user = user

                    res.status(200).json({ message: 'Access granted' });

                    next()
                }
            })
        } else {
            res.locals.user = null
            res.status(401).json({ message: 'Token is missing' });

            next()
    }
    } catch (err) {
        console.log(err)
    }
};

const emailValidation = async (req, res, next) => {
    const { email } = req.body;

    const users = await knex.withSchema('User').from('Users').select('email')
    // console.log(users)
    if(users.some(user => user.email === email)) {
        res.status(409).json('"Email is already in use. Please choose a different email."')
    }
    next()
};

const validationError = async (req, res, next) => {
    const errors = await validationResult(req)
    if(!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ error: errorMessages})
    }
    next()
};

// validating email is email and password length 
const createSignUpValidator = () => {
    const signUpvalidator = [
        check('username').not().isEmpty().withMessage('Username is required'),
        check('username').isLength({min: 3, max: 12}).withMessage('username must be between 3 and 12 character'),
        check('username').matches(/^[a-zA-Z0-9_]*$/).withMessage('Username can only contain letters, numbers, and underscores'),
        check('email').not().isEmpty().withMessage('email is required'),
        check('email').isEmail().withMessage('incorrect email'),
        check('password').isLength({ min: 8, max: 20}).withMessage('password must be 8 characters long'),
        check('password').matches(/^(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter and one number'),
        emailValidation,
        validationError
    ]

    return signUpvalidator;
};


module.exports = {
    createSignUpValidator,
    tokenValidation,
    // tokenRetrieval
};