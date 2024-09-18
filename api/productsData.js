import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getproducts = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// FIXME: CREATE product
const createproduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// FIXME: GET SINGLE product
const getSingleproduct = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: DELETE product
const deleteSingleproduct = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: UPDATE product
const updateproduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// TODO: GET A SINGLE product'S categories
const getproductscategories = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories.json?orderBy="product_name"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteproduct = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getproducts,
  createproduct,
  getSingleproduct,
  deleteSingleproduct,
  updateproduct,
  favoriteproduct,
  getproductscategories,
};
