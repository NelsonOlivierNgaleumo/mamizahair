/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Navbar, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

function NavigationBar() {
  return (
    <Navbar style={{ paddingLeft: 20, paddingRight: 20 }} collapseOnSelect bg="dark" data-bs-theme="dark" expand="lg">
      <Navbar.Brand href="/">
        <Image src="/MamizaHairLogo.JPG" height={40} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="/Afro">Afro Products</Nav.Link> */}
          <Nav.Link href="/StoreMgr">Suppliers Profile</Nav.Link>
          <Nav.Link href="/Categories">Categories</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
        </Nav>
        <Nav.Link href="/cart">
          <Button className="custom-nav-button">View Cart</Button>
        </Nav.Link>
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
