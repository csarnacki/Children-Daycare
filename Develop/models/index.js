const Game = require('./Game');
const User = require('./User');

User.hasMany(Game, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Game.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Game, User };