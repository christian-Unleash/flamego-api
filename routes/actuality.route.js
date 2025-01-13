const express = require('express')
const router = express.Router()
const upload = require("../multerConfig"); // Importer la configuration Multe
const Actuality = require('../models/actuality.model')
const { getActualitys, getActuality, createActuality, updateActuality, deleteActuality, fileActuality } = require('../controllers/actuality.controller')

router.get('/', getActualitys)
router.get('/:id', getActuality)
router.post('/',upload.single('file'), createActuality)
router.put('/:id', updateActuality)
router.delete('/:id', deleteActuality)

module.exports = router