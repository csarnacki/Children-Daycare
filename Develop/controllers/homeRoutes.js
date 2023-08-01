const router =require('express').Router();
const { User, Child, Contact } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const childData = await Child.findAll({
            include: [
                {
                    model: Contact,
                    attributes: ['name'],
                },
            ],
        });

        const children = childData.map((child) => child.get({ plain: true }));

        res.render('homepage', {
            children,
            logged_in: req.session.logged_in
        });
    }   catch (err) {
        res.status(500).json(err);
    }
});

router.get('/child/:id', async (req, res) => {
    try {
        const childData = await Child.findByPk(req.params.id, {
            include: [
                {
                    model: Contact,
                    attributes: ['name'],
                },
            ],
        });

        const children = childData.get({ plain: true });

        res.render('children', {
            ...children,
            logged_in: req.session.logged_in
        });
    }   catch (err) {
        res.status(500).json(err);
    }
});

router.get('/users', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    }   catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('./profile');
        return;
    }

    res.render('login');
});

module.exports = router;