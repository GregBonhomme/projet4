function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
    document.querySelector(".topnav").setAttribute("modalOpened", true);
}

//close modal event
closeBtn.addEventListener("click", () => {
    document.reserve.reset();
    removeError("formData")
    closeModal();
});

// close modal form
function closeModal() {
    document.querySelector(".topnav").setAttribute("modalOpened", false);
    modalbg.style.display = "none";
}

// erase errorMsgs 

function removeError(className) {
    let array = document.querySelectorAll("." + className);
    for (i = 0; i < array.length; i++) {
        if (array[i].hasAttribute("data-error-visible")) {
            array[i].removeAttribute("data-error");
            array[i].removeAttribute("data-error-visible");
        }
    }
}