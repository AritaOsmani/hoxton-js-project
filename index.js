const headerEl = document.createElement('header');
const mainEl = document.createElement('main');
const footerEl = document.createElement('footer');

const state = {
    cakes: [],
    selectedItem: '',
    showBestSellings: false,
    type: ''
}
function getItemsToDisplay() {
    let itemsToDisplay = state.cakes;

    if (state.showBestSellings) {
        itemsToDisplay = itemsToDisplay.filter(cake => cake.orderNumber > 5)
    }
    itemsToDisplay = itemsToDisplay.filter(cake => cake.type.includes(state.type))

    return itemsToDisplay;
}
function listenToLeftMenuHeader(logoEl, homeLiEl, bestSellingLiEl) {
    logoEl.addEventListener('click', function () {
        state.showBestSellings = false
        state.selectedItem = ''
        state.type = ''
        render()
    })
    homeLiEl.addEventListener('click', function () {
        state.showBestSellings = false
        state.type = ''
        state.selectedItem = ''
        render()
    })
    bestSellingLiEl.addEventListener('click', function () {
        state.showBestSellings = true
        state.selectedItem = ''
        render()
    })
}

function renderHeader() {

    headerEl.innerHTML = '';
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
    selectEl.setAttribute('name', 'filter-by-type')

    const categoryOptionEl = document.createElement('option')
    categoryOptionEl.setAttribute('value', '')
    categoryOptionEl.textContent = 'Category'

    const christmasOption = document.createElement('option')
    christmasOption.setAttribute('value', 'christmas')
    christmasOption.textContent = 'Christmas'
    const birthdaysOption = document.createElement('option')
    birthdaysOption.setAttribute('value', 'birthdays')
    birthdaysOption.textContent = 'Birthdays'
    const weddingsOption = document.createElement('option')
    weddingsOption.setAttribute('value', 'weddings')
    weddingsOption.textContent = 'Weddings'

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
    selectEl.append(categoryOptionEl, christmasOption, birthdaysOption, weddingsOption)
    rightMenuHeaderEl.append(searchLiEl, userLiEl)
    searchLiEl.append(searchButton)
    searchButton.append(searchIconEl)
    userLiEl.append(userButton)
    userButton.append(userIconEl)

    listenToLeftMenuHeader(logoEl, homeLiEl, bestSellingLiEl)

    selectEl.value = state.type

    selectEl.addEventListener('change', function () {
        state.type = selectEl.value
        state.selectedItem = ''
        render()
    })
}
function renderMain() {
    mainEl.innerHTML = ''
    const itemsToDisplay = getItemsToDisplay();
    const pageTitle = document.createElement('h2');
    pageTitle.setAttribute('class', 'page-title');


    if (state.type === '') pageTitle.textContent = 'Home'
    if (state.showBestSellings) pageTitle.textContent = 'Bestsellings'
    if (state.type === 'christmas') pageTitle.textContent = 'Christmas'
    if (state.type === 'birthdays') pageTitle.textContent = 'Birthdays'
    if (state.type === 'weddings') pageTitle.textContent = 'Weddings'
    if (itemsToDisplay.length === 0) pageTitle.textContent = 'Nothing to show!'

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
    cakeDescription.textContent = cake.description;

    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('class', 'order_btn');
    buttonEl.textContent = 'Order now';

    //Append cakeTitle,  priceTypeLikeContainer, cakeDescription and buttonEl to cakeProperties:
    cakeProperties.append(cakeTitle, priceTypeLikeContainer, cakeDescription, buttonEl);

    //Append imageAndCommContainer and cakeProperties to mainContainer:
    mainContainer.append(imageAndCommContainer, cakeProperties);


    mainEl.append(mainContainer);

}
function renderFooter() {

    footerEl.innerHTML = ''
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

}

init();
