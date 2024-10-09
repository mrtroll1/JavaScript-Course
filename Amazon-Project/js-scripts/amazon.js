import {loadProductsFetch} from '../data/products.js';
import { renderHeader } from './header/header.js';
import { renderProductsGrid } from './amazon/amazon.js';

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error');
    console.log(error);
  }

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  renderProductsGrid(search);
  renderHeader(search);
}

loadPage();

