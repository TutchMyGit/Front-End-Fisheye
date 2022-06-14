function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector("main").style.display = "block";
}

document.body.addEventListener("keydown", function(event) {
    if(event.code === "Escape") {
        closeModal();
    }
})
