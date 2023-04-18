// Récupération des fonctions
import {getWorks, getCategories, deleteWork, addWork, errorDelete, erroraddWorks} from "./api_fct.js";
import {closeModalXmark} from "./modal_fct.js";

// Fonction de création de bouton filtres
export function generateFilters(array){

        // Récupération de l'élément du DOM parents des projets
        const portfolioFilters = document.querySelector("#portfolio .filters");

        // Création des filtres selon le tableau en entrée et le parent
        for (let i = 0; i < array.length; i++) {
            const Filter = document.createElement("button");
            Filter.setAttribute("type","filter");
            Filter.classList.add("filter");
            Filter.innerHTML = array[i];
            portfolioFilters.appendChild(Filter);
        }  
};
    
// Fonction de création des projets selon un tableau
export function generateWorks(array){
    
    // Récupération de l'élément du DOM parents des projets
    const sectionGallery = document.querySelector("#portfolio .gallery");
    sectionGallery.innerHTML="";

        //Boucle de création des projets
        for (let i = 0; i < array.length; i++) {
            
        // Création des balises pour un projet
        const workElement = document.createElement("figure");
        sectionGallery.appendChild(workElement);
    
        // Création des balises du projet
        const imageElement = document.createElement("img");
        imageElement.src = array[i].imageUrl;
        workElement.appendChild(imageElement);
    
        const textElement = document.createElement("figcaptation");
        textElement.innerHTML = array[i].title;
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
            // Creation d'un tableau avec uniquement les projets de la catégorie clicker    
            let filterWorks = arrayWorks.filter(arrayWorks => arrayWorks.categoryId === i);
            if (i === 0) {filterWorks = arrayWorks}
            // Generation des projets selon filtres
            generateWorks(filterWorks);
          });
        }
 };

// Fonction de réinitialisation des messages d'erreur de login
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

// Fonction de création des eléments de gestion admin
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
    linkEdit();
};

function linkEdit(){

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

    //Creation d'un tableau avec les liens et création du contenu des div
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
export async function editingModal(){

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
    addwork.classList.add("button__addWork");
    addwork.setAttribute("id","modal__addWork");
    addwork.textContent = "Ajouter une photo"
    const deleteGallery = modalContent.appendChild(document.createElement("h2"));
    deleteGallery.classList.add("modal__deleteGallery");
    deleteGallery.textContent = "Supprimer la galerie"

    // Fermer la modal lors d'un click sur la croix
    closeModalXmark();

    //Supression d'un projet
    deleteWorks();

    //Ouvrir la modal d'ajout d'un projet
    windowsAddWorks();
};

// Fonction de suppresion d'un projet
async function deleteWorks(){

    let trashs = document.getElementsByClassName("trash");

    for (let i = 0; i < trashs.length ; i++){
            trashs[i].addEventListener("click", async (e) => {
                e.preventDefault();
                let response = await deleteWork(trashs[i].value);
                if (response.ok) {
                    editingModal();
                    let works = await getWorks();
                    generateWorks(works);
                }
                else{
                    errorDelete(response.status);
                }
            });    
        }
};

// Fonction d'ouverture d'ajout d'un projet
function windowsAddWorks(){
    let addWorks = document.getElementById("modal__addWork");
    addWorks.addEventListener("click", editingModalNewWorks);
};

//Fonction pour editer la modale pour l'ajout de projets
async function editingModalNewWorks(){

    const modalContent = document.getElementById("modal_content");
    modalContent.innerHTML = `
        <button id="modal_back"><i class="fa-solid fa-arrow-left"></i></button>
        <button id="modal_close"><i class="fa-solid fa-xmark"></i></button>
        <h1 id="modal-works__title">Ajouter photo</h1>
        <form class="modal_form" id="addWork" name="addWork">
            <div class="input-img">
                <i class="fa-regular fa-image input-img__icone"></i>
                <label for="input-image" id="input-image__button" class="input-img__button">+ Ajouter photo</label>
                <input type="file" id="input-image" name="image" accept="image/png, image/jpeg">
                <p class="input-img__text">jpg, png: 4mo max</p>
                <img src="#" alt="" id="imagemini">
            </div>
            <div class="input-form">
                <label for="input-title">Titre</label>
                <input type="text" id="input-title">
            </div>
            <div class="input-form">
                <label for="input-categories">Catégorie</label>
                <select id="input-categories"></select>
            </div>
            <div class="modal__bar">
            </div>
            <div>
            <input type="submit" id="addWork-Api" class="button__addWork" disabled value="Valider"></input>
            </div>       
        </form>
        `
    //Gestion du Back
    let backEditWorks = document.getElementById("modal_back");
    backEditWorks.addEventListener("click", editingModal);

    // Fermer la modal lors d'un click sur la croix
    closeModalXmark();

    //Ajout des categories existantes au select et attribution de l'ID en value
    let categories = await getCategories();
    categories.unshift({id: -1, name: "Choisir une catégorie"});
    let categoriesContent = document.getElementById("input-categories");
    for (let i = 0; i < categories.length ; i++){
        let option = categoriesContent.appendChild(document.createElement("option"));
        option.textContent = categories[i].name
        option.setAttribute("value",categories[i].id);
    }

    // Ajout d'un projet
    addWorks();
};

async function addWorks(){

    let form = document.forms["addWork"];
    let formElements = form.elements;
    let addWorksApi = document.getElementById("addWork-Api");
    let imgTitle = document.getElementById("input-title");
    let imgCategory = document.getElementById("input-categories");
    let formData = new FormData();

    // On parcourt les changements du formulaire
    for (let i = 0; i < formElements.length; i++) {
        
        formElements[i].addEventListener("change", (e) => {
            e.preventDefault();
            //Affectation des valeurs au changement
            const imgValue = document.getElementById("input-image").files[0];
            let imgTitleValue = imgTitle.value;
            let imgCategoryValue = imgCategory.value;

            // Remplacer par une miniature au chargement d'une image (Element 0)
            if(i === 0){
            let imagemini = document.getElementById("imagemini");
            let button = document.getElementById("input-image__button");
            let url = URL.createObjectURL(imgValue);
            imagemini.src = url;
            button.style.display = "none";
            }
            
            // Création ou modification du formulaire a poster et activation du bouton valider
            if(imgValue != undefined && imgTitleValue != "" && imgCategoryValue > 0 ){
                addWorksApi.disabled = false;
                formData.set("image", imgValue);
                formData.set("title", imgTitleValue);
                formData.set("category", imgCategoryValue); 
            }
            else{
                addWorksApi.disabled = true;
            }    
        });
    };
    // Post du formulaire et ajout en BBD
    addWorksApi.addEventListener("click", async (e) => {
        e.preventDefault();
        let response = await addWork(formData);
        if (response.ok) {
            editingModal();
            let works = await getWorks();
            generateWorks(works);
                }
        else{
            erroraddWorks(response.status);
            }
    }); 
};