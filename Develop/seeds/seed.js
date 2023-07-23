const sequelize = require('../config/connect');
const { Child, Contact, User } = require('../models');

const childData = require('./childData.json');
const contactData = require('./contactData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const children = await Child.bulkCreate(childData, {
        individualHooks: true,
        returning: true,
    });

    for (const contact of contactData) {
        await Contact.create({
            ...contact,
            child_id: children[Math.floor(Math.random() * children.length)].id,
        });
    }

    console.log('Data seeded successfully!');

    process.exit(0);
};

seedDatabase();