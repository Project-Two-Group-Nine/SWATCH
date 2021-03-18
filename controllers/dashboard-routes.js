const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');



// for interna data, append external data
var product_append_ext =  async function(dbProductData) {
  let result=[];
 
  
          for (var i = 0; i < dbProductData.length; i++) {
            let queryUrl = 'http://localhost:3001/api/productsexternal/'+dbProductData[i].int_api_id
             await fetch(queryUrl)
                .then(async function(response){
                  if (!response.ok) {
                    return console.log('Error: products');
                  }
                  return response.json();
                })
                .then(async function(exttProduct) {
                
                  result.push(JSON.parse(JSON.stringify( { ...extProduct, ...dbProductData[i] }) ));
                  
              
              })
            } 
        
  return result; 
};




//////////////////////////////////////////////////////////////
// get all products for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Product.findAll({
      where: {
        int_id: [sequelize.literal(`(SELECT product_id FROM comment WHERE comment.user_id = ${req.session.user_id}  union all SELECT product_id FROM rating WHERE rating.user_id = ${req.session.user_id})`), 'id']
      },
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
    .then( async function(dbProductData) {   
      var products = await product_append_ext(dbProductData)
      res.render('dashboard', { products, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




////////////////////////////////






router.get('/edit/:id', withAuth, (req, res) => {
  Comment.findByPk(req.params.id, {
    attributes: [
      'id',
      'user_id',
      'product_id',
      'comment',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['int_id', 'int_name', 'int_api_id','int_featured','int_rating_avg']
      }
    ]
  })
    .then(dbCommentData => {
      if (dbCommentData) {
      
        const comment = dbCommentData.get({ plain: true });
        res.render('edit-comment', {
          comment,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
