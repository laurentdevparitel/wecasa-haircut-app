import React, { Component } from 'react';

import API from '../api/API.js';

import { Navigation } from '../Navigation';

import CategoriesMenu from '../components/Menus/CategoriesMenu.js';
import Prestation from '../components/Prestation/Prestation.js';
import Basket from '../components/Basket/Basket.js';
import Stepper from '../components/Stepper/Stepper.js';

import uuidv1 from "uuid";

import { connect } from "react-redux";
import { storeCatalog, storeCurrentNavigationIndex  } from "../redux/actions/actions.js";

import { getNavigationIndexFromView, getNavigationBySlug } from '../helpers.js';

const mapStateToProps = state => {
  return {
    catalog: state.catalog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCatalog: catalog => dispatch(storeCatalog(catalog)),
    storeCurrentNavigationIndex: navigationIndex => dispatch(storeCurrentNavigationIndex(navigationIndex))
    //storeCurrentPrestation: prestation => dispatch(storeCurrentPrestation(prestation))  // TO IMPLEMENT
  };
};

class ConnectedCatalog extends Component {
  constructor() {
    super();
    this.state = {
      catalog: null,

      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    console.info(`[${this.constructor.name}].componentDidMount`);
    //console.info('getCurrentPathname:', this.context.router.getCurrentPathname()); // KO

    this.props.storeCurrentNavigationIndex(getNavigationIndexFromView('Catalog', Navigation));  // redux storage

    if (this.props.catalog !== null){
      console.log(`[${this.constructor.name}].componentDidMount : catalog allready stored !`, this.props.catalog);
      this.setState({ catalog: this.props.catalog });
    }
    else {
      console.log(`[${this.constructor.name}].componentDidMount : catalog not stored ... Fetching catalog API ...`)
      this.getCatalog();
    }
  }

  // TODO : create redux async-action
  // https://redux.js.org/advanced/async-actions
  getCatalog() {
    console.info(`[${this.constructor.name}].getCatalog`);

    this.setState({ isLoading: true });

    fetch(API.getUniverse())
		.then(response  => {
      if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
		.then(json => {
      console.info('JSON', json);
			this.setState({ catalog: json, isLoading: false });
      this.props.storeCatalog(this.state.catalog);  // redux storage
		})
		.catch(error => {
      this.setState({error: error, isLoading: false})
			console.error('Error happened during fetching : ', this.state.error);
		});
  }

  componentWillUnmount() {
    //
  }

  render () {

      const { catalog, isLoading, error } = this.state;

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }

      if (!catalog){
          console.log('Catalog not loaded yet ...');
          return null;
      }

      if (!catalog.categories.length){
          console.error('Catalog categories not found...');
          return null;
      }

      const navigationEntry = getNavigationBySlug('catalog', Navigation);

      return (
        <div>
           <h1> {navigationEntry.title} </h1>

           <section className="catalog">
              <CategoriesMenu data={this.state.catalog.categories} />

              <section className="prestations">

                {this.state.catalog.categories.map(category => (
                  [<h2 id={category.reference}>{category.title}</h2>,
                  <ul className="prestationsList" key={uuidv1()}>
                    {category.prestations.map(prestation =>
                      <li key={prestation.reference}>
                        <Prestation data={prestation} />
                      </li>
                    )}
                  </ul>]
                ))}

              </section>
           </section>

           <Stepper />
           <Basket />
        </div>
      )
   }
}

const Catalog = connect(mapStateToProps, mapDispatchToProps)(ConnectedCatalog);

export default Catalog;
