import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createStoreMgr, getStoreMgr, updateStoreMgr } from '../../api/StoreMgrData';

// Setting the initial state of each inputs to empty
const initialState = {
  first_name: '',
  last_name: '',
  image: '',
  email: '',
  favorite: false,
};

function StoreMgrForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [StoreMgr, setStoreMgr] = useState([]); // Creating a state variable called StoreMgr with initial value and data type of array of objects
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   // if prop has a firebasekey (edit)
  //   if (obj.firebaseKey) {
  //     // then set the formInput to that object so that the user can see what they are editing
  //     setFormInput(obj);
  //     console.warn(formInput);
  //   }
  //   // we need to put obj as an independency in case obj changes
  // }, [obj, user]);
  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        ...obj,
      });
    }
  }, [obj]);

  useEffect(() => {
    getStoreMgr(user.uid).then(setStoreMgr);// Getting the StoreMgr by uid, and setStoreMgr
  }, [user.uid]);
  // we need a handleChange function to help us to type into our form inputs, since a value is connected to it, so we can control it and tell it to do whatever we want once we type in it or make any change to it. So the handleChange helps us define what we want it to do when the change is happening. For that, we need an event listener parameter (e) to pass the event object to the function we're calling.
  const handleChange = (e) => {
    const { name, value } = e.target; // So we destructure the name and value from any event we target. Meaning on each target that we're calling, we'll get the name and the value attributes (both of these should match inorder to correspond to the input we want). To change a state variable (FormInput) we need to call SetFormImput (since Set is a callback function and can access the previous state of empty string '' so we can make changes to it)
    setFormInput((prevState) => ({
      // we'll use a spread operator (...) to spread out an object in order to append/modify it. So we use (...prevState), to spread out our object (prevState of empty string ' ').
      ...prevState,
      // then we say for attribute [name], give it whatever new value the user puts in
      [name]: value,
    }));
    // next we need to add this function handleChange in all our Inputs as the value for onChange
  };
  // When we submit a form we want to prevent the default behaviour
  const handleSubmit = (e) => {
    // When we submit a form we want to prevent the default behaviour and make sure we control our data i.e to prevent the page from reloading and to prevent all our keys from going into the url
    e.preventDefault();

    // Check if obj exists and if firebaseKey is present
    if (obj.firebaseKey) {
      updateStoreMgr(formInput).then(() => router.push(`/StoreMgr/${obj.firebaseKey}`));
    } else {
      // So on submit we want to create an object called payload with value formInput. We also need a spread operator (...) in order to modify uid key, with value user.uid
      const payload = { ...formInput, uid: user.uid };
      // now that we have our object payload ready to be submitted, we need an api call [POST], createStoreMgr, and pass it our payload. Since whenever we make a POST request in firebase, it sends back a firebasekey called name, then we need to use {} to destructure the name
      createStoreMgr(payload).then(({ name }) => {
        // To Update/modify whatever we have created in firebase we need an api call [PATCH], so we create a variable called patchPayload, which equals a key called firebasekey with value name
        const patchPayload = { firebaseKey: name };
        // we need api call updateStoreMgr, pass it patchPayload with firebase (from storeMgrData.js), then i want the result of this update to render to my a specific page, so i use the router.push('/'),root route, for homePage/indexPage or use router.push('/StoreMgr')
        updateStoreMgr(patchPayload).then(() => {
          router.push('/StoreMgr');
        });
      });
    }
  };
  // We want to add data to our database by clicking on the submit button on the form, for that we need an attribute called onSubmit (to tell it what we want it to do upon clicking on that submit button) and also create a corresponding handle fxn for that handleSubmit
  return (
    <Form onSubmit={handleSubmit}>
      {/* we want to see either update or create, depending on if there is a firebasekey present or not  */}
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} NEW STORE MANAGER</h2>

      {/* FIRST NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a first name"
          name="first_name"
          value={formInput.first_name} // this value relates to the initial state just like queryselector
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change so that it updates that state
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a last name"
          name="last_name"
          value={formInput.last_name} // this value relates to the initial state just like queryselector
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

      {/* EMAIL INPUT */}
      <FloatingLabel controlId="floatingInput4" label="E-mail" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter an email"
          name="email"
          value={formInput.email} // this value relates to the initial state just like queryselector
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change so that it updates that state
          required
        />
      </FloatingLabel>
      {/* AFRO SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Afro">
        <Form.Select
          aria-label="Afro"
          name="afro_id"
          onChange={handleChange} // putting handleChange function on every inputs where we'd do a change
          className="mb-3"
          value={formInput.afro_id || ''} // this value relates to the initial state just like queryselector
          required
        >
          {/* we want to map through StoreMgr, and for each StoreMgr create an option with Afro as their key and value, it will show the Afro's first name and last name  */}
          <option value="">Select an Afro Product</option>
          {
            StoreMgr.map((Afro) => (
              <option
                key={Afro.firebaseKey}
                value={Afro.firebaseKey}
              >
                {Afro.first_name} {Afro.last_name}
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
        label="Favorite Store Manager?"
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

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} A NEW MANAGER </Button>
    </Form>
  );
}

StoreMgrForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    afro_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
// we need a default prop if the prop is absent, the default is initial state
StoreMgrForm.defaultProps = {
  obj: initialState,
};
// we need to pass a prob object for the edit item and we have to use handle fxn to tell it what should happen when in edit and define it in useEffect as well
export default StoreMgrForm;
