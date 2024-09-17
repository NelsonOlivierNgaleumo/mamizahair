/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewStoreMgrDetails } from '../../api/combinedData';

function ViewStoreMgr() {
  const router = useRouter();
  const { firebasekey } = router.query;
  const [StoreMgrDetails, setStoreMgrDetails] = useState({});

  useEffect(() => {
    viewStoreMgrDetails(firebasekey).then(setStoreMgrDetails);
  }, [firebasekey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={StoreMgrDetails.image} alt={StoreMgrDetails.last_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {StoreMgrDetails.first_name} {StoreMgrDetails.last_name} {StoreMgrDetails.favorite ? ' 🤍' : ''}
        </h5>
        Email: <a href={`mailto:${StoreMgrDetails.email}`}>{StoreMgrDetails.email}</a>
        <p>{StoreMgrDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}

export default ViewStoreMgr;
