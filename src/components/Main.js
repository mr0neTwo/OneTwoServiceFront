import React, {useState} from 'react';
import Sidebar from './sidebar/Sidebar';
import Orders from './orders/Orders';

import dataEmpoyees from '../data/dataEmployees';
import orders1 from '../data/dataOders1';
import orders2 from '../data/dataOrders2';
import orders3 from '../data/dataOrders3';
import orders4 from '../data/dataOrders4';
import orders5 from '../data/dataOrders5';
import orders6 from '../data/dataOrders6';
import dataStatus from '../data/dataStatus';

// Load orders ===================================================
function loadOrder(arr1, arr2, arr3, arr4, arr5, arr6) {
    return arr1.concat(arr2, arr3, arr4, arr5, arr6)
}
// ===============================================================


function Main() {

    // Наполняем мастер данными
     const [employees, setEmployees] = useState(dataEmpoyees)
     const [orders, setOrders] = useState(loadOrder(orders1, orders2, orders3, orders4, orders5, orders6))
     const [status, setStatus] = useState(dataStatus)

    function changeOderStatus(orderId, statusId) {
        // Нахожу объект который нужно поменять
        let targetOrder = orders.find(order => order.id === orderId)
        // Меняю статус у этого объекта
        targetOrder.status = status.find(status => status.id === statusId)
        // Клонирую массив с заказами
        let clone = orders.slice(0)
        // Удаляю старый объект из массива
        clone.filter(order => order.id !== orderId)
        // Добавляю низмененный объект
        clone.push(targetOrder)
        // Меняю массив в state
        setOrders(clone)
    }

    return (
        <div>
            <Sidebar/>
            <div className = 'contentMain'>
                <Orders 
                employees = {employees}
                orders = {orders}
                status = {status}
                changeOderStatus = {changeOderStatus}
                />
            </div>
        </div>
    )
}

export default Main;