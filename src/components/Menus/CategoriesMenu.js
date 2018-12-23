import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class CategoriesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        categories: props.data
    }
  }

  render () {
      const { categories } = this.state;

      return (
        <div className="categoriesMenu">
           <Nav>

           {categories.map(category =>
             <NavItem key={category.reference}>
               <NavLink href={'#'+category.reference}>{category.title}</NavLink>
             </NavItem>
           )}
          </Nav>
        </div>
      )
   }
}
