const express = require('express');

const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/admin')

const {
    auth,
    authorize
} = require('../middlewares/auth')
const advancedRes = require('../middlewares/advancedRes')

const User = require('../models/User')
const router = express.Router();




router
    .route('/')
    .get(auth, authorize('admin'), advancedRes(User), getUsers)
    .post(auth, authorize('admin'), createUser)

router
    .route('/:id')
    .get(auth, authorize('admin'), getUser)
    .put(auth, authorize('admin'), updateUser)
    .delete(auth, authorize('admin'), deleteUser)



module.exports = router