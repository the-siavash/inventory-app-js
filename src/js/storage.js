export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    savedCategories.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1);
    return savedCategories;
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
      const category = {
        id: new Date().getTime(),
        title: categoryToSave.title,
        description: categoryToSave.description,
        createdAt: new Date().toISOString(),
      };
      allCategories.push(category);
    }
    localStorage.setItem('categories', JSON.stringify(allCategories));
  }
}
