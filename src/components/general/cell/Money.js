import React from 'react'

import {Payment} from '../../../data/data'


/**
 * Заголовок столбца "Создан"
 *
 * @component
 * @example
 * <CreatedAt
 *   income={payment.income}
 *   outcome={payment.outcome}
 * />
 *
 * income - Дата создания
 * outcome - Пользовательская дата создания
 */
const Money = (props) => {

    if (props.income) {
        return (
            <td className='td td_green'>
                {props.income.toLocaleString(...Payment.SumConfiguration)}
            </td>
        )
    } else if (props.outcome) {
        return (
            <td className='td td_red'>
                {Math.abs(props.outcome).toLocaleString(...Payment.SumConfiguration)}
            </td>
        )
    } else {
        return <td className='td'/>
    }
}

export default Money