import { renderTracking } from "./tracking/tracking.js";
import { renderHeader } from "./header/header.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error');
    console.log(error);
  }

  renderTracking();
  renderHeader();
}

loadPage();