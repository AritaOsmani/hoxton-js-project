const headerEl = document.createElement('header');
const mainEl = document.createElement('main');
const footerEl = document.createElement('footer');

const state = {
    cakes: [],
    selectedItem: ''

}
function getItemsToDisplay() {
    let itemsToDisplay = state.cakes;
    return itemsToDisplay;
}
function renderMain() {
    const pageTitle = document.createElement('h2');
    pageTitle.setAttribute('class', 'page-title');
    pageTitle.textContent = 'Home';

    const cakeContainer = document.createElement('div');
    cakeContainer.setAttribute('class', 'cake-cards-container');
    if (state.selectedItem !== '') {
        renderDetailsPage(state.selectedItem);
    } else {
        renderCardItems(cakeContainer);
        mainEl.append(pageTitle, cakeContainer);
    }
    document.body.append(mainEl);
}
function createCakeCard(cake) {
    const cakeCard = document.createElement('div');
    cakeCard.setAttribute('class', 'cake-card');

    cakeCard.addEventListener('click', () => {
        // renderDetailsPage(cake);
        state.selectedItem = cake;
        render();
    })
    const cakeImg = document.createElement('img');
    cakeImg.setAttribute('src', cake.image);

    const cakeInfoContainer = document.createElement('div');
    cakeInfoContainer.setAttribute('class', 'cake-info');

    const cakeName = document.createElement('h3');
    cakeName.textContent = cake.title;

    const cakePrice = document.createElement('p');
    cakePrice.setAttribute('class', 'price');
    cakePrice.textContent = `${cake.price}€`;

    //Append cakeName and cakePrice to cakeInfoContainer:
    cakeInfoContainer.append(cakeName, cakePrice);

    //Append cakeImg and cakeInfoContainer to cakeCard:
    cakeCard.append(cakeImg, cakeInfoContainer);
    return cakeCard;
}
function renderCardItems(cakeContainer) {
    const itemsToDisplay = getItemsToDisplay();
    for (const item of itemsToDisplay) {

        const cakeCard = createCakeCard(item);

        cakeContainer.append(cakeCard);
    }

}
function getCakesFromServer() {
    return fetch('http://localhost:3000/cakes').then(res => res.json());
}
function renderDetailsPage(cake) {
    mainEl.innerHTML = '';
    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('class', 'main-container');

    const imageAndCommContainer = document.createElement('div');
    imageAndCommContainer.setAttribute('class', 'image-container');

    const cakeImg = document.createElement('img');
    cakeImg.setAttribute('src', cake.image);

    //Add cakeImg to imageAndCommContainer:
    imageAndCommContainer.append(cakeImg);

    const cakeProperties = document.createElement('div');
    cakeProperties.setAttribute('class', 'cake-prop-container');

    const cakeTitle = document.createElement('h1');
    cakeTitle.setAttribute('class', 'title');
    cakeTitle.textContent = cake.title;

    const priceTypeLikeContainer = document.createElement('div');
    priceTypeLikeContainer.setAttribute('class', 'price-type-likes-container');

    const cakePrice = document.createElement('span');
    cakePrice.setAttribute('class', 'cake_price');
    cakePrice.textContent = `${cake.price}€`;

    const cakeType = document.createElement('span');
    cakeType.setAttribute('class', 'cake_type');
    cakeType.textContent = cake.type;

    const likesContainer = document.createElement('div');
    likesContainer.setAttribute('class', 'like-section');

    const heartIcon = document.createElement('i');
    heartIcon.setAttribute('class', 'fas fa-heart');

    heartIcon.addEventListener('click', () => {
        cake.likes++;
        updateCakeItemInServer(cake);
        render();

    })

    const likes = document.createElement('span');
    likes.setAttribute('class', 'cake_likes');
    likes.textContent = `${cake.likes} likes`;

    //Append heartIcon and likes to likesContainer:
    likesContainer.append(heartIcon, likes);

    //Append cakePrice, cakeType and likesContainer to priceTypeLikeContainer:
    priceTypeLikeContainer.append(cakePrice, cakeType, likesContainer);

    const cakeDescription = document.createElement('p');
    cakeDescription.setAttribute('class', 'cake_desc');
    cakeDescription.textContent = 'This delicious 3-tiered chocolate sponge is covered in Belgian chocolate with malt balls and fresh flowers';

    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('class', 'order_btn');
    buttonEl.textContent = 'Order now';

    //Append cakeTitle,  priceTypeLikeContainer, cakeDescription and buttonEl to cakeProperties:
    cakeProperties.append(cakeTitle, priceTypeLikeContainer, cakeDescription, buttonEl);

    //Append imageAndCommContainer and cakeProperties to mainContainer:
    mainContainer.append(imageAndCommContainer, cakeProperties);

    mainEl.setAttribute('class', 'main-class');
    mainEl.append(mainContainer);

}
function render() {
    document.body.innerHTML = '';
    renderMain();
}
function updateCakeItemInServer(cakeItem) {
    fetch(`http://localhost:3000/cakes/${cakeItem.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cakeItem)
    })
}
function init() {
    getCakesFromServer().then(cake => {
        state.cakes = cake
        render();
    });
    // render();

}
init();
