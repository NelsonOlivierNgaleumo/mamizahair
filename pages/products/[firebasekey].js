/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewproductsDetails } from '../../api/mergedData';

function Viewproducts() {
  const router = useRouter();
  const { firebasekey } = router.query;
  const [productsDetails, setproductsDetails] = useState({});

  useEffect(() => {
    viewproductsDetails(firebasekey).then(setproductsDetails);
  }, [firebasekey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={productsDetails.image} alt={productsDetails.product_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {productsDetails.product_name} {productsDetails.favorite ? ' 🤍' : ''}
        </h5>
        <p>{productsDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}

export default Viewproducts;
