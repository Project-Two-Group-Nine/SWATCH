async function deleteWishHandler(event) {
    
  
  if (event.target.textContent=="Remove") {
    event.preventDefault();

    const id = event.target.id;
    const response = await fetch(`/api/wishlists/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }


}

document.querySelector('.all-wishlists').addEventListener('click', deleteWishHandler)

