import React, {useEffect} from "react";
import Main from './components/Main'
import {connect} from "react-redux";


import Login from './components/Login'
import {addMainData, csrf} from './Redux/actions'
import {changeDataState} from './Redux/actions/dataAction'
import RefreshPage from './components/general/RefreshPage'


function App(props) {


    // todo: сделать этот запрос асинхроном через midleware
    useEffect(() => props.csrf(), [])
    // props.csrf()


    useEffect(() => {
        if (props.login_status && props.csrfToken) props.addMainData()
    }, [props.login_status])

    if (props.statusRefreshPage ) {
        return  <RefreshPage/>
    }

    return (
        <div className='main-container'>
            {Object.values(props.user).length && props.login_status && props.csrfToken ? <Main/> : <Login/>}
        </div>
    )
}

const mapStateToProps = state => ({
    login_status: state.data.login_status,
    user: state.data.user,
    url_server: state.data.url_server,
    csrfToken: state.data.csrfToken,
    statusRefreshPage: state.view.statusRefreshPage
})

const mapDispatchToProps = {
    addMainData,
    changeDataState,
    csrf
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
