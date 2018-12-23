import React, { Component } from 'react';
import { connect } from "react-redux";

import { removePrestation } from "../../redux/actions/actions.js";

import { ListGroup, ListGroupItem, Badge, Button  } from 'reactstrap';

import { getIndexedPrestations, convertMinToMinAndHour } from '../../helpers.js';

//import BasketItems from './BasketItems.js';

const mapStateToProps = state => {
  return {
    prestations: state.prestations,
    currentNavigationIndex: state.currentNavigationIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removePrestation: prestationReference => dispatch(removePrestation(prestationReference))
  };
};

class ConnectedBasket extends Component {
  constructor(props) {
    super(props);
    //console.log('Basket props:', props.data)
    this.state = {
      totalDuration: 0,
      totalPrice: 0
    }
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickRemove (prestationReference, quantity = 1) {
    this.props.removePrestation(prestationReference);  // redux storage
  }

  componentDidMount() {
    //console.info('Basket.componentDidMount');
  }

  // To store ?
  getTotalPrice(prestations){
    let totalPrice = 0;
    prestations.map(prestation => (
      totalPrice += prestation.price
    ))
    return totalPrice/100;
  }

  // To store ?
  getTotalDuration(prestations){
    let totalDuration = 0;
    prestations.map(prestation => (
      totalDuration += prestation.duration
    ))
    return convertMinToMinAndHour(totalDuration);
  }

  render () {

    const indexedPrestations = getIndexedPrestations(this.props.prestations);

    let listGroup;  // TODO : show lists aside catalog
    if (this.props.currentNavigationIndex === 1){ // showed on catalog only
      listGroup = <ListGroup flush>
        {/*indexedPrestations.map(prestation => (
          <ListGroupItem key={prestation.reference}>{prestation.title} <Badge pill>x1</Badge> <Button onClick={() => console.log(prestation.reference)}>Remove</Button></ListGroupItem>
        ))*/}
        {Object.keys(indexedPrestations).map(key => (
          <ListGroupItem key={key}>{indexedPrestations[key].title} <Badge pill>x{indexedPrestations[key].quantity}</Badge> <Button onClick={() => this.handleClickRemove(key)}>Remove</Button></ListGroupItem>
        ))}
      </ListGroup>
    }
    else if (this.props.currentNavigationIndex === 4){ // showed on confirmation only
      listGroup = <ListGroup flush>
        {Object.keys(indexedPrestations).map(key => (
          <ListGroupItem key={key}>{indexedPrestations[key].title} <Badge pill>x{indexedPrestations[key].quantity}</Badge> </ListGroupItem>
        ))}
      </ListGroup>
    }

      return (
        <section className="basket">
          {listGroup}

          <div className="total">
            <p>Total Price : <b>{this.getTotalPrice(this.props.prestations)}€</b></p>
            <p>Total Duration : <b>{this.getTotalDuration(this.props.prestations)}</b></p>
          </div>
        </section>
      )
   }
}

const Basket = connect(mapStateToProps, mapDispatchToProps)(ConnectedBasket);

export default Basket;
