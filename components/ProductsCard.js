import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteproductscategories } from '../api/mergedData';

function ProductsCard({ productsObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE products AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE products
  const deleteThisproducts = () => {
    if (window.confirm(`Delete ${productsObj.product_name}?`)) {
      deleteproductscategories(productsObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '10px' }}>
      <Card.Img variant="top" src={productsObj.image} alt={productsObj.product_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{productsObj.product_name}</Card.Title>
        <p className="card-text bold">{productsObj.favorite ? 'Favorite' : ''}</p>
        {/* DYNAMIC LINK TO VIEW THE products DETAILS, in order to get to our details we use this dynamic route below. We can also have a double dynamic route for firebasekey and any another prop (image or first_name) */}
        <Link href={`/products/${productsObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE products DETAILS */}
        <Link href={`/products/edit/${productsObj.firebaseKey}`} passHref>
          {/* the above link with redirect us to the dynamic route where the editing is performed in products/edit. Since it is dynamic we'll able to use this route to edit any of the ProductsCard without needing any specific route for each card */}
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisproducts} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductsCard.propTypes = {
  productsObj: PropTypes.shape({
    image: PropTypes.string,
    product_name: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductsCard;
