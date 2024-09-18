import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleproduct } from '../../../api/productsData';
import ProductsForm from '../../../components/forms/ProductsForm';

function EditSingleProduct() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  // Whatever the name of the dynamic route file is (here i used [firebasekey]), is what the query below is going to be
  const { firebasekey } = router.query; // ensure this matches the filename

  // TODO: make a call to the API to get the Product data
  useEffect(() => {
    getSingleproduct(firebasekey).then(setEditItem);
    // we do a console log to see what the router looks like
    console.warn(editItem);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: pass object to form
  // we call the productsForm and pass it a prob called obj with value {editItem}, so need to add prob inside our productsForm so it exports it back here
  return (<ProductsForm obj={editItem} />);
}

export default EditSingleProduct;
