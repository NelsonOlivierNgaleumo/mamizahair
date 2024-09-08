import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div
      className="Button"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div>
        <h1>Hello {user.displayName}!</h1>
        <h3>Welcome to MamizaHair Store</h3>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div style={{ position: 'relative', marginTop: '-100px' }}>
        <Image
          src="/MamizaHairLogo.jpg"
          alt="MAMIZA HAIR Logo"
          style={{
            height: '200px',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>
      <div style={{ marginTop: '-100px' }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>SELECT A CATEGORY</h3>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/HaircareProducts')}>Haircare</Button>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/AfroProducts')}>Afro</Button>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/SkincareProducts')}>Skincare</Button>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/cart')}>View Cart</Button>
        <p>Click the button below to logout!</p>
        <Button className="d-block w-100" onClick={signOut}>Sign Out</Button>
      </div>
    </div>
  );
}
export default Home;
