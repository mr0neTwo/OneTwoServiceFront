import React from 'react'
import { connect } from 'react-redux'


import { changeStatusMenuVisibleAction, changeStatusAction, addOrdersAction } from '../../Redux/actions'


function StatusListGroup({ groupName, orderId, groupIdx, status, changeStatusMenuVisible, changeStatus }) {

    return (
      <>
        <span>{groupName}</span>
        {status.filter((status) => status.group === groupIdx + 1)
          .map((status) => {
            return (
              <li
                key={status.id}
                className="statusListRow"
                style={{ backgroundColor: status.color }}
                onClick={() => {
                  changeStatus(status.id, orderId)
                  changeStatusMenuVisible(orderId)
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
  addOrders: addOrdersAction
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusListGroup)
