import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'


import {changeVisibleState} from '../../../Redux/actions'
import {resetPayroll, changePayrollState, createPayroll, deletePayroll} from '../../../Redux/actions/payrollActions'
import BottomButtons from '../../general/BottomButtons'

import PayrollForm from './PayrollForm';
import PayrollReceipt from './PayrollReceipt'
import {checkObject} from '../../general/utils'


const PayrollEditor = (props) => {

    const handleClose = () => {
        props.changeVisibleState({
            statusPayrollEditor: false,
            inputPayrollDescChecked: true,
            inputPayrollEmployeeChecked: true,
            inputPaymentCashboxChecked: true,
            inputPaymentCashflowChecked: true
        })
        props.resetPayroll()
    }

    const id = 'PayrollEditor'

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id)) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })


    const hangleCreate = () => {
        if (
            (props.payroll.income || props.payroll.outcome) &&
            checkObject(props.payroll.employee) &&
            props.payroll.description &&
            (props.payroll.relation_type !== 12 || props.payroll.payment_cashbox_id) &&
            (props.payroll.relation_type !== 12 || props.payroll.payment_cashflow_category)
        ) {
            props.createPayroll()
        } else {
            if (!(props.payroll.income || props.payroll.outcome)) {
                props.changeVisibleState({inputPayrollSumChecked: false})
            }
            if (!checkObject(props.payroll.employee)) {
                props.changeVisibleState({inputPayrollEmployeeChecked: false})
            }
            if (!props.payroll.description) {
                props.changeVisibleState({inputPayrollDescChecked: false})
            }
            if (!props.payroll.payment_cashbox_id) {
                props.changeVisibleState({inputPaymentCashboxChecked: false})
            }
            if (!props.payroll.payment_cashflow_category) {
                props.changeVisibleState({inputPaymentCashflowChecked: false})
            }
        }
    }


    const title = ['', 'Взыскание', 'Премия']

    const type_payrolls = ['', 'Cоздания заказа', 'Закрытие заказа', 'Ведение заказа', 'Работа', 'Работа', 'Продажа', 'Оклад', '', 'Премия', 'Взыскания', 'Возврат']

    return (
        <div className="modal">
            <div className="modal__box modal__box_editor" id={id}>
                <h4>
                    {props.payroll.edit ? type_payrolls[props.payroll.relation_type] : (title[props.payroll.direction])}
                </h4>

                <div className='modal__body modal__body-payment'>

                    {props.payroll.edit ? <PayrollReceipt/> : <PayrollForm/>}

                </div>

                <BottomButtons
                    edit={props.payroll.edit}
                    create={hangleCreate}
                    delete={props.permissions.includes('delete_payrolls') ? () => props.deletePayroll(true) : null}
                    recover={props.permissions.includes('recover_payrolls') ? () => props.deletePayroll(false) : null}
                    close={handleClose}
                    deleted={props.payroll.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    view: state.view,
    payroll: state.payroll,
    permissions: state.data.user.role.permissions,
    employees: state.employee.employees.filter(employee => !employee.deleted)
})

const mapDispatchToProps = {
    changePayrollState,
    changeVisibleState,
    resetPayroll,
    createPayroll,
    deletePayroll
}

export default connect(mapStateToProps, mapDispatchToProps)(PayrollEditor)
