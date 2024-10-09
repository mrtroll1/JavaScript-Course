import { getOrder } from "../../data/orders.js";
import { getProduct } from "../../data/products.js" ;

export function renderTracking() {
  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const orderDetails = getOrder(orderId);

  const productId = url.searchParams.get('productId');
  const productDetails = getProduct(productId);

  // const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime));
  const deliveryProgress = Math.round((Math.random()) * 100);

  const html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>

    <div class="delivery-date">
    Arriving on SEE packages.js
    </div>

    <div class="product-info">
      ${productDetails.name}
    </div>

    <div class="product-info">
    Quantity: SEE packages.js
    </div>

    <img class="product-image" src="${productDetails.image}">

    <div class="progress-labels-container">
    <div class="progress-label">
      Preparing
    </div>
    <div class="progress-label current-status">
      Shipped
    </div>
    <div class="progress-label">
      Delivered
    </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${deliveryProgress}%;"></div>
    </div>
  `
  document.querySelector('.js-order-tracking').innerHTML = html;
}
