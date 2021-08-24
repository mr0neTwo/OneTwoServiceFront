import React  from "react";
import Main from './components/Main'
import { connect } from "react-redux";


import Login from './components/Login'


function App({login_status}) {


  if (login_status) {
    return (<Main/>)
  }
  return (<Login/>)
  
}

const mapStateToProps = state => ({
  login_status: state.data.login_status,
})

export default connect(mapStateToProps) (App);
