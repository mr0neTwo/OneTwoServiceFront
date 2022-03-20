import React from 'react'
import {connect} from 'react-redux'

import {addOrders} from '../../Redux/actions/orderActions'
import {changeStatusMenuVisible, editCurrentClient, refreshDataOrder, changeVisibleState} from '../../Redux/actions'
import { changePaymentState} from '../../Redux/actions/paymentAction'
import {changeStatus} from '../../Redux/actions/orderActions'


function StatusListGroup(props) {

    const handleClick = (status) => {
        if (props.groupIdx === 5 && props.order.price !== props.order.payed){
            const income = props.order.price > props.order.payed
            props.changePaymentState({
                direction: income ? 2 : 1,
                [income ? 'income': 'outcome']: Math.abs(props.order.missed_payments),
                client_id: props.order.client.id,
                description: income ? `Оплата по заказу № ${props.order.id_label}` : `Выплата по заказу № ${props.order.id_label}`,
                cashflow_category: income ? 2 : 8,
                employee_id: props.current_user_id,
                order_id: props.order.edit || props.order.id,
                context: {
                    type: props.order.edit ? 'closed_order_editor' : 'closed_order',
                    order_id: props.order.edit || props.order.id,
                    status_id: status.id
                }
            })
            props.editCurrentClient(props.order.client)
            props.changeVisibleState({'statusPaymentsEditor': true})
        } else {
            if (props.order.edit) {
                props.changeStatus(status.id, props.order.edit)
                props.refreshDataOrder(props.order.edit)
            } else {
                props.changeStatus(status.id, props.order.id)
                props.changeStatusMenuVisible(props.order.id)
            }
        }

    }

    return (
        <>
            <span>{props.groupName}</span>
            {props.status.filter((status) => status.group === props.groupIdx + 1)
                .map((status) => {
                    return (
                        <li
                            key={status.id}
                            className="statusListRow"
                            style={{backgroundColor: status.color}}
                            onClick={() => handleClick(status) }
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
    current_user_id: state.data.user.id
})

const mapDispatchToProps = {
    changeStatusMenuVisible,
    changeStatus,
    addOrders,
    refreshDataOrder,
    changePaymentState,
    changeVisibleState,
    editCurrentClient
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusListGroup)
