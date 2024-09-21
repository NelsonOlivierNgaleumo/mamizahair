import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import deleteStoreMgrAfro from '../api/combinedData';

function AfroCard({ AfroObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE Afro AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE AfroS
  const deleteThisAfro = () => {
    if (window.confirm(`Delete ${AfroObj.title}?`)) {
      deleteStoreMgrAfro(AfroObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={AfroObj.image} alt={AfroObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{AfroObj.title}</Card.Title>
        <p className="card-text bold">{AfroObj.sale && <span>SALE<br /></span> } ${AfroObj.price}</p>
        {/* DYNAMIC LINK TO VIEW THE Afro DETAILS  */}
        <Link href={`/Afro/${AfroObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE Afro DETAILS  */}
        <Link href={`/Afro/edit/${AfroObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAfro} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AfroCard.propTypes = {
  AfroObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AfroCard;
