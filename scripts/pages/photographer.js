let myPhotograph = {};
let mediaAll = [];

async function getPhotographers(id) {
       return fetch("/data/photographers.json")
       .then(response => {
            if(!response.ok) {
                throw new Error("HTTP error " + response.status);     // throw = arrêt de la function et va directement a catch
            }
            return response.json();
        })
        .then(photographer => {
            let arrayPhotograph = photographer.photographers;

            arrayPhotograph.forEach(element => {
                if (element.id == id) { myPhotograph = element;}
            });
            return ({photographers: [...photographer.photographers]});
        })
        .catch(() => {
            return true;
        })
};

async function getMedia(id) {
    return fetch("/data/photographers.json")
    .then(response => {
        if(!response.ok) {
            throw new Error("HTTP error " + response.status);     // throw = arrêt de la function et va directement a catch
        }
        return response.json();
    })
    .then(medias => {

        let arrayMedia = medias.media;

        arrayMedia.forEach(element => {
            if (element.photographerId == id) {
                mediaAll.push(element);
            }
        });
        return ({media: [...medias.media]});
    })
    .catch(() => {
        return true;
    })
};

function displayData() {
    const photographHeader = document.getElementById("photograph-header");

    const photographProfil = photographerFactory(myPhotograph);
    const userCardDOM = photographProfil.createPhotographerProfil();
    photographHeader.appendChild(userCardDOM);
};

function launchingMediaFactory() {
    const main = document.getElementById("main");

    mediaAll.forEach((media) => {
        if(media.image) {
            const mediaLaunch = mediaFactory(media, myPhotograph)
            const mediaImage = mediaLaunch.createPictureMedia();
            main.appendChild(mediaImage);
        }
        if(media.video) {
            const mediaLaunch = mediaFactory(media, myPhotograph)
            const mediaVideo = mediaLaunch.createVideoMedia();
            main.appendChild(mediaVideo);
        }
    })
};

function createDropdown() {
    const main = document.getElementById("main");
    const labelDropdown = document.createElement("label");
    labelDropdown.setAttribute("for", "dropdown");
    labelDropdown.innerText= "Trier par";
    const dropBtn = document.createElement("select");
    dropBtn.setAttribute("id", "dropBtn");
    const dropdownContent = document.createElement("div");
    dropdownContent.setAttribute("id", "dropdownContent");
    labelDropdown.appendChild(dropBtn);

    const array = [`Popularité`, `Date`, `Titre`];
    
    array.forEach(element => {
        const dropdownLink = document.createElement("option");
        dropdownLink.innerText= element;
        dropBtn.appendChild(dropdownLink);
    });
    
    main.appendChild(labelDropdown);
};

async function init() {
    const params = new URL(document.location).searchParams;
    const urlId = parseInt(params.get('id'));
    const { photographers } = await getPhotographers(urlId);
    const { media } = await getMedia(urlId);
    displayData(photographers);
    createDropdown();
    launchingMediaFactory(media);
};

init();