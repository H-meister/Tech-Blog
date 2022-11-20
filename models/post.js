const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//making a post class
class Post extends Model {}

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoINcrement: true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false, 
            validate:{
                len:[1]
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model: 'User',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'path'
    }
)

module.exports = Post;