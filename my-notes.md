# Inventory App

GOALS:
  - Solve a single challenge per time
  - Don't write codes without purpose!
  - Write what the project needed...

## Project Structure

root
  /public
    /build
    index.html
  /src
    /css
    /js
  .gitignore
  README.md
  package-lock.json
  package.json
  tailwind.config.js
  postcss.config.js

## OOP Structure

- app.js
  - CategoryView.setApp()
  - ProductView.setApp()
  - CategoryView.createCategoriesList()
  - ProductView.createProductsList()

  - CategoryView.js
    - constructor()
    - addNewCategory(event)
    - setApp()
    - createCategoriesList()
    - toggleAddCategory(event)
    - cancelAddCategory(event)

  - ProductView.js
    - constructor()
    - setApp()
    - addNewProduct(event)
    - createProductsList(products)
    - searchProducts(event)
    - sortProducts(event)
    - deleteProduct(event)

  - Storage.js
    - static getAllCategories()
    - static saveCategory(categoryToSave)
    - static saveAllCategories(sort = 'newest')
    - static saveProduct(productToSave)
    - static deleteProduct(id)
