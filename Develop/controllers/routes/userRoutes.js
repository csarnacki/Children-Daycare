const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    //GET request to obtain all users

    User.findAll({})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    //GET request to obtain one user based off their id

    User.findOne({
        where: {
            id: req.params.id
        },
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    //POST request to create a new instance of a user

    User.create(req.body);

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    //POST request to log the user in

    User.create({
        user_name: req.body.user_name
    })
    .then(dbUserData => res.json(dbUserData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }));

    //Checking the password that is passed in at login
    const validPassword = userData.checkPassword(req.body.password);

    //Authentication check for logging in 
    if (!validPassword) {
        res
            .status(400)
            .json({ message: "Incorrect email or password. Please try again"});
        return;
    }

    //Saving user credentials when logged in
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'Login Successful!' });
    });
});

router.post('/logout', (req, res) => {
    //POST request to log the user out

    if (req.session.logged_in) {
        //User session data removed when the user is logged out
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;