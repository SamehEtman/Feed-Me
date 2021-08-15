const express = require('express');
const {
    getMe,
    createUser,
    loginUser
} = require('../controllers/users');

const {auth, authorize} = require('../middlewares/auth');
const router = express.Router({
    mergeParams: true
});

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)


router.route('/me').get(auth , getMe)

module.exports = router;