import React from 'react'
import { connect } from 'react-redux'

const Engineer = props => {

   function getEmploeeName(id) {
      if (id) {
        let employee = props.employees.find((employee) => employee.id === id)
        return `${employee.last_name} ${employee.first_name}`
      }
    }

   return (
     <td>
     <div>
        {getEmploeeName(props.order.engineer_id)}
     </div>
   </td>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees
   })
  
 export default connect(mapStateToProps)(Engineer)