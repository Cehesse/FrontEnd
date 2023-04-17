// Récupération des fonctions
import {transformLog,editingModal} from "./dom_fct.js";
    
// Stockage de l'utilisateur et redirection sur l'index
export function activeLogin(User, Token, Page) {
    sessionStorage.setItem("user", User);
    sessionStorage.setItem("token", Token);
    window.location.replace(Page);
};

// Vidange de la session
export function logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    transformLog("login");
};

// Adresse mail valide
function AdresseEmail(mail){
    var mailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    return mailReg.test(mail);
};

// Coloration selon mail valide ou non
export function validateEmail(email){
    if (AdresseEmail(email.value)){
        email.style.background = "#BCF1A7";
    }
    else{
        email.style.background = "#E47C48";
    }
};

//Fonction openModalWorks
export function openModalWorks() {
    
    // Editer la modal
    editingModal();
    // Obtenir la modal et l'afficher
    let modalWorks = document.getElementById("modal-works");
    modalWorks.style.display = "flex";
    // Fermer la modal lors d'un click
    modalWorks.addEventListener("click", closeModalWorks);
    // Fermer la modal lors d'un click sur la croix
    closeModalXmark();
    //Empecher la modal de se fermer lors d'un click dans son contenu
    let modalContent = document.getElementById("modal_content");
    modalContent.addEventListener("click", stopPropagation);
};

//Fonction closeModalWorks
export function closeModalWorks() {
    let modalWorks = document.getElementById("modal-works");
    modalWorks.style.display = "none";
    modalWorks.removeEventListener("click", closeModalWorks);
    let modalContent = document.getElementById("modal_content");
    modalContent.removeEventListener("click", stopPropagation);
};

function stopPropagation(e){
    e.stopPropagation();
};

export function closeModalXmark(){
    let modalClose = document.getElementById("modal_close");
    modalClose.addEventListener("click", closeModalWorks);
};


