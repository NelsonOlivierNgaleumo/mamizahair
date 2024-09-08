import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SearchBar({ category, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(category, query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '340px', margin: '0 auto' }} className="mb-4">
      <Form.Group controlId="searchQuery">
        <Form.Control
          type="text"
          placeholder="Search products by name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form.Group>
      <Button className="btn btn-success" type="submit">Search</Button>
    </form>
  );
}

SearchBar.propTypes = {
  category: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
