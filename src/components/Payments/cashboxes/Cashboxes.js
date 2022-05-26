import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'


import {changeVisibleState} from '../../../Redux/actions'
import {addPayments} from '../../../Redux/actions/paymentAction'
import {addCashboxes, changeCashboxState} from '../../../Redux/actions/cashboxAction'

import Checkbox from '../../general/Checkbox'
import Cashbox from './Cashbox'
import CashboxEditor from './CashboxEditor'
import PaymentsEditor from '../PaymentsEditor'
import ManeyMovement from '../ManeyMovement'
import PaymentCard from '../PaymentCard'


const Cashboxes = (props) => {

    useEffect(() => {
        if (Object.values(props.current_branch).length)  props.addCashboxes()
    }, [props.cashbox.showDeleted, props.current_branch])

    // const cashboxes = props.cashbox.cashboxes.filter(cashbox =>
    //    (!cashbox.deleted || showDeleted) &&
    //    cashbox.employees[props.user.id].available &&
    //    (cashbox.branch_id === (props.current_branch ? props.current_branch.id : false )|| cashbox.isGlobal)
    //    )

    return (
        <div className='contentTab'>

            <div className='row al-itm-bl'>
                <div className='cashboxes'>
                    <Checkbox
                        label='Показать удаленные'
                        onChange={event => props.changeCashboxState({showDeleted: event.target.checked})}
                        checked={props.cashbox.showDeleted}
                    />
                    {props.cashbox.cashboxes.map(cashbox => {
                        return (
                            <Cashbox
                                key={cashbox.id}
                                cashbox={cashbox}
                                active={cashbox.active}
                            />
                        )
                    })}

                    {props.user.role.permissions.includes('edit_cash') ?
                        <div
                            className='whiteButton'
                            onClick={() => props.changeVisibleState({statusCashboxEditor: true})}
                        >
                            + Добавить кассу
                        </div> : null}

                </div>
                {props.permissions.includes('see_moving_money') ? <ManeyMovement/> : null}

            </div>
            {props.view.statusPaymentsCard ? <PaymentCard/> : null}
            {props.view.statusPaymentsEditor ? <PaymentsEditor/> : null}
            {props.view.statusCashboxEditor ? <CashboxEditor/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    view: state.view,
    cashbox: state.cashbox,
    user: state.data.user,
    current_branch: state.branch.current_branch,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeVisibleState,
    addCashboxes,
    changeCashboxState,
    addPayments
}

export default connect(mapStateToProps, mapDispatchToProps)(Cashboxes)