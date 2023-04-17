// Récupération des fonctions
import {getWorks, getCategories, deleteWork} from "./api_fct.js";
import {openModalWorks, closeModalWorks} from "./base_fct.js";

// Fonction de création des filtres
export function genererFilters(Array){
    
        // Récupération de l'élément du DOM parents des filtres
        const portfolioFilters = document.querySelector("#portfolio .filters");
    
        // Création des filtres selon le tableau en entrée
        for (let i = 0; i < Array.length; i++) {
            const portfolioFilter = document.createElement("button");
            portfolioFilter.setAttribute("type","filter");
            portfolioFilter.classList.add("filter");
            portfolioFilter.innerHTML = Array[i];
            portfolioFilters.appendChild(portfolioFilter);
        }  
};
    
// Fonction de création des projets
export function genererWorks(Array){
    
        for (let i = 0; i < Array.length; i++) {
            
            const unit = Array[i];
    
            // Récupération de l'élément du DOM parents des projets
            const sectionGallery = document.querySelector("#portfolio .gallery");
            
            // Création des balises pour un projet
            const workElement = document.createElement("figure");
            sectionGallery.appendChild(workElement);
    
            // Création des balises du projet
            const imageElement = document.createElement("img");
            imageElement.src = unit.imageUrl;
            workElement.appendChild(imageElement);
    
            const textElement = document.createElement("figcaptation");
            textElement.innerHTML = unit.title;
            workElement.appendChild(textElement); 
            }
 };
    
// Fonction de gestion des filtres
export function manageFilters(arrayFilter, arrayWorks){

        for (let i = 0; i < arrayFilter.length ; i++) {
            // Ecoute des click sur les tout les filtres
            arrayFilter[i].addEventListener("click", event => {
                // Effacer filtre actif si un nouveau click est détetecter
                for (let j = 0; j < arrayFilter.length ; j++){
                    arrayFilter[j].removeAttribute("id");
                }
            //Attribution du nouveau filtre actif
            arrayFilter[i].setAttribute("id", "filteractif");
            // Creation d'un tableau avec uniquement les travaux de la catégorie clicker    
            let filterWorks = arrayWorks.filter(arrayWorks => arrayWorks.categoryId == i);
            if (i == 0) { filterWorks = arrayWorks}
            // Vidange de la galery et generation des traveaux selon filtres
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(filterWorks);
          });
        }
 };

// Fonction d'affichage des erreurs de login
export function errorLogin(codeApi){
    switch (codeApi) {
        case 401:
            document.getElementById("error__login").textContent = "Le mot de passe est incorect"
            document.getElementById("error__submit").textContent = "Erreur dans l'identifiant ou le mot de passe"
            break;
        case 404:
            document.getElementById("error__email").textContent = "Le mail saisie n'existe pas"
            document.getElementById("error__submit").textContent = "Erreur dans l'identifiant ou le mot de passe"
            break;
        default:
            alert("Code erreur inconnu")
          }
};

// Fonction pour effacer les erreurs afficher
export function cleanErrorLogin(){
    document.getElementById("error__email").textContent = ""
    document.getElementById("error__login").textContent = ""
    document.getElementById("error__submit").textContent = ""
};

// Fonction de changement de texte lors du log
export function transformLog(logText){
    let nav = document.querySelectorAll("nav li");
    let log = nav[2];
    log.setAttribute("id",logText);
    log.textContent = logText
};

// Fonctions de création des élements permetant la modification de la page
export function editingIndex(){

    // Masquage des filtres
    const filters = document.querySelector("#portfolio .filters");
    filters.style.display = "none";

    // Création du header de modification
    document.body.prepend(document.createElement("div"));
    const header_black = document.querySelector("body div");
    header_black.setAttribute("id","header_black");

    header_black.appendChild(document.createElement("div"));
    const edition = document.querySelector("#header_black div");
    edition.classList.add("edition");
    edition.appendChild(document.createElement("i"));
    const icone = document.querySelector("#header_black .edition i");
    icone.classList.add("fa-regular", "fa-pen-to-square");
    edition.appendChild(document.createElement("p"));
    const text = document.querySelector("#header_black .edition p");
    text.textContent= "Mode édition";

    header_black.appendChild(document.createElement("button"));
    const update = document.querySelector("#header_black button");
    update.classList.add("button_edit");
    update.textContent = "publier les changements"

    // Ajout des elements "modifier"
    edit();
};

function edit(){

    // Placement dans le DOM d'un lien pour les "modifier"
    let edit = document.querySelector("#introduction figure");
    let m1 = edit.insertAdjacentElement("afterend", document.createElement("a"));
    m1.setAttribute("id","edit-photo");

    edit = document.querySelector("#introduction article");
    let m2 = edit.insertAdjacentElement("beforebegin", document.createElement("a"));
    m2.setAttribute("id","edit-bio");

    edit = document.querySelector("#portfolio h2");
    let m3 = edit.insertAdjacentElement("afterend", document.createElement("a"));
    m3.setAttribute("id","edit-works");
    m3.setAttribute("href","#modal-works");

    //Creation d'un tableau avec les div et création du contenu des div
    edit = [m1, m2, m3]    

    edit.forEach(function(item){
        item.classList.add("edit");
        item.appendChild(document.createElement("i"));
        item.appendChild(document.createElement("p"));
    });

    let icone = document.querySelectorAll("body .edit i");
    icone.forEach(function(item){
        item.classList.add("fa-regular", "fa-pen-to-square");
    });

    let text = document.querySelectorAll("body .edit p");
    text.forEach(function(item){
        item.textContent= "modifier";
    });
};

//Fonction pour editer la modal de gestion des travaux
export async function editingModalCleanWorks(){

    const modalContent = document.getElementById("modal_content");
    modalContent.innerHTML ="";
    const button = modalContent.appendChild(document.createElement("button"));
    button.setAttribute("id","modal_close");
    const icone = button.appendChild(document.createElement("i"));
    icone.classList.add("fa-solid", "fa-xmark");
    const title = modalContent.appendChild(document.createElement("h1"));
    title.textContent= "Galerie photo"
    title.setAttribute("id","modal-works__title");
    const gallery = modalContent.appendChild(document.createElement("div"));
    gallery.classList.add("modal__gallery");
    let works = await getWorks();
    for (let i = 0; i < works.length ; i++){
        let figure = gallery.appendChild(document.createElement("figure"));
        let img = figure.appendChild(document.createElement("img"));
        img.src = works[i].imageUrl;
        let txt = figure.appendChild(document.createElement("figcaptation"));
        txt.textContent = "éditer"
        let btntrash = figure.appendChild(document.createElement("button"));
        btntrash.classList.add("trash");
        btntrash.setAttribute("value",works[i].id);
        let trash = btntrash.appendChild(document.createElement("i"));
        trash.classList.add("fa-solid", "fa-trash-can");
    }
    const bar = modalContent.appendChild(document.createElement("div"));
    bar.classList.add("modal__bar");
    const addwork = modalContent.appendChild(document.createElement("button"));
    addwork.classList.add("modal__addWork");
    addwork.setAttribute("id","modal__addWork");
    addwork.textContent = "Ajouter une photo"
    const deleteGallery = modalContent.appendChild(document.createElement("h2"));
    deleteGallery.classList.add("modal__deleteGallery");
    deleteGallery.textContent = "Supprimer la galerie"

    //Supression d'un travail
    deleteWorks();

    //Ajouter un travail
    let addWorks = document.getElementById("modal__addWork");
    addWorks.addEventListener("click", editingModalNewWorks);
};

//Fonction pour editer la modale pour l'ajout de travaux
export async function editingModalNewWorks(){

    const modalContent = document.getElementById("modal_content");
    modalContent.innerHTML = `
        <button id="modal_back"><i class="fa-solid fa-arrow-left"></i></button>
        <button id="modal_close"><i class="fa-solid fa-xmark"></i></button>
        <h1 id="modal-works__title">Ajouter photo</h1>
        <form class="modal_form">
            <div class="input-img">
                <i class="fa-regular fa-image input-img__icone"></i>
                <label for="input-image" class="input-img__button">+ Ajouter photo</label>
                <input type="file" id="input-image" accept="image/png, image/jpeg">
                <p class="input-img__text">jpg, png: 4mo max</p>
            </div>
            <div class="input-form">
                <label for="input-title">Titre</label>
                <input type="text" id="input-title">
            </div>
            <div class="input-form">
                <label for="input-categories">Catégorie</label>
                <select id="input-categories"></select>
            </div>
        </form>
        <div class="modal__bar"></div>
        <button class="modal__addWork">Valider</button>
        `
    //Back
    let backEditWorks = document.getElementById("modal_back");
    backEditWorks.addEventListener("click", openModalWorks)

    //Fermer la modale avec la croix
    let modalClose = document.getElementById("modal_close");
    modalClose.addEventListener("click", closeModalWorks);

    //Ajout des categories existantes au select et attribution de l'ID en value
    let categories = await getCategories();
    categories.unshift({id: 0, name: "Choisir une catégorie"});
    let categoriesContent = document.getElementById("input-categories");
    for (let i = 0; i < categories.length ; i++){
        let option = categoriesContent.appendChild(document.createElement("option"));
        option.textContent = categories[i].name
        option.setAttribute("value",categories[i].id);
    }
};

// Fonction de suppresion d'un travail
async function deleteWorks(){
    let trashs = document.getElementsByClassName("trash");

    for (let i = 0; i < trashs.length ; i++){
            trashs[i].addEventListener("click", async (event) => {
                event.preventDefault();
                let response = await deleteWork(trashs[i].value);
                if (response.ok) {
                    alert("Supression réussi");
                }
                else{
                    errorDelete(response.status);
                }
            });    
        }
};

// Fonction d'affichage des erreurs de supression
export function errorDelete(codeApi){
    switch (codeApi) {
        case 401:
            alert("Suppression non autorisée");
            break;
        case 404:
            alert("Comportement inattendu")
            break;
        default:
            alert("Une erreur et survenu contacter l'administrateur du site")
          }
};