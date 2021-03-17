const router = require('express').Router();
const { User, Product, Comment, Rating, Wishlist, Clicked } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Clicked.findAll({
    attributes: [
      'id',
      'user_id',
      'product_id',
      'clicked',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['id', 'name', 'api_id','featured','rating_avg']
      }
    ]
  })
    .then(dbClickedData => res.json(dbClickedData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  Clicked.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'user_id',
      'product_id',
      'clicked',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['id', 'name', 'api_id','featured','rating_avg']
      }
    ]
  })
    .then(dbClickedData => {
      if (!dbClickedData) {
        res.status(404).json({ message: 'No clicked found with this id' });
        return;
      }
      res.json(dbClickedData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', withAuth, (req, res) => {
  
  Clicked.create({
    user_id: req.session.user_id,
    product_id: req.body.product_id,
    clicked_text: req.body.clicked,
    date: today.getDate()
  })
    .then(dbClickedData => res.json(dbClickedData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Clicked.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbClickedData => {
      if (!dbClickedData) {
        res.status(404).json({ message: 'No clicked found with this id!' });
        return;
      }
      res.json(dbClickedData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Clicked.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbClickedData => {
      if (!dbClickedData) {
        res.status(404).json({ message: 'No clicked found with this id!' });
        return;
      }
      res.json(dbClickedData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
