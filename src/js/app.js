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
