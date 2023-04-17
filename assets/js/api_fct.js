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

// Suppresion d'un travail
export async function deleteWork(workId) {
    const response = await fetch(`${urlApi}/works/${workId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    })
    return response
};

