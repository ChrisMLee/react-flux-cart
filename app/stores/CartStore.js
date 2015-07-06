import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import FluxCartConstants from '../constants/FluxCartConstants';

// assign = underscore extend

// Define initial data points
var _products = {}, _cartVisible = false;

// Add product to cart
function add(sku, update) {
  update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
  _products[sku] = Object.assign({}, _products[sku], update);
}

// Set cart visibility
function setCartVisible(cartVisible) {
  _cartVisible = cartVisible;
}

// Remove item from cart
function removeItem(sku) {
  delete _products[sku];
}

// Extend Cart Store with EventEmitter to add eventing capabilities
class CartStore extends EventEmitter {

  constructor() {
    super();
  }

  // Return cart items
  getCartItems() {
    return _products;
  }

  // Return # of items in cart
  getCartCount() {
    return Object.keys(_products).length;
  }

  // Return cart cost total
  getCartTotal() {
    var total = 0;
    for(var product in _products){
      if(_products.hasOwnProperty(product)){
        total += _products[product].price * _products[product].quantity;
      }
    }
    return total.toFixed(2);
  }

  // Return cart visibility state
  getCartVisible() {
    return _cartVisible;
  }

  // Emit Change event
  emitChange() {
    this.emit('change');
  }

  // Add change listener
  addChangeListener(callback) {
    this.on('change', callback);
  }

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

}

let cartStoreInstance = new CartStore();

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    // Respond to CART_ADD action
    case FluxCartConstants.CART_ADD:
      add(action.sku, action.update);
      break;

    // Respond to CART_VISIBLE action
    case FluxCartConstants.CART_VISIBLE:
      setCartVisible(action.cartVisible);
      break;

    // Respond to CART_REMOVE action
    case FluxCartConstants.CART_REMOVE:
      removeItem(action.sku);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  cartStoreInstance.emitChange();

  return true;

});

export default cartStoreInstance;