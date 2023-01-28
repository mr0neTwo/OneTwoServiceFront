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
import Button from '../../general/Button'


const Cashboxes = (props) => {

    useEffect(() => {
        if (Object.values(props.current_branch).length) props.addCashboxes()
    }, [props.cashbox.showDeleted, props.current_branch])


    return (
        <div className='row'>
            <div className='modal__block-forms'>
                <Checkbox
                    id='CashboxShowDeleted'
                    type='slide-three'
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


                <Button
                    size='med'
                    type='tertiary'
                    title='Добавить кассу'
                    onClick={() => props.changeVisibleState({statusCashboxEditor: true})}
                    invisible={!props.user.role.permissions.includes('edit_cash')}
                />
            </div>
            <ManeyMovement/>

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