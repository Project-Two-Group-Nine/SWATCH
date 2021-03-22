async function deleteRatingHandler(event) {

  if (event.target.textContent=="Remove") {
    event.preventDefault();
    
    
    const id = parseInt(event.target.id);

  
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
  
  
  document.querySelector('.all-reviews').addEventListener('click', deleteRatingHandler)
