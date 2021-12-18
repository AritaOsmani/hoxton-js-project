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
function renderHeader() {

    const logoEl = document.createElement('img')
    logoEl.setAttribute('class', 'official-logo')
    logoEl.setAttribute('src', 'images/cake-logo.png')
    logoEl.setAttribute('alt', 'Albulena Cakes logo')


    const navEl = document.createElement('nav')
    navEl.setAttribute('class', 'navigation-bar')

    const leftMenuHeaderEl = document.createElement('ul')
    leftMenuHeaderEl.setAttribute('class', 'header-menu')
    const homeLiEl = document.createElement('li')
    homeLiEl.setAttribute('class', 'header-menu__item')
    homeLiEl.textContent = 'Home'

    const bestSellingLiEl = document.createElement('li')
    bestSellingLiEl.setAttribute('class', 'header-menu__item')
    bestSellingLiEl.textContent = 'Bestselling'

    const categoryLiEl = document.createElement('li')
    categoryLiEl.setAttribute('class', 'header-menu__item')

    const selectEl = document.createElement('select')

    const categoryOptionEl = document.createElement('option')
    categoryOptionEl.setAttribute('disabled', 'disabled')
    categoryOptionEl.setAttribute('selected', 'selected')
    categoryOptionEl.textContent = 'Category'

    const exampleOption = document.createElement('option')
    exampleOption.setAttribute('value', '')
    exampleOption.textContent = 'Example'
    const exampleOption2 = document.createElement('option')
    exampleOption2.setAttribute('value', '')
    exampleOption2.textContent = 'Example 2'



    const rightMenuHeaderEl = document.createElement('ul')
    rightMenuHeaderEl.setAttribute('class', 'header-menu')
    const searchLiEl = document.createElement('li')
    searchLiEl.setAttribute('class', 'header-menu__item')

    const searchButton = document.createElement('button')
    const searchIconEl = document.createElement('i')
    searchIconEl.classList.add('fas')
    searchIconEl.classList.add('fa-search')

    const userLiEl = document.createElement('li')
    userLiEl.setAttribute('class', 'header-menu__item')

    const userButton = document.createElement('button')
    const userIconEl = document.createElement('i')
    userIconEl.classList.add('fas')
    userIconEl.classList.add('fa-user')

    document.body.append(headerEl)
    headerEl.append(logoEl, navEl)
    navEl.append(leftMenuHeaderEl, rightMenuHeaderEl)
    leftMenuHeaderEl.append(homeLiEl, bestSellingLiEl, categoryLiEl)
    categoryLiEl.append(selectEl)
    selectEl.append(categoryOptionEl, exampleOption, exampleOption2)
    rightMenuHeaderEl.append(searchLiEl, userLiEl)
    searchLiEl.append(searchButton)
    searchButton.append(searchIconEl)
    userLiEl.append(userButton)
    userButton.append(userIconEl)
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
function renderFooter() {

    const logoTitleEl = document.createElement('h2')
    logoTitleEl.setAttribute('class', 'logo-title')
    logoTitleEl.textContent = 'Albulena Cakes'

    const socialMediaEl = document.createElement('div')
    socialMediaEl.setAttribute('class', 'social-media')

    const pEl = document.createElement('p')
    pEl.textContent = 'Contact Us:'

    const facebookTagEl = document.createElement('a')
    facebookTagEl.setAttribute('href', 'https://www.facebook.com/albulena.cakes/')
    facebookTagEl.setAttribute('target', '_blank')
    facebookTagEl.textContent = 'Facebook'
    const fbImageEl = document.createElement('img')
    fbImageEl.setAttribute('src', 'images/facebook.svg')
    fbImageEl.setAttribute('alt', 'facebook-logo')

    const instagramTagEl = document.createElement('a')
    instagramTagEl.setAttribute('href', 'https://www.instagram.com/albulena.cakes/')
    instagramTagEl.setAttribute('target', '_blank')
    instagramTagEl.textContent = 'Instagram'
    const inImageEl = document.createElement('img')
    inImageEl.setAttribute('src', 'images/instagram.svg')
    inImageEl.setAttribute('alt', 'instagram-logo')

    document.body.append(footerEl)
    footerEl.append(logoTitleEl, socialMediaEl)
    socialMediaEl.append(pEl, facebookTagEl, instagramTagEl)
    facebookTagEl.append(fbImageEl)
    instagramTagEl.append(inImageEl)

}
function render() {
    document.body.innerHTML = '';
    renderHeader()
    renderMain()
    renderFooter()
}
function init() {
    getCakesFromServer().then(cake => {
        state.cakes = cake
        render();
    });
    // render();

}
function test() {
    console.log('Test');
}

init();
