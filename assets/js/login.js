// Récupération des fonctions
import {postLogin, errorLogin} from "./api_fct.js";
import {cleanErrorLogin} from "./dom_fct.js";
import {activeLogin, isAdressEmailBackground} from "./base_fct.js";

//Variables
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginForm = document.getElementById("login__form");

//Verifier que le mail est au bon format
email.addEventListener("keyup", (e) => {
    e.preventDefault();
    isAdressEmailBackground(email);
});

//Effacer les messages si une erreur et survenu pour l'essai suivant
email.addEventListener("focus", (e) => {
    e.preventDefault();
    cleanErrorLogin();
});
password.addEventListener("focus", (e) => {
    e.preventDefault();
    cleanErrorLogin();
});

//Connexion de l'utilisateur

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    //Requete de connexion et traitement
    const response = await postLogin(email.value, password.value);
    if (response.ok) {
        const responseArray = await response.json();
        activeLogin(responseArray.userId,responseArray.token, "../index.html");
    }
    else{
        errorLogin(response.status);
    }
});