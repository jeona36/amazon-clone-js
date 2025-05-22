//a class is a way to generate objects.
class Cart {
   cartItems;
   //when adding '#' to a property or a 'method' it means that the property is private, so it can't be used outside of the class.
   #localStorageKey;
    //the constructor let us put set up code inside the class so when we use this class the code inside the constructore will run automaticlly.
   constructor (localStorageKey){
    this.#localStorageKey = localStorageKey;
    
    this.#loadFromStorage();
    
   }

    #loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
    }                                                    

    saveToStorage(){
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }


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
    }


    calculateCartQuantity(){
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    }


    removeFromCart(productId){
      const newCart = [];

      this.cartItems.forEach((cartItem) =>{
        if (cartItem.productId !== productId){
          newCart.push(cartItem)
        }
      })

      this.cartItems = newCart;

      this.saveToStorage();
    }
    


    updateQuantity(productId, newQuantity){
      let matchingItem;

      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
      matchingItem.quantity =newQuantity;

      this.saveToStorage();
    }



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

}
 

 const cart = new Cart('cart-oop');
 const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);