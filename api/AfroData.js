import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Afro PRODUCTS
const getAfro = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Afro.json?orderBy="uid"&equalTo="${uid}"`, {
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

// CREATE Afro
const createAfro = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Afro.json`, {
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

// GET SINGLE Afro
const getSingleAfro = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Afro/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE Afro
const deleteAfro = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Afro/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// const deleteSingleAfro = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/Afro/${firebaseKey}.json`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

// UPDATE Afro
const updateAfro = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Afro/${payload.firebaseKey}.json`, {
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
  getAfro,
  createAfro,
  getSingleAfro,
  // deleteSingleAfro,
  deleteAfro,
  updateAfro,

};
