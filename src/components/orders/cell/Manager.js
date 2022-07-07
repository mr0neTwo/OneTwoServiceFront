import React from 'react'
import { connect } from 'react-redux'

const Manager = props => {

    function getEmploeeName(id) {
        if (id) {
            const employee = props.employees.find((employee) => employee.id === id)
            return employee ? `${employee.last_name} ${employee.first_name}`: ''
        }
    }

    return (
        <td>
            <div className='noWr'>
                {getEmploeeName(props.order.manager_id)}
            </div>
        </td>
    )
}

const mapStateToProps = state => ({
    employees: state.employee.employees
})

export default connect(mapStateToProps)(Manager)