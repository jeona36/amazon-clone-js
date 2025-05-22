//we are taking the products array from another file but i commented this couse i wrote some comments.(delete it in the future).
/* const products = [{
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
},
//js. has problems doing math with floats(0.1, 0.3, etc) so insted of 10.90 we will write the numbers in cents 1090 (1 dollar = 100 cents) and so on for the rest of products.
priceCents: 1090
}, {
  image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095
}, {
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799
}, {
  image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899
}];*/

//we want to get the variable cart so after we export it we import it here. in the'' the .. means we are out of this file then we go into data then into cart.js. 
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js'

updateCartQuantity();

let productsHTML = '';

products.forEach((product) => {
  //since productsHTML is created inside the scoop of the function it wont work outside of it, so we have to create it outside of the function first. for (+=) we are looping through the array then adding it to the result which is the empty string above. this is called the Accumulator pattern .
  productsHTML += `
       <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
        `;
});



document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

  function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();

       document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;        

  };
   
  const addedMessageTimeouts = {};

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) =>{
      button.addEventListener('click', () =>{
       const productId = button.dataset.productId;

       const selectorQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

       const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
       addedMessage.classList.add('added-to-cart-visible');
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
       }, 1000);

       const previousTimeoutId = addedMessageTimeouts[productId];
       if(previousTimeoutId){
        clearTimeout(previousTimeoutId)
       };
       //we added this here because if there is a timeout we clear it and if there is not we add it.
       addedMessageTimeouts[productId] = timeoutId;
        
       addToCart(productId, selectorQuantity);
       updateCartQuantity();
      });
    });