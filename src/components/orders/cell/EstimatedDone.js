import React from 'react'
import { connect } from 'react-redux'
import { icon_clock } from '../../../data/icons'
import Icon from '../../general/Icon'
import {showDate} from '../../general/utils'

const EstimatedDone = props => {


    function getDateEstimated(datestamp, statusGroop) {
      if (statusGroop > 3) return '-'
      const deltaMinut = Math.round( datestamp / 60 )
      if (Math.abs(deltaMinut) < 60) return `${deltaMinut}м.`
      const deltaHour = Math.round( datestamp / (60 * 60 ))
      if (Math.abs(deltaHour) < 48) return `${deltaHour}ч.`
      const deltaDay = Math.round( datestamp / (24 * 60 * 60 ))
      return `${deltaDay}д.`
    }

   return (
      <td>
      {/* Вывожу иконку времени с цветовой зависимостью от статуса и времени просрочки */}
      <div className="estimated-top">
        <Icon 
          icon={icon_clock} 
          className='clockEstimated'
          color={(!props.order.overdue && props.order.status.group < 4) ? '#f0ad4e' : '#ebebeb'}
        />
        {/* Вывожу разницу времени от создания до плановой даты готовности в днях или часах */}
        <span>{getDateEstimated(props.order.remaining, props.order.status.group)}</span>
      </div>
      {/* Вывожу форматированую дату готовности */}
      <div className="orderDate">
        {showDate(props.order.estimated_done_at)}
      </div>
    </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(EstimatedDone)