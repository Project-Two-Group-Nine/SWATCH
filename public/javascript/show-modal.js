const showModal = (e) => {
    if (e.target.textContent=="Review") {
    id = e.target.id
   

        document.querySelector('.modal-mask').style.display = "block";
        document.querySelector('.modal').style.display = "block";
        document.querySelector('.add-rating').id  = id;
    }
}

document.querySelector(".all-products").addEventListener('click', showModal);

