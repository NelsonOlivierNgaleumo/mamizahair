import { getStoreMgrAfro, getSingleStoreMgr, deleteSingleStoreMgr } from './StoreMgrData';
import { getSingleAfro, deleteAfro } from './AfroData';

const viewAfroDetails = (AfroFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAfro(AfroFirebaseKey)
    .then((AfroObject) => {
      getSingleStoreMgr(AfroObject)
        .then((StoreMgrObject) => {
          resolve({ StoreMgrObject, ...AfroObject });
        });
    }).catch((error) => reject(error));
});

const viewStoreMgrDetails = (StoreMgrFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleStoreMgr(StoreMgrFirebaseKey), getStoreMgrAfro(StoreMgrFirebaseKey)])
    .then(([StoreMgrObject, StoreMgrAfroArray]) => {
      resolve({ ...StoreMgrObject, Afro: StoreMgrAfroArray });
    }).catch((error) => reject(error));
});

const deleteStoreMgrAfro = (StoreMgrId) => new Promise((resolve, reject) => {
  getStoreMgrAfro(StoreMgrId).then((AfroArray) => {
    console.warn(AfroArray, 'StoreMgr Afro');
    const deleteAfroPromises = AfroArray.map((Afro) => deleteAfro(Afro.firebaseKey));

    Promise.all(deleteAfroPromises).then(() => {
      deleteSingleStoreMgr(StoreMgrId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewAfroDetails, viewStoreMgrDetails, deleteStoreMgrAfro };
