import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setVisibleFlag,
  addClients,
  addDiscountMargin,
  setVisibleListFlag,
  createOrder,
} from '../../../Redux/actions'
import AssingEmployee from './AssingEmployee'
import ClientCard from './ClientCard'
import SetClient from './SetClient'
import SetTypeOrder from './SetTypeOrder'
import TypeForm1 from './TypeForm1'
import BottomButtons from '../../general/BottomButtons'

const NewOrder = (props) => {
  useEffect(() => {
    props.addClients()
  }, [props.clientFilter])

  useEffect(() => {
    props.addDiscountMargin()
  }, [])

  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('createNewOrder')) {
      // props.setVisibleFlag('statusNewOrder', false)
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

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="createNewOrder">
        <div className="cteateNewOrderContent">
          <div className="createOrderForm">
            <div className="createNewTitle">Новый заказ</div>

            <SetTypeOrder />

            <div className="formRow">
              <div className="optionsTitle"></div>
              <div className="orderFormTitle">Клиент</div>
            </div>
            {Object.values(props.order.client).length ? (
              <ClientCard />
            ) : (
              <SetClient />
            )}
            <TypeForm1 />
            <AssingEmployee />
          </div>

          <div className="orderHistory">История заказа</div>
        </div>

        <div className="boxOrderButtons">
          <BottomButtons
            edit={false}
            create={handleCreate}
            // save={ handelSaveClient }
            // delete={() => props.deleteClient(props.client.edit)}
            close={() => {
              props.setVisibleFlag('statusNewOrder', false)
              // props.resetDataClient()
            }}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  clientFilter: state.filter.clientFilter,
  order: state.order,
})

const mapDispatchToProps = {
  setVisibleFlag,
  addClients,
  addDiscountMargin,
  setVisibleListFlag,
  createOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)
