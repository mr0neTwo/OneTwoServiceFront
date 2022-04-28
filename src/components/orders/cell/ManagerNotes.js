
import React from 'react'
import { connect } from 'react-redux'

const ManagerNotes = props => {
    return (
        <td>
            <div className="tableText tableOne">
                {props.order.manager_notes}
            </div>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(ManagerNotes)