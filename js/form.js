let formInfo = {
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    quantity: "",
    location: "",
    newsletter: "",
}

let tempFormInfo = {
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    quantity: "",
    location: "",
    newsletter: "",
}

/* Vérification des champs */

function checkName(string) {
    if ((string !== "") && (string.length >= 2)) {
        return true
    } else {
        return false;
    }
}

function checkEmail(string) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (emailRegExp.test(string)) {
        return true;
    } else {
        return false;
    }
}

function isNumber(string) {
    return /^\d+$/.test(string);
}

/* Upload du formulaire */

function uploadInfo(tab) {
    let errors = 0;
    let firstname = document.getElementById("first").value;
    let lastname = document.getElementById("last").value;
    let email = document.getElementById("email").value;
    let birthdate = document.getElementById("birthdate").value;
    let quantity = document.getElementById("quantity").value;
    let locations = document.getElementsByName("location");
    let location = ""
    for (i = 0; i < locations.length; i++) {
        if (locations[i].checked) {
            location = locations[i].value;
            break;
        }
    }
    newsletter = document.getElementById("checkbox2").checked;

    if (checkName(firstname)) {
        tab.firstname = firstname;
    } else {
        tab.firstname = "";
        errors++;
        let parent = document.getElementById("first").parentElement;
        parent.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
        parent.setAttribute("data-error-visible", true);
    }

    if (checkName(lastname)) {
        tab.lastname = lastname;
    } else {
        tab.lastname = "";
        errors++;
        let parent = document.getElementById("last").parentElement;
        parent.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
        parent.setAttribute("data-error-visible", true);
    }

    if (checkEmail(email)) {
        tab.email = email;
    } else {
        tab.email = "";
        errors++;
        let parent = document.getElementById("email").parentElement;
        parent.setAttribute("data-error", "Veuillez entrer un Email valide.");
        parent.setAttribute("data-error-visible", true);
    }

    if (birthdate !== "") {
        tab.birthdate = birthdate;
    } else {
        tab.birthdate = "";
        errors++;
        let parent = document.getElementById("birthdate").parentElement;
        parent.setAttribute("data-error", "Vous devez entrer votre date de naissance.");
        parent.setAttribute("data-error-visible", true);
    }

    if (isNumber(quantity)) {
        tab.quantity = quantity;
    } else {
        tab.quantity = "";
        errors++;
        let parent = document.getElementById("quantity").parentElement;
        parent.setAttribute("data-error", "Veuillez entrer un nombre entre 0 et 99.");
        parent.setAttribute("data-error-visible", true);
    }

    if (location !== "") {
        tab.location = location;
    } else {
        tab.location = "";
        errors++;
        let parent = document.getElementById("location1").parentElement;
        parent.setAttribute("data-error", "Vous devez choisir une option.");
        parent.setAttribute("data-error-visible", true);
    }

    if (newsletter) {
        tab.newsletter = true;
    } else {
        tab.newsletter = false;
    }
    return errors;
}

function validate() {
    let errors = uploadInfo(tempFormInfo);

    if (errors === 0 && document.getElementById("checkbox1").checked) {
        formInfo = Object.assign(formInfo, tempFormInfo);
        const modalBody = document.querySelector(".modal-body");
        modalBody.style.opacity = "0";
        modalBody.style["pointer-events"] = "none";
        promptMsg(document.querySelector(".content"), "Merci pour votre inscription");
        document.querySelector(".closeBtn").addEventListener("click", () => {
            let promptMsgs = document.querySelectorAll(".prompt")
            for (i = 0; i < promptMsgs.length; i++) {
                promptMsgs[i].parentNode.removeChild(promptMsgs[i]);
            };
            let closeBtns = document.querySelectorAll(".closeBtn")
            for (i = 0; i < closeBtns.length; i++) {
                closeBtns[i].parentNode.removeChild(closeBtns[i]);
            };
            modalBody.style.opacity = "1";
            modalBody.style["pointer-events"] = "auto";
            document.querySelector(".bground").style.display = "none";
        })
        console.log(formInfo);
        console.log(tempFormInfo);
    } else {
        if (document.getElementById("checkbox1").checked === false) {
            document.getElementById("checkbox1").parentNode.setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.");
            document.getElementById("checkbox1").parentNode.setAttribute("data-error-visible", true);
        }
        console.log(formInfo);
        console.log(tempFormInfo);
    }
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
})

/* MSG Remerciement */

function promptMsg(div, string) {
    let promptDiv = document.createElement("div");
    promptDiv.innerHTML = string;
    promptDiv.classList.add("prompt");
    div.prepend(promptDiv);

    let closeBtn = document.createElement("div");
    closeBtn.innerHTML = "Fermer";
    closeBtn.classList.add("button");
    closeBtn.classList.add("closeBtn");
    div.append(closeBtn);
}


/*
function errorMsg (div,string) {
    let errorDiv = document.createElement("span");
    errorDiv.innerHTML = string;
    errorDiv.classList.add("errorMsg");
    div.insertAdjacentElement("afterend",errorDiv);
}



function uploadInfo (tab) {
    let errors = 0;
    let errorMsgs = document.querySelectorAll(".errorMsg");
    for (i=0 ; i<errorMsgs.length ; i++) {
        errorMsgs[i].parentNode.removeChild(errorMsgs[i]);
    };
    let firstname = document.getElementById("first").value;
    let lastname = document.getElementById("last").value;
    let email = document.getElementById("email").value;
    let birthdate = document.getElementById("birthdate").value;
    let quantity = document.getElementById("quantity").value;
    let locations = document.getElementsByName("location");
    let location = ""
    for (i=0 ; i<locations.length ; i++) {
        if (locations[i].checked) {
            location = locations[i].value;
            break;
        }
    }
    newsletter = document.getElementById("checkbox2").checked;

    if (checkName(firstname)) {
        tab.firstname = firstname;
    } else {
        tab.firstname = "";        
        errors++;
        errorMsg (document.getElementById("first"),"Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    }

    if (checkName(lastname)) {
        tab.lastname = lastname;
    } else {
        tab.lastname = "";
        errors++;
        errorMsg (document.getElementById("last"),"Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    }

    if (checkEmail(email)) {
        tab.email = email;
    } else {
        tab.email = "";
        errors++;
        errorMsg (document.getElementById("email"),"Veuillez entrer un Email valide.");
    }

    if (birthdate !== "") {
        tab.birthdate = birthdate;
    } else {
        tab.birthdate = "";
        errors++;
        errorMsg (document.getElementById("birthdate"),"Vous devez entrer votre date de naissance.");
    }

    if (isNumber(quantity)) {
        tab.quantity = quantity;
    } else {
        tab.quantity = "";
        errors++;
        errorMsg (document.getElementById("quantity"),"Veuillez entrer un nombre entre 0 et 99.");
    }

    if (location !== "") {
        tab.location = location;
    } else {
        tab.location = "";
        errors++;
        errorMsg (document.querySelector(".text-label"),"Vous devez choisir une option.");
    }

    if (newsletter) {
        tab.newsletter = true;
    } else {
        tab.newsletter = false;
    }
    return errors;
}


*/