async function newRatingHandler(event) {

if (event.target.textContent=="Review") {
  event.preventDefault();
  
  
  const product_id = parseInt(event.target.id);
  const rating = parseInt(document.querySelector('#rating').value);
  const rating_commentary =document.querySelector('#review').value;
  const date = Date.now();

  console.log(product_id,
    rating,
    rating_commentary,
    date)

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
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

}


document.querySelector('.modal').addEventListener('click', newRatingHandler)
