import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends React.Component {

  renderLinks(){
    if(this.props.authenticated) {
      return [
              <li className="nav-item">
                <Link className="nav-link" to="/feature">Card list</Link>
              </li>,
              <li className="nav-item">
                <Link className="nav-link" to={"/usercard/" + this.props.userId } >User card list</Link>
              </li>,
              <li className="nav-item">
                <Link className="nav-link" to="/addcard">Add card</Link>
              </li>,
              <li className="nav-item">
                <Link className="nav-link" to="/signout">Sign out</Link>
              </li>
            ]
    } else {
      return (
[
            <li className="nav-item" key={1}>
              <Link className="nav-link" to="/signin">Sign in</Link>
            </li>,
            <li className="nav-item" key={2}>
              <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
]
      )
    }
  }
  render() {
    return (
    //   <nav className="navbar navbar-light">
    //      <div class="collapse navbar-collapse" id="navbarText">
    //   <ul className="nav">
    //     <li className="nav-item">
    //       <Link to="/" className="navbar-brand">Natalia manager</Link>
    //     </li>
    //   </ul>
    //   <ul className="nav justify-content-end">
    //     {this.renderLinks()}
    //   </ul>
    // </div>
    // </nav>

    <nav className="navbar navbar-toggleable-md navbar-light nav-margin-top">
  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <Link to="/" className="navbar-brand">{this.props.email ?  this.props.email : "Login" } manager</Link>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      {/* <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li> */}
    </ul>
    <ul className="navbar-nav .justify-content-end">
      {this.renderLinks()}
    </ul>
  </div>
</nav>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    userId: state.auth.userId,
  };
}

export default connect(mapStateToProps)(Header);
