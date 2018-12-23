import React, { Component } from 'react';
import { connect } from "react-redux";

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { Navigation } from '../../Navigation';

import { isEmptyBasket, getNavigationByIndex } from '../../helpers.js';

const mapStateToProps = state => {
  return {
    prestations: state.prestations,
    currentNavigationIndex: state.currentNavigationIndex,
    address: state.address,
    appointment: state.appointment
   };
};

class ConnectedStepper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousPath: "#",
      nextPath: "#",
      hasPreviousStep: false,
      hasNextStep: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // TODO : create stepValidator ...
  hasNextStep(props) {
    switch (props.currentNavigationIndex){
      case 0: // home
        return false;
      case 1: // catalog
        return !isEmptyBasket(props.prestations);
      case 2: // address-selection
        return (props.address !== null && props.address.length);
      case 3: // appointment-selection
          return (props.appointment !== null && props.address.length);  // TODO : check isValidDate()
      case 4: // confirmation
          return false
      default:
        return false;
    }
  }

  componentDidMount() {
    console.info(`[${this.constructor.name}].componentDidMount`);
    console.log(`[${this.constructor.name}] currentNavigationIndex:`, this.props.currentNavigationIndex);

    this.setState({
      hasPreviousStep: this.props.currentNavigationIndex > 1,
      hasNextStep: this.hasNextStep(this.props)
    })
  }

  componentWillReceiveProps (nextProps) { // called after componentDidMount
    console.info(`[${this.constructor.name}].componentWillReceiveProps`, nextProps);
    console.log(`[${this.constructor.name}] currentNavigationIndex:`, nextProps.currentNavigationIndex);

    this.setState({
      hasPreviousStep: nextProps.currentNavigationIndex > 1,
      hasNextStep: this.hasNextStep(nextProps)
    })
  }

  handleClick (event, value) {
    event.preventDefault();

    let path = null;

    if (parseFloat(value) > 0){ // next page
      path = getNavigationByIndex(this.props.currentNavigationIndex+1, Navigation).path
      this.setState({
        nextPath: path
      })
    }
    else {  // previous page
      path = getNavigationByIndex(this.props.currentNavigationIndex-1, Navigation).path
      this.setState({
        previousPath: path
      })
    }

    // Update URL
    window.location.href = window.location.origin + path;
  }

  render () {

      return (
        <div className="stepper">
          <Pagination size="lg" aria-label="navigation">
            <PaginationItem disabled={!this.state.hasPreviousStep}>
              <PaginationLink previous href={this.state.previousPath} onClick={(e) => this.handleClick(e, "-1")}>
                « Previous Step
              </PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={!this.state.hasNextStep}>
              <PaginationLink next href={this.state.nextPath} onClick={(e) => this.handleClick(e, 1)}>
                Next Step »
              </PaginationLink>
            </PaginationItem>

          </Pagination>

        </div>
      )
   }
}

const Stepper = connect(mapStateToProps)(ConnectedStepper);

export default Stepper;
