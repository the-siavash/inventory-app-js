export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    return savedCategories.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1);
  }

  static saveCategory(categoryToSave) {
    const allCategories = this.getAllCategories();
    const existedCategory = allCategories.find((category) => category.id === categoryToSave.id);
    if (existedCategory) {
      // save edited category
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
      // save new category
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      allCategories.push(categoryToSave);
    }
    localStorage.setItem('categories', JSON.stringify(allCategories));
  }

  static getAllProducts(descSort = true) {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (descSort)
      return savedProducts.sort((a, b) => (new Date(a.updatedAt) > new Date(b.updatedAt)) ? -1 : 1);
    return savedProducts.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt)) ? -1 : 1);
  }

  static saveProduct(productToSave) {
    const allProducts = this.getAllProducts();
    const existedProduct = allProducts.find((product) => product.id === productToSave.id);
    if (existedProduct) {
      // save edited product
      existedProduct.title = productToSave.title;
      existedProduct.quantity = productToSave.quantity;
      existedProduct.category = productToSave.category;
      existedProduct.updatedAt = new Date().toISOString();
    } else {
      // save new product
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      productToSave.updatedAt = productToSave.createdAt;
      allProducts.push(productToSave);
    }
    localStorage.setItem('products', JSON.stringify(allProducts));
  }

  static removeProduct(productIdToRemove) {
    let allProducts = this.getAllProducts();
    allProducts = allProducts.filter((product) => product.id !== productIdToRemove);
    localStorage.setItem('products', JSON.stringify(allProducts));
  }
}
