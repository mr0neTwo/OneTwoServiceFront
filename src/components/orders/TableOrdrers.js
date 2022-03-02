import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'


import { addOrders,editOrder } from '../../Redux/actions/orderActions'
import { initStatusMenuVisibleAction, setVisibleFlag } from '../../Redux/actions'
import { changeBookForm } from '../../Redux/actions/bookActions'

import Loader from '../Loader/Loader'
import Create from './cell/Create'
import Lable from './cell/Lable'
import EstimatedDone from './cell/EstimatedDone'
import TableHeader from './TableHeader'
import Status from './cell/Status'
import KindOfGood from './cell/KindOfGood'
import Brand from './cell/Brand'
import Malfunction from './cell/Malfunction'
import Engineer from './cell/Engineer'
import Client from './cell/Client'
import Price from './cell/Price'
import EngineerNotes from './cell/EngineerNotes'
import Equipment from './cell/Equipment'
import OrderEditor from './newOrder/OrderEditor'
import PaymentsEditor from '../Payments/PaymentsEditor'
import StikerToPrint from './StikerToPrint'

// const optionsShowDate = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   hour: 'numeric',
//   minute: 'numeric',
//   // second: 'numeric'
// }


function TableOrders(props) {

  

  useEffect(() => {
    let statusVis = {}
    props.ordersShow.forEach((order) => {
    statusVis[order.id] = false
    })
    props.initStatusMenuVisible(statusVis)
  }, [props.ordersShow])

  const handleEdit = (order) => {
    props.editOrder(order)
    props.changeBookForm(order.kindof_good, 'equipment_type')
    props.changeBookForm(order.brand, 'equipment_brand')
    props.changeBookForm(order.subtype, 'equipment_subtype')
    props.changeBookForm(order.model, 'equipment_model')
    props.setVisibleFlag('statusOrderEditor', true)
  }
  
   

  if (props.user.table_headers && props.employees) {
    return (
      <div className="tableOrders">
        <table className="tableOrders">
          <thead className="tableThead">
            <tr>
              {Object.values(props.user.table_headers).map((header) => (
                <TableHeader data={header} key={header.id}/>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.ordersShow.map((order) => (
              <tr 
                key={order.id} 
                className="orderTableRows"
                onDoubleClick={ () => handleEdit(order)}
              >
                <Lable data = {order}/>
                <Create data = {order}/>
                <EstimatedDone data = {order}/>
                <Status data = {order}/>
                <Equipment data = {order}/>
                {/* <KindOfGood data = {order}/> */}
                <Brand data = {order}/>
                <Malfunction data = {order}/>
                <Engineer data = {order}/>
                {props.permissions.includes('see_client') ? <Client data = {order}/> : <div/>}
                <Price data = {order}/>
                <EngineerNotes data = {order}/>
              </tr>
            ))}
          </tbody>
        </table>
        {props.view.statusOrderEditor ? <OrderEditor/> : null}
        {props.view.statusPaymentsEditor ? <PaymentsEditor/> : null}
        {props.view.statusOrderSticker ? <StikerToPrint onAfterPrint={() => props.setVisibleFlag('statusOrderSticker', false)}/> : null}

      </div>
    )
  } else {
    return <Loader />
  }
}

const mapStateToProps = state => ({
  ordersShow: state.data.ordersShow,
  employees: state.data.employees, 
  user: state.data.user,
  view: state.view,
  mainFilter: state.filter.mainFilter,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  addOrders,
  initStatusMenuVisible: initStatusMenuVisibleAction,
  setVisibleFlag,
  editOrder,
  changeBookForm
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders)
