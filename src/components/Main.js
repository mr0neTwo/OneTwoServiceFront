import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'




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





function Main() {

    // Наполняем мастер данными
    //  const [employees, setEmployees] = useState(dataEmpoyees)
    //  const [orders, setOrders] = useState(loadOrder(orders1, orders2, orders3, orders4, orders5, orders6))
    //  const [status, setStatus] = useState(dataStatus)

    // function changeOderStatus(orderId, statusId) {
    //     // Нахожу объект который нужно поменять
    //     let targetOrder = orders.find(order => order.id === orderId)
    //     // Меняю статус у этого объекта
    //     targetOrder.status = status.find(status => status.id === statusId)
    //     // Клонирую массив с заказами
    //     let clone = orders.slice(0)
    //     // Удаляю старый объект из массива
    //     clone.filter(order => order.id !== orderId)
    //     // Добавляю низмененный объект
    //     clone.push(targetOrder)
    //     // Меняю массив в state
    //     setOrders(clone)
    // }

    return (
        <div>
            <Sidebar/>
            <div className = 'contentMain'>
                <Switch>
                    <Route path = '/tasks' component = {TaskManager}/>
                    <Route path='/leans' component={Leads} />
                    <Route path = '/orders' component = {Orders}/>
                    <Route path = '/shops' component = {Shops}/>
                    <Route path = '/payments' component = {Payments}/>
                    <Route path = '/wherehouse' component = {Wherehouse}/>
                    <Route path = '/clients' component = {Clients}/>
                    <Route path = '/analytics' component = {Analytics}/>
                    <Route path = '/reports' component = {Reports}/>
                    <Route path = '/telephony' component = {Telephony}/>
                    <Route path = '/settings' component = {Settings}/>

                    <Redirect from='/' to='/leans'/>
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(Main);