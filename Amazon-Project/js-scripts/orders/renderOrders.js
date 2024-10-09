import { orders } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { addToCart, cartQuantity, clearCart } from "../../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderOrders() {

  let orderHTML = '';
  orders.forEach((order) => {
    const orderProducts = order.products;
    let productsHTML = '';

    orderProducts.forEach((product) => {
      const deliveryDate = dayjs(product.estimatedDeliveryTime);
      const dateString = deliveryDate.format('MMMM D');
      
      const productQuantity = product.quantity;
      const productId = product.productId;
      const productDetails = getProduct(productId);

      productsHTML += `
        <div class="product-image-container">
          <img src="${productDetails.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${productDetails.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dateString}
          </div>
          <div class="product-quantity">
            Quantity: ${productQuantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
            data-product-id="${productId}"
          >
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${productId}">
            <button class="track-package-button button-secondary
              js-track-package-button">
              Track package
            </button>
          </a>
        </div>
      `
    })

    orderHTML += `
      <div class="order-container">     
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>August 12</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$35.06</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML}
        </div>
      </div>
    `;
  })

  document.querySelector('.js-orders-grid').innerHTML = orderHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      addToCart(productId, 1);
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    })
  });
}
