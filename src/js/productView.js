import Storage from './storage.js';

const productTitle = document.querySelector('#product-title');
const productQuantity = document.querySelector('#product-quantity');
const productCategory = document.querySelector('#product-category');
const addProductSection = document.querySelector('#add-product-section');
const addProductButton = document.querySelector('#add-product');
const cancelButton = document.querySelector('#add-product-cancel');
const doneButton = document.querySelector('#add-product-done');
const productsList = document.querySelector('#products');
const productsCount = document.querySelector('#products-count');

class ProductView {
  constructor() {
    this.products = [];
    doneButton.addEventListener('click', (event) => this.addNewProduct(event));
    this.modalAddProduct();
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  addNewProduct(event) {
    event.preventDefault();
    const title = productTitle.value;
    const quantity = parseInt(productQuantity.value);
    const category = productCategory.value;
    if (!title || quantity < 0 || category === '-') return;
    Storage.saveProduct({ title, quantity, category });
    productTitle.value = '';
    productQuantity.value = 0;
    productCategory.value = '-';
    this.products = Storage.getAllProducts();
    this.createProductItems();
    this.updateProductsCount();
  }

  createProductItems() {
    if (this.products.length === 0) {
      productsList.innerHTML = `
      <tr class="border-b bg-white text-gray-700 dark:bg-slate-600 dark:text-white" id="products-empty">
        <td colspan="6" class="px-6 py-4">داده‌ای برای نمایش یافت نشد.</td>
      </tr>`;
      return;
    }

    let productItems = '';
    this.products.forEach((product) => {
      productItems += this.#createProductItem(product);
    });
    productsList.innerHTML = productItems;
  }

  #createProductItem(product) {
    const selectedCategory = Storage.getAllCategories().find((category) => category.id === parseInt(product.category));
    return `
    <tr class="bg-white text-gray-700 dark:bg-slate-600 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 border-b dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">${product.title}</th>
      <td class="px-6 py-4">${product.id}</td>
      <td class="px-6 py-4">${selectedCategory.title}</td>
      <td class="px-6 py-4">${product.quantity}</td>
      <td class="px-6 py-4">${new Date(product.createdAt).toLocaleDateString('fa-IR')}</td>
      <td class="px-6 py-4 flex items-center gap-x-3" data-id="${product.id}">
        <svg class="group hover:cursor-pointer" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="group-hover:fill-blue-500 dark:fill-white" d="M5.53999 19.5201C4.92999 19.5201 4.35999 19.31 3.94999 18.92C3.42999 18.43 3.17999 17.69 3.26999 16.89L3.63999 13.65C3.70999 13.04 4.07999 12.23 4.50999 11.79L12.72 3.10005C14.77 0.930049 16.91 0.870049 19.08 2.92005C21.25 4.97005 21.31 7.11005 19.26 9.28005L11.05 17.97C10.63 18.42 9.84999 18.84 9.23999 18.9401L6.01999 19.49C5.84999 19.5 5.69999 19.5201 5.53999 19.5201ZM15.93 2.91005C15.16 2.91005 14.49 3.39005 13.81 4.11005L5.59999 12.8101C5.39999 13.0201 5.16999 13.5201 5.12999 13.8101L4.75999 17.05C4.71999 17.38 4.79999 17.65 4.97999 17.82C5.15999 17.99 5.42999 18.05 5.75999 18L8.97999 17.4501C9.26999 17.4001 9.74999 17.14 9.94999 16.93L18.16 8.24005C19.4 6.92005 19.85 5.70005 18.04 4.00005C17.24 3.23005 16.55 2.91005 15.93 2.91005Z" fill="#292D32"/>
          <path class="group-hover:fill-blue-500 dark:fill-white" d="M17.3404 10.9498C17.3204 10.9498 17.2904 10.9498 17.2704 10.9498C14.1504 10.6398 11.6404 8.26985 11.1604 5.16985C11.1004 4.75985 11.3804 4.37985 11.7904 4.30985C12.2004 4.24985 12.5804 4.52985 12.6504 4.93985C13.0304 7.35985 14.9904 9.21985 17.4304 9.45985C17.8404 9.49985 18.1404 9.86985 18.1004 10.2798C18.0504 10.6598 17.7204 10.9498 17.3404 10.9498Z" fill="#292D32"/>
          <path class="group-hover:fill-blue-500 dark:fill-white" d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z" fill="#292D32"/>
        </svg>
        <svg class="group hover:cursor-pointer" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="group-hover:stroke-red-500 dark:stroke-white" d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="group-hover:stroke-red-500 dark:stroke-white" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="group-hover:stroke-red-500 dark:stroke-white" d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="group-hover:stroke-red-500 dark:stroke-white" d="M10.33 16.5H13.66" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="group-hover:stroke-red-500 dark:stroke-white" d="M9.5 12.5H14.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </td>
    </tr>`;
  }

  updateProductsCount() {
    productsCount.textContent = this.products.length;
  }

  modalAddProduct() {
    [addProductButton, cancelButton, doneButton].forEach((btn) => {
      btn.addEventListener('click', () => {
        addProductSection.classList.toggle('hidden');
      });
    });

    addProductSection.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-backdrop'))
        addProductSection.classList.toggle('hidden');
    });
  }

  cancelAddProduct() {}
}

export default new ProductView();