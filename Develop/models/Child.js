const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

class Child extends Model {}

Child.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        food_allergies: {
            type: DataTypes.STRING,
        },
        dietary_restrictions: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'child',
    }
);

module.exports = Child;