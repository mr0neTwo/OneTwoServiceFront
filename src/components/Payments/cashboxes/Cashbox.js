import React from 'react'
import {connect} from 'react-redux'

import {ICON} from '../../../data/icons'
import {changeVisibleState} from '../../../Redux/actions'
import {changeCashboxState, editCashbox} from '../../../Redux/actions/cashboxAction'

import {changePaymentState} from '../../../Redux/actions/paymentAction'
import Button from '../../general/Button'
import Icon from '../../general/Icon'


const Cashbox = (props) => {

    const active = (id) => {
        return id === props.activ_cashbox_id
    }

    const edit = props.user.role.permissions.includes('edit_cash')

    const income = props.user.role.permissions.includes('make_income') &&
        active(props.cashbox.id) &&
        (props.cashbox.employees[props.user.id].like_cashbox ?
            props.cashbox.permissions.includes('incoming') :
            props.cashbox.employees[props.user.id].permissions.includes('incoming'))

    const outcome = props.user.role.permissions.includes('make_expenditure') &&
        active(props.cashbox.id) &&
        (props.cashbox.employees[props.user.id].like_cashbox ?
            props.cashbox.permissions.includes('outcoming') :
            props.cashbox.employees[props.user.id].permissions.includes('outcoming'))

    const move = props.user.role.permissions.includes('move_money') &&
        active(props.cashbox.id) &&
        (props.cashbox.employees[props.user.id].like_cashbox ?
            props.cashbox.permissions.includes('outcoming_move') :
            props.cashbox.employees[props.user.id].permissions.includes('outcoming_move'))

    const showBalance = props.user.role.permissions.includes('see_remains') &&
        (props.cashbox.employees[props.user.id].like_cashbox ?
            props.cashbox.permissions.includes('show_cashbox_remains') :
            props.cashbox.employees[props.user.id].permissions.includes('show_cashbox_remains'))

    const handleEdit = () => {
        props.editCashbox(props.cashbox)
        props.changeVisibleState({'statusCashboxEditor': true})
    }

    const hanldleIncome = () => {
        props.changePaymentState({
            direction: 2,
            context: {type: 'payment'},
            current_type: props.cashbox.type,
            employee: props.user,
            cashbox: props.cashbox
        })
        props.changeVisibleState({'statusPaymentsEditor': true})
    }

    const hanldleOutcome = () => {
        props.changePaymentState({
            direction: 1,
            context: {type: 'payment'},
            current_type: props.cashbox.type,
            employee: props.user,
            cashbox: props.cashbox
        })
        props.changeVisibleState({'statusPaymentsEditor': true})
    }

    const hanldleMove = () => {
        props.changePaymentState({
            direction: 0,
            context: {type: 'payment'},
            current_type: props.cashbox.type,
            employee: props.user,
            cashbox: props.cashbox
        })
        props.changeVisibleState({'statusPaymentsEditor': true})
    }

    return (
        <div
            className={`cashbox ${active(props.cashbox.id) ? 'cashbox_active' : ''}`}
            onClick={() => props.changeCashboxState({current_cashbox: props.cashbox})}
        >
            <div className='cashbox__icons'>
                <Icon
                    className='icon'
                    icon={ICON.SPHERE}
                />

                <div
                    onClick={edit ? handleEdit : null}
                >
                    <Icon
                        className='icon'
                        icon={ICON.SETTING}
                    />
                </div>
            </div>
            <div className='cashbox__title'>{props.cashbox.title}</div>
            {showBalance ?
                <div className='cashbox__balance'>
                    {`${props.cashbox.balance ? parseFloat(props.cashbox.balance).toFixed(2) : 0} руб.`}
                </div>
                : null}
            <div className='cashbox__buttons'>
                <Button
                    id='PaymentsEditor'
                    size='med'
                    type='create'
                    title='Приход'
                    onClick={hanldleIncome}
                    disabled={props.cashbox.deleted}
                    invisible={!income}
                />
                <Button
                    id='PaymentsEditor'
                    size='med'
                    type='destructive'
                    title='Расход'
                    onClick={hanldleOutcome}
                    disabled={props.cashbox.deleted}
                    invisible={!outcome}
                />
            </div>
            <Button
                id='PaymentsEditor'
                size='med'
                type='tertiary'
                title='Перемещение'
                onClick={hanldleMove}
                disabled={props.cashbox.deleted}
                invisible={!move}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.data.user,
    activ_cashbox_id: state.cashbox.current_cashbox.id,
})

const mapDispatchToProps = {
    editCashbox,
    changeCashboxState,
    changePaymentState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(Cashbox)