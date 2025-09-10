const router= require('express').Router();
const {signupValidation, loginValidation} = require ('../middlewares/AuthValidation');
const {signup} =require ('../controllers/AuthController')
const {login} = require ('../controllers/AuthController')


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;
