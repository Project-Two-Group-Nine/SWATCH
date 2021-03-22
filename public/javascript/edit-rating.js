async function editRatingHandler(event) {

if (event.target.textContent=="Update") {
  event.preventDefault();
  
  
  const id = parseInt(event.target.id);
  const rating = parseInt(document.querySelector('#rating').value);
  const rating_commentary =document.querySelector('#review').value.trim();
  const date = Date.now();



  const response = await fetch(`/api/ratings/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
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


document.querySelector('.all-products').addEventListener('click', editRatingHandler)
