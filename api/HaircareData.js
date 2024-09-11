import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Haircare PRODUCTS
const getHaircare = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/haircare.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE Haircare
const createHaircare = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/haircare.json`, {
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

// GET SINGLE Haircare
const getSingleHaircare = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/haircare/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE Haircare
const deleteSingleHaircare = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/haircare/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE Haircare
const updateHaircare = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/haircare/${payload.firebaseKey}.json`, {
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

export {
  getHaircare,
  createHaircare,
  getSingleHaircare,
  deleteSingleHaircare,
  updateHaircare,

};
