const fetch = require("node-fetch");
const router = require('express').Router();


// makeup api
var product_ext =  async function() {

  // format the api url
  var apiUrl ="http://makeup-api.herokuapp.com/api/v1/products.json";
  var data = null;
     // make a request to the url
     await fetch(apiUrl)
     .then(async function(response) {
       // request was successful
       if (response.ok) {
         await response.json().then(async function(dbProductData) {
           data =  await dbProductData;
         });
       } else {
        console.log("Error: " + response.statusText);
       }
     })
     .catch(function(error) {
        console.log("Unable to connect" + error);
     });
return data;
};

// makeup api
var product_ext_byid =  async function(id) {
    var data = [];
    data = await product_ext();
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id ){
            return data[i];
        }
    }
  };


// get all products-ext
router.get('/', (req, res) => {
    console.log('======================');
    product_ext()
      .then(dbProductData => res.json(dbProductData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // get all product by extternal api-id
router.get('/:id', (req, res) => {
    console.log('======================');
    product_ext_byid(req.params.id)
      .then(dbProductData => res.json(dbProductData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;