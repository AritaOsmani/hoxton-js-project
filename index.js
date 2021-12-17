const headerEl = document.createElement('header');
const mainEl = document.createElement('main');
const footerEl = document.createElement('footer');

const state = {
    cakes: []
}
function getItemsToDisplay() {
    let itemsToDisplay = state.cakes;
    return itemsToDisplay;
}
function renderMain() {

    const itemsToDisplay = getItemsToDisplay();
    const pageTitle = document.createElement('h2');
    pageTitle.setAttribute('class', 'page-title');
    pageTitle.textContent = 'Home';

    const cakeContainer = document.createElement('div');
    cakeContainer.setAttribute('class', 'cake-cards-container');

    for (const item of itemsToDisplay) {
        const cakeCard = createCakeCard(item);
        //Append cakeCard to cakeContainer:
        cakeContainer.append(cakeCard);
    }


    mainEl.append(pageTitle, cakeContainer);
    document.body.append(mainEl);
}
function createCakeCard(cake) {
    const cakeCard = document.createElement('div');
    cakeCard.setAttribute('class', 'cake-card');

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
function getCakesFromServer() {
    return fetch('http://localhost:3000/cakes').then(res => res.json());
}

function render() {
    document.body.innerHTML = '';
    renderMain();
}
function init() {
    getCakesFromServer().then(cake => {
        state.cakes = cake
        render();
    });
    // render();

}
init();
