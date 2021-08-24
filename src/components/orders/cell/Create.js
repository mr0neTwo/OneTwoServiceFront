import React from 'react'
import { connect } from 'react-redux'



const Create = ({data: { created_by_id, created_at}, employees}) => {

   const optionsShowDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric'
    }

   function getEmploeeName(id) {
      if (id) {
        let employee = employees.find((employee) => employee.id === id)
        return `${employee.last_name} ${employee.first_name}`
      }
    }
   return (
      <td>
      {/* Возвращаем имя инженера создавшего заказ через его ID */}
      <div>{getEmploeeName(created_by_id)}</div>
      {/* Выводим и форматируем дату создания */}
      <div className="orderDate">
        {new Date(created_at * 1000).toLocaleString('ru', optionsShowDate).replace('г.,', '')}
      </div>
    </td>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees
   })
  
 export default connect(mapStateToProps)(Create)