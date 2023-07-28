const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Tender = sequelize.define('Tender', {
    title: {
        type: DataTypes.STRING
    },
    abstract: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE
    },
    page: {
        type: DataTypes.INTEGER
    },
    stockcount: {
        type: DataTypes.INTEGER
    },
    country: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    funding: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    },
    isexpiered: {
        type: DataTypes.STRING
    },
    vote: {
        type: DataTypes.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}); 

module.exports = Tender;
