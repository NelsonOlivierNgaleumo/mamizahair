import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import {
  createproduct, updateproduct,
} from '../../api/productsData';
import { getcategories } from '../../api/categoriesData';

// we use props argument to pass data from one component to another (from the card to form)
// we need to create a default/initial state for all inputs in the form

const initialState = {
  product_name: '',
  image: '',
  description: '',
  price: '',
  stockquantity: '',
  category: '',
  favorite: false,

};

function ProductsForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // Creating a state variable called products with initial value and data type of array of objects
  const router = useRouter(); // hook to route to different pages
  const { user } = useAuth(); // hook for specific data of each user
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getcategories().then(setcategories);
  });

  // we need a handleChange function to help us to type into our form inputs, since a value is connected to it, so we can control it and tell it to do whatever we want once we type in it or make any change to it. So the handleChange helps us define what we want it to do when the change is happening. For that, we need an event listener parameter (e) to pass the event object to the function we're calling.
  const handleChange = (e) => {
    const { name, value } = e.target; // So we destructure the name and value from any event we target. Meaning on each target that we're calling, we'll get the name and the value attributes (both of these should match inorder to correspond to the input we want). To change a state variable (FormInput) we need to call SetFormImput (since Set is a callback function and can access the previous state of empty string '' so we can make changes to it)
    setFormInput((prevState) => ({
    // we'll use a spread operator (...) to spread out an object in order to append/modify it. So we use (...prevState), to spread out our object (prevState of empty string ' ').
      ...prevState,
      // then we say for attribute [name], give it whatever new value the user puts in
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  // When we submit a form we want to prevent the default behaviour and make sure we control our data i.e to prevent the page from reloading and to prevent all our keys from going into the url
    e.preventDefault();

    // Check if obj exists and if firebaseKey is present
    if (obj.firebaseKey) {
      updateproduct(formInput).then(() => router.push(`/products/${obj.firebaseKey}`));
    } else {
    // So on submit we want to create an object called payload with value formInput. We also need a spread operator (...) in order to modify uid key, with value user.uid
      const payload = { ...formInput, uid: user.uid };
      // now that we have our object payload ready to be submitted, we need an api call [POST], createproducts, and pass it our payload. Since whenever we make a POST request in firebase, it sends back a firebasekey called name, then we need to use {} to destructure the name
      createproduct(payload).then(({ name }) => {
      // To Update/modify whatever we have created in firebase we need an api call [PATCH], so we create a variable called patchPayload, which equals a key called firebasekey with value name
        const patchPayload = { firebaseKey: name, uid: user.uid };
        // we need api call updateproducts, pass it patchPayload with firebase (from productsData.js), then i want the result of this update to render to my a specific page, so i use the router.push('/'),root route, for homePage/indexPage or use router.push('/products')
        updateproduct(patchPayload).then(() => {
          router.push('/products');
        });
      });
    }
  };
  // We want to add data to our database by clicking on the submit button on the form, for that we need an attribute called onSubmit (to tell it what we want it to do upon clicking on that submit button) and also create a corresponding handle fxn for that handleSubmit
  return (
    <Form onSubmit={handleSubmit}>
      {/* we want to see either update or create, depending on if there is a firebasekey present or not  */}
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} NEW PRODUCT</h2>

      {/* PRODUCT NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Product Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter name of product"
          name="product_name"
          value={formInput.product_name} // this value relates to the initial state just like queryselector
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change so that it updates that state
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Product Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter product price"
          name="price"
          value={formInput.price} // this value relates to the initial state just like queryselector
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change so that it updates that state
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image URL"
          name="image"
          value={formInput.image} // this value relates to the initial state just like queryselector
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change so that it updates that state
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* STOCK QUANTITY INPUT */}
      <FloatingLabel controlId="floatingInput4" label="Quantity" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter stock quantity"
          name="stockquantity"
          value={formInput.stockquantity} // this value relates to the initial state just like queryselector
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change so that it updates that state
          required
        />
      </FloatingLabel>

      {/* CATEGORY SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="category">
        <Form.Select
          aria-label="Product Category"
          name="category"
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change
          className="mb-3"
          value={formInput.category || ''} // this value relates to the initial state just like queryselector
          required
        >
          {/* we want to map through products, and for each products create an option with category as their key and value, it will show the category's name  */}
          <option value="">Select a Category</option>
          {
          categories.map((category) => (
            <option
              key={category.firebasekey}
              value={category.firebaseKey}
            >
              {category.name}
            </option>
          ))
        }
        </Form.Select>
      </FloatingLabel>

      {/* FAVORITE TOGGLE */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite Product ?"
        checked={formInput.favorite} // this value is a boolean relates to the initial state tells whether true or false just like queryselector
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON */}
      {/* we want to see either update or create, depending on if there is a firebasekey present or not  */}

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} A NEW PRODUCT </Button>
    </Form>
  );
}

ProductsForm.propTypes = {
  obj: PropTypes.shape({
    product_name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    favorite: PropTypes.bool,
    stockquantity: PropTypes.string,
    category: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
// we need a default prop if the prop is absent, the default is initial state
ProductsForm.defaultProps = {
  obj: initialState,
};
// we need to pass a prob object for the edit item and we have to use handle fxn to tell it what should happen when in edit and define it in useEffect as well
export default ProductsForm;
