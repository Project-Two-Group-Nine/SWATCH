const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Product model
class Product extends Model {
  static Rate(body, models) {
    return models.Rating.create({
      user_id: body.user_id,
      product_id: body.product_id,
      rating: body.rating,
      rating_commentary: body.rating_commentary,
      date: today.getDate()
    }).then(() => {
      return Product.findOne({
        where: {
          id: body.product_id
        },
        attributes: [
          'id',
          'name',
          'api_id',
          'featured',
          'date',
          [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'rating_avg']
        ],
        include: [
          {
            model: models.Rating,
            attributes: ['id', 'product_id', 'user_id', 'rating', 'rating_commentary' , 'date'],
            include: {
              model: models.User,
              attributes: ['id','name','email']
            }
          }
        ]
      });
    });
  }
}

// create fields/columns for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    api_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    rating_avg: {
      type: DataTypes.INTEGER,
    }

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'product'
  }
);

module.exports = Product;
