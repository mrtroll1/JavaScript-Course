function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadCartFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    },
  
    cartQuantity: undefined,
    loadCartQuantityFromStorage() {
      this.cartQuantity = Number(JSON.parse(localStorage.getItem('cartQuantity-oop')));
    },
  
    saveToStorage(itemName, itemData) {
      localStorage.setItem(itemName, JSON.stringify(itemData));
    },
  
    addToCart(productId, quantityToAdd) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += quantityToAdd;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: quantityToAdd,
          deliveryOptionId: '2'
        })
      }
    
      this.cartQuantity += quantityToAdd;
      this.saveToStorage('cartQuantity-oop', this.cartQuantity);
      this.saveToStorage('cart-oop', this.cartItems);
    },
  
    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
      this.cartQuantity = this.calculateCartQuantity();
      this.saveToStorage('cartQuantity-oop', this.cartQuantity);
      this.saveToStorage('cart-oop', this.cartItems);
    },
  
    calculateCartQuantity() {
      let newCartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        newCartQuantity += cartItem.quantity;
      });
    
      return newCartQuantity;
    },
    
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          this.cartQuantity -= cartItem.quantity;
          cartItem.quantity = newQuantity;
          this.cartQuantity += newQuantity;
        }
      });
      this.saveToStorage('cartQuantity-oop', this.cartQuantity);
      this.saveToStorage('cart-oop', this.cartItems);
    },
    
    updateDeliveryOption(productId, deliveryOptionId) {
      this.cartItems.forEach((cartItem) => {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage('cart-oop', this.cartItems); 
      });
    }
  }
  
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('businessCart-oop')

cart.loadCartFromStorage();

console.log(cart); 




