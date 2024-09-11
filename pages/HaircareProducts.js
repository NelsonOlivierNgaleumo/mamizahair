import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getHaircare } from '../api/HaircareData';
import HaircareCard from '../components/HaircareCard';
import SearchBar from '../components/SearchBar';

function ViewAHaircare() {
  const [bathProducts, setHaircare] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  const fetchHaircare = () => {
    getHaircare()
      .then((data) => {
        setHaircare(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching haircare products:', error);
      });
  };

  useEffect(() => {
    fetchHaircare();
  }, []);

  const handleSearch = (category, query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = bathProducts.filter((product) => {
      const categoryName = product.category?.name?.toLowerCase() || '';
      const productName = product.name?.toLowerCase() || '';
      const productDescription = product.description?.toLowerCase() || '';
      const matchesCategory = category ? categoryName === category.toLowerCase() : true;
      const matchesQuery = productName.includes(lowercasedQuery) || productDescription.includes(lowercasedQuery);
      return matchesCategory && matchesQuery;
    });
    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    router.push('/newProducts');
  };

  return (
    <div className="container">
      <div className="Button text-center my-4">
        <Button variant="primary" onClick={handleAddProduct}>Add A Product</Button>
      </div>
      <SearchBar category="Afro" onSearch={handleSearch} />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <HaircareCard Obj={product} onUpdate={fetchHaircare} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAHaircare;
