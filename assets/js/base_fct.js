// Récupération des fonctions
import {transformLog, editingModal} from "./dom_fct.js";
    
// Stockage de l'utilisateur et redirection sur une page
export function activeLogin(User, Token, Page) {
    sessionStorage.setItem("user", User);
    sessionStorage.setItem("token", Token);
    window.location.replace(Page);
};

// Vidange de la session et changement du texte du log
export function logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    transformLog("login");
};

// Adresse mail valide
function isAdressEmail(mail){
    var mailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    return mailReg.test(mail);
};

// Backgroud color selon format du mail valide ou non
export function isAdressEmailBackground(email){
    if (isAdressEmail(email.value)){
        email.style.background = "#BCF1A7";
    }
    else{
        email.style.background = "#E47C48";
    }
};