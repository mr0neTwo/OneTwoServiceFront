import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag} from '../../../Redux/actions'
import {editPayroll} from '../../../Redux/actions/payrollActions'

import {showDate} from '../../general/utils'
import Icon from '../../general/Icon'
import {ICON} from '../../../data/icons'

const TablePayrolls = (props) => {

    const [incomeSum, setIncomeSum] = useState(0)
    const [outcomeSum, setOutcomeSum] = useState(0)

    const type_payrolls = ['', 'Cоздания заказа', 'Закрытие заказа', 'Ведение заказа', 'Работа', 'Работа', 'Продажа', 'Оклад', '', 'Премия', 'Взыскания', 'Возврат', 'Выплата']

    const editPayroll = (payroll) => {
        props.editPayroll(payroll)
        props.setVisibleFlag('statusPayrollEditor', true)
    }


    useEffect(() => {
        let income_sum = 0
        let outcome_sum = 0
        props.payrolls.filter(payroll => !payroll.deleted).forEach(payroll => {
            income_sum += payroll.income
            outcome_sum += payroll.outcome
        })
        setIncomeSum(income_sum)
        setOutcomeSum(outcome_sum)
    }, [props.payrolls])


    return (
        <table>
            <thead>
            <tr>
                <th className='w135'>Дата</th>
                <th>Описание</th>
                <th className='w91'>Приход, руб.</th>
                <th className='w91'>Расход, руб.</th>
                <th className='w91'>Баланс, руб.</th>
            </tr>
            </thead>
            <tbody>
            {props.payrolls.map(payroll => (
                <tr
                    key={payroll.id}
                    className={payroll.deleted ? 'rowDeleted redBorder' : null}
                    onDoubleClick={() => editPayroll(payroll)}
                >
                    <td className='pd-lr-5'>
                        <div>
                            <div className='row'>
                                <div>{type_payrolls[payroll.relation_type]}</div>
                                {payroll.created_at !== payroll.custom_created_at ?
                                    <div title={`Добавлено задним числом\n${showDate(payroll.created_at)}`}>
                                        <Icon
                                            className='icon-s2 ml5'
                                            icon={ICON.WARNING}
                                            color='red'
                                        />
                                    </div> : null}
                            </div>
                            <div className='cgr'>{showDate(payroll.custom_created_at)}</div>
                        </div>
                    </td>
                    <td className='pd-lr-5'>{payroll.description}</td>
                    <td className={payroll.income ? 'greenFont tac' : 'tac'}>{payroll.income}</td>
                    <td className={payroll.outcome ? 'redFont tac' : 'tac'}>{payroll.outcome}</td>
                    <td className='tac'>{payroll.deposit ? payroll.deposit.toFixed(2) : 0}</td>
                </tr>
            ))}
            <tr>
                <td colSpan='2'>Всего - {props.payrolls.length}</td>
                <td className='txtb tac'>{incomeSum.toFixed(2)} руб.</td>
                <td className='txtb tac'>{outcomeSum.toFixed(2)} руб.</td>
                <td></td>
            </tr>
            </tbody>
        </table>

    )
}

const mapStateToProps = state => ({
    payrolls: state.payroll.payrolls
})

const mapDispatchToProps = {
    editPayroll,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePayrolls)