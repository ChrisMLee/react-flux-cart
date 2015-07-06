// import React from 'react';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <h1>The handrolled scotch app</h1>
//       </div>
//     );
//   }
// }

import React from 'react';
import CartStore from '../stores/CartStore';
import ProductStore from '../stores/ProductStore';
import FluxProduct from './FluxProduct';
import FluxCart from './FluxCart';

// Method to retrieve state from Stores
function getCartState() {
  return {
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}

// Define main Controller View
export default class FluxCartApp extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = getCartState();
  }
  // Add change listeners to stores
  componentDidMount() {
    ProductStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  }

  // Remove change listers from stores
  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  }

  // Method to setState based upon Store changes
  _onChange(){
    this.setState(getCartState());
  }

  // Render our child components, passing state via props
  render() {
    return (
      <div className="flux-cart-app">
        <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
        <FluxProduct product={this.state.product} cartitems={this.state.cartItems} selected={this.state.selectedProduct} />
      </div>
    );
  }
}

