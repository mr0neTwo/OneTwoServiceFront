import React from 'react'
import {connect} from 'react-redux'

import {icone_sphere, icone_setting} from '../../../data/icons'
import {activeCashbox, editCashbox, changeCashboxForm, changeVisibleState} from '../../../Redux/actions'
import {changePaymentState} from '../../../Redux/actions/paymentAction'
import Button from '../../general/Button'
import Icon from '../../general/Icon'


const Cashbox = (props) => {

    const activ = (id) => {
        return id === props.activ_cashbox_id
    }

    const edit = props.user.role.permissions.includes('edit_cash')

    const income = props.user.role.permissions.includes('make_income') &&
        activ(props.cashbox.id) &&
        (props.cashbox.employees[props.user.id].like_cashbox ?
            props.cashbox.permissions.includes('incoming') :
            props.cashbox.employees[props.user.id].permissions.includes('incoming'))

    const outcome = props.user.role.permissions.includes('make_expenditure') &&
        activ(props.cashbox.id) &&
        (props.cashbox.employees[props.user.id].like_cashbox ?
            props.cashbox.permissions.includes('outcoming') :
            props.cashbox.employees[props.user.id].permissions.includes('outcoming'))

    const move = props.user.role.permissions.includes('move_money') &&
        activ(props.cashbox.id) &&
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
            'direction': 2,
            'context': {type: 'payment'},
            'current_type': props.cashbox.type,
            'employee_id': props.user.id,
            'cashbox_id': props.cashbox.id
        })
        props.changeVisibleState({'statusPaymentsEditor': true})
    }

    const hanldleOutcome = () => {
        props.changePaymentState({
            'direction': 1,
            'context': {type: 'payment'},
            'current_type': props.cashbox.type,
            'employee_id': props.user.id,
            'cashbox_id': props.cashbox.id
        })
        props.changeVisibleState({'statusPaymentsEditor': true})
    }

    const hanldleMove = () => {
        props.changePaymentState({
            'direction': 0,
            'context': {type: 'payment'},
            'current_type': props.cashbox.type,
            'employee_id': props.user.id,
            'cashbox_id': props.cashbox.id
        })
        props.changeVisibleState({'statusPaymentsEditor': true})
    }

    return (
        <div
            className={`cashbox ${activ(props.cashbox.id) && !props.cashbox.deleted ? 'bcg' : 'cgr'}`}
            onClick={() => props.changeCashboxForm(props.cashbox, 'current_cashbox')}
        >
            <div className='icons'>
                <div><Icon className='smalIcon' icon={icone_sphere}
                           color={activ(props.cashbox.id) && props.cashbox.isGlobal ? 'grey' : 'white'}/></div>
                <div
                    onClick={edit ? handleEdit : null}
                >
                    <Icon className='smalIcon curP' icon={icone_setting}
                          color={activ(props.cashbox.id) && edit ? 'grey' : 'white'}/>
                </div>
            </div>
            <div>{props.cashbox.title.toUpperCase()}</div>
            {showBalance ?
                <div className='cacsboxBalance'>
                    {`${props.cashbox.balance ? parseFloat(props.cashbox.balance).toFixed(2) : 0} руб.`}
                </div>
                : null}
            <div className='row jc-c'>
                <Button
                    title='+ Приход'
                    className={props.cashbox.deleted ? 'whiteButton m10' : 'greenButton m10'}
                    onClick={hanldleIncome}
                    disabled={props.cashbox.deleted}
                    invisible={!income}
                />
                <Button
                    id='344'
                    title='- Расход'
                    className={props.cashbox.deleted ? 'whiteButton m10' : 'greenButton bcr m10'}
                    onClick={hanldleOutcome}
                    disabled={props.cashbox.deleted}
                    invisible={!outcome}
                />
            </div>
            <Button
                title='Перемещение'
                className='whiteButton'
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
    activeCashbox,
    editCashbox,
    changeCashboxForm,
    changePaymentState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(Cashbox)