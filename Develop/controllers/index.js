const router = require('express').Router();
const routes = require('./routes');

router.use('/routes', routes);

router.use((req, res) => {
    res.send('<h1Wrong Route!</h1')
});

module.exports = router;