/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <br />
      <br />
      <h3 style={{ fontWeight: '800', color: 'white' }}> Hello {user.displayName}! </h3>
      <br />
      <br />

      <h1 style={{ fontWeight: '100', color: 'whitesmoke' }}> Welcome to MamizaHair Store</h1>
      <br />
      {/* <h1 style={{ fontWeight: '800', color: 'white' }}> Feel Natural and Happy!!! </h1> */}
      <div style={{
        padding: '5px',
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '200px',
      }}
      >
        <div style={{ position: 'relative', marginTop: '-100px' }}>
          <Image
            src="/sandrine.JPG"
            alt="LOGO MAMIZA"
            style={{
              height: '400px',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div>
        <div className="container"> <h1 style={{ fontWeight: '800', color: 'white', whiteSpace: 'nowrap' }}> Feel Natural and Happy!!! </h1> </div>
        <div style={{
          border: 'var(--accent-color-1) solid 2px',
          padding: '80px',
          backgroundColor: 'var(--accent-color-2)',
          borderRadius: '40px',
          color: 'white',
        }}
        >
          <div className="d-grid gap-3">
            <Link href="/Categories" passHref>
              <Button variant="light" size="lg">
                Select A Category
              </Button>
            </Link>
            <Link href="/products" passHref>
              <Button variant="light" size="lg">
                View/Add a Product
              </Button>
            </Link>
            <Link href="/StoreMgr" passHref>
              <Button variant="light" size="lg">
                List of Suppliers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
