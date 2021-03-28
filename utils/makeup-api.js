const fetch = require('node-fetch');

const baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?"; // need to supply a query

async function getProductCategory(category) {
    const result = []; 
    const callUrl = baseUrl + "product_type=" + category;
    await fetch(callUrl)
     .then(response => { result.push(response.json)}); 
};
     
     
     
     /* async function(response) {
       // request was successful
       if (response.ok) {
        // do we need an await? we have the data 
        // change the data to something we can work with
        await response.json().then(async function(productData) {
           data =  await productData;
         });
       } else {
        console.log("Error: " + response.statusText);
       }
     })
     .catch(function(error) {
        console.log("Unable to connect" + error);
     });
    return data;
 */