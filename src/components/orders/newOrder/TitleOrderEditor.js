import React from 'react'
import { connect } from 'react-redux'

import { ICON} from '../../../data/icons'
import {changeStatus} from '../../../Redux/actions/orderActions'

import SetStatus from '../../general/SetStatus'
import Icon from '../../general/Icon'


const TitleOrderEditor = (props) => {

   return (

      <div className="header-order-editor">
         {props.order.edit ?

             <div className='header-order-editor__body'>
                <h4>Заказ № {props.order.id_label}</h4>
                 <SetStatus
                     id='orderEditor'
                     status={props.order.status}
                     listOfGroups={props.status_group.filter(group => group.id < 8)}
                     changeStatus = {status => props.changeStatus(status.id, props.order.edit) }
                 />
                 <Icon
                     className='icon icon_24'
                     icon={props.current_branch.icon}
                     color={props.current_branch.color}
                     invisible={!props.current_branch}
                 />
                 <Icon
                     className='icon icon_24'
                     icon={ICON.BURN}
                     color='var(--error)'
                     invisible={!props.order.urgent}
                 />
                 <Icon
                     className='icon icon_24'
                     icon={ICON.CLOCK}
                     color='var(--orange)'
                     invisible={!(!props.order.overdue && props.order.status.group < 4)}
                 />
             </div>
             :
             <h4>Новый заказ</h4>
         }
      </div>
   )
}

const mapStateToProps = state => ({
    order: state.order,
    current_branch: state.branch.current_branch,
    status_group: state.data.status_group
})

const mapDispatchToProps = {
    changeStatus
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TitleOrderEditor)