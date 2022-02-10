import React from 'react'
import { connect } from 'react-redux'
import { icon_clock } from '../../../data/icons'
import Icon from '../../general/Icon'

const EstimatedDone = ({data : {estimated_done_at, overdue, status, remaining }}) => {
   
   const optionsShowDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric'
    }

    function getDateEstimated(datestamp, statusGroop) {
      if (statusGroop > 3) return '-'
      const deltaMinut = Math.round( datestamp / 60 )
      if (Math.abs(deltaMinut) < 60) return `${deltaMinut}м.`
      const deltaHour = Math.round( datestamp / (60 * 60 ))
      if (Math.abs(deltaHour) < 24) return `${deltaHour}ч.`
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
          color={(!overdue && status.group < 4) ? '#f0ad4e' : '#ebebeb'}
        />
        {/* Вывожу разницу времени от создания до плановой даты готовности в днях или часах */}
        <span>{getDateEstimated(remaining, status.group)}</span>
      </div>
      {/* Вывожу форматированую дату готовности */}
      <div className="orderDate">
        {new Date(estimated_done_at * 1000).toLocaleString('ru', optionsShowDate ).replace('г.,', '')}
      </div>
    </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
     // addTodo: todo => ref('todos').push(todo)
   })
  
 export default connect(mapStateToProps)(EstimatedDone)