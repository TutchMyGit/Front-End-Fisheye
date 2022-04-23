function mediaFactory(media) {

    const { id, photographerId, title, image, video, likes, date, price } = media

    const picture = `assets/photographers/${image}`;

    function createMedia(media) {
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        // const video = document.createElement("video");
        // video.setAttribute("src", video);
        const title = document.createElement("p");
        title.setAttribute("class", "imgTitle");
        const likes = document.createElement("p");
        likes.setAttribute("class", "imgLikes");
        const coeur = document.createElement("p");
        coeur.setAttribute("class", "imgCoeur");
        
    }
}

//pour coeur => utiliser sessionStorage