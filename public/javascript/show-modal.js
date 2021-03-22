const showModal = (e) => {
    if (e.target.textContent=="Review") {
        const id = e.target.dataset.productid;
   
        document.querySelector('.modal-mask').style.display = "block";
        document.querySelector('.modal').style.display = "block";
        document.querySelector('.add-rating').id  = id;
    }
}

const hideModal = (e) => {
    if (e.target === document.querySelector('.modal-mask')) {
        document.querySelector('.modal-mask').style.display = "none";
        document.querySelector('.modal').style.display = "none";
    }
}

document.querySelector(".all-products").addEventListener('click', showModal);
document.querySelector("main").addEventListener('click', hideModal);
