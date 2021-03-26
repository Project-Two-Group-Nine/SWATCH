async function addFeatured() {
  
  const id = Math.floor(Math.random()*10);
  console.log(id)

  const response1 = await fetch(`/api/products/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (await response1.ok) {

      const response2 = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response2.ok) {
      } else {
        alert(response2.statusText);
      }

  } else {
    alert(response1.statusText);
  };

  

}

addFeatured()
