const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const wishlistRoutes = require('./wishlist-routes.js');
const singleproductRoutes = require('./single-product-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/single-product', singleproductRoutes);
router.use('/api', apiRoutes);

module.exports = router;
