import React, { Component } from 'react';
import { IconButton } from '../../components/buttons';
import { Wrapper, MenuContainer, MenuOverlay, Absolute } from './style';

class Menu extends Component {
  constructor() {
    super();

    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  render() {
    const { hasNavBar, darkContext } = this.props;
    const { menuIsOpen } = this.state;
    return (
      <Wrapper darkContext={darkContext}>
        <IconButton glyph={'menu'} onClick={() => this.toggleMenu()} />
        <Absolute open={this.state.menuIsOpen} hasNavBar={hasNavBar}>
          <MenuContainer hasNavBar={hasNavBar}>
            {menuIsOpen && this.props.children}
          </MenuContainer>
          <IconButton
            glyph={'view-close'}
            onClick={() => this.toggleMenu()}
            hasNavBar={hasNavBar}
          />
          <MenuOverlay onClick={() => this.toggleMenu()} />
        </Absolute>
      </Wrapper>
    );
  }
}

export default Menu;
