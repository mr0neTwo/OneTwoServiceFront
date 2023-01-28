import React from 'react'
import {connect} from 'react-redux'

import {showDate} from '../../../general/utils'
import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'

import {setPayment, setVisibleFlag} from '../../../../Redux/actions'
import PaymentCard from '../../../Payments/PaymentCard'
import CreatedAt from '../../../general/cell/CreateAt'
import Money from '../../../general/cell/Money'
import Balance from '../../../general/cell/Balance'

const TableOrderPayments = (props) => {

    const getColor = (amount) => {
        if (amount > 0) return 'td_green'
        else if (amount < 0) return 'td_red'
        else return 'td_number'
    }

    if (!props.order.payments.length) {
        return (
            <div className='empty_table'>Нет платежей</div>
        )
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th className='th th_w180'>Дата и время</th>
                    <th className='th'>Описание</th>
                    <th className='th th_w70'>Сумма</th>
                </tr>
                </thead>
                <tbody>
                {props.order.payments.filter(payment => !payment.deleted).map(payment => (
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
                        <td className='td'>{payment.description}</td>
                        <Money
                            income={payment.income}
                            outcome={payment.outcome}
                        />
                    </tr>

                ))}
                <tr className='tr_no-underline'>
                    <td/>
                    <td className='td td_total'>Итого платежей:</td>
                    <Balance
                        balance={props.order.payed}
                        isDifferentColors={true}
                    />
                </tr>
                <tr className='tr_no-underline'>
                    <td/>
                    <td className='td td_total'>Заказ на сумму:</td>
                    <Balance
                        balance={props.order.price}
                        isDifferentColors={true}
                    />
                </tr>
                <tr className='tr_no-underline'>
                    <td/>
                    <td className='td td_total'>
                        {props.order.missed_payments > 0 ? 'Клиент должен нам:' : 'Мы должны клиенту'}
                    </td>
                    <Balance
                        balance={props.order.missed_payments}
                        isDifferentColors={true}
                    />
                </tr>
                </tbody>
            </table>
            {props.statusPaymentsCard ? <PaymentCard/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order,
    statusPaymentsCard: state.view.statusPaymentsCard
})

const mapDispatchToProps = {
    setPayment,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrderPayments)