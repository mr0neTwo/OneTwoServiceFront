import React  from "react";
import Main from './components/Main'
import { connect } from "react-redux";


import Login from './components/Login'


function App(props) {


  return props.token ? <Main/> : <Login/>

  
}

const mapStateToProps = state => ({
  token: state.data.token
})

export default connect(mapStateToProps) (App);
