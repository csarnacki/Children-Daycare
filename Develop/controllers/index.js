const router = require('express').Router();

const apiRoutes = require('./routes');
const homeRoutes = require('./homeRoutes');

router.use('/routes', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;