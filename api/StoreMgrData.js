import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getStoreMgr = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/StoreMgr.json?orderBy="uid"&equalTo="${uid}"`, {
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

// FIXME: CREATE StoreMgr
const createStoreMgr = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/StoreMgr.json`, {
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
// FIXME: GET SINGLE StoreMgr
const getSingleStoreMgr = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/StoreMgr/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: DELETE StoreMgr
const deleteSingleStoreMgr = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/StoreMgr/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: UPDATE StoreMgr
const updateStoreMgr = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/StoreMgr/${payload.firebaseKey}.json`, {
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
// TODO: GET A SINGLE StoreMgr'S Afro
const getStoreMgrAfro = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Afro.json?orderBy="StoreMgr_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteStoreMgr = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/StoreMgr.json?orderBy="uid"&equalTo="${uid}"`, {
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
  getStoreMgr,
  createStoreMgr,
  getSingleStoreMgr,
  deleteSingleStoreMgr,
  updateStoreMgr,
  favoriteStoreMgr,
  getStoreMgrAfro,
};
