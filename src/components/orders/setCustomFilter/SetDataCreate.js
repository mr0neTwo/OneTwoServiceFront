import React from 'react'
import { connect } from 'react-redux'
import ru from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker'

import { changeCreateAtMainFilter } from '../../../Redux/actions'

registerLocale('ru', ru)

const SetDataCreate = (props) => {

 
   return (
    <>
    <div className='optionsFilterTitle'>Заказ создан</div>
    <DatePicker 
      selectsRange={true}
      startDate={props.created_at[0] ? new Date(props.created_at[0]) : null}
      endDate={props.created_at[1] ? new Date(props.created_at[1]) : null}
      onChange={(update) => {
        props.changeCreateAtMainFilter(update.map(day =>  day ? day.getTime() : null))
      }}
      isClearable={true}
      placeholderText='Выбирите дату'
      className="optionFilterInputDate"
      dateFormat="dd.MM.yyyy"
      locale={'ru'}
      maxDate={ Date.now() }
    />
    </>
   )
}

const mapStateToProps = state => ({
  created_at: state.filter.tempFilter.created_at
   })

const mapDispatchToProps = {
  changeCreateAtMainFilter
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetDataCreate)