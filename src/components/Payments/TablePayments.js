import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag, setPayment} from '../../Redux/actions'
import {icon_file_text, icon_warning} from '../../data/icons'
import Icon from '../general/Icon'
import {showDate} from '../general/utils'

const TablePayments = (props) => {

    const [incomeSum, setIncomeSum] = useState(0)
    const [outcomeSum, setOutcomeSum] = useState(0)

    useEffect(() => {
        let income_sum = 0
        let outcome_sum = 0
        props.payments.filter(payment => !payment.deleted).forEach(payment => {
            income_sum += payment.income
            outcome_sum += payment.outcome
        })
        setIncomeSum(income_sum)
        setOutcomeSum(outcome_sum)
    }, [props.payments])

    const showBalance = props.user.role.permissions.includes('see_remains')

    const payments = props.payments.filter(payment => props.showDeleted || !payment.deleted)


    return (
        <table className='mt15'>
            <thead>
            <tr className=''>
                <th className='w150'>Создан</th>
                <th>Описание</th>
                <th className='w91'>Приход, руб.</th>
                <th className='w91'>Расход, руб.</th>
                {showBalance ? <th className='w91'>Остаток, руб.</th> : null}
            </tr>
            </thead>
            <tbody>
            {payments.map(payment => (
                <tr
                    key={payment.id}
                    className={payment.deleted ? 'rowDeleted redBorder' : null}
                    onDoubleClick={() => {
                        props.setPayment(payment)
                        props.setVisibleFlag('statusPaymentsCard', true)
                    }}
                >
                    <td>
                        <div>{payment.employee.name}</div>
                        <div className='row'>
                            <div className='cgr'>{showDate(payment.custom_created_at)}</div>
                            {payment.created_at !== payment.custom_created_at ?
                                <div title={`Платеж добавлен задним числом\n${showDate(payment.created_at)}`}>
                                    <Icon
                                        className='icon-s2 ml5'
                                        icon={icon_warning}
                                        color='red'
                                    />
                                </div> : null}
                        </div>
                    </td>
                    <td>
                        <div>{payment.description}</div>
                        {payment.direction ?
                            <div className='row'>
                                <Icon className='icon-s1' icon={icon_file_text} color='#acacac'/>
                                <div className='tac ml5 cgr'>{payment.cashflow_category}</div>
                            </div> : null}
                    </td>
                    <td className={payment.income ? 'greenFont tac' : 'tac'}>{payment.income}</td>
                    <td className={payment.outcome ? 'redFont tac' : 'tac'}>{payment.outcome}</td>
                    {showBalance ? <td className='tac'>{parseFloat(payment.deposit).toFixed(2)}</td> : null}
                </tr>
            ))}
            <tr>
                <td colSpan='2'>Всего - {payments.length}</td>
                <td className='txtb tac'>{incomeSum.toFixed(2)} руб.</td>
                <td className='txtb tac'>{outcomeSum.toFixed(2)} руб.</td>
                <td></td>
            </tr>
            </tbody>

        </table>
    )
}

const mapStateToProps = state => ({
    payments: state.data.payments,
    employees: state.data.employees,
    user: state.data.user,
    current_cashbox: state.cashbox.current_cashbox
})

const mapDispatchToProps = {
    setVisibleFlag,
    setPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePayments)