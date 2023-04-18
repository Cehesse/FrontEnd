const urlApi = "http://localhost:5678/api"

// Récupération des categories dans l"API et traitement
export async function getCategories() {
    const promiseCategories = await fetch(`${urlApi}/categories`);
    const arrayCategories = await promiseCategories.json();
    return arrayCategories
};

// Récupération des projets dans l"API
export async function getWorks() {
    const promiseWorks = await fetch(`${urlApi}/works`);
    const arrayWorks = await promiseWorks.json();
    return arrayWorks
};

// Post des identifiants
export async function postLogin(email, password) {
    const promiselogin = await fetch(`${urlApi}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    return promiselogin;
};

// Suppresion d'un projet
export async function deleteWork(idWork) {
    const response = await fetch(`${urlApi}/works/${idWork}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    })
    return response
};

// Ajout d'un projet
export async function addWork(newWork) {
    const response = await fetch(`${urlApi}/works`, {
        method: "POST",
        body: newWork,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    })
    return response
}

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

// Fonction d'affichage des erreurs de supression d'un projet
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

// Fonction d'affichage des erreurs d'envoi d'un projet
export function erroraddWorks(codeApi){
    switch (codeApi) {
        case 400:
            alert("Mauvaise requete");
            break;
        case 401:
            alert("Ajout non autorisée")
            break;
        case 404:
            alert("Erreur inattendu")
            break;
        default:
            alert("Une erreur et survenu contacter l'administrateur du site")
          }
};
