let myPhotograph = {};
let mediaAll = [];
const main = document.getElementById("main");
let totalLike = 0;

async function getPhotographers(id) {
       return fetch("data/photographers.json")
       .then(response => {
            if(!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(photographer => {
            let arrayPhotograph = photographer.photographers;

            arrayPhotograph.forEach(element => {
                if (element.id == id) { myPhotograph = element;}
            });
            console.table(myPhotograph)
            return ({photographers: [...photographer.photographers]});
        })
        .catch(() => {
            return true;
        })
};

async function getMedia(id) {
    return fetch("data/photographers.json")
    .then(response => {
        if(!response.ok) {
            throw new Error("HTTP error " + response.status);
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
    
    document.getElementById("content-media").innerHTML=" ";
    for(let i=0; i<mediaAll.length; i++) {
        mediaAll[i].index=i;
        if(mediaAll[i].image) {
            const mediaLaunch = mediaFactory(mediaAll[i], myPhotograph)
            const mediaImage = mediaLaunch.createPictureMedia();
            main.appendChild(mediaImage);
        }
        if(mediaAll[i].video) {
            const mediaLaunch = mediaFactory(mediaAll[i], myPhotograph)
            const mediaVideo = mediaLaunch.createVideoMedia();
            main.appendChild(mediaVideo);
        }
    }
    console.table(mediaAll)
};

function createDropdown() {
    const main = document.getElementById("main");
    const labelDropdown = document.createElement("label");
    labelDropdown.setAttribute("for", "dropdown");
    labelDropdown.innerText= "Trier par";
    const dropBtn = document.createElement("select");
    dropBtn.setAttribute("id", "dropBtn");
    dropBtn.setAttribute("aria-label", "Order by Popularity");
    const dropdownContent = document.createElement("div");
    dropdownContent.setAttribute("id", "dropdownContent");
    labelDropdown.appendChild(dropBtn);

    const array = [`Popularité`, `Date`, `Titre`];
    
    array.forEach(element => {
        const dropdownLink = document.createElement("option");
        dropdownLink.innerText= element;
        dropdownLink.setAttribute("value", element)
        dropBtn.appendChild(dropdownLink);
    });
    
    main.appendChild(labelDropdown);
    document.getElementById("dropBtn").addEventListener('change', (event) =>{
        if(event.target.value=="Popularité") {
            sortByPopularity()
            dropBtn.setAttribute("aria-label", "Order by Popularity");
        } else if(event.target.value=="Date") {
            sortByDate()
            dropBtn.setAttribute("aria-label", "Order by Date");
        } else if(event.target.value=="Titre") {
            sortByTitle()
            dropBtn.setAttribute("aria-label", "Order by Title");
        }
    })
};

function changeLikeValue(id) {

    let likeValue = document.querySelector(`[data-id="${id}"] p`);
    const i = document.querySelector(`[data-id="${id}"] i`)

    if(i.classList.contains("far")) {
        i.classList.remove("far")
        i.classList.add("fas")
        mediaAll.forEach(media =>{
            if(media.id==id){
                media.likes++
                likeValue.innerText=media.likes
            }
        })
    } else {
        i.classList.remove("fas")
        i.classList.add("far")
        mediaAll.forEach(media =>{
            if(media.id==id){
                media.likes--
                likeValue.innerText=media.likes  
            }
        })
    }
    totalLikes();
}

function totalLikes() {
    totalLike = 0;
    mediaAll.forEach(media =>{
        totalLike+=media.likes;
    })
    console.log(totalLike)
    let launchdisplay = createLikesPrice(myPhotograph);
    main.appendChild(launchdisplay);
}

function fullScreenPicture() {
    console.log("hey")

}

function sortByPopularity() {
    mediaAll.sort((a,b)=>{
        return a.likes - b.likes
    })
    .reverse()
    launchingMediaFactory();
}

function sortByDate() {
    mediaAll.sort((a,b)=>{
        return new Date(a.date).valueOf()-new Date(b.date).valueOf()
    })
    .reverse()
    launchingMediaFactory();
}

function sortByTitle() {
    mediaAll.sort((a,b)=>{
        if(a.title > b.title) {
            return 1;
        } else if(a.title < b.title) {
            return -1;
        } else {
            return 0;
        }
    })
    launchingMediaFactory();
}

function fullScreenPicture(indexMedia) {
    let index = indexMedia;
    document.getElementById("backgroundFullPicture").style.display = "flex";
    document.getElementById("main").style.display = "none";

    let media = mediaAll[index];
    const titleFullPicture = document.getElementById("titleFullPicture");
    titleFullPicture.innerHTML = media.title;
    let imagePath = `assets/images/${myPhotograph.name.split(' ')[0]}/${media.image}`
    let videoPath = `assets/images/${myPhotograph.name.split(' ')[0]}/${media.video}`
    images = document.getElementById("imagesFullPicture")
    videos = document.getElementById("videosFullPicture")

    if(media.image){
        images.setAttribute("src", imagePath);
        images.setAttribute("aria-label", media.title);
        images.setAttribute("alt", media.title);
        videos.style.display = "none";
        images.style.display = "block";
        
    } else if(media.video){
        videos.setAttribute("src", videoPath);
        videos.setAttribute("aria-label", media.title);
        videos.setAttribute("alt", media.title);
        images.style.display = "none";
        videos.style.display = "block";
    }

    function nextSlide() {
        index++
        if(index===mediaAll.length-1){
            index=0;
        }
        media = mediaAll[index]
        titleFullPicture.innerHTML = media.title;
        imagePath = `assets/images/${myPhotograph.name.split(' ')[0]}/${media.image}`
        videoPath = `assets/images/${myPhotograph.name.split(' ')[0]}/${media.video}`
            if(media.image){
                images.setAttribute("src", imagePath);
                images.setAttribute("aria-label", media.title)
                videos.style.display = "none";
                images.style.display = "block";
                
            } else if(media.video){
                videos.setAttribute("src", videoPath);
                videos.setAttribute("aria-label", media.title)
                images.style.display = "none";
                videos.style.display = "block";
            }
    }

    function previousSlide() {
        index--
        if(index===-1){
            index=mediaAll.length-1;
        }
        media = mediaAll[index]
        titleFullPicture.innerHTML = media.title;
        imagePath = `assets/images/${myPhotograph.name.split(' ')[0]}/${media.image}`
        videoPath = `assets/images/${myPhotograph.name.split(' ')[0]}/${media.video}`
            if(media.image){
                images.setAttribute("src", imagePath);
                images.setAttribute("aria-label", media.title)
                videos.style.display = "none";
                images.style.display = "block";
                
            } else if(media.video){
                videos.setAttribute("src", videoPath);
                videos.setAttribute("aria-label", media.title)
                images.style.display = "none";
                videos.style.display = "block";
            }
    }

    const chevronRight = document.querySelector(".fa-chevron-right");
    chevronRight.addEventListener("click", function(){
        nextSlide();
    })

    const chevronLeft = document.querySelector(".fa-chevron-left");
    chevronLeft.addEventListener("click", function(){
        previousSlide();
    })
    document.body.addEventListener("keydown", function(event) {
        if(event.code === "ArrowRight") {
            nextSlide();
        } else if(event.code === "ArrowLeft") {
            previousSlide();
        } else if(event.code === "Escape") {
            closeFullDisplay();
        }
    })
}

function closeFullDisplay() {
    document.getElementById("backgroundFullPicture").style.display = "none";
    document.getElementById("main").style.display = "block";
}

function auto_height(elem) {
    elem.style.height = "120px";
    elem.style.height = (elem.scrollHeight)+"px";
}

function getDataContact(event) {
    event.preventDefault();

    let firstName = document.getElementById("first_name").value;
    let lastName = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    console.log(`Prénom : ${firstName} ; Nom : ${lastName} ; Email : ${email} ; Message : ${message}`);
    closeModal();
}

async function init() {
    const params = new URL(document.location).searchParams;
    const urlId = parseInt(params.get('id'));
    const { photographers } = await getPhotographers(urlId);
    const { media } = await getMedia(urlId);
    displayData(photographers);
    createDropdown();
    sortByPopularity();
    totalLikes();
};

init();