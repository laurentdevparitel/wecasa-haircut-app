import React, { Component } from 'react';

import API from '../api/API.js';

import { Button } from 'reactstrap';

import { Navigation } from '../Navigation';

import Stepper from '../components/Stepper/Stepper.js';
import Basket from '../components/Basket/Basket.js';

import { connect } from "react-redux";
import { storeCurrentNavigationIndex, storeBooking } from "../redux/actions/actions.js";

import moment from 'moment';
import 'moment/locale/fr';

import { getNavigationIndexFromView, getNavigationBySlug, getPrestationsReferences, redirectTo } from '../helpers.js';

const mapStateToProps = state => {
  return {
    prestations: state.prestations,
    address: state.address,
    appointment: state.appointment,
    booking: state.booking
   };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCurrentNavigationIndex: navigationIndex => dispatch(storeCurrentNavigationIndex(navigationIndex)),
    storeBooking: booking => dispatch(storeBooking(booking))
  };
};

class ConnectedBookingSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {  // TODO : use propTypes !
      prestations: props.prestations,
      address: props.address,
      appointment: props.appointment,
      momentDateObj:  moment(props.appointment),
      booking: props.booking,

      isLoading: false,
      error: null
    };
    this.handleClickConfirmBtn = this.handleClickConfirmBtn.bind(this);
  }

  componentDidMount() {
    console.info(`[${this.constructor.name}].componentDidMount`, this.props);
    this.props.storeCurrentNavigationIndex(getNavigationIndexFromView('BookingSummary', Navigation));
  }

  componentWillReceiveProps (nextProps) { // called after componentDidMount
    console.info(`[${this.constructor.name}].componentWillReceiveProps`, nextProps);
  }

  handleClickConfirmBtn(e){
    console.info(`[${this.constructor.name}].handleClickConfirmBtn`);

    const booking = {
      prestations: getPrestationsReferences(this.state.prestations),
      address: this.state.address,
      appointment: this.state.appointment
    }

    // TODO : create redux async-action
    // https://redux.js.org/advanced/async-actions
    // https://stackoverflow.com/questions/44996357/react-fetch-post-request
    // https://googlechrome.github.io/samples/fetch-api/fetch-post.html

    this.setState({ isLoading: true });

    fetch(API.postBooking(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
    .then((response) => {
      console.log(`[${this.constructor.name}].handleClickConfirmBtn response:`, response);
      if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
    })
    .then(json => {
      console.log(`[${this.constructor.name}].handleClickConfirmBtn json:`, json);
      if (!json.success){
        this.setState({error: json.errors, isLoading: false });
      }
      else {
        this.setState({
          booking: booking,
          isLoading: false
        }, () => {

          // store booking
          this.props.storeBooking(this.state.booking);  // redux storage

          // Go to Confirmation
          const path = getNavigationBySlug('confirmation', Navigation).path;
          redirectTo(path);
        });
      }
		})
    .catch(error => {
      this.setState({error: error, isLoading: false})
			console.error('Error happened during fetching : ', this.state.error);
		});

  }

  render () {

    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    const navigationEntry = getNavigationBySlug('booking-summary', Navigation);

      return (
        <div>
           <h1> {navigationEntry.title} </h1>

           <section className="selection-container">

              <div className="entry">
                <h3> Your Prestation(s) : </h3>
                <Basket />
              </div>

              <div className="entry">
                 <h3> Your Address : </h3>
                 <p>{this.state.address}</p>
              </div>

              <div className="entry">
                 <h3> Your Appointment : </h3>
                 <p>{this.state.momentDateObj.format('dddd D MMMM YYYY')} at {this.state.momentDateObj.format('HH')}h{this.state.momentDateObj.format('mm')}</p>
              </div>

             <Button color="primary" onClick = {() => this.handleClickConfirmBtn()}>Confirm</Button>
           </section>

           <Stepper />
           <Basket />
        </div>
      )
   }
}

const BookingSummary = connect(mapStateToProps, mapDispatchToProps)(ConnectedBookingSummary);

export default BookingSummary;
