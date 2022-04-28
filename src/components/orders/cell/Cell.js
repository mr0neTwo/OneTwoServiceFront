import React from 'react'
import { connect } from 'react-redux'

const Cell = props => {
    return (
        <td>
            <div className="tableText tableOne">
                {props.order.cell}
            </div>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Cell)