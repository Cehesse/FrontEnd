// Récupération des fonctions
import {postLogin} from "./api_fct.js";
import {errorLogin,cleanErrorLogin} from "./dom_fct.js";
import {activeLogin, validateEmail} from "./base_fct.js";

//Verifier que le mail est au bon format
let email = document.getElementById("email");
let password = document.getElementById("password");
email.addEventListener("keyup", (event) => {
    validateEmail(email);
});

//Effacer les messages si une erreur et survenu pour l'essai suivant
email.addEventListener("focus", (event) => {
    cleanErrorLogin();
});
password.addEventListener("focus", (event) => {
    cleanErrorLogin();
});

//Connexion

const loginForm = document.getElementById("login__form");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    //Récuperer le mail et le mot de passe saisie
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    //Requete API et traitement
    let response = await postLogin(email.value, password.value);

    if (response.ok) {
        let responseArray = await response.json();
        activeLogin(responseArray.userId,responseArray.token, "../index.html");
    }
    else{
        errorLogin(response.status);
    }
});

