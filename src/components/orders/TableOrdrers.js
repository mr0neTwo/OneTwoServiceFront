import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'
import Create from './cell/Create'
import Lable from './cell/Lable'
import EstimatedDone from './cell/EstimatedDone'
import TableHeader from './TableHeader'
import { addOrders, initStatusMenuVisibleAction } from '../../Redux/actions'
import Status from './cell/Status'
import KindOfGood from './cell/KindOfGood'
import Brand from './cell/Brand'
import Malfunction from './cell/Malfunction'
import Engineer from './cell/Engineer'
import Client from './cell/Client'
import Price from './cell/Price'
import EngineerNotes from './cell/EngineerNotes'

const optionsShowDate = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  // second: 'numeric'
}


function TableOrders(props) {

  

  useEffect(() => {
    let statusVis = {}
    props.ordersShow.forEach((order) => {
    statusVis[order.id] = false
    })
    props.initStatusMenuVisible(statusVis)
  }, [props.ordersShow])
  
   

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
              <tr key={order.id} className="orderTableRows">
                <Lable data = {order}/>
                <Create data = {order}/>
                <EstimatedDone data = {order}/>
                <Status data = {order}/>
                <KindOfGood data = {order}/>
                <Brand data = {order}/>
                <Malfunction data = {order}/>
                <Engineer data = {order}/>
                <Client data = {order}/>
                <Price data = {order}/>
                <EngineerNotes data = {order}/>
              </tr>
            ))}
          </tbody>
        </table>
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
  mainFilter: state.filter.mainFilter
})

const mapDispatchToProps = {
  addOrders,
  initStatusMenuVisible: initStatusMenuVisibleAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders)
