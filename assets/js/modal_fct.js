// Récupération des fonctions
import {editingModal} from "./dom_fct.js";
    
//Fonction openModalWorks
export function openModalWorks() {
    // Editer la modal
    editingModal();
    // Obtenir la modal et l'afficher
    const modalWorks = document.getElementById("modal-works");
    modalWorks.style.display = "flex";
    // Fermer la modal lors d'un click
    modalWorks.addEventListener("click", closeModalWorks);
    //Empecher la modal de se fermer lors d'un click dans son contenu
    const modalContent = document.getElementById("modal_content");
    modalContent.addEventListener("click", stopPropagation);
};

//Fonction closeModalWorks
function closeModalWorks() {
    const modalWorks = document.getElementById("modal-works");
    modalWorks.style.display = "none";
    modalWorks.removeEventListener("click", closeModalWorks);
    const modalContent = document.getElementById("modal_content");
    modalContent.removeEventListener("click", stopPropagation);
};

//Fonction de fermeture de la modal sur la croix
export function closeModalXmark(){
    const modalClose = document.getElementById("modal_close");
    modalClose.addEventListener("click", closeModalWorks);
};

//Fonction stopPropagation
function stopPropagation(e){
    e.stopPropagation();
};