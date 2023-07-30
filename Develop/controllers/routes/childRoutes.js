const router = require('express').Router();
const { Child, Contact } = require('../../models');

router.get('/', (req, res) => {
    //GET request to obatain all current children data

    Child.findAll({
        include: {
            model: Contact,
            attributes: ['id', 'name', 'email', 'phone', 'relationship']
        }
    })
    .then(dbChildData => {
        if (!dbChildData) {
            res.status(400).json({ message: 'No child found with this id' });
            return;
        }
        res.json(dbChildData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    //GET request to find one child based off their id

        Child.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Contact,
                attributes: ['id', 'name', 'email', 'phone', 'relationship']
            }
        })
        .then(dbChildData => {
            if (!dbChildData) {
                res.status(400).json({ message: 'No child found with this id' });
                return;
            }
            res.json(dbChildData);
        })
       .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    //POST request to create a new instance of a child

    Child.create(req.body)

    .then(dbChildData => res.json(dbChildData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    //PUT request to update data for a child

     Child.update(req.body, {
        where: {
            id: req.params.id
        }
     })
     .then(dbChildData => {
        if (!dbChildData) {
            res.status(400).json({ message: 'No child found with this id' });
            return;
        }
        res.json(dbChildData);
     })
     .catch (err => {
        console.log(err);
        res.status(500).json(err);
     });
});

router.delete('/:id', (req, res) => {
    //DELETE request to delete data for a child
    
    Child.destroy({
        where: {
            id : req.params.id
        }
    })
    .then(dbChildData => {
        if (!dbChildData) {
            res.status(400).json({ message: 'No child found with this id' });
            return;
        }
        res.json(dbChildData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;