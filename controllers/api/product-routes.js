const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Product, Comment, Rating, Wishlist} = require('../../models');
const withAuth = require('../../utils/auth');

// get all products
router.get('/', (req, res) => {
  console.log('======================');
  Product.findAll({
    attributes: [
      'int_id',
      'int_name',
      'int_api_id',
      'int_featured',
      [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.int_id = rating.product_id)'), 'rating_avg']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'user_id' ,'product_id', 'comment', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      },
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
      api_id: req.params.id
    },
    attributes: [
      'int_id',
      'int_name',
      'int_api_id',
      'int_featured',
      [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'rating_avg']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'user_id' ,'product_id', 'comment', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      },
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

router.put('/:id', withAuth, (req, res) => {
  Product.update(
    {
      int_name: req.body.int_name
    },
    {
      where: {
        int_id: req.params.int_id
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
      int_id: req.params.id
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
