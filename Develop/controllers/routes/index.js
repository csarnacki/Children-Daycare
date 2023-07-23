const router = require('express').Router();
const childRoutes = require('./childRoutes');
const contactRoutes = require('./contactRoutes');
const userRoutes = require('./userRoutes');

router.use('/children', childRoutes);
router.use('/contacts', contactRoutes);
router.use('/users', userRoutes);

module.exports = router;