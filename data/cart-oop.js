 //'this' will give us the outer object.
 //we will write 'cart-oop' to not mix up with the original cart in localStorage.

 function Cart(localStorageKey){
   const cart ={
    cartItems: undefined,


    loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

    if(!this.cartItems){
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    };
   },


    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },


    addToCart(productId, selectorQuantity){
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
      });

      if(matchingItem){
      matchingItem.quantity += selectorQuantity
      } else{
      this.cartItems.push({
        productId: productId,
        quantity: selectorQuantity,
        deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },


    calculateCartQuantity(){
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    },


    //here we will create a function to remove a product from the cart first (create a new array) second (loop through the cart) third (add each product to the new array, exept for this product) which means the one that we are clicking delete for. then replace the cart with the new cart.
    removeFromCart(productId){
      const newCart = [];

      this.cartItems.forEach((cartItem) =>{
        if (cartItem.productId !== productId){
          newCart.push(cartItem)
        }
      })

      this.cartItems = newCart;

      this.saveToStorage();
    },


    updateQuantity(productId, newQuantity){
      let matchingItem;

      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
      matchingItem.quantity =newQuantity;

      this.saveToStorage();
    },



    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }

 };

 return cart;

 };
 

 const cart = Cart('cart-oop');
 const businessCart = Cart('cart-business');

 cart.loadFromStorage();

 businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);