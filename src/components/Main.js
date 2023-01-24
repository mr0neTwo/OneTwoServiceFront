import React, {useEffect} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';


import {addMainData, addStatus, addData} from '../Redux/actions'
import {addEmployees} from '../Redux/actions/employeeAction'
import {changeBranchState} from '../Redux/actions/branchAction'

import Sidebar from './sidebar/Sidebar';
import Orders from './orders/Orders';
import TaskManager from './TaskManager/TaskManager';
import Leads from './Leads/Leads';
import Shops from './Shops/Shops';
import Payments from './Payments/Payments';
import Clients from './Clients/Clients';
import Analytics from './Analytics/Analytics';
import Reports from './Reports/Reports';
import Telephony from './Telephony/Telephony';
import Settings from './Settings/Settings';
import OrderEditor from './orders/newOrder/OrderEditor'
import UserSetting from './sidebar/userSettings/UserSetting'
import Alerts from './Alerts/Alerts'
import Warehouse from './Wherehouse/Wherehouse'
import PartEditor from './Wherehouse/WarehouseParts/PartEditor/PartEditor'
import WriteOfEditor from './Wherehouse/WarehouseWriteOf/WriteOfEditor'
import RegistrationEditor from './Wherehouse/WarehouseRegistration/RegistrationEditor'
import ClientEditor from './Clients/ClientEditor/ClientEditor'
import WarehouseMovementEditor from './Wherehouse/WarehouseMovement/WarehouseMovementEditor'
import WarehouseBackEditor from './Wherehouse/WarehouseBacks/WarehouseBackEditor'
import InventoryEditorPreview from './Wherehouse/WarehouseInventories/InventoryEditorPreview'
import InventoryEditor from './Wherehouse/WarehouseInventories/InventoryEditor'
import RequestSparePartEditor from './Wherehouse/RequestSpareParts/RequestSparePartEditor'



function Main(props) {

    useEffect(() => {
        props.addMainData()
        props.addStatus()
    }, [])

    useEffect(() => {
        props.changeBranchState({
            current_branch: props.branches.filter(branch => branch.employees.includes(props.user_id))[0] || {}
        })
    }, [props.branches])


    return (
        <div>
            <Sidebar/>
            <div className='contentMain'>
                <Alerts/>
                <Switch>
                    <Route path='/tasks' component={TaskManager}/>
                    <Route path='/leans' component={Leads}/>
                    <Route path='/orders' component={Orders}/>
                    <Route path='/shops' component={Shops}/>
                    <Route path='/payments' component={Payments}/>
                    <Route path='/warehouse' component={Warehouse}/>
                    <Route path='/clients' component={Clients}/>
                    <Route path='/analytics' component={Analytics}/>
                    <Route path='/reports' component={Reports}/>
                    <Route path='/telephony' component={Telephony}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/user' component={UserSetting}/>

                    <Redirect from='/' to='/leans'/>
                </Switch>
            </div>
            {props.view.statusWriteOfEditor ? <WriteOfEditor/> : null}
            {props.view.statusRegistrationEditor ? <RegistrationEditor/> : null}
            {props.view.statusClientEditor ? <ClientEditor/> : null}
            {props.view.statusPartEditor ? <PartEditor/> : null}
            {props.view.statusOrderEditor ? <OrderEditor/> : null}
            {props.view.statusMovementEditor ? <WarehouseMovementEditor/> : null}
            {props.view.statusBackEditor ? <WarehouseBackEditor/> : null}
            {props.view.statusInventoryEditor ? <InventoryEditor/> : null}
            {props.view.statusInventoryEditorPreview ? <InventoryEditorPreview/> : null}
            {props.view.statusReqSparePartEditor ? <RequestSparePartEditor/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    statusClientEditor: state.view.statusClientEditor,
    user_id: state.data.user.id,
    branches: state.branch.branches,
    view: state.view
})

const mapDispatchToProps = {
    addEmployees,
    addStatus,
    addMainData,
    addData,
    changeBranchState
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main))