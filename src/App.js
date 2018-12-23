import React, { Component } from 'react';

import ReduxTestApp from './redux/components/ReduxTestApp';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './views/Home';
import Catalog from './views/Catalog';
import AppointmentForm from './views/AppointmentForm';
import AddressForm from './views/AddressForm';
import BookingSummary from './views/BookingSummary';
import Confirmation  from './views/Confirmation';

import  {BrowserRouter, Route} from 'react-router-dom';

import { Navigation } from './Navigation';
import { getNavigationBySlug } from './helpers.js';

import './styles/App.css';

class App extends Component {
  render() {

    return (
      <BrowserRouter>
        <div className="App-container">
          <Route exact={true} path={getNavigationBySlug('home', Navigation).path} render={() => (
              <div className="App">
                <Header />
                <Home />
              </div>
          )}/>
          <Route exact={true} path={getNavigationBySlug('catalog', Navigation).path} render={() => (
              <div className="App">
                {/*<ReduxTestApp />*/}
                <Header />
                <Catalog />
                <Footer />
              </div>
          )}/>
          <Route exact={true} path={getNavigationBySlug('address-selection', Navigation).path} render={() => (
              <div className="App">
                <Header />
                <AddressForm />
              </div>
          )}/>
          <Route exact={true} path={getNavigationBySlug('appointment-selection', Navigation).path} render={() => (
              <div className="App">
                <Header />
                <AppointmentForm />
              </div>
          )}/>
          <Route exact={true} path={getNavigationBySlug('booking-summary', Navigation).path} render={() => (
              <div className="App">
                <Header />
                <BookingSummary />
              </div>
          )}/>
          <Route exact={true} path={getNavigationBySlug('confirmation', Navigation).path} render={() => (
              <div className="App">
                <Header />
                <Confirmation />
              </div>
          )}/>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
