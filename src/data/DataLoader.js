import React from 'react'
import { connect } from 'react-firebase'

import dataMenuRowsExp from './dataSidebarRows'
import dataEmpoyees from './dataEmployees'
import dataMainFilters from './dataMainFilters'
import dataStatus from './dataStatus'
import dataTableHeader from './dataTableHeader'
// import orders1 from './dataOrders1'
// import orders2 from './dataOrders2'
// import orders3 from './dataOrders3'
// import orders4 from './dataOrders4'
// import orders5 from './dataOrders5'
import orders6 from './dataOrders6'

const TaskManager = (props) => {

   

   const handleOnCkick = () => {
      props.addDataSidebarRows(dataMenuRowsExp)
      dataEmpoyees.forEach(empoyee => props.addEmpoyee(empoyee))
      props.addDataMainFilters(dataMainFilters)
      dataStatus.forEach(status => props.addStatus(status))
      dataTableHeader.forEach(tableHeader => props.addTableHeader(tableHeader))

      // const arrayOrders = orders1.concat(orders2, orders3, orders4, orders5, orders6)
      // arrayOrders.forEach(order => props.addOrder(order))

      props.cleanOrder()
      const arrayOrders = orders6.slice(-150, -1)
      arrayOrders.forEach(order => props.addOrder(order))

   }

   return (
      <div>
         <button 
            onClick = {handleOnCkick}
            className = 'dataDownload'
         >
            Загрузить данные
         </button>
      </div>
   )
}

const mapFirebaseToProps = (props, ref) => ({
   addDataSidebarRows: dataSidebarRows => ref('dataSidebarRows').set(dataSidebarRows),
   addEmpoyee: empoyee => ref(`empoyees/${empoyee.id}`).set(empoyee),
   addDataMainFilters: dataMainFilters => ref('dataMainFilters').set(dataMainFilters),
   addStatus: status => ref(`status/${status.id}`).set(status),
   addTableHeader: tableHeader => ref(`tableHeaders/${tableHeader.id}`).set(tableHeader),
   // addOrder: order => ref(`orders/${order.id}`).set(order),
   cleanOrder: () => ref('orders').remove()
 })
  
 export default connect(mapFirebaseToProps)(TaskManager)