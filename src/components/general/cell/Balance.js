import React, {useMemo} from 'react'

import {Payment} from '../../../data/data'


/**
 * Заголовок столбца "Создан"
 *
 * @component
 * @example
 * <Balance
 *   balance={payment.balance}
 *   isDifferentColors={true}
 *   invisible={true}
 * />
 *
 * balance - Баланс
 * isDifferentColors - Показывать разными цветами (приход зеленым, расход красным)
 * invisible - Не отображать
 */
const Balance = (props) => {

    let className = 'td'
    if (props.isDifferentColors && props.balance > 0) className += ' td_green'
    if (props.isDifferentColors && props.balance < 0) className += ' td_red'

    if (props.invisible) return null

    return (
        <td className={className}>
            {props.balance.toLocaleString(...Payment.SumConfiguration) || 0}
        </td>
    )
}

export default Balance