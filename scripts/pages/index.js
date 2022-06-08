    async function getPhotographers() {

           return fetch("data/photographers.json")
           .then(response => {
                if(!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(photograph => {
                console.log(photograph.photographers)
                return ({photographers: [...photograph.photographers]});
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
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init();