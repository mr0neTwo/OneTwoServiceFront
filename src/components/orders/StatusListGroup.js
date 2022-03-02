import React from 'react'
import {connect} from 'react-redux'

import {addOrders} from '../../Redux/actions/orderActions'
import {changeStatusMenuVisible, editCurrentClient, refreshDataOrder, setVisibleFlag} from '../../Redux/actions'
import {changePaymentForm} from '../../Redux/actions/paymentAction'
import {changeStatus} from '../../Redux/actions/orderActions'


function StatusListGroup(props) {

    const handleClick = (status) => {
        if (props.groupIdx === 5 && props.order.price !== props.order.payed){
            const income = props.order.price > props.order.payed
            props.changePaymentForm(income ? 2 : 1, 'direction')
            props.changePaymentForm(Math.abs(props.order.price - props.order.payed), income ? 'income': 'outcome')
            props.changePaymentForm(props.order.client.id, 'client_id')
            props.editCurrentClient(props.order.client)
            props.changePaymentForm(income ? `Оплата по заказу № ${props.order.id_label}` : `Выплата по заказу № ${props.order.id_label}`, 'description')
            props.changePaymentForm(income ? 2 : 1, 'direction')
            props.changePaymentForm(income ? 2 : 8, 'cashflow_category')
            props.changePaymentForm(props.current_user_id, 'employee_id')
            props.changePaymentForm(props.order.edit || props.order.id, 'order_id')
            const context = {
                type: props.order.edit ? 'closed_order_editor' : 'closed_order',
                order_id: props.order.edit || props.order.id,
                status_id: status.id
            }
            props.changePaymentForm(context, 'context')
            props.setVisibleFlag('statusPaymentsEditor', true)
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
    // order: state.order,
    current_user_id: state.data.user.id
})

const mapDispatchToProps = {
    changeStatusMenuVisible,
    changeStatus,
    addOrders,
    refreshDataOrder,
    changePaymentForm,
    setVisibleFlag,
    editCurrentClient
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusListGroup)
