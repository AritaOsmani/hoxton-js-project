const headerEl = document.createElement('header');
const mainEl = document.createElement('main');
const footerEl = document.createElement('footer');

const state = {
    cakes: [],

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
function renderDetailsPage() {
    //     <!-- <main>
    //     <div class="main-container">
    //         <div class="image-container">
    //             <img src="images\cake_1.jpg" alt="">
    //         </div>
    //         <div class="cake-prop-container">
    //             <h1 class="title">Candy cane buttercream cake</h1>
    //             <div class="price-type-likes-container">
    //                 <span class="cake_price">50€</span>
    //                 <span class="cake_type">Christmas</span>
    //                 <div class="like-section">
    //                     <i class="fas fa-heart"></i>
    //                     <span class="cake_likes">20 likes</span>
    //                 </div>

    //             </div>
    //             <p class="cake_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, velit.</p>
    //             <button class="add_to_cart_btn">Add to cart</button>
    //         </div>
    //     </div>

    // </main> -->
    mainEl.innerHTML = '';
    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('class', 'main-container');

    const imageAndCommContainer = document.createElement('div');
    imageAndCommContainer.setAttribute('class', 'image-container');

    const cakeImg = document.createElement('img');
    cakeImg.setAttribute('src', 'images/cake_1.jpg');

    //Add cakeImg to imageAndCommContainer:
    imageAndCommContainer.append(cakeImg);

    const cakeProperties = document.createElement('div');
    cakeProperties.setAttribute('class', 'cake-prop-container');

    const cakeTitle = document.createElement('h1');
    cakeTitle.setAttribute('class', 'title');
    cakeTitle.textContent = 'Candy cane buttercream cake';

    const priceTypeLikeContainer = document.createElement('div');
    priceTypeLikeContainer.setAttribute('class', 'price-type-likes-container');

    const cakePrice = document.createElement('span');
    cakePrice.setAttribute('class', 'cake_price');
    cakePrice.textContent = '50€';

    const cakeType = document.createElement('span');
    cakeType.setAttribute('class', 'cake_type');
    cakeType.textContent = 'Christmas';

    const likesContainer = document.createElement('div');
    likesContainer.setAttribute('class', 'like-section');

    const heartIcon = document.createElement('i');
    heartIcon.setAttribute('class', 'far fa-heart');

    const likes = document.createElement('span');
    likes.setAttribute('class', 'cake_likes');
    likes.textContent = '20 likes';

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
function init() {
    getCakesFromServer().then(cake => {
        state.cakes = cake
        render();
    });
    // render();

}
init();
