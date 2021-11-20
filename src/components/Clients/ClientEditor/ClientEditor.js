import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setVisibleFlag,
  resetDataClient,
  setVisibleListFlag,
  createNewClient,
  changeClientTabs,
  saveChangeClient,
  deleteClient,
} from '../../../Redux/actions'
import BottomButtons from '../../general/BottomButtons'

import { check0_100 } from '../../general/utils'
import ClientBalans from './ClientBalans'
import ClientCalls from './ClientCalls'
import ClientInfo from './ClientInfo'
import ClientLeads from './ClientLeads'
import ClientOrder from './ClientOrder'
import ClientPayments from './ClientPayments'
import ClientSMS from './ClientSMS'
import ClientTask from './ClientTask'

const ClientEditor = (props) => {
  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('createNewClient')) {
      if (props.view.statusCreateNewClient) {
        //  props.setVisibleFlag('statusCreateNewClient', false)
        props.resetDataClient()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const handelCreateClient = () => {
    if (
      props.client.name &&
      props.view.inputClientPhoneChecked.every((ph) => ph) &&
      check0_100(props.client.discount_materials) &&
      check0_100(props.client.discount_goods) &&
      check0_100(props.client.discount_services)
    ) {
      props.createNewClient()
    } else {
      if (!props.client.name) {
        props.setVisibleFlag('inputClientNameChecked', false)
      }
      if (!check0_100(props.client.discount_materials)) {
        props.setVisibleFlag('inputClientDiscMatChecked', false)
      }
      if (!check0_100(props.client.discount_goods)) {
        props.setVisibleFlag('inputClientDiscGoodChecked', false)
      }
      if (!check0_100(props.client.discount_services)) {
        props.setVisibleFlag('inputClientDiscServChecked', false)
      }
      props.client.phone.forEach((phone, idx) => {
        if (phone.number.replace(/[^0-9]/g, '').length !== 11) {
          props.setVisibleListFlag('inputClientPhoneChecked', idx, false)
        }
      })
    }
  }

  const handelSaveClient = () => {
    if (
      props.client.name &&
      props.view.inputClientPhoneChecked.every((ph) => ph) &&
      check0_100(props.client.discount_materials) &&
      check0_100(props.client.discount_goods) &&
      check0_100(props.client.discount_services)
    ) {
      props.saveChangeClient()
    } else {
      if (!props.client.name) {
        props.setVisibleFlag('inputClientNameChecked', false)
      }
      if (!check0_100(props.client.discount_materials)) {
        props.setVisibleFlag('inputClientDiscMatChecked', false)
      }
      if (!check0_100(props.client.discount_goods)) {
        props.setVisibleFlag('inputClientDiscGoodChecked', false)
      }
      if (!check0_100(props.client.discount_services)) {
        props.setVisibleFlag('inputClientDiscServChecked', false)
      }
      props.client.phone.forEach((phone, idx) => {
        if (phone.number.replace(/[^0-9]/g, '').length !== 11) {
          props.setVisibleListFlag('inputClientPhoneChecked', idx, false)
        }
      })
    }
  }

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow mw50" id="createNewClient">
        <div className="createNewTitle">
          {props.client.edit ? props.client.name : 'Новый клиент'}
        </div>

        <div className='contentEditor'>
        {props.client.edit ? (
          <div>
            <div className="tabs">
              <div
                className={props.client.tabs === 1 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(1)}
              >
                Общие
              </div>
              <div
                className={props.client.tabs === 2 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(2)}
              >
                Баланс
              </div>
              <div
                className={props.client.tabs === 3 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(3)}
              >
                Обращения
              </div>
              <div
                className={props.client.tabs === 4 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(4)}
              >
                Заказы
              </div>
              <div
                className={props.client.tabs === 5 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(5)}
              >
                Платежи
              </div>
              <div
                className={props.client.tabs === 6 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(6)}
              >
                Звонки
              </div>
              <div
                className={props.client.tabs === 7 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(7)}
              >
                SMS
              </div>
              <div
                className={props.client.tabs === 8 ? 'tabOn' : 'tab'}
                onClick={() => props.changeClientTabs(8)}
              >
                Задачи
              </div>
            </div>

            {props.client.tabs === 1 ? <ClientInfo /> : null}
            {props.client.tabs === 2 ? <ClientBalans /> : null}
            {props.client.tabs === 3 ? <ClientLeads /> : null}
            {props.client.tabs === 4 ? <ClientOrder /> : null}
            {props.client.tabs === 5 ? <ClientPayments /> : null}
            {props.client.tabs === 6 ? <ClientCalls /> : null}
            {props.client.tabs === 7 ? <ClientSMS /> : null}
            {props.client.tabs === 8 ? <ClientTask /> : null}
          </div>
        ) : (
          <ClientInfo />
        )}
        </div>

        <BottomButtons
          edit={props.client.edit}
          create={handelCreateClient}
          save={handelSaveClient}
          delete={() => props.deleteClient(props.client.edit)}
          close={() => props.setVisibleFlag('statusCreateNewClient', false)}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  view: state.view,
  client: state.client,
})

const mapDispatchToProps = {
  setVisibleFlag,
  resetDataClient,
  setVisibleListFlag,
  createNewClient,
  changeClientTabs,
  saveChangeClient,
  deleteClient,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEditor)
