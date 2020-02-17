import React, { Component } from "react";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import Home from "./Home";
import Post from "./Post";
import Contact from "./Contact";

import { Route, NavLink, HashRouter } from "react-router-dom";

class MenuContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  showMenu() {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleMouseDown(e) {
    this.showMenu();

    console.log("클릭했썽!");
    e.stopPropagation();
  }

  render() {
    return (
      <div id="MenuButton">
        <MenuButton handleMouseDown={this.handleMouseDown} />
        <Menu
          handleMouseDown={this.handleMouseDown}
          menuVisibility={this.state.visible}
        />
        <HashRouter>
          <div>
            <h2>귀여운 12神 SPA🐶</h2>
            <ul className="header">
              {/* <li>쥐🐭</li>
              <li>소🐮</li>
              <li>호랑이🐯</li>
              <li>토끼🐰</li>
              <li>용🐲</li>
              <li>뱀🐍</li>
              <li>말🐴</li>
              <li>양🐑</li>
              <li>원숭이🐵</li>
              <li>닭🐔</li>
              <li>개🐶</li>
              <li>돼지🐷</li> */}
              <li>
                <NavLink exact to="/">
                  Home🏡
                </NavLink>
              </li>
              <li>
                <NavLink to="/post">Post👜</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Sign Up🌈</NavLink>
              </li>
            </ul>
            <div className="content">
              <Route exact path="/" component={Home}></Route>
              <Route path="/post" component={Post}></Route>
              <Route path="/contact" component={Contact}></Route>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default MenuContainer;
