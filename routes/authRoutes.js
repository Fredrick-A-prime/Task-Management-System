const { createSignUpValidator } = require('../middlewares/validationMiddleware');
const signUpvalidator = createSignUpValidator();
const SignupUser = require('../controllers/usersControllers/signupUser');
const signIn = require('../controllers/usersControllers/signInUsers')

const express = require('express');

const router = express()

router.post('/api/signup', signUpvalidator, SignupUser)
router.post('/api/login', signIn)
// router.get('/api/logout', logoutUser)

module.exports = router;