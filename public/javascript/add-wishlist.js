async function newWishHandler(event) {
    
  
  if (event.target.textContent=="Wishlist") {
    event.preventDefault();
    
    const product_id = event.target.id;
    const wish_list =1;
    const date = Date.now();


    const response = await fetch(`/api/wishlists`, {
      method: 'POST',
      body: JSON.stringify({
        product_id,
        wish_list,
        date
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
}


}

document.querySelector('.all-products').addEventListener('click', newWishHandler)

