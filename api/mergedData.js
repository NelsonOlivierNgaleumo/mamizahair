import { getproductscategories, getSingleproduct, deleteSingleproduct } from './productsData';
import { getSinglecategory, deleteSinglecategory } from './categoriesData';

const viewcategoriesDetails = (categoriesFirebaseKey) => new Promise((resolve, reject) => {
  getSinglecategory(categoriesFirebaseKey)
    .then((categoriesObject) => {
      getSingleproduct(categoriesObject)
        .then((productsObject) => {
          resolve({ productsObject, ...categoriesObject });
        });
    }).catch((error) => reject(error));
});

const viewproductsDetails = (productsFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleproduct(productsFirebaseKey), getproductscategories(productsFirebaseKey)])
    .then(([productsObject, productscategoriesArray]) => {
      resolve({ ...productsObject, categories: productscategoriesArray });
    }).catch((error) => reject(error));
});

const deleteproductscategories = (productsId) => new Promise((resolve, reject) => {
  getproductscategories(productsId).then((categoriesArray) => {
    console.warn(categoriesArray, 'products categories');
    const deletecategoriesPromises = categoriesArray.map((categories) => deleteSinglecategory(categories.firebaseKey));

    Promise.all(deletecategoriesPromises).then(() => {
      deleteSingleproduct(productsId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewcategoriesDetails, viewproductsDetails, deleteproductscategories };
