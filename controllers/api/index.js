const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const productRoutes = require('./product-routes');
const commentRoutes = require('./comment-routes');
const ratingRoutes = require('./rating-routes');
const wishlistRoutes = require('./wishlist-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes);
router.use('/ratings', ratingRoutes);
router.use('/wishlists', wishlistRoutes);

module.exports = router;
