const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const { getUsers, getUser, createUser, updateUser, deleteUser, login } = require('../controllers/user.controller')

router.post('/login', login)
router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/login', login)

module.exports = router