const express = require('express')
const router = express.Router()
const Contact = require('../models/contact.model')
const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/contact.controller')

router.get('/', getContacts)
router.get('/:id', getContact)
router.post('/', createContact)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router