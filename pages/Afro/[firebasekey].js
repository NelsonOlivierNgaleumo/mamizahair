/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAfroDetails } from '../../api/combinedData';

export default function ViewAfro() {
  const [AfroDetails, setAfroDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAfroDetails(firebaseKey).then(setAfroDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={AfroDetails.image} alt={AfroDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <p>{AfroDetails.description || ''}</p>
        <hr />
        <hr />
        <p>
          {AfroDetails.sale
            ? `🏷️ Sale $${AfroDetails.price}`
            : `$${AfroDetails.price}`}
        </p>
      </div>
    </div>
  );
}
