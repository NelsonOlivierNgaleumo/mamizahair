import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getproducts } from '../api/productsData';
import { useAuth } from '../utils/context/authContext';
import ProductsCard from '../components/ProductsCard';

function Products() {
  // DONE: Set a state for products
  const [products, setproducts] = useState([]);

  // DONE: Get user ID using useAuth Hook
  const { user } = useAuth();

  // DONE: create a function that makes the API call to get all the products
  const getAllTheproducts = () => {
    getproducts(user.uid).then(setproducts);
  };

  // DONE: make the call to the API to get all the products on component render
  useEffect(() => {
    getAllTheproducts();
  }, []);
  console.warn(products);

  return (
    <div className="text-center my-4">
      <Link href="/products/new" passHref>
        <Button>Add products</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* DONE: map over products here using productsCard for each products component, then pass prob productsObj, followed by the function onUpdate which gets all the products */}
        {products.map((product) => (
          <ProductsCard key={product.firebaseKey} productsObj={product} onUpdate={getAllTheproducts} />
        ))}
      </div>

    </div>
  );
}

export default Products;
