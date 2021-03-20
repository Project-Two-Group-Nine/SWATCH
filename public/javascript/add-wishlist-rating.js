async function newWishHandler(event) {
    
  if (event.target.textContent=="Wishlist") {
    event.preventDefault();
    
    const product_id = event.target.id;
    const date = Date.now();

    console.log( event.target.id)

    const response = await fetch(`/api/wishlists`, {
      method: 'POST',
      body: JSON.stringify({
        product_id,
        date
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
}

if (event.target.textContent=="Review") {
  event.preventDefault();
  
  const product_id = event.target.id;
  const rating = 1;
  const rating_commentary ="ok";
  const date = Date.now();

  console.log( event.target.id)

  const response = await fetch(`/api/ratings`, {
    method: 'POST',
    body: JSON.stringify({
      product_id,
      rating,
      rating_commentary,
      date
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

}

document.querySelector('.all-products').addEventListener('click', newWishHandler)

