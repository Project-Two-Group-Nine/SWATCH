async function newWishHandler(event) {
    

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  if (event.target.textContent=="Wishlist") {
    event.preventDefault();
    
    const product_id = event.target.id;
    const date = Date.now();


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
      document.location.reload();
    } else {
      alert(response.statusText);
    }
}


}

document.querySelector('.all-products').addEventListener('click', newWishHandler)

