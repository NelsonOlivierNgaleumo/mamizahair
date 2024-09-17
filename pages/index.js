/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAfro } from '../api/AfroData';
import { useAuth } from '../utils/context/authContext';
import AfroCard from '../components/AfroCard';

function Home() {
  const [afro, setAfro] = useState([]);

  const { user } = useAuth();

  const getAllTheAfro = () => {
    getAfro(user.uid).then((response) => {
      // console.log('API Response:', response);

      // Convert the response object into an array
      const afroArray = Object.values(response);

      setAfro(afroArray); // Set the state to the array of Afro products
    }).catch((error) => {
      console.error('Error fetching data:', error);
      setAfro([]); // Handle errors by setting an empty array
    });
  };

  useEffect(() => {
    getAllTheAfro();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/Afro/new" passHref>
        <Button>Add Afro Product</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {afro?.map((Afro) => (
          <AfroCard key={Afro.firebaseKey} AfroObj={Afro} onUpdate={getAllTheAfro} />
        ))}
      </div>
    </div>
  );
}

export default Home;
