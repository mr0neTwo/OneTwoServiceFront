import React from 'react'
import {connect} from 'react-redux'

import StatusList from '../StatusList'
import {changeStatusMenuVisible} from '../../../Redux/actions'

const Status = props => {


    return (
        <td>
            <div className="orderStatus">
        <span>
            <button
                className="statusButtom"
                type="button"
                style={{backgroundColor: props.order.status.color}}
                onClick={() => props.changeStatusMenuVisible(props.order.id)}
            >
                {props.order.status.name}
                <span className="statusSeparate"> | &#6662;</span>
            </button>
            {props.statusMenuVisible[[props.order.id]] ? <StatusList order={props.order}/> : null}
        </span>
            </div>
        </td>
    )
}

const mapStateToProps = state => ({
    statusMenuVisible: state.view.statusMenuVisible
})

const mapDispatchToProps = {
    changeStatusMenuVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(Status)