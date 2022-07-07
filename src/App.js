import React, {useEffect} from "react";
import Main from './components/Main'
import {connect} from "react-redux";


import Login from './components/Login'
import {addMainData, csrf} from './Redux/actions'
import {changeDataState} from './Redux/actions/dataAction'


function App(props) {


    useEffect(() => props.csrf(), [])
    // props.csrf()


    useEffect(() => {
        if (props.login_status && props.csrfToken) props.addMainData()
    }, [props.login_status])

    return (
        <>
            {Object.values(props.user).length && props.login_status && props.csrfToken ? <Main/> : null}
            {props.login_status ? null : <Login/>}
        </>
    )
}

const mapStateToProps = state => ({
    login_status: state.data.login_status,
    user: state.data.user,
    url_server: state.data.url_server,
    csrfToken: state.data.csrfToken
})

const mapDispatchToProps = {
    addMainData,
    changeDataState,
    csrf
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
