const router = require('express').Router();
const apiRoutes = require('./routes');

router.use('/routes', apiRoutes);

module.exports = router;