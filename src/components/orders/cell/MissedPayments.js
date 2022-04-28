import React from 'react'
import { connect } from 'react-redux'

const MissedPayments = props => {
    return (
        <td className="tablePrice">
            <span>{props.order.missed_payments || null}</span>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(MissedPayments)