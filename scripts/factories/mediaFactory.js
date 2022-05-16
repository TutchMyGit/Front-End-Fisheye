function mediaFactory(media, myPhotograph) {
    let photographerName = myPhotograph.name.split(' ')[0];
    const imagePath = `assets/images/${photographerName}/${media.image}`
    const videoPath = `assets/images/${photographerName}/${media.video}`

    const blockImg = document.createElement("div");
    const contentMedia = document.getElementById("content-media");

        function createPictureMedia() {
            
            const img = document.createElement("img");
            img.setAttribute("src", imagePath);
            img.setAttribute("alt", media.title);
            img.width = 100;
            img.height = 100;
            const underTitle = document.createElement("p");
            underTitle.setAttribute("class", "imgTitle");
            underTitle.textContent = media.title;
            const likes = document.createElement("p");
            likes.setAttribute("class", "imgLikes");
            const coeur = document.createElement("p");
            coeur.setAttribute("class", "imgCoeur");
            blockImg.appendChild(img);
            blockImg.appendChild(underTitle);
            blockImg.appendChild(likes);
            blockImg.appendChild(coeur);
            contentMedia.appendChild(blockImg);
            return (contentMedia);
        }

        function createVideoMedia() {

            const video = document.createElement("video");
            video.setAttribute("src", videoPath);
            video.setAttribute("alt", media.title);
            video.width = 100;
            video.height = 100;
            const underTitle = document.createElement("p");
            underTitle.setAttribute("class", "videoTitle");
            underTitle.textContent = media.title;
            const likes = document.createElement("p");
            likes.setAttribute("class", "videoLikes");
            const coeur = document.createElement("p");
            coeur.setAttribute("class", "videoCoeur");
            blockImg.appendChild(video);
            blockImg.appendChild(underTitle);
            blockImg.appendChild(likes);
            blockImg.appendChild(coeur);
            contentMedia.appendChild(blockImg);
            return (contentMedia);
        }
    return {createPictureMedia, createVideoMedia};
}