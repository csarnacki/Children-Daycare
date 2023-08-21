const router = require('express').Router();
const { Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    //GET request to obatain all current video game data

    Game.findAll({})
    .then(dbGameData => {
        if (!dbGameData) {
            res.status(400).json({ message: 'No game found with this id' });
            return;
        }
        res.json(dbGameData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    //GET request to find one game based off its id

        Game.findOne({
            where: {
                id: req.params.id
            },
        })
        .then(dbGameData => {
            if (!dbGameData) {
                res.status(400).json({ message: 'No game found with this id' });
                return;
            }
            res.json(dbGameData);
        })
       .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, async (req, res) => {
    //POST request to create a new instance of a game

    try {
        const newGame = await Game.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newGame);
    } catch(err) {
        res.status(400).json(err);
        console.log(err);
    }
});

router.put('/:id', (req, res) => {
    //PUT request to update data for a game

     Game.update(req.body, {
        where: {
            id: req.params.id
        }
     })
     .then(dbGameData => {
        if (!dbGameData) {
            res.status(400).json({ message: 'No game found with this id' });
            return;
        }
        res.json(dbGameData);
     })
     .catch (err => {
        console.log(err);
        res.status(500).json(err);
     });
});

router.delete('/:id', (req, res) => {
    //DELETE request to delete data for a game
    
    Game.destroy({
        where: {
            id : req.params.id
        }
    })
    .then(dbGameData => {
        if (!dbGameData) {
            res.status(400).json({ message: 'No game found with this id' });
            return;
        }
        res.json(dbGameData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;