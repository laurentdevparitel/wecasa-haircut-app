import React, { Component } from 'react';
import { connect } from "react-redux";

import { removePrestation } from "../../redux/actions/actions.js";

import { ListGroup, ListGroupItem, Badge, Button  } from 'reactstrap';

import { getIndexedPrestations } from '../../helpers.js';

const mapStateToProps = state => {
  return { prestations: state.prestations };
};

const handleClickRemove = (prestationReference, quantity = 1) => {
  console.log('handleClickRemove: ', prestationReference, quantity);

  //removePrestation(prestationReference);  // redux storage
  this.props.removePrestation(prestationReference);  // redux storage
}

const ConnectedPrestationsList = ({ prestations }) => {

  const indexedPrestations = getIndexedPrestations(prestations);

  return (
    <ListGroup flush>
      {/*indexedPrestations.map(prestation => (
        <ListGroupItem key={prestation.reference}>{prestation.title} <Badge pill>x1</Badge> <Button onClick={() => console.log(prestation.reference)}>Remove</Button></ListGroupItem>
      ))*/}
      {Object.keys(indexedPrestations).map(key => (
        <ListGroupItem key={key}>{indexedPrestations[key].title} <Badge pill>x{indexedPrestations[key].quantity}</Badge> <Button onClick={() => handleClickRemove(key)}>Remove</Button></ListGroupItem>
      ))}
    </ListGroup>
  )
};

const BasketItems = connect(mapStateToProps)(ConnectedPrestationsList);

export default BasketItems;
