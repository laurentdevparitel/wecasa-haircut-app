import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import ModalBox from '../../components/ModalBox/ModalBox.js';

import uuidv1 from "uuid";

import { connect } from "react-redux";

import { addPrestation } from "../../redux/actions/actions.js";

const mapStateToProps = store => {
  return {
    catalog: store.catalog,
    currentPrestation: store.currentPrestation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPrestation: prestation => dispatch(addPrestation(prestation))
  };
};

class ConnectedPrestation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: props.data.duration,
      price: props.data.price,
      reference: props.data.reference,
      title: props.data.title,

      modalBox: {
        modal: false,
        title: '',
        content: ''
      }
    }
    this.handleClickDescription = this.handleClickDescription.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  componentDidMount() {
    //console.info(`[${this.constructor.name}].componentDidMount`);
  }

  formatDuration(duration, unit = 'min'){
    const M_UNIT = "minutes";
    //const H_UNIT = "heure";

    // TODO : > 60 minutes : 1h30  ...
    /*
    if (unit === 'min'){
      if (duration < 60){
        return duration + M_UNIT
      }
      return duration
    }
    */
    return duration + " " + M_UNIT;
  }

  formatPrice(price, devise = '€'){
    return Number(price)/100 + " " + devise;
  }

  getPrestation(prestationReference){
    //console.info(`[${this.constructor.name}].getPrestation`, prestationReference);

    if (!this.props.catalog){
      throw new Error('Catalog not set !');
    }
    if (typeof (this.props.catalog.categories) === "undefined"){
      throw new Error('No catalog categories found !');
    }

    let foundPrestation = null;
    this.props.catalog.categories.forEach(category => (
      category.prestations.forEach(prestation => {
        if (prestation.reference === prestationReference){
          foundPrestation = prestation;
        }
      })
    ));
    return foundPrestation;
  }

  handleClickDescription(prestationReference){
    //console.info(`[${this.constructor.name}].handleClickDescription`, prestationReference);

    const prestation = this.getPrestation(prestationReference);

    if (!prestation){
      throw new Error('Prestation '+prestationReference+' not found !');
    }

    // Update modalBox props & state
    this.setState({modalBox: {
      modal: true,
      title: prestation.title
    }});
  }

  handleClickAdd(prestationReference){
    //console.info(`[${this.constructor.name}].handleClickAdd`, prestationReference);

    const prestation = this.getPrestation(prestationReference);
    if (!prestation){
      throw new Error('Prestation '+prestationReference+' not found !');
    }
    this.props.addPrestation(prestation);
  }

  render () {
    return (
      <div className="prestation" key={uuidv1()}>
        <Card>
          {/*<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
          <CardBody>
            <CardTitle>{this.state.title}</CardTitle>
            <CardSubtitle>{this.formatDuration(this.state.duration)}</CardSubtitle>
            <CardText>{this.formatPrice(this.state.price)}</CardText>
            <CardText><a href="#" onClick={() => this.handleClickDescription(this.state.reference)}>Description</a></CardText>
            <Button onClick={() => this.handleClickAdd(this.state.reference)}>Add</Button>
          </CardBody>
        </Card>

        <ModalBox data={this.state.modalBox} key={uuidv1()} />
      </div>
    );
   }
}

const Prestation = connect(mapStateToProps, mapDispatchToProps)(ConnectedPrestation);

export default Prestation;
