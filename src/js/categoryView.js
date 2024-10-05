import Storage from './storage.js';
import FormError from './formError.js';
import ProductView from './productView.js';

const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addCategorySection = document.querySelector('#add-category-section');
const addCategoryButton = document.querySelector('#add-category');
const cancelButton = document.querySelector('#add-category-cancel');
const doneButton = document.querySelector('#add-category-done');
const categoriesList = document.querySelector('#product-category');
const addCategorySectionForm = addCategorySection.querySelector('form');
const editedCategoriesList = document.querySelector('#edited-product-category');

const manageCategoriesButton = document.querySelector('#manage-categories');
const manageCategoriesSection = document.querySelector('#manage-categories-section');
const manageCategoriesCancel = document.querySelector('#manage-categories-cancel');
const manageCategoriesDone = document.querySelector('#manage-categories-done');
const manageSelectedCategory = document.querySelector('#selected-category');
const manageSelectedCategoryTitle = document.querySelector('#selected-category-title');
const manageSelectedCategoryDescription = document.querySelector('#selected-category-description');
const manageCategoriesSectionForm = manageCategoriesSection.querySelector('form');
const manageCategoriesRemoveButton = document.querySelector('#manage-categories-remove');
const categoryRemoveSection = document.querySelector('#category-remove-section');
const categoryRemoveConfirmed = document.querySelector('#category-remove-confirmed');
const categoryRemoveCancel = document.querySelector('#category-remove-cancel');

class CategoryView {
  constructor() {
    this.categories = [];
    this.selectedCategory = null;
    doneButton.addEventListener('click', (event) => this.addNewCategory(event));
    manageSelectedCategory.addEventListener('change', () => this.selectCategory());
    manageCategoriesDone.addEventListener('click', (event) => this.manageCategory(event));
    manageCategoriesRemoveButton.addEventListener('click', () => this.removeCategory());
    this.modalAddCategory();
    this.modalManageCategories();
  }

  selectCategory() {
    if (manageSelectedCategory.value === '-') {
      manageSelectedCategoryTitle.disabled = true;
      manageSelectedCategoryDescription.disabled = true;
      manageCategoriesRemoveButton.disabled = true;
      manageSelectedCategoryTitle.value = '';
      manageSelectedCategoryDescription.value = '';
      return;
    } else {
      manageCategoriesRemoveButton.disabled = false;
      manageSelectedCategoryTitle.disabled = false;
      manageSelectedCategoryDescription.disabled = false;
    }
    
    const category = this.categories.find((category) => category.id === parseInt(manageSelectedCategory.value));
    this.selectedCategory = category;
    manageSelectedCategoryTitle.value = category.title;
    manageSelectedCategoryDescription.value = category.description;
  }

  manageCategory(event) {
    event.preventDefault();

    const category = this.selectedCategory;
    const title = manageSelectedCategoryTitle.value;
    const description = manageSelectedCategoryDescription.value;

    FormError.removeAllErrorMessages(manageCategoriesSectionForm);
    if (manageSelectedCategory.value === '-') {
      FormError.appendErrorElement(manageSelectedCategory.parentElement, 'دسته‌بندی');
      return;
    }
    if (!title) {
      FormError.appendErrorElement(manageSelectedCategoryTitle.parentElement, 'عنوان دسته‌بندی');
      return;
    }
    if (!description) {
      FormError.appendErrorElement(manageSelectedCategoryDescription.parentElement, 'توضیحات دسته‌بندی');
      return;
    }
    
    category.title = manageSelectedCategoryTitle.value;
    category.description = manageSelectedCategoryDescription.value;
    Storage.saveCategory(category);

    this.resetManageCategoriesFormData();
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();

    ProductView.filterProducts();

    manageCategoriesSection.classList.add('hidden');
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

    [categoriesList, editedCategoriesList, manageSelectedCategory].forEach((item) => {
      item.innerHTML = options;
    });
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

  modalManageCategories() {
    [manageCategoriesButton, manageCategoriesCancel].forEach((btn) => {
      btn.addEventListener('click', () => {
        manageCategoriesSection.classList.toggle('hidden');
        this.resetManageCategoriesFormData();
      });
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') manageCategoriesSection.classList.add('hidden');
    });

    manageCategoriesSection.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-backdrop'))
        manageCategoriesSection.classList.toggle('hidden');
    });
  }

  removeCategory() {
    categoryRemoveSection.classList.remove('hidden');

    categoryRemoveSection.querySelector('h2').textContent = `حذف دسته‌بندی "${this.selectedCategory.title}"`;

    categoryRemoveCancel.onclick = () => categoryRemoveSection.classList.add('hidden');

    categoryRemoveSection.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-backdrop'))
        categoryRemoveSection.classList.toggle('hidden');
    });

    categoryRemoveConfirmed.addEventListener('click', () => {
      Storage.removeProducts(this.selectedCategory.id);
      Storage.removeCategory(this.selectedCategory.id);

      categoryRemoveSection.classList.add('hidden');
      manageCategoriesSection.classList.add('hidden');

      this.categories = Storage.getAllCategories();
      this.createCategoriesList();

      ProductView.filterProducts();
    });
  }

  resetCategoryFormData() {
    categoryTitle.value = '';
    categoryDescription.value = '';
    FormError.removeAllErrorMessages(addCategorySectionForm);
  }

  resetManageCategoriesFormData() {
    manageSelectedCategory.value = '-';
    manageSelectedCategoryTitle.value = '';
    manageSelectedCategoryDescription.value = '';
    manageCategoriesRemoveButton.disabled = true;
    FormError.removeAllErrorMessages(manageCategoriesSectionForm);
  }
}

export default new CategoryView();