import Storage from './storage.js';

const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addCategorySection = document.querySelector('#add-category-section');
const addCategoryButton = document.querySelector('#add-category');
const cancelButton = document.querySelector('#add-category-cancel');
const doneButton = document.querySelector('#add-category-done');
const categoriesList = document.querySelector('#product-category');

class CategoryView {
  constructor() {
    this.categories = [];
    doneButton.addEventListener('click', (event) => this.addNewCategory(event));
    this.modalAddCategory();
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }

  addNewCategory(event) {
    event.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.resetCategoryFormData();
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
  }

  createCategoriesList() {
    let options = `<option value="-" class="dark:bg-slate-600" selected>یک دسته‌بندی انتخاب نمایید</option>`;
    this.categories.forEach((category) => {
      options += `<option value="${category.id}" class="dark:bg-slate-600">${category.title}</option>`;
    });
    categoriesList.innerHTML = options;
  }

  modalAddCategory() {
    [addCategoryButton, cancelButton, doneButton].forEach((btn) => {
      btn.addEventListener('click', () => {
        addCategorySection.classList.toggle('hidden');
        this.resetCategoryFormData();
      });
    });

    addCategorySection.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-backdrop'))
        addCategorySection.classList.toggle('hidden');
    });
  }

  resetCategoryFormData() {
    categoryTitle.value = '';
    categoryDescription.value = '';
  }
}

export default new CategoryView();