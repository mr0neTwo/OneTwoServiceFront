import React from 'react'
import {connect} from 'react-redux'

const Subtype = props => {
    return (
        <td>
            <span className="tableText">
                {props.order.subtype.title}
            </span>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Subtype)