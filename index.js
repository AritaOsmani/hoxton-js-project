const headerEl = document.createElement('header');
const mainEl = document.createElement('main');
const footerEl = document.createElement('footer');

const state = {
    cakes: [],
    selectedItem: '',
    modal: '',
    search: '',
    showBestSellings: false,
    type: '',
    user: null,
    userExists: false,
    showOrderSection: false
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
        state.showOrderSection = false
        state.selectedItem = ''
        state.type = ''
        state.search = ''
        render()
    })
    homeLiEl.addEventListener('click', function () {
        state.showBestSellings = false
        state.showOrderSection = false
        state.type = ''
        state.selectedItem = ''
        state.search = ''
        render()
    })
    bestSellingLiEl.addEventListener('click', function () {
        state.showBestSellings = true
        state.showOrderSection = false
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
        if (state.user !== null) {
            state.modal = 'greeting';
        } else {
            state.modal = 'signIn';
        }

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


    if (state.selectedItem !== '' && state.showOrderSection) renderOrderProduct(state.selectedItem)
    else if (state.selectedItem !== '') {

        renderDetailsPage(state.selectedItem);
    }
    else {
        renderCardItems(cakeContainer);
        mainEl.append(pageTitle, cakeContainer);
    }

    document.body.append(mainEl);
}
function renderOrderProduct(cake) {
    mainEl.innerHTML = ''
    const orderInformationSection = document.createElement('section')
    orderInformationSection.setAttribute('class', 'order-information')

    const orderInfo = document.createElement('div')
    orderInfo.setAttribute('class', 'order-info')

    const cardInfo = document.createElement('div')
    cardInfo.setAttribute('class', 'card-info')

    const cardInfoTitle = document.createElement('h3')
    cardInfoTitle.setAttribute('class', 'order-information__title')
    cardInfoTitle.textContent = 'Shopping Cart.'

    const cardListProductUlEl = document.createElement('ul')
    cardListProductUlEl.classList.add('card-info__product')

    const productLi = document.createElement('li')
    productLi.classList.add('product-span')
    const productImageEl = document.createElement('img')
    productImageEl.setAttribute('src', cake.image)
    productImageEl.setAttribute('alt', cake.title)
    const cakeSpanEl = document.createElement('span')
    cakeSpanEl.textContent = cake.title
    const buttonLi = document.createElement('li')

    const decreaseButton = document.createElement('button')
    decreaseButton.setAttribute('class', 'product-button')
    decreaseButton.textContent = '-'

    const quantitySpanEl = document.createElement('span')
    quantitySpanEl.textContent = ' 0 '

    const increaseButton = document.createElement('button')
    increaseButton.setAttribute('class', 'product-button')
    increaseButton.textContent = '+'

    const priceLi = document.createElement('li')
    priceLi.textContent = `${cake.price} €`

    const orderInfoTitle = document.createElement('h3')
    orderInfoTitle.setAttribute('class', 'order-information__title')
    orderInfoTitle.textContent = 'Shipping Information.'

    const shippingForm = document.createElement('form')
    shippingForm.setAttribute('class', 'shipping-form')

    const labelName = document.createElement('label')
    labelName.setAttribute('for', 'name')
    labelName.textContent = 'Name: '
    const inputName = document.createElement('input')
    inputName.setAttribute('id', 'name')
    inputName.setAttribute('type', 'name')
    inputName.setAttribute('required', 'required')

    const labelSurname = document.createElement('label')
    labelSurname.setAttribute('for', 'surname')
    labelSurname.textContent = 'Surname: '
    const inputSurname = document.createElement('input')
    inputSurname.setAttribute('id', 'surname')
    inputSurname.setAttribute('type', 'surname')
    inputSurname.setAttribute('required', 'required')

    const labelCity = document.createElement('label')
    labelCity.setAttribute('for', 'city')
    labelCity.textContent = 'City: '
    const inputCity = document.createElement('input')
    inputCity.setAttribute('id', 'city')
    inputCity.setAttribute('type', 'text')
    inputCity.setAttribute('required', 'required')

    const labelTel = document.createElement('label')
    labelTel.setAttribute('for', 'tel')
    labelTel.textContent = 'Tel: '
    const inputTel = document.createElement('input')
    inputTel.setAttribute('id', 'tel')
    inputTel.setAttribute('type', 'tel')
    inputTel.setAttribute('required', 'required')

    const labelAddress = document.createElement('label')
    labelAddress.setAttribute('for', 'street')
    labelAddress.textContent = 'Street Address: '
    const inputAddress = document.createElement('input')
    inputAddress.setAttribute('id', 'street')
    inputAddress.setAttribute('type', 'street')
    inputAddress.setAttribute('required', 'required')

    const labelDateAndTime = document.createElement('label')
    labelDateAndTime.setAttribute('for', 'dateAndTime')
    labelDateAndTime.textContent = 'Choose when your cake to arrive: '
    const inputDateAndTime = document.createElement('input')
    inputDateAndTime.setAttribute('id', 'dateAndTime')
    inputDateAndTime.setAttribute('type', 'datetime-local')
    inputDateAndTime.setAttribute('required', 'required')

    const submitInput = document.createElement('input')
    submitInput.setAttribute('class', 'submit-button')
    submitInput.setAttribute('type', 'submit')

    const paymentInfo = document.createElement('div')
    paymentInfo.setAttribute('class', 'payment-info')

    const paymentTitle = document.createElement('h3')
    paymentTitle.textContent = 'Payment Info.'

    const paymentForm = document.createElement('form')

    const visaImageEl = document.createElement('img')
    visaImageEl.setAttribute('src', 'http://assets.stickpng.com/thumbs/58482363cef1014c0b5e49c1.png')
    visaImageEl.setAttribute('alt', '')
    visaImageEl.setAttribute('class', 'visa-logo')

    const labelNameOnCard = document.createElement('label')
    labelNameOnCard.setAttribute('for', 'nameOnCard')
    labelNameOnCard.textContent = 'Name on Card: '
    const inputNameOnCard = document.createElement('input')
    inputNameOnCard.setAttribute('id', 'nameOnCard')
    inputNameOnCard.setAttribute('type', 'name')
    inputNameOnCard.setAttribute('required', 'required')

    const labelCreditCardNumber = document.createElement('label')
    labelCreditCardNumber.setAttribute('for', 'ccn')
    labelCreditCardNumber.textContent = 'Credit Card Number: '
    const inputCreditCardNumber = document.createElement('input')
    inputCreditCardNumber.setAttribute('id', 'ccn')
    inputCreditCardNumber.setAttribute('type', 'tel')
    inputCreditCardNumber.setAttribute('placeholder', 'xxxx xxxx xxxx xxxx')
    inputCreditCardNumber.setAttribute('maxlength', '19')
    inputCreditCardNumber.setAttribute('inputmode', 'numeric')
    inputCreditCardNumber.setAttribute('required', 'required')

    const labelExpirationDate = document.createElement('label')
    labelExpirationDate.setAttribute('for', 'expirationDate')
    labelExpirationDate.textContent = 'Expiration Date: '
    const inputExpirationDate = document.createElement('input')
    inputExpirationDate.setAttribute('id', 'expirationDate')
    inputExpirationDate.setAttribute('type', 'date')
    inputExpirationDate.setAttribute('required', 'required')

    const labelCvv = document.createElement('label')
    labelCvv.setAttribute('for', 'cvv')
    labelCvv.textContent = 'CVV: '
    const inputCvv = document.createElement('input')
    inputCvv.setAttribute('id', 'cvv')
    inputCvv.setAttribute('type', 'text')
    inputCvv.setAttribute('maxlength', '3')
    inputCvv.setAttribute('required', 'required')

    const checkOutButtonEl = document.createElement('button')
    checkOutButtonEl.setAttribute('class', 'checkout-button')
    checkOutButtonEl.setAttribute('type', 'submit')
    checkOutButtonEl.textContent = 'Check Out'

    mainEl.append(orderInformationSection)
    orderInformationSection.append(orderInfo, paymentInfo)
    orderInfo.append(cardInfo, orderInfoTitle, shippingForm)
    cardInfo.append(cardInfoTitle, cardListProductUlEl)
    cardListProductUlEl.append(productLi, buttonLi, priceLi)
    productLi.append(productImageEl, cakeSpanEl)
    buttonLi.append(decreaseButton, quantitySpanEl, increaseButton)
    shippingForm.append(labelName, inputName, labelSurname, inputSurname, labelCity, inputCity, labelTel, inputTel, labelAddress, inputAddress, labelDateAndTime, inputDateAndTime, submitInput)
    paymentInfo.append(paymentTitle, paymentForm)
    paymentForm.append(visaImageEl, labelNameOnCard, inputNameOnCard, labelCreditCardNumber, inputCreditCardNumber, labelExpirationDate, inputExpirationDate, labelCvv, inputCvv, checkOutButtonEl)
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
    buttonEl.addEventListener('click', function () {
        state.showOrderSection = true;

        render()
    })
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
    emailInput.setAttribute('required', true);

    //Append emailInput to emailLabel:
    emailLabel.append(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('required', true);

    //Append passwordInput to passwordLabel:
    passwordLabel.append(passwordInput);

    const signInBtn = document.createElement('button');
    signInBtn.setAttribute('class', 'sign-in-btn');
    signInBtn.setAttribute('type', 'submit');
    signInBtn.textContent = 'Sign In';

    //Append emailLabel, passwordLabel and signInBtn to formEl:
    formEl.append(emailLabel, passwordLabel, signInBtn);

    formEl.addEventListener('submit', (event) => {
        event.preventDefault();
        const userEmail = emailInput.value;
        const userPassword = passwordInput.value;
        signIn(userEmail, userPassword);

        render();
    })

    const registerContainer = document.createElement('div');
    registerContainer.setAttribute('class', 'register-container');

    const noAccSpan = document.createElement('span');
    noAccSpan.setAttribute('class', 'no-acc');
    noAccSpan.textContent = `Don't have an account?`;

    const registerSpan = document.createElement('span');
    registerSpan.setAttribute('class', 'register');
    registerSpan.textContent = 'Register now';

    registerSpan.addEventListener('click', () => {
        state.modal = 'register';
        render();
    })

    //Append noAccSpan and registerSpan to registerContainer:
    registerContainer.append(noAccSpan, registerSpan);

    modal.append(closeBtn, modalTitle, formEl, registerContainer);
}
function renderRegisterModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'register-modal');

    modal.addEventListener('click', event => {
        event.stopPropagation();
    })

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
    nameInput.setAttribute('required', true);

    //Append nameInput to nameLabel:
    nameLabel.append(nameInput);

    const surnameLabel = document.createElement('label');
    surnameLabel.textContent = 'Surname';

    const surnameInput = document.createElement('input');
    surnameInput.setAttribute('type', 'text');
    surnameInput.setAttribute('required', true);

    //Append surnameInput to surnameLabel:
    surnameLabel.append(surnameInput);

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';

    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('required', true);

    //Append emailInput to emailLabel:
    emailLabel.append(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('required', true);

    //Append passwordInput to passwordLabel:
    passwordLabel.append(passwordInput);

    const confirmPassLabel = document.createElement('label');
    confirmPassLabel.textContent = 'Confirm Password';

    const confirmPassInput = document.createElement('input');
    confirmPassInput.setAttribute('type', 'password');
    confirmPassInput.setAttribute('required', true);

    //Append confirmPassInput to confirmPassLabel:
    confirmPassLabel.append(confirmPassInput);

    const createAccBtn = document.createElement('button');
    createAccBtn.setAttribute('class', 'register-btn');
    createAccBtn.setAttribute('type', 'submit');
    createAccBtn.textContent = 'Create account';

    formEl.append(nameLabel, surnameLabel, emailLabel, passwordLabel, confirmPassLabel, createAccBtn);

    formEl.addEventListener('submit', event => {
        event.preventDefault();
        const nameEntered = nameInput.value;
        const surnameEntered = surnameInput.value;
        const emailEntered = emailInput.value;
        const passwordEntered = passwordInput.value;
        const confirmPasswordEntered = confirmPassInput.value;


        checkUser(emailEntered).then(() => {
            if (state.userExists) {
                state.modal = 'exists';
                render();
            } else {

                if (comparePasswords(passwordEntered, confirmPasswordEntered)) {
                    addUserToServer(nameEntered, surnameEntered, emailEntered, passwordEntered);
                    state.modal = 'new-user';
                } else {
                    state.modal = 'wrong-pass';
                }

            }
            render();
        });

    })
    modal.append(closeBtn, modalTitle, formEl);
}
function renderWelcomeModal() {

    const modal = document.createElement('div');
    modal.setAttribute('class', 'welcome-modal');

    const closeBtn = document.createElement('button');

    modalWrapperElements(modal, closeBtn);

    const titleEL = document.createElement('h2');
    titleEL.textContent = `Welcome ${state.user.name}!`;

    modal.append(closeBtn, titleEL);
}
function renderFailedAccessModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'failed-to-access-modal');

    const closeBtn = document.createElement('button');
    modalWrapperElements(modal, closeBtn);

    const titleEl = document.createElement('h2');
    titleEl.textContent = 'Something went wrong!';

    const parEl = document.createElement('p');
    parEl.textContent = 'You entered the wrong email or password.';

    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.setAttribute('class', 'try-again-btn');
    tryAgainBtn.textContent = 'Try again';

    tryAgainBtn.addEventListener('click', function (event) {
        event.stopPropagation()
        state.modal = 'signIn';
        render();
    })

    modal.append(closeBtn, titleEl, parEl, tryAgainBtn);
}
function renderGreetingModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'greetings-modal');

    const closeBtn = document.createElement('button');

    modalWrapperElements(modal, closeBtn);

    const titleEl = document.createElement('h2');
    titleEl.textContent = `Hey ${state.user.name}!`;

    const signOutBtn = document.createElement('button');
    signOutBtn.setAttribute('class', 'sign-out-btn');
    signOutBtn.textContent = 'Sign out';

    signOutBtn.addEventListener('click', event => {
        event.stopPropagation();
        state.user = null;
        state.modal = ''
        render();
    })

    modal.append(closeBtn, titleEl, signOutBtn);
}
function renderWelcomeNewUserModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'welcome-new-user-modal');

    const closeBtn = document.createElement('button');
    modalWrapperElements(modal, closeBtn);

    const titleEl = document.createElement('h2');
    titleEl.textContent = 'Welcome to Albulena Cakes';

    const parEl = document.createElement('p');
    parEl.textContent = 'Thank you for joining our community. Check out our latest offers and more!';

    const signInButton = document.createElement('button');
    signInButton.setAttribute('class', 'sign-in-btn');
    signInButton.textContent = 'Sign in';
    signInButton.addEventListener('click', event => {
        event.stopPropagation();
        state.modal = 'signIn';
        render();
    })

    modal.append(closeBtn, titleEl, parEl, signInButton);
}
function renderUserAlreadyExistsModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'user-already-exists-modal');

    const closeBtn = document.createElement('button');

    modalWrapperElements(modal, closeBtn);

    const titleEl = document.createElement('h4');
    titleEl.textContent = 'This account already exists. Please use another email.';

    modal.append(closeBtn, titleEl);
}
function renderWrongPasswordModal() {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'wrong-password-modal');

    const closeBtn = document.createElement('button');

    modalWrapperElements(modal, closeBtn);

    const titleEl = document.createElement('h4');
    titleEl.textContent = 'Your password confirmation does not match! Try again.';

    modal.append(closeBtn, titleEl);
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
    if (state.modal === 'register') {
        renderRegisterModal();
    }
    if (state.modal === 'welcome') {
        renderWelcomeModal();
    }
    if (state.modal === 'failed') {
        renderFailedAccessModal();
    }
    if (state.modal === 'greeting') {
        renderGreetingModal();
    }
    if (state.modal === 'new-user') {
        renderWelcomeNewUserModal();
    }
    if (state.modal === 'wrong-pass') {
        renderWrongPasswordModal();
    }
    if (state.modal === 'exists') {
        renderUserAlreadyExistsModal();
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
function signIn(email, userPassword) {
    return fetch(`http://localhost:3000/users/${email}`).then(res => res.json()).then(user => {
        if (user.password === userPassword) {
            state.user = user;
            state.modal = 'welcome';

        } else {
            state.modal = 'failed';
        }
        render();
    })
}

function checkUser(userName) {
    return fetch(`http://localhost:3000/users/${userName}`).then(res => res.json()).then(user => {
        if (user.id === userName) {
            state.userExists = true;
        }
        else {
            state.userExists = false;

        }
        console.log('Inside')
        // render();

    })

}
function comparePasswords(pass_1, pass_2) {
    if (pass_1 === pass_2) {
        return true;
    } else {
        return false;
    }
}
function addUserToServer(name, surname, email, password) {
    fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "id": email, "name": name, "surname": surname, "password": password, "orders": [] })
    })
}

function init() {
    getCakesFromServer().then(cake => {
        state.cakes = cake
        render();
    });

}

init();
