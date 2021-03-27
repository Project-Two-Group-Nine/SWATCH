const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Product,  Rating, Wishlist} = require('../../models');
const withAuth = require('../../utils/auth');

// get all products
router.get('/', (req, res) => {
  console.log('======================');
  Product.findAll({
    attributes: [
      'id',
      'name',
      'api_id',
      'image_link',
      'description',
      'brand',
      'price',
      'rating',
      'category',
      'product_type',
      'api_featured_image',
      'featured',
      [sequelize.literal('(SELECT round(Avg(rating),0) FROM rating WHERE rating.product_id = product.id)'), 'int_rating_avg']
    ],
    include: [
      {
        model: Rating,
        attributes: ['id', 'user_id', 'product_id','rating','rating_commentary' ,'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      },
      {
        model: Wishlist,
        attributes: ['id', 'user_id', 'product_id','wish_list', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      // int_api_id: req.params.id
      id: req.params.id

    },
    attributes: [
      'id',
      'name',
      'api_id',
      'brand',
      'price',
      'rating',
      'category',
      'product_type',
      'featured',
      [sequelize.literal('(SELECT round(Avg(rating),0) FROM rating WHERE rating.product_id = product.id)'), 'int_rating_avg']
    ],
    include: [
      {
        model: Rating,
        attributes: ['id', 'user_id', 'product_id','rating','rating_commentary' ,'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      },
      {
        model: Wishlist,
        attributes: ['id', 'user_id', 'product_id','wish_list', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      }
    ]
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  
  Product.create({
    name: req.body.name,
    api_id: req.body.api_id
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/rate', withAuth, (req, res) => {
  // custom static method created in models/Product.js
  Product.rate({ ...req.body, user_id: req.session.user_id }, { Rating, Product, User })
    .then(updatedRatingData => res.json(updatedRatingData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/', withAuth, (req, res) => {
  Product.update(
    {
      featured: 0
    },
    {
      where: {
        featured: 1
      }
    }
  )
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'Error' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Product.update(
    {
      featured: 1
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
