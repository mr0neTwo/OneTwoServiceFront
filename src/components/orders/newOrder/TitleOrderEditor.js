import React from 'react'
import { connect } from 'react-redux'

import { ICON} from '../../../data/icons'
import {changeStatus} from '../../../Redux/actions/orderActions'

import SetStatus from '../../general/SetStatus'
import Icon from '../../general/Icon'
import {changePaymentState} from "../../../Redux/actions/paymentAction";
import {changeVisibleState} from "../../../Redux/actions";


const TitleOrderEditor = (props) => {

    //todo: написать эту функцию через midleware
    const handleSetStatus = (status) => {

        const paymentRequiredGroup = 6

        if (status.group === paymentRequiredGroup && props.order.price !== props.order.payed) {

            const isIncome = props.order.price > props.order.payed
            const cahsflowCategory = props.item_payments.find(item => item.id === (isIncome ? 2 : 8))

            props.changePaymentState({
                direction: isIncome ? 2 : 1,
                [isIncome ? 'income': 'outcome']: Math.abs(props.order.missed_payments),
                client: props.order.client,
                description: isIncome ? `Оплата по заказу № ${props.order.id_label}` : `Выплата по заказу № ${props.order.id_label}`,
                cashflow_category: cahsflowCategory,
                employee: props.current_user,
                order_id: props.order.edit || props.order.id,
                context: {
                    type: 'closed_order',
                    order_id: props.order.edit,
                    status_id: status.id
                }
            })
            props.changeVisibleState({'statusPaymentsEditor': true})
        } else {
            props.changeStatus(status.id, props.order.edit)
        }

    }

   return (

      <div className="header-order-editor">
         {props.order.edit ?

             <div className='header-order-editor__body'>
                <h4>Заказ № {props.order.id_label}</h4>
                 <SetStatus
                     id='orderEditor'
                     status={props.order.status}
                     listOfGroups={props.status_group.filter(group => group.id < 8)}
                     changeStatus = {status => handleSetStatus(status) }
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
    current_user: state.data.user,
    status_group: state.data.status_group,
    item_payments: state.data.item_payments
})

const mapDispatchToProps = {
    changeStatus,
    changePaymentState,
    changeVisibleState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TitleOrderEditor)