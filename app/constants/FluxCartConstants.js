import keyMirror from 'react/lib/keyMirror';

// Define action constants
export default keyMirror({
  CART_ADD: null,       // Adds item to cart
  CART_REMOVE: null,    // Remove item from cart
  CART_VISIBLE: null,   // Shows or hides the cart
  SET_SELECTED: null,   // Selects a product option
  RECEIVE_DATA: null    // Loads our mock data
});