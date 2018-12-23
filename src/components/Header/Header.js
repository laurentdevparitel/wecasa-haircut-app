import React, { Component } from 'react';
import { connect } from "react-redux";

import logo from '../../img/wecasa-logo-header.png';
import { Nav, NavItem, NavLink } from 'reactstrap';

import { Navigation } from '../../Navigation';

const mapStateToProps = state => {
  return {
    currentNavigationIndex: state.currentNavigationIndex
   };
};

class ConnectedHeader extends Component {
  state = {

  }

  componentDidMount() {
    console.info(`[${this.constructor.name}].componentDidMount`);
    console.log(`[${this.constructor.name}] currentNavigationIndex:`, this.props.currentNavigationIndex)
  }
  render () {
      return (
        <header className="header">
          <img src={logo} className="logo" alt="logo" />

          <Nav>
            {Navigation.map((obj,index) => (
              <NavItem key={index}>
                <NavLink href={obj.path} active={(index === this.props.currentNavigationIndex ? true:false)}>{obj.title}</NavLink>
              </NavItem>
            ))}
          </Nav>

        </header>
      )
   }
}

const Header = connect(mapStateToProps)(ConnectedHeader);

export default Header;
