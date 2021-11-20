import React  from "react";
import Main from './components/Main'
import { connect } from "react-redux";


import Login from './components/Login'


function App(props) {

  if (props.token) {
    return (<Main/>)
  }
  return (<Login/>)
  
}

const mapStateToProps = state => ({
  token: state.data.token,
})

export default connect(mapStateToProps) (App);
