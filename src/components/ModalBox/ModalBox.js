import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalBox extends Component {
  constructor(props) {
    super(props);
    //console.log('Prestation props:', props.data)
    this.state = {

      modal: props.data.modal,
      modalClassName: "modal-dialog",

      title: props.data.title,
      content: props.data.content
    }
    this.toggle = this.toggle.bind(this);    
    //this.modalBoxRef = React.createRef();
  }

  componentDidMount() {
    //console.info('ModalBox.componentDidMount');
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //console.info('ModalBox.componentDidUpdate', prevProps, prevState);
  }
/*
  shouldComponentUpdate(nextProps, nextState){
    //console.info('ModalBox.shouldComponentUpdate', nextProps, nextState);
    //return true;
  }
*/
  componentWillReceiveProps(nextProps) {  // ... deprecated
      //console.info('ModalBox.componentWillReceiveProps', nextProps);
      this.setState({
        modal: nextProps.data.modal,
        title: nextProps.data.title,
        content: nextProps.data.content
      });
  }

  // modalBox
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    return (
      [/*<Button color="danger" onClick={this.toggle}>Test modal</Button>,*/
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.modalClassName}>
        <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
        <ModalBody>
          {this.state.content}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>]
    );
   }
  }
