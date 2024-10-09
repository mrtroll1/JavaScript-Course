import { renderOrders } from "./orders/renderOrders.js";
import { loadProductsFetch } from "../data/products.js";
import { renderHeader } from "./header/header.js";

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error');
    console.log(error);
  }

  renderOrders();
  renderHeader();
}

loadPage();


