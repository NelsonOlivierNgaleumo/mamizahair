import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Skincare PRODUCTS
const getSkincare = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skincare.json?orderBy="uid"&equalTo="${uid}"`, {
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

// CREATE Skincare
const createSkincare = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skincare.json`, {
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

// GET SINGLE Skincare
const getSingleSkincare = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skincare/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE Skincare
const deleteSingleSkincare = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skincare/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE Skincare
const updateSkincare = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skincare/${payload.firebaseKey}.json`, {
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
  getSkincare,
  createSkincare,
  getSingleSkincare,
  deleteSingleSkincare,
  updateSkincare,

};
