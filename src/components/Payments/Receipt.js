import React from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag} from '../../Redux/actions'
import {changePaymentState} from '../../Redux/actions/paymentAction'
import LableInput from '../general/LableInput'
const Receipt = (props) => {


    const desc = [
        `Перемещение денег из кассы "${props.payment.cashbox.title}"`,
        'Выплата денег из кассы',
        'Внесение денег в кассу'
    ]

    const sum = props.payment.outcome ? props.payment.outcome : props.payment.income

    return (
        <div>
            <div className='receipt__hol'/>
            <div className='receipt'>

                <table>
                    <thead>
                    <tr>
                        <th className='th'>Наименование</th>
                        <th className='th th_w70'>Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className='td'>{props.payment.edit ? props.payment.description : desc[props.payment.direction]}</td>
                        <td className='td'>
                            {props.payment.edit ? <div>{sum}</div> :
                                <LableInput
                                    className='w70'
                                    onChange={event => props.changePaymentState({
                                        [props.payment.direction === 2 ? 'income' : 'outcome']: event.target.value.replace(/[^0-9.,]/g, '')
                                    })}
                                    value={sum}
                                    checkedFlag='inputPaymentSumChecked'
                                    disabled={props.payment.context.type === 'closed_order'}
                                />
                            }
                        </td>
                    </tr>
                    <tr className='tr_no-underline'>
                        <td className='td td_total'>Итого:</td>
                        <td className='td'>
                            <div className=''>{`${sum} руб`}</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    payment: state.payment,
    inputPaymentSumChecked: state.view.inputPaymentSumChecked,
    cashboxes: state.cashbox.cashboxes
})

const mapDispatchToProps = {
    changePaymentState,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)