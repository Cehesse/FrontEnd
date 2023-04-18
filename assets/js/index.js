// Récupération des fonctions
import {getWorks} from "./api_fct.js";
import {generateFilters, generateWorks, manageFilters, editingIndex, transformLog} from "./dom_fct.js";
import {logout} from "./base_fct.js";
import {openModalWorks} from "./modal_fct.js";

//Page index pre login

    // Récupération des projets dans l'API
    const works = await getWorks();

    //Création du tableau des filtres
    let categories = works.map(works => works.category);
    categories = categories.map(categories => categories.name);
    categories.unshift("Tous");
    let NewSet = new Set (categories);
    categories = [...NewSet];

    //Generation du contenu initial
    generateFilters(categories);
    generateWorks(works);

    //Coloration du filtre initial
    const filtres = document.getElementsByClassName("filter");
    filtres[0].setAttribute("id", "filteractif");

    //Gestion des filtres
    manageFilters(filtres, works)

//Page index post login

    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if(token != null && user != null){
        
        //Modifier la page si un utilisateur est connecter
        editingIndex();
        transformLog("logout");

        //Modal des travaux [m3]
        let editWorks = document.getElementById("edit-works");
        editWorks.addEventListener("click", openModalWorks);
        
        //Vider la session et refresh au logout
        let log = document.getElementById("logout");
        log.addEventListener("click", () => {
            logout();
        });
    };