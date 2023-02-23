const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database.config");

class Post extends Model { };

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT('long'),
        unique: false,
        allowNull: false,
    },
    author: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
});

module.exports = Post;