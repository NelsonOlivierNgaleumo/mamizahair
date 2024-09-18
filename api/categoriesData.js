import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getcategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// FIXME: CREATE category
const createcategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories.json`, {
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
// FIXME: GET SINGLE category
const getSinglecategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: DELETE category
const deleteSinglecategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: UPDATE category
const updatecategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${payload.firebaseKey}.json`, {
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
// TODO: GET A SINGLE category'S categories
const getcategorycategories = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories.json?orderBy="category_name"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoritecategory = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories.json?orderBy="uid"&equalTo="${uid}"`, {
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
  getcategories,
  createcategory,
  getSinglecategory,
  deleteSinglecategory,
  updatecategory,
  favoritecategory,
  getcategorycategories,
};
