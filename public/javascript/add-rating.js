async function newRatingHandler(event) {

if (event.target.textContent=="Review") {
  event.preventDefault();
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const product_id = id;
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
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

}


document.querySelector('.all-products').addEventListener('click', newRatingHandler)
