// import all models
const User = require('./User');
const Product = require('./Product');
const Rating = require('./Rating');
const Comment = require('./Comment');
const Wishlist = require('./Wishlist');



//-----Comment----------


Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Product.hasMany(Comment, {
  foreignKey: 'product_id'
});


//-------------

//-------Rating--------

User.belongsToMany(Product, {
  through: Rating,
  as: 'urated_product',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Product.belongsToMany(User, {
  through: Rating,
  as: 'prated_product',
  foreignKey: 'product_id',
  onDelete: 'SET NULL'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Rating.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'SET NULL'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
});

Product.hasMany(Rating, {
  foreignKey: 'product_id'
});


//-------------

//-------Whishlist--------

User.belongsToMany(Product, {
  through: Wishlist,
  as: 'pwished',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Product.belongsToMany(User, {
  through: Wishlist,
  as: 'uwished',
  foreignKey: 'product_id',
  onDelete: 'SET NULL'
});

Wishlist.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Wishlist.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'SET NULL'
});

User.hasMany(Wishlist, {
  foreignKey: 'user_id'
});

Product.hasMany(Wishlist, {
  foreignKey: 'product_id'
});

//-------------





module.exports = { User, Product, Rating, Comment, Wishlist };
