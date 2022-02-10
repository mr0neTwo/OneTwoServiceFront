import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeOrderFormS } from '../../../Redux/actions'
import ChooseOfList from '../../general/ChooseOfList'
import ChooseEquipment from './ChooseEquipment'
import LabelInputOrder from './LabelInputOrder'
import ru from 'date-fns/locale/ru'
import DatePicker, { registerLocale } from 'react-datepicker'
import ChooseSingleEquipment from './ChooseSingleEquipment'
import ChooseDate from '../../general/ChooseDate'

registerLocale('ru', ru)

const TypeForm1 = (props) => {
  // useEffect(() => {
  //   if (!props.order.edit) {
  //     props.changeOrderFormS(parseInt(Date.now() / 1000) + 4 * 24 * 3600, 'estimated_done_at')
  //   }
  // }, [])

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
          />
        </div>
      </div>

      <LabelInputOrder
        className="formRow"
        title="Ориетнировачная стоимость"
        name="estimated_cost"
        onChange={(event) => props.changeOrderFormS(event.target.value.replace(/[^0-9]/g, ''), 'estimated_cost')}
        value={props.order.estimated_cost}
      />

      <div className="formRow">
        <div className="optionsTitle">Дата готовности</div>
        <div className="blockImput">
          <ChooseDate
              func={date => props.changeOrderFormS(parseInt(date / 1000), 'estimated_done_at')}
              current_date={props.order.estimated_done_at * 1000}
              disabled={props.order.status.group > 3}
          />
          {/* {props.order.estimated_done_at ?
            <DatePicker
              selected={props.order.estimated_done_at * 1000}
              onChange={(date) =>
                props.changeOrderFormS(parseInt(date / 1000), 'estimated_done_at')
              }
              // startDate={Date.now() + new Date(4 * 24 * 60 * 60 * 1000)}
              className="optionFilterInputDate"
              dateFormat="dd.MM.yyyy HH:mm"
              locale={'ru'}
              showTimeSelect
          /> : null} */}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ad_campaign: state.data.ad_campaign,
  order: state.order,
})

const mapDispatchToProps = {
  changeOrderFormS
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeForm1)
