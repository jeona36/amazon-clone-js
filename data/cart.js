 export let cart = 
 JSON.parse(localStorage.getItem('cart'));

 if(!cart){
 cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '1'
 },{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'
 }];
};

 function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
 };


 export function addToCart(productId, selectorQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
   if(productId === cartItem.productId){
     matchingItem = cartItem;
   }
  });

  if(matchingItem){
   matchingItem.quantity += selectorQuantity
  } else{
   cart.push({
     productId: productId,
     quantity: selectorQuantity,
     deliveryOptionId: '1'
    });
  }

  saveToStorage();
};

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
   cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};

//here we will create a function to remove a product from the cart first (create a new array) second (loop through the cart) third (add each product to the new array, exept for this product) which means the one that we are clicking delete for. then replace the cart with the new cart.
export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) =>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem)
    }
  })

  cart = newCart;

  saveToStorage();
};

export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity =newQuantity;

  saveToStorage();
};