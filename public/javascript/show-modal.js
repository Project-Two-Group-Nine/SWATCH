const showModal = (e) => {
    const mask = document.querySelector('.modal-mask');
    const modal = document.querySelector('.modal');

    if (e.target === document.querySelector('.show-modal')) {
        const id = e.target.dataset.productid;
   
        mask.style.display = "block";
        modal.style.display = "block";
        document.querySelector('.add-rating').id  = id;
    }
    else if (e.target = mask) {
        mask.style.display = "none";
        modal.style.display = "none";
    }
}

document.querySelector("body").addEventListener('click', showModal);

