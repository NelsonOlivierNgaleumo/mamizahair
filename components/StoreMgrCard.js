import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteStoreMgrAfro } from '../api/combinedData';

function StoreMgrCard({ StoreMgrObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE StoreMgr AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE STOREMGR
  const deleteThisStoreMgr = () => {
    if (window.confirm(`Delete ${StoreMgrObj.first_name} ${StoreMgrObj.last_name}?`)) {
      deleteStoreMgrAfro(StoreMgrObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '10px' }}>
      <Card.Img variant="top" src={StoreMgrObj.image} alt={StoreMgrObj.last_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{StoreMgrObj.first_name} {StoreMgrObj.last_name}</Card.Title>
        <p className="card-text bold">{StoreMgrObj.favorite ? 'Favorite' : ''}</p>
        {/* DYNAMIC LINK TO VIEW THE StoreMgr DETAILS, in order to get to our details we use this dynamic route below. We can also have a double dynamic route for firebasekey and any another prop (image or first_name) */}
        <Link href={`/StoreMgr/${StoreMgrObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE StoreMgr DETAILS */}
        <Link href={`/StoreMgr/edit/${StoreMgrObj.firebaseKey}`} passHref>
          {/* the above link with redirect us to the dynamic route where the editing is performed in StoreMgr/edit. Since it is dynamic we'll able to use this route to edit any of the StoreMgrCard without needing any specific route for each card */}
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisStoreMgr} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

StoreMgrCard.propTypes = {
  StoreMgrObj: PropTypes.shape({
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StoreMgrCard;
