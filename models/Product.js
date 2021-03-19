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
          [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'int_rating_avg']
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
    api_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    image_link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    product_type: {
      type: DataTypes.STRING
    },
    api_featured_image: {
      type: DataTypes.STRING
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    int_rating_avg: {
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
