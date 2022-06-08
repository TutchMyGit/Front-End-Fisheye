function mediaFactory(media, myPhotograph) {
    let photographerName = myPhotograph.name.split(' ')[0];
    const imagePath = `assets/images/${photographerName}/${media.image}`
    const videoPath = `assets/images/${photographerName}/${media.video}`

    const blockImg = document.createElement("div");
    const blockTitle = document.createElement("div");
    const contentMedia = document.getElementById("content-media");
    const blockLike = document.createElement("div");

    contactPhotographer = document.getElementById("contact_photographer");
    contactPhotographer.innerHTML = `Contactez moi <br />${photographerName}`;


        function createPictureMedia() {
            
            const img = document.createElement("img");
            img.setAttribute("src", imagePath);
            img.setAttribute("alt", media.title);
            img.setAttribute("class", "photographerImages");
            img.setAttribute("onclick", `fullScreenPicture(${media.index})`);
            img.dataset.index = media.index;
            const underTitle = document.createElement("p");
            underTitle.setAttribute("class", "imgTitle");
            underTitle.textContent = media.title;
            const like = document.createElement("p");
            like.setAttribute("class", "imgLikes");
            like.textContent = media.likes;
            const coeur = document.createElement("button");
            coeur.setAttribute("class", "imgCoeur");
            coeur.setAttribute('onclick', `changeLikeValue("${media.id}");`)
            blockLike.dataset.id = media.id;
            coeur.innerHTML = `<i class="far fa-heart">`;
            blockImg.appendChild(img);
            blockImg.appendChild(blockTitle);
            blockTitle.appendChild(underTitle);
            blockTitle.appendChild(blockLike);
            blockLike.appendChild(like);
            blockLike.appendChild(coeur);
            blockImg.setAttribute("class", "blockImg");
            blockTitle.setAttribute("class", "blockTitle");
            blockLike.setAttribute("class", "blockLike");
            contentMedia.appendChild(blockImg);
            return (contentMedia);
        }

        function createVideoMedia() {

            const video = document.createElement("video");
            video.setAttribute("src", videoPath);
            video.setAttribute("alt", media.title);
            video.setAttribute("class", "photographerVideos")
            video.setAttribute("onclick", `fullScreenPicture(${media.index})`);
            const underTitle = document.createElement("p");
            underTitle.setAttribute("class", "imgTitle");
            underTitle.textContent = media.title;
            const like = document.createElement("p");
            like.setAttribute("class", "imgLikes");
            like.textContent = media.likes;
            const coeur = document.createElement("button");
            coeur.setAttribute("class", "imgCoeur");
            coeur.setAttribute('onclick', `changeLikeValue("${media.id}");`)
            blockLike.dataset.id = media.id;
            coeur.innerHTML = `<i class="far fa-heart">`;
            blockImg.appendChild(video);
            blockImg.appendChild(blockTitle);
            blockTitle.appendChild(underTitle);
            blockTitle.appendChild(blockLike);
            blockLike.appendChild(like);
            blockLike.appendChild(coeur);
            blockImg.setAttribute("class", "blockImg");
            blockTitle.setAttribute("class", "blockTitle");
            blockLike.setAttribute("class", "blockLike");
            contentMedia.appendChild(blockImg);
            return (contentMedia);
        }

    return {createPictureMedia, createVideoMedia};
}

function createLikesPrice(myPhotograph) {

    const blockTotal = document.createElement('div');
    const displayTotalLike = document.createElement('p');
    const photographerPrice = document.createElement('p');
    blockTotal.setAttribute("id", "blockTotal");
    displayTotalLike.setAttribute("id", "totalLike");
    photographerPrice.setAttribute("id", "totalPrice");
    console.log(totalLike);
    console.log(myPhotograph.price);
    displayTotalLike.innerHTML = `${totalLike} <i class="fas fa-heart"></i>`;
    photographerPrice.textContent = `${myPhotograph.price}€ / jour`;
    blockTotal.appendChild(displayTotalLike);
    blockTotal.appendChild(photographerPrice);
    return (blockTotal);
}