import React from 'react';
import {  Link } from 'react-router-dom'
import { Nav, Navbar, NavItem, NavLink, NavDropdown, MenuItem, Panel, Grid, Row, Col } from 'react-bootstrap';
import {LinkContainer } from 'react-router-bootstrap';
require('./header.css');

class MainHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/home">Sfera</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to="/home">
                  <NavItem>home</NavItem>
                </LinkContainer>
                <LinkContainer to="/journal">
                  <NavItem>journal</NavItem>
                </LinkContainer>
                <LinkContainer to="/alerts">
                  <NavItem>alerts</NavItem>
                </LinkContainer>
                <LinkContainer to="/history">
                  <NavItem>history</NavItem>
                </LinkContainer>

                <NavDropdown eventKey={3} title="settings" id="settings-nav-dropdown">
                  <MenuItem eventKey={3.1} componentClass={Link} to="/settings_healt" href="/settings_healt">
                    healt
                  </MenuItem>
                  <MenuItem eventKey={3.2} componentClass={Link} to="/" href="/">
                    network
                  </MenuItem>
                </NavDropdown>

                <NavDropdown eventKey={4} title="debug" id="debug-nav-dropdown">
                  <MenuItem eventKey={4.1} componentClass={Link} to="/debug_mqtt" href="/debug_mqtt">mqtt viewer</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

    </div>;

  }
};

export default MainHeader;
