const router = require('express').Router();
const { Contact, Child } = require('../../models');

router.get('/', (req, res) => {
    try {
        Contact.findAll({
            include: {
                model: Child,
                attributes: ['id', 'name', 'age', 'food_allergies', 'dietary_restrictions']
            }
        })
        .then(contactData => {
            if (!contactData) {
                res.status(400).json({ message: 'No contact found with this id' });
                return;
            }
            res.json(contactData);
        })
    } catch (err) {
            res.status(400).json(err);
    }
});

router.get('/:id', (req, res) => {
    try {
        Contact.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Child,
                attributes: ['id', 'name', 'age', 'food_allergies', 'dietary_restrictions']
            }
        })
        .then(contactData => {
            if (!contactData) {
                res.status(400).json({ message: 'No contact found with this id' });
                return;
            }
            res.json(contactData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newContact = await Contact.create({
            ...req.body,
            contact_id: req.session.contact_id,
        });

        res.status(200).json(newContact);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateContact = await Contact.update({
            ...req.body,
            contact_id: req.params.id,
        });

        res.status(200).json(updateContact);
    }  catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const contactData = await Contact.destroy({
            where: {
                id: req.params.id,
                contact_id: req.session.contact_id,
            },
        });

        if (!contactData) {
            res.status(400).json({ message: 'No contact found with this id' });
            return;
        }

        res.status(200).json(contactData);
    }   catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;