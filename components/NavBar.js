/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" variant="light">
      <Container>
        <Navbar.Brand>
          <Link passHref href="/">
            <Image src="/MamizaHairLogo.jpg" alt="Mamiza Logo" style={{ height: '90px' }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/AfroProducts">
              <Nav.Link className="custom-nav-link">Afro</Nav.Link>
            </Link>
            <Link passHref href="/HaircareProducts">
              <Nav.Link className="custom-nav-link">Haircare</Nav.Link>
            </Link>
            <Link passHref href="/SkincareProducts">
              <Nav.Link className="custom-nav-link">Skincare</Nav.Link>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Link passHref href="/cart">
              <Button className="custom-nav-button">View Cart</Button>
            </Link>
            <Button className="custom-nav-button" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
