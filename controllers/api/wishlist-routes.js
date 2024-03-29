const router = require('express').Router();
const { User, Product,  Rating, Wishlist} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Wishlist.findAll({
    attributes: [
      'id',
      'user_id',
      'product_id',
      'wish_list',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['id', 'name', 'api_id','brand','price','rating','category','product_type','featured','int_rating_avg']
      }
    ]
  })
    .then(dbWishlistData => res.json(dbWishlistData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  Wishlist.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'user_id',
      'product_id',
      'wish_list',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['id', 'name', 'api_id','brand','price','rating','category','product_type','featured','int_rating_avg']
      }
    ]
  })
    .then(dbWishlistData => {
      if (!dbWishlistData) {
        res.status(404).json({ message: 'No wishlist found with this id' });
        return;
      }
      res.json(dbWishlistData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/',  (req, res) => {
  
  Wishlist.create({
    user_id: req.session.user_id,
    product_id: req.body.product_id,
    wish_list: req.body.wish_list,
    date: req.body.date,
  })
    .then(dbWishlistData => res.json(dbWishlistData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Wishlist.update(req.body, {
    where: {
      user_id: req.session.user_id,
      product_id: req.params.id
    }
  })
    .then(dbWishlistData => {
      if (!dbWishlistData) {
        res.status(404).json({ message: 'No wishlist found with this id!' });
        return;
      }
      res.json(dbWishlistData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Wishlist.destroy({
    where: {
      user_id: req.session.user_id,
      product_id: req.params.id
    }
  })
    .then(dbWishlistData => {
      if (!dbWishlistData) {
        res.status(404).json({ message: 'No wishlist found with this id!' });
        return;
      }
      res.json(dbWishlistData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
