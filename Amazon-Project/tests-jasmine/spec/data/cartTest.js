import { addToCart, cart, cartQuantity, loadCartFromStorage, removeFromCart } from "../../../data/cart.js";

describe('test suite: addToCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadCartFromStorage();

    addToCart(productId1, 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(localStorage.setItem).toHaveBeenCalledWith('cartQuantity', JSON.stringify(cartQuantity));
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadCartFromStorage();

    addToCart(productId1, 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(localStorage.setItem).toHaveBeenCalledWith('cartQuantity', JSON.stringify(cartQuantity));
    expect(cart[0].quantity).toEqual(1);
  });

  it('removes a product from the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '2'
      }, {
        productId: productId2,
        quantity: 3,
        deliveryOptionId: '1'
      }]);
    });
    loadCartFromStorage();

    removeFromCart(productId2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(localStorage.setItem).toHaveBeenCalledWith('cartQuantity', JSON.stringify(cartQuantity));
    expect(cart[0].productId).toEqual(productId1);

    removeFromCart(productId2);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
  })
})