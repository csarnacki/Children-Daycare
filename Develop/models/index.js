const Child = require('./Child');
const Contact = require('./Contact');
const User = require('./User');

Contact.hasMany(Child, {
    foreignKey: 'contact_id',
});

Child.belongsTo(Contact, {
    foreignKey: 'contact_id'
});

module.exports = { Child, Contact, User };