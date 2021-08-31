import React from 'react'
import { connect } from 'react-redux'


import { changeStatusMenuVisibleAction, changeStatusAction, addOrders } from '../../Redux/actions'


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
                onClick={() => {
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
  status: state.data.status
})

const mapDispatchToProps = {
  changeStatusMenuVisible: changeStatusMenuVisibleAction,
  changeStatus: changeStatusAction ,
  addOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusListGroup)
