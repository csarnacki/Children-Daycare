const router = require('express').Router();
const { Contact, Child } = require('../../models');

router.get('/', (req, res) => {
        Contact.findAll({
            include: {
                model: Child,
                attributes: ['id', 'name', 'age', 'food_allergies', 'dietary_restrictions']
            }
        })
        .then(dbcontactData => {
            if (!dbcontactData) {
                res.status(400).json({ message: 'No contact found with this id' });
                return;
            }
            res.json(dbcontactData);
        })
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
        Contact.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Child,
                attributes: ['id', 'name', 'age', 'food_allergies', 'dietary_restrictions']
            }
        })
        .then(dbcontactData => {
            if (!dbcontactData) {
                res.status(400).json({ message: 'No contact found with this id' });
                return;
            }
            res.json(dbcontactData);
        })
        .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
   Contact.create(req.body)

   .then(dbcontactData => res.json(dbcontactData))
   .catch (err => {
        console.log(err);
        res.status(500).json(err);
   });
});

router.put('/:id', async (req, res) => {
    Contact.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbcontactData => {
        if (!dbcontactData) {
            res.status(400).json({ message: 'No contact found with this id' });
            return;
        }
        res.json(dbcontactData);
    }) 
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
    Contact.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbcontactData => {
        if (!dbcontactData) {
            res.status(400).json({ message: 'No contact found with this id' });
            return;
        }
        res.json(dbcontactData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;