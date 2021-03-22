async function editRatingHandler(event) {

  if (event.target.textContent === 'Save') {
    event.preventDefault();

    const form = event.target.closest('form');

    const id = parseInt(event.target.dataset.ratingid);
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

    form.querySelector('.edit-review').style.display = 'none';
    form.querySelector('.update-rating').textContent = 'Update';

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    };
  };

};

const showEditForm = (e) => {
  if (e.target.textContent === "Update") {
    e.preventDefault();

    const form = e.target.closest('form');

    form.querySelector('.show-review').style.display = 'none';
    form.querySelector('.edit-review').style.display = 'block';

    form.querySelector('.update-rating').textContent = 'Save';

  };
};

document.querySelector('.all-products').addEventListener('click', editRatingHandler);
document.querySelector('.all-products').addEventListener('click', showEditForm);
