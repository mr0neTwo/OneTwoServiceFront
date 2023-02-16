import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag} from '../../../Redux/actions'
import {editPayroll} from '../../../Redux/actions/payrollActions'

import {showDate} from '../../general/utils'
import Icon from '../../general/Icon'
import {ICON} from '../../../data/icons'
import CreatedAt from '../../general/cell/CreateAt'
import Money from '../../general/cell/Money'
import Balance from '../../general/cell/Balance'

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
        <div className='table-orders-container'>
            <table>
                <thead>
                <tr>
                    <th className='th th_w180'>Дата</th>
                    <th className='th'>Описание</th>
                    <th className='th th_w80'>Приход</th>
                    <th className='th th_w80'>Расход</th>
                    <th className='th th_w80'>Баланс</th>
                </tr>
                </thead>
                <tbody>
                {props.payrolls.map(payroll => (
                    <tr
                        key={payroll.id}
                        className={payroll.deleted ? 'tr tr_deleted' : 'tr'}
                        onDoubleClick={() => editPayroll(payroll)}
                    >
                        <CreatedAt
                            creator={type_payrolls[payroll.relation_type]}
                            date={payroll.created_at}
                            customDate={payroll.custom_created_at}
                        />
                        <td className='td'>{payroll.description}</td>
                        <Money income={payroll.income}/>
                        <Money outcome={payroll.outcome}/>
                        <Balance
                            balance={payroll.deposit}
                            isDifferentColors={true}
                        />
                    </tr>
                ))}
                <tr>
                    <td colSpan='2'>Всего - {props.payrolls.length}</td>
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
    payrolls: state.payroll.payrolls
})

const mapDispatchToProps = {
    editPayroll,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePayrolls)