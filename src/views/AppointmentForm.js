import React, { Component } from 'react';

import { Navigation } from '../Navigation';

import Stepper from '../components/Stepper/Stepper.js';
import Basket from '../components/Basket/Basket.js';

import { connect } from "react-redux";
import { storeCurrentNavigationIndex, storeAppointment } from "../redux/actions/actions.js";

// https://www.npmjs.com/package/react-datetime
// https://github.com/YouCanBookMe/react-datetime
import DateTime from 'react-datetime';
import '../components/DateTime/DateTime.css';

import moment from 'moment';
import 'moment/locale/fr';

import { getNavigationIndexFromView, getNavigationBySlug } from '../helpers.js';

const mapStateToProps = state => {
  return {
    appointment: state.appointment  // NB: if user goes back ...
   };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCurrentNavigationIndex: navigationIndex => dispatch(storeCurrentNavigationIndex(navigationIndex)),
    storeAppointment: appointment => dispatch(storeAppointment(appointment))
  };
};

class ConnectedAppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: props.appointment,
      momentDateObj: props.appointment !== null ? moment(props.appointment) :  null // NB: default now() 00:00 ?
    };
    //this.getValidDate = this.getValidDate.bind(this);
    //this.getDefaultDateValue = this.getDefaultDateValue.bind(this);
    this.onHandleChangeDateTime = this.onHandleBlurDateTime.bind(this);
    this.onHandleBlurDateTime = this.onHandleBlurDateTime.bind(this);
  }

  componentDidMount() {
    console.info(`[${this.constructor.name}].componentDidMount`, this.props);
    this.props.storeCurrentNavigationIndex(getNavigationIndexFromView('AppointmentForm', Navigation));  // redux storage

    this.setState({
      appointment: this.props.appointment
    });
  }

  componentWillReceiveProps (nextProps) { // called after componentDidMount
    console.info(`[${this.constructor.name}].componentWillReceiveProps`, nextProps);
  }

  // NB : test moment.js : http://jsfiddle.net/hobbyman/bkqU5/
  /*
  getDefaultDateValue(){
    console.info(`[${this.constructor.name}].getDefaultDateValue`, arguments);
    // next day starting at 7AM
    const momentDateObj = moment().add(1, 'days').hours(7).minutes(0).seconds(0);
    return new Date(momentDateObj.format());
  }
  */
  getValidDate(currentDate){
    //console.info(`[${this.constructor.name}].getValidDate`, currentDate);

    // only allow today and future dates
    //const yesterday = moment().subtract(1, 'day');
    //return currentDate.isAfter(yesterday);
    const now = moment();
    return currentDate.isAfter(now);
  }

  getValidTimes(){
    console.info(`[${this.constructor.name}].getValidDate`, arguments);
    return {
      hours: {
        min: 7,
        max: 22
      },
      minutes: {
        min: 0,
        max: 59,
        step: 1,  // 15
      }
    };
  }
  onHandleChangeDateTime(date){
    //console.log(`[${this.constructor.name}].onHandleChangeDateTime`, date);
  }
  onHandleViewModeChangeDateTime(date){
    //console.log(`[${this.constructor.name}].onHandleViewModeChangeDateTime`, date);
  }

  onHandleBlurDateTime(date){
    console.log(`[${this.constructor.name}].onHandleBlurDateTime`, date);
    const date_ISO = date.format();

    console.log(`[${this.constructor.name}].onHandleBlurDateTime date_ISO: `, date_ISO);

    this.setState({
      appointment : date_ISO,
      momentDateObj : date
     }, () => {

       // store appointment
       this.props.storeAppointment(this.state.appointment);  // redux storage
     });
  }

  getFormatDate(momentDateObj){
    if (momentDateObj === null) return "";

    return momentDateObj.format('dddd D MMMM YYYY') + " at " + momentDateObj.format('HH') +"h"+ momentDateObj.format('mm');
  }

  //  https://stackoverflow.com/questions/25725019/how-do-i-format-a-date-as-iso-8601-in-moment-js
  // https://momentjs.com/docs/#/displaying/

  render () {

      const navigationEntry = getNavigationBySlug('appointment-selection', Navigation);

      const timeConstraints = {
        hours: {
          min: 7,
          max: 22
        },
        minutes: {
          min: 0,
          max: 59,
          step: 1  // 15
        }
      }

      // next day starting at 7AM !
      const defaultMomentDateObj = moment().add(1, 'days').hours(7).minutes(0).seconds(0);
      const defaultValue = new Date(defaultMomentDateObj.format())

      return (
        <div>
           <h1> {navigationEntry.title} </h1>

           <div className='dateTime-container'>
            <DateTime
              locale='fr'
              defaultValue = {defaultValue}
              isValidDate = {this.getValidDate}
              timeConstraints = {timeConstraints}
              value={(this.state.appointment !== null ? new Date(this.state.appointment) : '')}
              onChange={ this.onHandleChangeDateTime }
              onBlur={ this.onHandleBlurDateTime}
              onViewModeChange={ this.onHandleViewModeChangeDateTime }
            />
          </div>

            <div className={"selection-container" + ( this.state.momentDateObj !== null ? '':' invisible')}>
              <h3> Your Appointment : </h3>

              <p>{this.getFormatDate(this.state.momentDateObj)}</p>
              {/*<p><i>{this.props.appointment}</i></p>*/}
            </div>

           <Stepper />
           <Basket />
        </div>
      )
   }
}

const AppointmentForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedAppointmentForm);

export default AppointmentForm;
