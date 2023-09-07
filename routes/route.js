const express = require('express');

const router = express.Router();
const passport = require('../config/passport');

const status = require('../controller/status');


router.use('/doctors', require('./doctor'))
router.use('/patients', require('./patient'))

router.get('/reports/:status', passport.authenticate('jwt', { session: false }), status.filteredReports)

module.exports = router;