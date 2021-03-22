async function editRatingHandler(event) {

if (event.target.textContent=="Update") {
  event.preventDefault();
  
  const form = event.target.closest('form');
  
  const id = parseInt(event.target.dataset.productid);
  const rating = parseInt(form.querySelector('select[name="rating"]').value);
  const rating_commentary = form.querySelector('textarea').value.trim();
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


document.querySelector('.all-reviews').addEventListener('click', editRatingHandler)
