import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import firebaseApp from '../../../../config/firebaseApp';

import defaultAvatar from '../../../../assets/images/defaults/default_avatar.png';

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      user: {},
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem('@user')) });
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  signOut() {
    localStorage.clear();
    return firebaseApp.auth().signOut();
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={this.state.user.profilePhoto || defaultAvatar}
            alt="Foto do usuário"
          />{" "}
          <span className="d-none d-md-inline-block">{this.state.user.firstName} {this.state.user.lastName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Perfil
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => this.signOut()} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
