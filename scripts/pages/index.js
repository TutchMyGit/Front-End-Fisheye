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

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();