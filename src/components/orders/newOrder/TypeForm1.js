import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeOrderFormS } from '../../../Redux/actions'
import ChooseOfList from '../../general/ChooseOfList'
import ChooseEquipment from './ChooseEquipment'
import LabelInputOrder from './LabelInputOrder'
import ChooseSingleEquipment from './ChooseSingleEquipment'
import ChooseDate from '../../general/ChooseDate'


const TypeForm1 = (props) => {

  return (
    <div>
      <div className="formRow">
        <div className="optionsTitle">Рекламная компания</div>
        <div className="blockImput">
          <ChooseOfList
            id={14}
            list={props.ad_campaign}
            setElement={props.changeOrderFormS}
            field='ad_campaign_id'
            current_id={props.order.ad_campaign_id}
            width={'250px'}
            disabled={!props.permissions.includes('edit_info_orders')}
          />
        </div>
      </div>

      {props.order.edit ? <ChooseSingleEquipment/> : <ChooseEquipment/>}

      <div className="formRow">
        <div className="optionsTitle"></div>
        <div className="orderFormTitle mt15">Дополнительная информация</div>
      </div>

      <div className="formRow">
        <div className="optionsTitle">Заметки приемщика</div>
        <div className="blockImput mh">
          <textarea
            className="textInput"
            name="manager_notes"
            onChange={(event) =>
              props.changeOrderFormS(event.target.value, 'manager_notes')
            }
            value={props.order.manager_notes}
            disabled={!props.permissions.includes('edit_info_orders')}
          />
        </div>
      </div>

      <LabelInputOrder
        className="formRow"
        title="Ориетнировачная стоимость"
        name="estimated_cost"
        onChange={(event) => props.changeOrderFormS(event.target.value.replace(/[^0-9]/g, ''), 'estimated_cost')}
        value={props.order.estimated_cost}
        disabled={!props.permissions.includes('edit_info_orders')}
      />

      <div className="formRow">
        <div className="optionsTitle">Дата готовности</div>
        <div className="blockImput">
          <ChooseDate
              func={date => props.changeOrderFormS(parseInt(date / 1000), 'estimated_done_at')}
              current_date={props.order.estimated_done_at * 1000}
              disabled={props.order.status.group > 3 || !props.permissions.includes('edit_info_orders')}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ad_campaign: state.data.ad_campaign,
  order: state.order,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  changeOrderFormS
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeForm1)
