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

function checkNumber(string) {
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
        displayError("first", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
    }
    if (checkName(lastname)) {
        tab.lastname = lastname;
    } else {
        tab.lastname = "";
        errors++;
        displayError("last", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
    }
    if (checkEmail(email)) {
        tab.email = email;
    } else {
        tab.email = "";
        errors++;
        displayError("email", "Veuillez entrer un Email valide.")
    }
    if (birthdate !== "") {
        tab.birthdate = birthdate;
    } else {
        tab.birthdate = "";
        errors++;
        displayError("birthdate", "Vous devez entrer votre date de naissance.")
    }
    if (checkNumber(quantity)) {
        tab.quantity = quantity;
    } else {
        tab.quantity = "";
        errors++;
        displayError("quantity", "Veuillez entrer un nombre entre 0 et 99.")
    }
    if (location !== "") {
        tab.location = location;
    } else {
        tab.location = "";
        errors++;
        displayError("location1", "Vous devez choisir une option.")
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
        hide(".modal-body");
        promptMsg(document.querySelector(".content"), "Merci pour votre inscription");
        document.reserve.reset();
        removeError("formData")

        //Fermeture après validation du formulaire
        document.querySelector(".closeBtn").addEventListener("click", () => {
            deleteTempHtml(".prompt")
            deleteTempHtml(".closeBtn")
            show(".modal-body");
            document.querySelector(".bground").style.display = "none";
            document.querySelector(".topnav").setAttribute("modalOpened", false);
        })
        console.log(formInfo);
        console.log(tempFormInfo);
    } else {
        if (document.getElementById("checkbox1").checked === false) {
            displayError("checkbox1", "Vous devez vérifier que vous acceptez les termes et conditions.");
        }
        console.log(formInfo);
        console.log(tempFormInfo);
    }
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
});

/*Afficher MSG Remerciement */

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

/* Effacer les ajouts temporarires du HTML */

function deleteTempHtml(temp) {
    let divs = document.querySelectorAll(temp)
    for (i = 0; i < divs.length; i++) {
        divs[i].parentNode.removeChild(divs[i]);
    };
}

/* Cacher un element */

function hide(temp) {
    let div = document.querySelector(temp);
    div.style.opacity = "0";
    div.style["pointer-events"] = "none";
}

/* Afficher un element */

function show(temp) {
    let div = document.querySelector(temp);
    div.style.opacity = "1";
    div.style["pointer-events"] = "auto";
}

/* Afficher Msg Erreur */

function displayError(id, string) {
    let parent = document.getElementById(id).parentElement;
    parent.setAttribute("data-error", string);
    parent.setAttribute("data-error-visible", true);
}

/* Effacer Msg Erreur */

function removeError(className) {
    let array = document.querySelectorAll("." + className);
    for (i = 0; i < array.length; i++) {
        if (array[i].hasAttribute("data-error-visible")) {
            array[i].removeAttribute("data-error");
            array[i].removeAttribute("data-error-visible");
        }
    }
}