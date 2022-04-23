function photographerFactory(data) {
    
    console.log("launching factory");
    const { name, city, country, tagline, price, portrait, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const url = `./photographer.html?id=${id}`;
    const location = document.createElement( 'p' );
    const taglines = document.createElement( 'p' );
    const img = document.createElement( 'img' );

        function createPhotographerProfil() {
            const contactButton = document.getElementById("contact_button");
            const parentDiv = contactButton.parentNode;
            const photographerProfil = document.createElement("div");
            photographerProfil.setAttribute("id", "photographerProfil");
            const h1 = document.createElement( "h1" );
            const block = document.createElement( "div" );
            h1.textContent = name;
            h1.setAttribute("id", "photographerName");
            location.textContent = `${city}, ${country}`;
            location.setAttribute("id", "photographerLocation");
            taglines.textContent = tagline;
            taglines.setAttribute("id", "photographerTagline");
            img.setAttribute("src", picture);
            img.setAttribute("alt", name);
            img.setAttribute("class", "imgProfilPhotographer");
            block.appendChild(h1);
            block.appendChild(location);
            block.appendChild(taglines);
            photographerProfil.appendChild(block);
            photographerProfil.appendChild(contactButton);
            photographerProfil.appendChild(img);

            return (photographerProfil);
        }

        function getUserCardDOM() {
            const article = document.createElement( 'article' );
            article.setAttribute("class", "articleHomePage");
            img.setAttribute("src", picture);
            img.setAttribute("alt", name);
            img.setAttribute("class", "imgProfilPhotographer");
            location.setAttribute("class", "locationHomePage");
            taglines.setAttribute("class", "taglinesHomePage");
            const prices = document.createElement( 'p' );
            prices.setAttribute("class", "pricesHomePage");
            const link = document.createElement('a');
            link.setAttribute("class", "linkHomePage");
            link.setAttribute("href", url);
            link.setAttribute("aria-label", `Admirez plus de photos de ${name}.`)
            console.log(link);
            const h2 = document.createElement( 'h2' );
            h2.textContent = name;
            location.textContent = `${city}, ${country}`;
            taglines.textContent = tagline;
            prices.textContent = `${price}€/jour`;
            article.appendChild(link);
            link.appendChild(img);
            link.appendChild(h2);
            article.appendChild(location);
            article.appendChild(taglines);
            article.appendChild(prices);
            return (article);
        }
        return { name, city, country, tagline, price, picture, id, getUserCardDOM, createPhotographerProfil }
}