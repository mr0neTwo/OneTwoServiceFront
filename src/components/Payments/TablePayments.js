import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag, setPayment} from '../../Redux/actions'
import CreatedAt from '../general/cell/CreateAt'
import PaymentDescription from '../general/cell/PaymentDescription'
import Money from '../general/cell/Money'
import Balance from '../general/cell/Balance'
import Loader from '../Loader/Loader'

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

    const showBalance = () => {
        let cashboxAvailable = false
        if (Object.values(props.current_cashbox).length) {
            cashboxAvailable = (props.current_cashbox.employees[props.user.id].like_cashbox ?
                props.current_cashbox.permissions.includes('show_cashbox_remains') :
                props.current_cashbox.employees[props.user.id].permissions.includes('show_cashbox_remains'))
        }
        return cashboxAvailable && props.user.role.permissions.includes('see_remains')
    }

    const payments = props.payments.filter(payment => props.showDeleted || !payment.deleted)
        .filter(payment => props.permissions.includes('see_payment_profit') || payment.cashflow_category !== 'Прибыль')

    if (!props.payments.length) {
        return (
            <div className='empty_table'>Нет платежей за указаный период</div>
        )
    }

    if (props.showLoader) return <Loader/>

    return (
        <div className='table-container'>
            <table>
                <thead>
                <tr>
                    <th className='th th_w180'>Создан</th>
                    <th className='th'>Описание</th>
                    <th className='th th_w80'>Приход</th>
                    <th className='th th_w80'>Расход</th>
                    {showBalance() ? <th className='th th_w80'>Остаток</th> : null}
                </tr>
                </thead>
                <tbody>
                {payments.map(payment => (
                    <tr
                        key={payment.id}
                        className={payment.deleted ? 'rowDeleted redBorder' : 'tr'}
                        onDoubleClick={() => {
                            props.setPayment(payment)
                            props.setVisibleFlag('statusPaymentsCard', true)
                        }}
                    >
                        <CreatedAt
                            creator={payment.employee.name}
                            date={payment.created_at}
                            customDate={payment.custom_created_at}
                        />
                        <PaymentDescription
                            description={payment.description}
                            clientName={payment.client.name}
                            cashflowCategory={payment.cashflow_category}
                        />
                        <Money income={payment.income}/>
                        <Money outcome={payment.outcome}/>
                        <Balance
                            balance={payment.deposit}
                            isDifferentColors={true}
                            invisible={!showBalance()}
                        />
                    </tr>
                ))}
                <tr>
                    <td colSpan='2'>Всего - {payments.length}</td>
                    <Balance
                        balance={incomeSum}
                        isDifferentColors={true}
                    />
                    <Balance
                        balance={outcomeSum}
                        isDifferentColors={true}
                    />
                    <td/>
                </tr>
                </tbody>

            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    payments: state.payment.payments,
    showLoader: state.payment.showLoader,
    employees: state.employee.employees,
    user: state.data.user,
    current_cashbox: state.cashbox.current_cashbox,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    setPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePayments)