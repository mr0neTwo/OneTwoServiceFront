import React from 'react'
import { connect } from 'react-redux'

const Engineer = ({data: {engineer_id}, employees}) => {

   function getEmploeeName(id) {
      if (id) {
        let employee = employees.find((employee) => employee.id === id)
        return `${employee.last_name} ${employee.first_name}`
      }
    }

   return (
     <td>
     <div>
        {getEmploeeName(engineer_id)}
     </div>
   </td>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees
   })
  
 export default connect(mapStateToProps)(Engineer)