import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import FluxCartConstants from '../constants/FluxCartConstants';

// How fluxxor does it
// https://github.com/nelix/fluxxor-react-chrome-boilerplate/blob/4bad47e298c0fbfc5d4f2438296ff9f5335e7609/app/stores/generic.js

// Define initial data points
var _product = {}, _selected = null;

// Method to load product data from mock API
function loadProductData(data) {
  _product = data[0];
  _selected = data[0].variants[0];
}

// Method to set the currently selected product variation
function setSelected(index) {
  _selected = _product.variants[index];
}


// Extend ProductStore with EventEmitter to add eventing capabilities
class ProductStore extends EventEmitter {

  // Return Product data
  getProduct() {
    return _product;
  }

  // Return selected Product
  getSelected(){
    return _selected;
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

let productStoreInstance = new ProductStore();

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case FluxCartConstants.RECEIVE_DATA:
      loadProductData(action.data);
      break;

    // Respond to SELECT_PRODUCT action
    case FluxCartConstants.SELECT_PRODUCT:
      setSelected(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  productStoreInstance.emitChange();

  return true;

});

export default productStoreInstance;

