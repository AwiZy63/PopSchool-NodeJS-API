const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database.config");

class User extends Model { };

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT('long'),
        unique: false,
        allowNull: false
    },
    accessToken: {
        type: DataTypes.TEXT('long'),
        unique: false,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});

module.exports = User;