const headerEl = document.createElement('header');
const mainEl = document.createElement('main');
const footerEl = document.createElement('footer');

const state = {
    cakes: [],
    selectedItem: '',
    modal: ''
}
function getItemsToDisplay() {
    let itemsToDisplay = state.cakes;
    return itemsToDisplay;
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
    mainEl.innerHTML = ''
    const itemsToDisplay = getItemsToDisplay();
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
    cakeDescription.textContent = cake.description;

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
function renderSignInModal() {
    // <div class="modal-wrapper">
    //     <div class="sign-in-modal">
    //         <button class="close-btn">X</button>
    //         <h3 class="modal-title">Sign In</h3>
    //         <form class="sign-in-form" action="">
    //             <label for="">
    //                 Email
    //                 <input type="email">
    //             </label>
    //             <label for="">
    //                 Password
    //                 <input type="password" name="" id="">
    //             </label>
    //             <button class="sign-in-btn" type="submit">Sign in</button>
    //         </form>
    //         <div class="register-container">
    //             <span class="no-acc">Don't have an account?</span>
    //             <span class="register">Register now</span>
    //         </div>

    //     </div>
    // </div>
    const modalWrapper = document.createElement('div');
    modalWrapper.setAttribute('class', 'modal-wrapper');

    const modal = document.createElement('div');
    modal.setAttribute('class', 'sign-in-modal');

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('class', 'close-btn');
    closeBtn.textContent = 'X';

    const modalTitle = document.createElement('h3');
    modalTitle.setAttribute('class', 'modal-title');
    modalTitle.textContent = 'Sign In';

    const formEl = document.createElement('form');
    formEl.setAttribute('class', 'sign-in-form');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';

    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');

    //Append emailInput to emailLabel:
    emailLabel.append(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';

    const passwordInput = document.createElement('input');



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
