import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag,} from '../../../Redux/actions'
import {addClientTag, changeClientState, deleteClientTag} from '../../../Redux/actions/clientAction'
import { check0_100 } from '../../general/utils'

import AddTags from '../../general/AddTags'
import ChooseOfList from '../../general/ChooseOfList'
import LableInput from '../../general/LableInput'
import ChooseButton from '../../general/ChooseButton'
import LableArea from '../../general/LableArea'

const ClientAnotherInfo = (props) => {


  return (
    <div className="clientGenerally">

      <div className="orderFormTitle">Прочее</div>
      <LableInput
        className='mt15 w250'
        title='Скидочная карта'
        onChange={event => props.changeClientState({discount_code: event.target.value})}
        value={props.client.discount_code}
        disabled={props.client.deleted}
      />
      <div className='row al-itm-fs'>
      <ChooseButton
        className='mt15'
        title='Скидка на услуги в Заказе и Счете'
        name={['Фиксированная', 'От типа цены']}
        func1 = {() => props.changeClientState({discount_service_type: false}) }
        func2 = {() =>  props.changeClientState({discount_service_type: true}) }
        checked = { true }
        disabled={props.client.deleted}
      />
        {props.client.discount_service_type ? (
          <ChooseOfList
            id={111}
            className='ml30 mt35 h27'
            list={props.discount_margin.filter(margin => !margin.deleted && margin.margin_type === 1)}
            setElement={margin_id => props.changeClientState({discount_service_margin_id: margin_id})}
            current_id={props.client.discount_service_margin_id}
            width={'150px'}
          />
        ) : (
          <LableInput
            className='ml30 mt35'
            onChange={event => props.changeClientState({discount_services: event.target.value.replace(/[^0-9]/g, '')})}
            value={props.client.discount_services}
            unit='%'
            disabled={props.client.deleted}
            checkedFlag='inputClientDiscServChecked'
            checked={check0_100(props.client.discount_services)}
            errorMassage='Введите значение от 0 до 100'
          />
        )}
      </div>
      <div className='row al-itm-fs'>
      <ChooseButton
        className='mt15'
        title='Скидка на материалы в Заказе и Счете'
        name={['Фиксированная', 'От типа цены']}
        func1 = {() => props.changeClientState({discount_materials_type: false}) }
        func2 = {() =>  props.changeClientState({discount_materials_type: true}) }
        checked = { true }
        disabled={props.client.deleted}
      />
        {props.client.discount_materials_type ? (
          <ChooseOfList
            id={11}
            className='mt35 h27'
            list={props.discount_margin.filter(margin => !margin.deleted && margin.margin_type === 2)}
            setElement={margin_id => props.changeClientState({discount_materials_margin_id: margin_id})}
            current_id={props.client.discount_materials_margin_id}
            width={'150px'}
          />
        ) : (
          <LableInput
            className='ml15 mt35'
            onChange={event => props.changeClientState({discount_materials: event.target.value.replace(/[^0-9]/g, '')})}
            value={props.client.discount_materials}
            unit='%'
            disabled={props.client.deleted}
            checkedFlag='inputClientDiscMatChecked'
            checked={check0_100(props.client.discount_materials)}
            errorMassage='Введите значение от 0 до 100'
          />
        )}
      </div>
      <div className='row al-itm-fs'>
      <ChooseButton
        className='mt15'
        title='Скидка на товары в Продажах'
        name={['Фиксированная', 'От типа цены']}
        func1 = {() => props.changeClientState({discount_good_type: false}) }
        func2 = {() => props.changeClientState({discount_good_type: true}) }
        checked = { true }
        disabled={props.client.deleted}
      />
        {props.client.discount_good_type ? (
          <ChooseOfList
            id={12}
            className='ml30 mt35 h27'
            list={props.discount_margin.filter(margin => !margin.deleted && margin.margin_type === 2)}
            setElement={margin_id => props.changeClientState({discount_goods_margin_id: margin_id})}
            current_id={props.client.discount_goods_margin_id}
            width={'150px'}
          />
        ) : (
          <LableInput
            className='ml30 mt35'
            onChange={event => props.changeClientState({discount_goods: event.target.value.replace(/[^0-9]/g, '')})}
            value={props.client.discount_goods}
            unit='%'
            disabled={props.client.deleted}
            checkedFlag='inputClientDiscGoodChecked'
            checked={check0_100(props.client.discount_goods)}
            errorMassage='Введите значение от 0 до 100'
          />
        )}
      </div>
      <LableArea
        className='mt15'
        title='Примечание'
        onChange={event => props.changeClientState({notes: event.target.value})}
        value={props.client.notes}
        disabled={props.client.deleted}
      />
      <AddTags
        tags={props.client.tags}
        addTag={props.addClientTag}
        daleteTag={props.deleteClientTag}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  client: state.client,
  discount_margin: state.price.discount_margin,
  inputClientDiscServChecked: state.view.inputClientDiscServChecked,
  inputClientDiscMatChecked: state.view.inputClientDiscMatChecked,
  inputClientDiscGoodChecked: state.view.inputClientDiscGoodChecked,
})

const mapDispatchToProps = {
    changeClientState,
    addClientTag,
    deleteClientTag,
    setVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientAnotherInfo)
