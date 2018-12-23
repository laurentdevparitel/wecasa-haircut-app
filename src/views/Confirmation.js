import React, { Component } from 'react';

import { Button } from 'reactstrap';

import { Navigation } from '../Navigation';

import { connect } from "react-redux";
import { storeCurrentNavigationIndex, initPrestations, initAddress, initAppointment} from "../redux/actions/actions.js";

import { getNavigationIndexFromView, getNavigationBySlug, redirectTo } from '../helpers.js';

const mapStateToProps = state => {
  return {
    booking: state.booking
   };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCurrentNavigationIndex: navigationIndex => dispatch(storeCurrentNavigationIndex(navigationIndex)),
    initPrestations: () => dispatch(initPrestations()),
    initAddress: () => dispatch(initAddress()),
    initAppointment: () => dispatch(initAppointment())
  };
};

class ConnectedConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: props.booking
    };
    this.handleClickBtn = this.handleClickBtn.bind(this);
  }

  componentDidMount() {
    console.info(`[${this.constructor.name}].componentDidMount`, this.props);
    this.props.storeCurrentNavigationIndex(getNavigationIndexFromView('Confirmation', Navigation));
  }

  componentWillReceiveProps (nextProps) { // called after componentDidMount
    console.info(`[${this.constructor.name}].componentWillReceiveProps`, nextProps);
  }

  handleClickBtn(e){
    console.info(`[${this.constructor.name}].handleClickBtn`);

    // Init Basket (prestations, address, ..)
    this.props.initPrestations()
    this.props.initAddress()
    this.props.initAppointment()

    // Go back to Catalog
    const path = getNavigationBySlug('catalog', Navigation).path;
    redirectTo(path);
  }

  render () {

    const navigationEntry = getNavigationBySlug('confirmation', Navigation);

      return (
        <div>
           <h1> {navigationEntry.title} </h1>

           <section className="selection-container">
              <p>Congratulation ! <br />Your booking has been recorded.</p>

              <Button color="primary" onClick = {() => this.handleClickBtn()}>Start a new Booking</Button>
           </section>

        </div>
      )
   }
}

const Confirmation = connect(mapStateToProps, mapDispatchToProps)(ConnectedConfirmation);

export default Confirmation;
