import React, { Component } from 'react';

//import API from '../api/API.js';

import { Navigation } from '../Navigation';

import { connect } from "react-redux";
import { storeCurrentNavigationIndex  } from "../redux/actions/actions.js";

import { getNavigationBySlug, getNavigationIndexFromView } from '../helpers.js';

const mapDispatchToProps = dispatch => {
  return {
    storeCurrentNavigationIndex: navigationIndex => dispatch(storeCurrentNavigationIndex(navigationIndex))
  };
};

class ConnectedHome extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    console.info(`[${this.constructor.name}].componentDidMount`);
    this.props.storeCurrentNavigationIndex(getNavigationIndexFromView('Home', Navigation));  // redux storage
  }

  render () {

    const navigationEntry = getNavigationBySlug('home', Navigation);

      return (
        <div>
           <h1> {navigationEntry.title} </h1>

           <div className="home">
              <p><a href={getNavigationBySlug('catalog', Navigation).path}>Go to {getNavigationBySlug('catalog', Navigation).title}</a></p>
           </div>
        </div>
      )
   }
}

const Home = connect(null, mapDispatchToProps)(ConnectedHome);

export default Home;
