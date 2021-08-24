import React from 'react'
import { connect } from 'react-redux'

import StatusList from '../StatusList'
import { changeStatusMenuVisibleAction } from '../../../Redux/actions'

const Status = ({data: {status, id}, statusMenuVisible, changeStatusMenuVisible}) => {


   return (
      <td>
      <div className="orderStatus">
        <span>
          <button
            className="statusButtom"
            type="button"
            style={{ backgroundColor: status.color }}
            onClick={() => changeStatusMenuVisible(id)}
          >
            {status.name}
            <span className="statusSeparate"> | &#6662;</span>
          </button>
          {statusMenuVisible[[id]] ? ( <StatusList orderId = {id}/> ) : null}
        </span>
      </div>
    </td>
   )
}

const mapStateToProps = state => ({
   statusMenuVisible: state.view.statusMenuVisible
   })

const mapDispatchToProps = {
   changeStatusMenuVisible: changeStatusMenuVisibleAction
}   

 export default connect(mapStateToProps, mapDispatchToProps)(Status)