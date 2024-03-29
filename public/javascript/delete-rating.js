async function deleteRatingHandler(event) {

  if (event.target.textContent=="Remove") {
    event.preventDefault();
    
    const id = parseInt(event.target.dataset.ratingid);

  
    const response = await fetch(`/api/ratings/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
   }
}
  
  document.querySelector('.all-products').addEventListener('click', deleteRatingHandler)

  
