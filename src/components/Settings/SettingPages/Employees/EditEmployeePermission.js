import React from 'react'
import {connect} from 'react-redux'
import TableCashboxes from './TableCashboxes'

function EditEmployeePermission(props) {
    return (
        <div className='contentEditor'>
            <h3>Кассы</h3>
            <TableCashboxes/>
        </div>
    )
}

export default connect()(EditEmployeePermission)