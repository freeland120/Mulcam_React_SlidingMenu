import React, { Component } from "react";
import "./css/Menu.css";
import $ from "jquery";
import MenuButton from "./MenuButton";
import { NavLink, HashRouter } from "react-router-dom";
import {} from "jquery.cookie";
import axios from "axios";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Menu extends Component {
  state = {
    login_email: "",
    loginStyle: "inline-block",
    logoutStyle: "none"
  };

  login = () => {
    const send_param = {
      headers,
      email: this.emailE.value,
      pw: this.pwE.value
    };
    axios
      .post("http://localhost:8080/member/login", send_param)
      .then(returnData => {
        console.log(returnData);
        if (returnData.data.message) {
          $.cookie("login_name", returnData.data.message);
          this.setState({
            login_email: returnData.data.message,
            loginStyle: "none",
            logoutStyle: "inline-block"
          });
        } else {
          alert("login fail");
        }
        this.emailE.value = "";
        this.pwE.value = "";
        this.emailE.focus();
      });
  };

  logout = () => {
    axios
      .get("http://localhost:8080/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_name");
          this.setState({
            login_email: "",
            loginStyle: "inline-block",
            logoutStyle: "none"
          });
        }
      });
  };

  render() {
    const loginStyle = {
      display: this.state.loginStyle
    };

    const logoutStyle = {
      display: this.state.logoutStyle
    };

    let login_name;
    if ($.cookie("login_name")) {
      login_name = $.cookie("login_name");
      loginStyle.display = "none";
      logoutStyle.display = "inline-block";
    }

    var visibility = "hide";
    if (this.props.menuVisibility) {
      visibility = "show";
    }
    return (
      <div
        id="flyoutMenu"
        onDrag={this.props.handleMouseDown}
        className={visibility}
      >
        <HashRouter>
          <div id="Button">
            <MenuButton handleMouseDown={this.handleMouseDown} />
          </div>
          <div style={loginStyle}>
            <br />
            Email
            <br />
            <input ref={ref => (this.emailE = ref)} />
            <br />
            Password
            <br />
            <input ref={ref => (this.pwE = ref)} type="password" />
            <br />
            <button onClick={this.login}>Login</button>
            <NavLink to="/Contact">
              <button>Sign up</button>
            </NavLink>
          </div>

          <div style={logoutStyle}>
            {login_name}님 환영합니다.
            <button onClick={this.logout}>Logout</button>
          </div>

          <h2>
            <a href="/">Home</a>
          </h2>
          <h2>
            <a href="/">About></a>
          </h2>
          <h2>
            <a href="/">Contact</a>
          </h2>
          <h2>
            <a href="/">Search</a>
          </h2>
          <h2>
            <a href="/">Exit</a>
          </h2>
        </HashRouter>
      </div>
    );
  }
}

export default Menu;
