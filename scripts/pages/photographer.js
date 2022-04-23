async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

       return fetch("/data/photographers.json")
       .then(response => {
            if(!response.ok) {
                throw new Error("HTTP error " + response.status);     // throw = arrêt de la function et va directement a catch
            }
            return response.json();
        })
        .then(debilus => {
            console.log(debilus.photographers)
            return ({photographers: [...debilus.photographers]});
        })
        .catch(() => {
            return true;
        })
};

async function getMedia() {

    return fetch("/data/photographers.json")
    .then(response => {
        if(!response.ok) {
            throw new Error("HTTP error " + response.status);     // throw = arrêt de la function et va directement a catch
        }
        return response.json();
    })
    .then(abc => {
        console.log(abc.media)
        return ({medias: [...abc.media]});
    })
    .catch(() => {
        return true;
    })
}

async function displayData(photographers) {
    let params = new URL(document.location).searchParams;
             let urlId = parseInt(params.get('id'))

    const photographHeader = document.getElementById("photograph-header");
    
    photographers.forEach((photographer) => {
        if (photographer.id == urlId) {
            const photographProfil = photographerFactory(photographer);
            const userCardDOM = photographProfil.createPhotographerProfil();
            photographHeader.appendChild(userCardDOM);
        }});
};

async function createMedia(medias) {
    let params = new URL(document.location).searchParams;
        let urlId = parseInt(params.get('id'))

    const photographHeader = document.getElementById("photograph-header");
    console.log("testing first step")
    
    medias.forEach((media) => {
        if(media.photographerId == urlId) {
        console.log("second step")
        if(media.image) {
            console.log(media)
        }
        if(media.video) {
            console.log(media.video)
        }
    }})
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { medias } = await getMedia();
    displayData(photographers);
    createMedia(medias);
};

init();