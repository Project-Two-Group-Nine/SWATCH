const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Clicked extends Model {}

Clicked.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    clicked: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'clicked'
  }
);

module.exports = Clicked;
