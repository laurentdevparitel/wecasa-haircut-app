import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { Navigation } from '../Navigation';

import Stepper from '../components/Stepper/Stepper.js';
import Basket from '../components/Basket/Basket.js';

import { connect } from "react-redux";
import { storeCurrentNavigationIndex, storeAddress  } from "../redux/actions/actions.js";

import PlacesAutocomplete from 'react-places-autocomplete';

import { getNavigationIndexFromView, getNavigationBySlug } from '../helpers.js';

// cf : https://github.com/hibiken/react-places-autocomplete
import {
  geocodeByAddress,
  //geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

const mapStateToProps = state => {
  return {
    address: state.address  // NB: if user goes back to address form ...
   };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCurrentNavigationIndex: navigationIndex => dispatch(storeCurrentNavigationIndex(navigationIndex)),
    storeAddress: address => dispatch(storeAddress(address))
  };
};

class ConnectedAddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      isClearBtnVisible: props.address.length
    };
    this.handleClickClearBtn = this.handleClickClearBtn.bind(this);
  }

  componentDidMount() {
    //console.info(`[${this.constructor.name}].componentDidMount`, this.props);
    this.props.storeCurrentNavigationIndex(getNavigationIndexFromView('AddressForm', Navigation));  // redux storage

    this.setState({
      address: this.props.address,
      isClearBtnVisible: this.props.address ? this.props.address.length : false
    });
  }

  componentWillReceiveProps (nextProps) { // called after componentDidMount
    //console.info(`[${this.constructor.name}].componentWillReceiveProps`, nextProps);
  }

  handleChange = address => {
    //console.info(`[${this.constructor.name}].handleChange`, address);
    this.setState({
      address: address,
      isClearBtnVisible: address.length
     });
  };

  handleSelect = address => {
    console.info(`[${this.constructor.name}].handleSelect`, address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log(`[${this.constructor.name}] success:`, latLng);
        this.setState({
          address : address
         }, () => {

           // store address
           this.props.storeAddress(this.state.address);  // redux storage
         });
      })
      .catch(error => {
        console.error(`[${this.constructor.name}] Error:`, error);
      });
  };

  handleClickClearBtn (e){
    this.setState({ // NB: setState is async !!!
      address: '',
      isClearBtnVisible: false
    }, () => {
      console.log(`[${this.constructor.name}] handleClickClearBtn address:`, this.state);
      // store address
      this.props.storeAddress(this.state.address);  // redux storage
    });

  }

  render () {

    const navigationEntry = getNavigationBySlug('address-selection', Navigation);

    const placesAutocompleteClassNamePrefix = "PlacesAutocomplete__";
      return (
        <div>
           <h1> {navigationEntry.title} </h1>

           <div className= {placesAutocompleteClassNamePrefix + 'search-bar-container'}>

             <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

                  <div className= {placesAutocompleteClassNamePrefix + 'search-input-container'}>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: placesAutocompleteClassNamePrefix + 'search-input',
                      })}
                    />
                    <Button onClick = {() => this.handleClickClearBtn()} className = {placesAutocompleteClassNamePrefix + 'clear-button' + (!this.state.isClearBtnVisible ? ' invisible':'')}>x</Button>

                    <div className = {placesAutocompleteClassNamePrefix + "autocomplete-container"}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {

                        const className = suggestion.active
                          ? placesAutocompleteClassNamePrefix + 'suggestion-item--active'
                          : placesAutocompleteClassNamePrefix + 'suggestion-item';

                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>

            <div className={"selection-container" + ( (this.state.address !== null && this.state.address.length) ? '':' invisible')}>
              <h3> Your Address : </h3>

              <p>{this.state.address}</p>
              {/*<p><i>{this.props.address}</i></p>*/}
            </div>

           <Stepper />
           <Basket />
        </div>
      )
   }
}

const AddressForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedAddressForm);

export default AddressForm;
