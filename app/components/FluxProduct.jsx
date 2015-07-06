import React from 'react';
import FluxCartActions from '../actions/FluxCartActions';

// Flux product view
export default class FluxProduct extends React.Component {

  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }
  // Add item to cart via Actions
  addToCart(event){
    var sku = this.props.selected.sku;
    var update = {
      name: this.props.product.name,
      type: this.props.selected.type,
      price: this.props.selected.price
    };
    FluxCartActions.addToCart(sku, update);
    FluxCartActions.updateCartVisible(true);
  }

  // Select product variation via Actions
  selectVariant(event){
    FluxCartActions.selectProduct(event.target.value);
  }

  // Render product View
  render() {
    var ats = (this.props.selected.sku in this.props.cartitems) ?
      this.props.selected.inventory - this.props.cartitems[this.props.selected.sku].quantity :
      this.props.selected.inventory;
    return (
      <div className="flux-product">
        <img src={'img/' + this.props.product.image}/>
        <div className="flux-product-detail">
          <h1 className="name">{this.props.product.name}</h1>
          <p className="description">{this.props.product.description}</p>
          <p className="price">Price: ${this.props.selected.price}</p>
          <select onChange={this.selectVariant}>
            {this.props.product.variants.map(function(variant, index){
              return (
                <option key={index} value={index}>{variant.type}</option>
              );
            })}
          </select>
          <button type="button" onClick={this.addToCart} disabled={ats > 0 ? '' : 'disabled'}>
            {ats > 0 ? 'Add To Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    );
  }

}