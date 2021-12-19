const headerEl = document.createElement('header');
const mainEl = document.createElement('main');
const footerEl = document.createElement('footer');

const state = {
    cakes: [],
    selectedItem: '',
    modal: '',
    search: '',
    showBestSellings: false,
    type: ''
}
function getItemsToDisplay() {
    let itemsToDisplay = state.cakes;

    if (state.showBestSellings) {
        itemsToDisplay = itemsToDisplay.filter(cake => cake.orderNumber > 5)
    }
    itemsToDisplay = itemsToDisplay.filter(cake => cake.type.includes(state.type))

    if (state.search !== '') itemsToDisplay = itemsToDisplay.filter(cake => cake.title.toUpperCase().includes(state.search.toUpperCase()))

    return itemsToDisplay;
}
function listenToLeftMenuHeader(logoEl, homeLiEl, bestSellingLiEl) {
    logoEl.addEventListener('click', function () {
        state.showBestSellings = false
        state.selectedItem = ''
        state.type = ''
        state.search = ''
        render()
    })
    homeLiEl.addEventListener('click', function () {
        state.showBestSellings = false
        state.type = ''
        state.selectedItem = ''
        state.search = ''
        render()
    })
    bestSellingLiEl.addEventListener('click', function () {
        state.showBestSellings = true
        state.type = ''
        state.selectedItem = ''
        state.search = ''
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
    searchButton.addEventListener('click', function () {
        state.modal = 'search'
        render()
    })

    const userLiEl = document.createElement('li')
    userLiEl.setAttribute('class', 'header-menu__item')

    const userButton = document.createElement('button')
    const userIconEl = document.createElement('i')
    userIconEl.classList.add('fas')
    userIconEl.classList.add('fa-user')

    userButton.addEventListener('click', () => {
        state.modal = 'signIn';
        render();
    })

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

    const searchMessageh4 = document.createElement('h4')
    searchMessageh4.setAttribute('class', 'search-message-title');


    if (state.type === '') pageTitle.textContent = 'Home'
    if (state.showBestSellings) pageTitle.textContent = 'Bestsellings'
    if (state.type === 'christmas') pageTitle.textContent = 'Christmas'
    if (state.type === 'birthdays') pageTitle.textContent = 'Birthdays'
    if (state.type === 'weddings') pageTitle.textContent = 'Weddings'
    if (itemsToDisplay.length === 0) pageTitle.textContent = 'Nothing to show!'
    if (state.search !== '') {
        searchMessageh4.textContent = `You are searching for: ${state.search}`
        mainEl.prepend(searchMessageh4)
    }

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
    renderModals();
}
function renderSearchModal() {
    const modal = document.createElement('div')
    modal.setAttribute('class', 'search-modal')

    modal.addEventListener('click', function (event) {
        event.stopPropagation()
    })

    const closeBtn = document.createElement('button')

    modalWrapperElements(modal, closeBtn)

    const modalTitle = document.createElement('h3')
    modalTitle.setAttribute('class', 'modal-title')
    modalTitle.textContent = 'Search'

    const searchForm = document.createElement('form')

    const searchLabel = document.createElement('label');
    searchLabel.setAttribute('for', 'search');
    searchLabel.textContent = 'Search cakes by name: ';

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('id', 'search');
    searchInput.setAttribute('name', 'search');

    searchForm.addEventListener('submit', function (event) {

        event.preventDefault()

        state.search = searchForm.search.value

        state.modal = ''

        render()
    })
    modal.append(closeBtn, modalTitle, searchForm)
    searchForm.append(searchLabel, searchInput)
}
function renderSignInModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'sign-in-modal');
    modal.addEventListener('click', function (event) {
        event.stopPropagation()
    })

    const closeBtn = document.createElement('button');


    modalWrapperElements(modal, closeBtn);
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
    passwordInput.setAttribute('type', 'password');

    //Append passwordInput to passwordLabel:
    passwordLabel.append(passwordInput);

    const signInBtn = document.createElement('button');
    signInBtn.setAttribute('class', 'sign-in-btn');
    signInBtn.setAttribute('type', 'submit');
    signInBtn.textContent = 'Sign In';

    //Append emailLabel, passwordLabel and signInBtn to formEl:
    formEl.append(emailLabel, passwordLabel, signInBtn);

    const registerContainer = document.createElement('div');
    registerContainer.setAttribute('class', 'register-container');

    const noAccSpan = document.createElement('span');
    noAccSpan.setAttribute('class', 'no-acc');
    noAccSpan.textContent = `Don't have an account?`;

    const registerSpan = document.createElement('span');
    registerSpan.setAttribute('class', 'register');
    registerSpan.textContent = 'Register now';

    //Append noAccSpan and registerSpan to registerContainer:
    registerContainer.append(noAccSpan, registerSpan);

    modal.append(closeBtn, modalTitle, formEl, registerContainer);
}
function renderRegisterModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'register-modal');

    const closeBtn = document.createElement('button');
    modalWrapperElements(modal, closeBtn);

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Register';

    const formEl = document.createElement('form');
    formEl.setAttribute('class', 'register-form');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');

    //Append nameInput to nameLabel:
    nameLabel.append(nameInput);

    const surnameLabel = document.createElement('label');
    surnameLabel.textContent = 'Surname';

    const surnameInput = document.createElement('input');
    surnameInput.setAttribute('type', 'text');

    //Append surnameInput to surnameLabel:
    surnameLabel.append(surnameInput);

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';

    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');

    //Append emailInput to emailLabel:
    emailLabel.append(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');

    //Append passwordInput to passwordLabel:
    passwordLabel.append(passwordInput);

    const confirmPassLabel = document.createElement('label');
    confirmPassLabel.textContent = 'Confirm Password';

    const confirmPassInput = document.createElement('input');
    confirmPassInput.setAttribute('type', 'password');

    //Append confirmPassInput to confirmPassLabel:
    confirmPassLabel.append(confirmPassInput);

    const createAccBtn = document.createElement('button');
    createAccBtn.setAttribute('class', 'register-btn');
    createAccBtn.setAttribute('type', 'submit');
    createAccBtn.textContent = 'Create account';

    formEl.append(nameLabel, surnameLabel, emailLabel, passwordLabel, confirmPassLabel, createAccBtn);
    modal.append(closeBtn, modalTitle, formEl);
}

function modalWrapperElements(modal, closeBtn) {
    const modalWrapper = document.createElement('div');
    modalWrapper.setAttribute('class', 'modal-wrapper');
    closeBtn.setAttribute('class', 'close-btn');
    closeBtn.textContent = 'X';

    modalWrapper.addEventListener('click', function () {
        state.modal = ''
        render()
    })

    closeBtn.addEventListener('click', () => {
        state.modal = '';
        render();
    })
    modalWrapper.append(modal);
    mainEl.append(modalWrapper);
}
function renderModals() {
    if (state.modal === 'signIn') {
        renderSignInModal();
    }
    if (state.modal === 'search') {
        renderSearchModal()
    }
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
