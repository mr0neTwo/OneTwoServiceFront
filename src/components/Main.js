import React, {useEffect} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';


import {addMainData, addEmployees, addStatus, addData} from '../Redux/actions';

import Sidebar from './sidebar/Sidebar';
import Orders from './orders/Orders';
import TaskManager from './TaskManager/TaskManager';
import Leads from './Leads/Leads';
import Shops from './Shops/Shops';
import Payments from './Payments/Payments';
import Wherehouse from './Wherehouse/Wherehouse';
import Clients from './Clients/Clients';
import Analytics from './Analytics/Analytics';
import Reports from './Reports/Reports';
import Telephony from './Telephony/Telephony';
import Settings from './Settings/Settings';
import OrderEditor from './orders/newOrder/OrderEditor'


function Main(props) {

    // Загружаем строки меню в State
    useEffect(() => {
        props.addMainData()
        props.addEmployees()
        props.addStatus()
    }, [])

    useEffect(() => {
        props.addData(props.branches.filter(branch => branch.employees.includes(props.user_id))[0] || {}, 'current_branch')
    }, [props.branches])


    return (
        <div>
            <Sidebar/>
            <div className='contentMain'>
                <Switch>
                    <Route path='/tasks' component={TaskManager}/>
                    <Route path='/leans' component={Leads}/>
                    <Route path='/orders' component={Orders}/>
                    <Route path='/shops' component={Shops}/>
                    <Route path='/payments' component={Payments}/>
                    <Route path='/wherehouse' component={Wherehouse}/>
                    <Route path='/clients' component={Clients}/>
                    <Route path='/analytics' component={Analytics}/>
                    <Route path='/reports' component={Reports}/>
                    <Route path='/telephony' component={Telephony}/>
                    <Route path='/settings' component={Settings}/>



                    <Redirect from='/' to='/leans'/>
                </Switch>
            </div>
            <Switch>
                <Route
                    exact path="/orders/:id"
                    // loadData={() => props.getOrder(id)}
                    component={OrderEditor}
                />
            </Switch>
        </div>
    )
}

const mapStateToProps = state => ({
    statusCreateNewClient: state.view.statusCreateNewClient,
    user_id: state.data.user.id,
    branches: state.data.branches
})

const mapDispatchToProps = {
    addEmployees,
    addStatus,
    addMainData,
    addData,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main))