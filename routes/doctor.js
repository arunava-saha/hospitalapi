
const express = require('express');

const router = express.Router();

const doctor = require('../controller/doctor')

router.post('/register', doctor.register)
router.post('/login', doctor.login)

module.exports = router;