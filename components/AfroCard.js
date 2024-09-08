import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { deleteSingleAfro } from '../api/AfroData';

function AfroCard({ Obj, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const deleteThisProduct = () => {
    if (window.confirm(`Delete ${Obj.name}?`)) {
      deleteSingleAfro(Obj.id).then(() => onUpdate());
    }
  };

  const handleAddToCart = () => {
    const product = {
      id: Obj.id,
      name: Obj.name,
      product_image: Obj.product_image,
      price: Obj.price,
      description: Obj.description,
      quantity: 1,
    };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <Card style={{ width: '24rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={Obj.product_image} alt={Obj.name} style={{ height: '400px' }} />
        <Card.Title>{Obj.name}</Card.Title>
        <Card.Text>{Obj.price}</Card.Text>
        <Link href="/cart" passHref>
          <Button variant="success" onClick={handleAddToCart} className="m-2">
            Add to Cart
          </Button>
        </Link>
        <Link href={`/editProduct?productId=${Obj.id}`} passHref>
          <Button variant="success" className="m-2">
            Edit
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisProduct} className="m-2">
          DELETE
        </Button>
        <Button variant="info" onClick={handleShowModal} className="m-2">
          DETAILS
        </Button>
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{Obj.name} Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>{Obj.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="m-2">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

AfroCard.propTypes = {
  Obj: PropTypes.shape({
    name: PropTypes.string,
    product_image: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AfroCard;
