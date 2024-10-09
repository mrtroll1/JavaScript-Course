export let cart = JSON.parse(localStorage.getItem('cart'));
export let cartQuantity = Number(JSON.parse(localStorage.getItem('cartQuantity')));

export function loadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
}

if (!cart) {
  cart = [];
}

if (!cartQuantity) {
  cartQuantity = 0;
}

function saveToStorage(itemName, itemData) {
  localStorage.setItem(itemName, JSON.stringify(itemData));
}

export function addToCart(productId, quantityToAdd) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantityToAdd;
  } else {
    cart.push({
      productId: productId,
      quantity: quantityToAdd,
      deliveryOptionId: '2'
    })
  }

  cartQuantity += quantityToAdd;
  saveToStorage('cartQuantity', cartQuantity);
  saveToStorage('cart', cart);
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  cartQuantity = calculateCartQuantity();
  saveToStorage('cartQuantity', cartQuantity);
  saveToStorage('cart', cart);
}

export function clearCart() {
  localStorage.removeItem('cart');
  localStorage.removeItem('cartQuantity');
  cart = [];
  cartQuantity = 0;
}

function calculateCartQuantity() {
  let newCartQuantity = 0;
  cart.forEach((cartItem) => {
    newCartQuantity += cartItem.quantity;
  });

  return newCartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartQuantity -= cartItem.quantity;
      cartItem.quantity = newQuantity;
      cartQuantity += newQuantity;
    }
  });
  saveToStorage('cartQuantity', cartQuantity);
  saveToStorage('cart', cart);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  cart.forEach((cartItem) => {
    let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage('cart', cart); 
  });
}

export async function loadCartFetch(fun) {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  console.log('cart loaded');
}
