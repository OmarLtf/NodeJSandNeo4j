const { deleteDatabase } = require('../endpoints/delete');

const express = require('express')
const router = express.Router()

router.get("/all", deleteDatabase)

module.exports = router
