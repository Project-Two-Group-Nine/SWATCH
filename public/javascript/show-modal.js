const showModal = (e) => {
    document.querySelector('.modal-mask').style.display = "block";
    document.querySelector('.modal').style.display = "block";
}

document.querySelector(".show-modal").addEventListener('click', showModal);