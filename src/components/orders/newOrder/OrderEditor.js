import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setVisibleFlag,
  addClients,
  addDiscountMargin,
  setVisibleListFlag,
  changeOrderFormS,
  addDictService
} from '../../../Redux/actions'
import { createOrder, resetOrder, saveOrder, addOrders } from '../../../Redux/actions/orderActions'

import BottomButtons from '../../general/BottomButtons'
import TitleOrderEditor from './TitleOrderEditor'
import Tabs from '../../general/Tabs'
import OrderInfo from './OrderInfo'
import OrderWorksMaterials from './OrderWorksMaterials'
import OrderPayments from './OrderPayments'

const OrderEditor = (props) => {

  useEffect(() => {
    props.addClients()
  }, [props.clientFilter])

  useEffect(() => {
    props.addDiscountMargin()
    props.addDictService()
  }, [])

  const handleClose = () => {
    props.setVisibleFlag('statusOrderEditor', false)
    props.resetOrder()
    props.setVisibleFlag('checkedOrderClient', false)
    props.setVisibleListFlag('checkedOrderKindofGood', 0, true)
    props.setVisibleListFlag('checkedOrderBrand', 0, true)
    props.setVisibleListFlag('checkedOrderSubtype', 0, true)
    props.addOrders()
  }

  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('createNewOrder')) {
      handleClose()
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  

  const handleCreate = () => {
    if (
      Object.values(props.order.client).length &&
      props.order.equipments.every(
        (equipment) =>
          Object.values(equipment.kindof_good).length &&
          Object.values(equipment.brand).length &&
          Object.values(equipment.subtype).length &&
          equipment.malfunction
      )
    ) {
      props.createOrder()
    } else {
      if (!Object.values(props.order.client).length) {
        props.setVisibleFlag('checkedOrderClient', true)
      }
      props.order.equipments.forEach((equipment, idx) => {
        if (!Object.values(equipment.kindof_good).length) {
          props.setVisibleListFlag('checkedOrderKindofGood', idx, false)
        }
        if (!Object.values(equipment.brand).length) {
          props.setVisibleListFlag('checkedOrderBrand', idx, false)
        }
        if (!Object.values(equipment.subtype).length) {
          props.setVisibleListFlag('checkedOrderSubtype', idx, false)
        }
        if (!equipment.malfunction) {
          props.setVisibleListFlag('inputMalfunctionChecked', idx, false)
        }
      })
    }
  }

  const handleSave = () => {
    if (
      Object.values(props.order.client).length &&
      Object.values(props.order.kindof_good).length &&
      Object.values(props.order.brand).length &&
      Object.values(props.order.subtype).length
      
    ) {
      props.saveOrder()
    } else {
      if (!Object.values(props.order.client).length) props.setVisibleFlag('checkedOrderClient', true)
      if (!Object.values(props.order.kindof_good).length) props.setVisibleListFlag('checkedOrderKindofGood', 0, false)
      if (!Object.values(props.order.brand).length) props.setVisibleListFlag('checkedOrderBrand', 0, false)
      if (!Object.values(props.order.subtype).length) props.setVisibleListFlag('checkedOrderSubtype', 0, false)
    }
  }

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="createNewOrder">
        <div className="cteateNewOrderContent">
          
          <div className="createOrderForm">

            <TitleOrderEditor/>
            {props.order.edit ?
              <div>
                <Tabs
                  list={ ['Информация о заказе', 'Работы и материалы', 'Платежи'] }
                  func={props.changeOrderFormS}
                  tab={props.order.tabs}
                />
                  {props.order.tabs === 0 ? <OrderInfo/> : null}
                  {props.order.tabs === 1 ? <OrderWorksMaterials/> : null}
                  {props.order.tabs === 2 ? <OrderPayments/> : null}
                </div> : <OrderInfo/> }
          </div>

          <div className="orderHistory">
          <div className = 'tempPage'>
            <div className = 'tempContainer'>
                <h1 className = 'tempTitle'>История</h1>
                <p className = 'tempDescription'>Страница на стадии разработки</p>
            </div>
          </div>
          </div>
        </div>

        <div className="boxOrderButtons">
          <BottomButtons
            edit={ props.order.edit }
            create={ handleCreate }
            save={ handleSave }
            // delete={() => props.deleteClient(props.client.edit)}
            close={ handleClose }
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  clientFilter: state.filter.clientFilter,
  order: state.order
})

const mapDispatchToProps = {
  setVisibleFlag,
  addClients,
  addDiscountMargin,
  setVisibleListFlag,
  createOrder,
  changeOrderFormS,
  resetOrder,
  addDictService,
  saveOrder,
  addOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditor)
