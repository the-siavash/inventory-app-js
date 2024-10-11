import CategoryView from './categoryView.js';
import ProductView from './productView.js';

document.addEventListener('DOMContentLoaded', () => {
  CategoryView.setApp();
  CategoryView.createCategoriesList();

  ProductView.setApp();
  ProductView.createProductItems();
  ProductView.updateProductsCount();

  console.log(CategoryView.categories);
  console.log(ProductView.products);
});

// dark mode toggler
const toggler = document.querySelector('#toggler');
const lightMode = document.querySelector('#light-mode');
const darkMode = document.querySelector('#dark-mode');
toggler.addEventListener('click', (event) => {
  if (event.target.id === 'dark-mode') {
    lightMode.classList.remove('hidden');
    darkMode.classList.add('hidden');
    document.querySelector('html').classList.add('dark');
  } else {
    lightMode.classList.add('hidden');
    darkMode.classList.remove('hidden');
    document.querySelector('html').classList.remove('dark');
  }
});
