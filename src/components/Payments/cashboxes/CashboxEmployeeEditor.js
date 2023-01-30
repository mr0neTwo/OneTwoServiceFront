import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag} from '../../../Redux/actions'
import {changeCashboxPermissions} from '../../../Redux/actions/cashboxAction'

import ChooseButton from '../../general/ChooseButton'
import WarningOrange from '../../general/WarningOrange'
import Checkbox from '../../general/Checkbox'
import Button from '../../general/Button'

const CashboxEmployeeEditor = (props) => {

    const [perm, setPerm] = useState(props.cashbox.employees[props.cashbox.permissions_employee].like_cashbox)

    const id = 'CashboxEmployeeEditor'

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id)) {
            props.setVisibleFlag('statusCashboxEmployeeEditor', false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    return (
        <div className="modal">
            <div className="modal__box modal__box_editor" id={id}>
                <h4>{props.employee.name}</h4>
                <h5>{props.employee.role_title}</h5>
                <WarningOrange
                    text="Сотрудник сможет выполнять только те действия, которые разрешены в настройках его роли"
                    width="500px"
                />
                <div className='modal__block-forms'>
                    <ChooseButton
                        title='Выберите права'
                        name={['Доступные для кассы', 'Персональные']}
                        func1={() => {
                            setPerm(true)
                            props.changeCashboxPermissions(true, 'like_cashbox')
                        }}
                        func2={() => {
                            setPerm(false)
                            props.changeCashboxPermissions(false, 'like_cashbox')
                        }}
                        checked={props.cashbox.employees[props.cashbox.permissions_employee].like_cashbox}
                        disabled={props.cashbox.deleted}
                    />
                    <Checkbox
                        id='CashboxEmployeeEditorRemain'
                        type='slide-three'
                        label='Видеть остаток денег в кассе'
                        onChange={() => props.changeCashboxPermissions('show_cashbox_remains', 'permissions')}
                        checked={
                            perm ?
                                props.cashbox.permissions.includes('show_cashbox_remains') :
                                props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('show_cashbox_remains')
                        }
                        disabled={props.cashbox.deleted || perm}
                    />
                    <Checkbox
                        id='CashboxEmployeeEditorCashflow'
                        type='slide-three'
                        label='Видеть денежный поток'
                        onChange={() => props.changeCashboxPermissions('show_cash_flow', 'permissions')}
                        checked={
                            perm ?
                                props.cashbox.permissions.includes('show_cash_flow') :
                                props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('show_cash_flow')
                        }
                        disabled={props.cashbox.deleted || perm}
                    />
                    <div className='modal__block-forms_row'>
                        <div className='modal__block-forms'>
                            <h5>Входящие операции</h5>
                            <Checkbox
                                id='CashboxEmployeeEditorIncome'
                                type='slide-three'
                                label='Приход'
                                onChange={() => props.changeCashboxPermissions('incoming', 'permissions')}
                                checked={
                                    perm ?
                                        props.cashbox.permissions.includes('incoming') :
                                        props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('incoming')
                                }
                                disabled={props.cashbox.deleted || perm}
                            />
                            <Checkbox
                                id='CashboxEmployeeEditorIncomeMove'
                                type='slide-three'
                                label='Перемещение'
                                onChange={() => props.changeCashboxPermissions('incoming_move', 'permissions')}
                                checked={
                                    perm ?
                                        props.cashbox.permissions.includes('incoming_move') :
                                        props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('incoming_move')
                                }
                                disabled={props.cashbox.deleted || perm}
                            />
                        </div>
                        <div className='modal__block-forms'>
                            <h5>Исходящие операции</h5>
                            <Checkbox
                                id='CashboxEmployeeEditorOutcome'
                                type='slide-three'
                                label='Приход'
                                onChange={() => props.changeCashboxPermissions('outcoming', 'permissions')}
                                checked={
                                    perm ?
                                        props.cashbox.permissions.includes('outcoming') :
                                        props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('outcoming')
                                }
                                disabled={props.cashbox.deleted || perm}
                            />
                            <Checkbox
                                id='CashboxEmployeeEditorOutcomeMove'
                                type='slide-three'
                                label='Перемещение'
                                onChange={() => props.changeCashboxPermissions('outcoming_move', 'permissions')}
                                checked={
                                    perm ?
                                        props.cashbox.permissions.includes('outcoming_move') :
                                        props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('outcoming_move')
                                }
                                disabled={props.cashbox.deleted || perm}
                            />
                        </div>
                    </div>
                </div>

                <div className="two-buttons">
                    <Button
                        size='med'
                        type='primary'
                        title='Сохранить'
                        onClick={() => props.setVisibleFlag('statusCashboxEmployeeEditor', false)}
                    />
                    <Button
                        size='med'
                        type='tertiary'
                        title='Закрыть'
                        onClick={() => props.setVisibleFlag('statusCashboxEmployeeEditor', false)}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    employee: state.employee,
    roles: state.data.roles,
    cashbox: state.cashbox
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeCashboxPermissions
}

export default connect(mapStateToProps, mapDispatchToProps)(CashboxEmployeeEditor)
