import React from 'react'
import { connect } from 'react-redux'

import { addOrders } from '../../Redux/actions/orderActions'
import { changeStatusMenuVisibleAction, refreshDataOrder } from '../../Redux/actions'
import { changeStatus } from '../../Redux/actions/orderActions'


function StatusListGroup(props) {

    return (
      <>
        <span>{props.groupName}</span>
        {props.status.filter((status) => status.group === props.groupIdx + 1)
          .map((status) => {
            return (
              <li
                key={status.id}
                className="statusListRow"
                style={{ backgroundColor: status.color }}
                onClick={props.order.edit ? () => {
                  props.changeStatus(status.id, props.orderId)
                  props.refreshDataOrder(props.order.edit)
                } : () => {
                  props.changeStatus(status.id, props.orderId)
                  props.changeStatusMenuVisible(props.orderId)
                }}
              >
                {status.name}
              </li>
            )
          })}
      </>
    )
}

const mapStateToProps = state => ({
  status: state.data.status,
  order: state.order
})

const mapDispatchToProps = {
  changeStatusMenuVisible: changeStatusMenuVisibleAction,
  changeStatus,
  addOrders,
  refreshDataOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusListGroup)
