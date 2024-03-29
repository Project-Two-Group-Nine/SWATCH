const router = require('express').Router();
const { User, Product, Rating, Wishlist} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Rating.findAll({
    attributes: [
      'id',
      'user_id',
      'product_id',
      'rating',
      'rating_commentary',
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
    .then(dbRatingData => res.json(dbRatingData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  Rating.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'user_id',
      'product_id',
      'rating',
      'rating_commentary',
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
    .then(dbRatingData => {
      if (!dbRatingData) {
        res.status(404).json({ message: 'No rating found with this id' });
        return;
      }
      res.json(dbRatingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', withAuth, (req, res) => {
  
  Rating.create({
    user_id: req.session.user_id,
    product_id: req.body.product_id,
    rating: req.body.rating,
    rating_commentary: req.body.rating_commentary,
    date: req.body.date
  })
    .then(dbRatingData => res.json(dbRatingData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Rating.update(
    {
      rating : req.body.rating,
      rating_commentary : req.body.rating_commentary,
      date : req.body.date
    },
    {
    where: {
      user_id: req.session.user_id,
      id: req.params.id
    }
    
  })
    .then(dbRatingData => {
      if (!dbRatingData) {
        res.status(404).json({ message: 'No rating found with this id!' });
        return;
      }
      res.json(dbRatingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Rating.destroy({
    where: {
      user_id: req.session.user_id,
      id: req.params.id
    }
  })
    .then(dbRatingData => {
      if (!dbRatingData) {
        res.status(404).json({ message: 'No rating found with this id!' });
        return;
      }
      res.json(dbRatingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
