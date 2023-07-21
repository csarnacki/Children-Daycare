const router = require('express').Router();
const { Child, Contact } = require('../../models');

router.get('/', (req, res) => {
  try {
    Child.findAll({
        include: {
            model: Contact,
            attributes: ['id', 'name', 'email', 'phone', 'relationship']
        }
    })
    .then(childData => {
        if (!childData) {
            res.status(400).json({ message: 'No child found with this id' });
            return;
        }
        res.json(childData);
    })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newChild = await Child.create({
            ...req.body,
            child_id: req.session.child_id,
        });

        res.status(200).json(newChild);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateChild = await Child.update({
            ...req.body,
            child_id: req.params.id,
        });
        
        res.status(200).json(updateChild);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const childData = await Child.destroy({
            where: {
                id: req.params.id,
                child_id: req.session.child_id,
            },
        });

        if (!childData) {
            res.status(400).json({ message: 'No child found with this id'});
            return;
        }

        res.status(200).json(childData);
    }   catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;