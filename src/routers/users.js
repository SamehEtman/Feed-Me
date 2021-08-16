const express = require('express');
const {
    getMe,
    createUser,
    loginUser,
    updateMe,
    deleteUser,
    logoutUser
} = require('../controllers/users');

const {
    auth,
    authorize
} = require('../middlewares/auth');
const router = express.Router({
    mergeParams: true
});

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').post(auth , logoutUser)
router.route('/updatedetails').put(auth, updateMe)
router.route('/deleteuser').delete(auth, deleteUser)
router.route('/me').get(auth, getMe)

module.exports = router;