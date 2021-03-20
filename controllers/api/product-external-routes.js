const fetch = require("node-fetch");
const router = require('express').Router();


// makeup api
var product_ext =  async function() {

  // format the api url
  var apiUrl ="http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
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
  


  module.exports = router;