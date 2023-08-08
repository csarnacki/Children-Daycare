const sequelize = require('../config/connect');
const { Game, User } = require('../models');

const gameData = require('./gameData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const game of gameData) {
        await Game.create({
            ...game,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    console.log('Data seeded successfully!');

    process.exit(0);
};

seedDatabase();