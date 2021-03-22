const fetch = require("node-fetch");
const { Product } = require('../models');


// makeup api
var product_ext =  async function() {
  // format the api url
  var apiUrl ="http://makeup-api.herokuapp.com/api/v1/products.json";
  var data = [];
     // make a request to the url
     await fetch(apiUrl)
     .then(async function(response) {
       // request was successful
       if (response.ok) {
         await response.json().then(async function(extProductData) {
           data =  await extProductData;
         });
       } else {
        console.log("Error: " + response.statusText);
       }
     })
     .catch(function(error) {
        console.log("Unable to connect" + error);
     });
return await data;
};

// makeup api
var product_ext_meaningful_fields =  async function() {
  var data= [];
  var dataOut = [];
  data = await product_ext();

  for (var i = 0; i < data.length; i++) {
      dataOut.push(JSON.parse(JSON.stringify( { api_id: data[i].id, 
        name: data[i].name, 
        brand: data[i].brand, 
        price: parseFloat(data[i].price), 
        image_link: data[i].image_link, 
        description: data[i].description, 
        rating: data[i].rating, 
        category: data[i].category, 
        product_type: data[i].product_type, 
        api_featured_image: data[i].api_featured_image, 
        featured: 0,
        int_rating_avg: 0 })));  
    }
    return dataOut;
  };



/*
const productdata = [
  {
    api_id: 495,
    name: 'Maybelline Face Studio Master Hi-Light Light Booster Bronzer',
    brand: 'maybelline',
    price: 14.99,
    image_link: 'https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png',
    description: 'Maybelline Face Studio Master Hi-Light Light Boosting bronzer formula has an expert balance of shade + shimmer illuminator for natural glow. Skin goes soft-lit with zero glitz. For Best Results: Brush over all shades in palette and gently sweep over cheekbones, brow bones, and temples, or anywhere light naturally touches the face.',
    rating: 5,
    category: null,
    product_type: 'bronzer',
    api_featured_image: '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/495/original/open-uri20171223-4-9hrto4?1514063330',
    featured: 0,
    int_rating_avg: 4
  },
  {
    api_id: 488,
    name: 'Maybelline Fit Me Bronzer',
    brand: "maybelline",
    price: 10.29,
    image_link: 'https://d3t32hsnjxo7q6.cloudfront.net/i/d4f7d82b4858c622bb3c1cef07b9d850_ra,w158,h184_pa,w158,h184.png',
    description: 'https://d3t32hsnjxo7q6.cloudfront.net/i/d4f7d82b4858c622bb3c1cef07b9d850_ra,w158,h184_pa,w158,h184.png',
    rating: 4.5,
    category: null,
    product_type: 'bronzer',
    api_featured_image: '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/488/original/open-uri20171223-4-deo82c?1514063329',
    featured: 1,
    int_rating_avg: 3
  },
  {
    api_id: 477,
    name: 'Maybelline Facestudio Master Contour Kit',
    brand: 'maybelline',
    price: '15.99',
    image_link: 'https://d3t32hsnjxo7q6.cloudfront.net/i/4f731de249cbd4cb819ea7f5f4cfb5c3_ra,w158,h184_pa,w158,h184.png',
    description: 'Maybelline Facestudio Master Contour Kit is the ultimate on the go all-in-one palette, with contouring brush included.  Define and highlight in a New York minute with this effortless 3-step face contouring kit.  This easy-to-use 3-step face contouring kit features a bronzer, blush and highlighter.',
    rating: null,
    category: null,
    product_type:  'bronzer',
    api_featured_image: '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/477/original/open-uri20171223-4-1m8bc4v?1514063328',
    featured: 0,
    int_rating_avg: 4
  }
];*/

var seedProducts =  async function() {
  // get all products-ext
  productdata = await product_ext_meaningful_fields();
  
  await Product.bulkCreate(productdata);
}
//const seedProducts = () => Product.bulkCreate(productdata);


module.exports = seedProducts;


