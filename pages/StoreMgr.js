import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getStoreMgr } from '../api/StoreMgrData';
import { useAuth } from '../utils/context/authContext';
import StoreMgrCard from '../components/StoreMgrCard';

function StoreMgrs() {
  // DONE: Set a state for StoreMgr
  const [storeMgrs, setStoreMgr] = useState([]);

  // DONE: Get user ID using useAuth Hook
  const { user } = useAuth();

  // DONE: create a function that makes the API call to get all the StoreMgr
  const getAllTheStoreMgr = () => {
    getStoreMgr(user.uid).then(setStoreMgr);
  };

  // DONE: make the call to the API to get all the StoreMgr on component render
  useEffect(() => {
    getAllTheStoreMgr();
  });

  return (
    <div className="text-center my-4">
      <Link href="/StoreMgr/new" passHref>
        <Button>Add an StoreMgr</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* DONE: map over StoreMgr here using StoreMgrCard for each storeMgr component, then pass prob StoreMgrObj, followed by the function onUpdate which gets all the StoreMgr */}
        {storeMgrs.map((StoreMgr) => (
          <StoreMgrCard key={StoreMgr.firebaseKey} StoreMgrObj={StoreMgr} onUpdate={getAllTheStoreMgr} />
        ))}
      </div>

    </div>
  );
}

export default StoreMgrs;
