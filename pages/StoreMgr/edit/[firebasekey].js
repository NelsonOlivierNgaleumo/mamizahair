import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleStoreMgr } from '../../../api/StoreMgrData';
import StoreMgrForm from '../../../components/forms/StoreMgrForm';

function EditSingleStoreMgr() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  // Whatever the name of the dynamic route file is (here i used [firebasekey]), is what the query below is going to be
  const { firebasekey } = router.query; // ensure this matches the filename

  // TODO: make a call to the API to get the StoreMgr data
  useEffect(() => {
    getSingleStoreMgr(firebasekey).then(setEditItem);
    // we do a console log to see what the router looks like
    console.warn(editItem);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: pass object to form
  // we call the StoreMgrForm and pass it a prob called obj with value {editItem}, so need to add prob inside our StoreMgrForm so it exports it back here
  return (<StoreMgrForm obj={editItem} />);
}

export default EditSingleStoreMgr;
