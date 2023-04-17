// Récupération des fonctions
import {getCategories, getWorks} from "./api_fct.js";
import {genererFilters, genererWorks, manageFilters, editingIndex, transformLog} from "./dom_fct.js";
import {logout, openModalWorks} from "./base_fct.js";

//Page index pre login

    // Récupération des categories dans l'API et traitement des doublons potentiel
    let categories = await getCategories();
    categories = categories.map(categories => categories.name);
    categories.unshift("Tous");
    let NewSet = new Set (categories);
    categories = [...NewSet];

    // Récupération des projets dans l'API
    let works = await getWorks();

    //Generation du contenu initial
    genererFilters(categories);
    genererWorks(works);
    let filtres = document.getElementsByClassName("filter");
    filtres[0].setAttribute("id", "filteractif");

    //Gestion des filtres
    manageFilters(filtres, works)

//Page index post login

    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if(token != null && user != null){
        
        //Modifier la page si un utilisateur est connecter et modal
        editingIndex();
        transformLog("logout");

        //Modal des travaux
        let editWorks = document.getElementById("edit-works");
        editWorks.addEventListener("click", openModalWorks);
        
        //Vider la session et refresh au logout
        let log = document.getElementById("logout");
        log.addEventListener("click", () => {
            logout();
        });
    }





