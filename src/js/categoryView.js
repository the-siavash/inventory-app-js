import Storage from './storage.js';
import FormError from './formError.js';

const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addCategorySection = document.querySelector('#add-category-section');
const addCategoryButton = document.querySelector('#add-category');
const cancelButton = document.querySelector('#add-category-cancel');
const doneButton = document.querySelector('#add-category-done');
const categoriesList = document.querySelector('#product-category');
const addCategorySectionForm = addCategorySection.querySelector('form');

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

    FormError.removeAllErrorMessages(addCategorySectionForm);
    if (!title) {
      FormError.appendErrorElement(categoryTitle.parentElement, 'عنوان دسته‌بندی');
      return;
    }
    if (!description) {
      FormError.appendErrorElement(categoryDescription.parentElement, 'توضیحات');
      return;
    }

    Storage.saveCategory({ title, description });
    addCategorySection.classList.toggle('hidden');
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
    [addCategoryButton, cancelButton].forEach((btn) => {
      btn.addEventListener('click', () => {
        addCategorySection.classList.toggle('hidden');
        this.resetCategoryFormData();
      });
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') addCategorySection.classList.add('hidden');
    });

    addCategorySection.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-backdrop'))
        addCategorySection.classList.toggle('hidden');
    });
  }

  resetCategoryFormData() {
    categoryTitle.value = '';
    categoryDescription.value = '';
    FormError.removeAllErrorMessages(addCategorySectionForm);
  }
}

export default new CategoryView();