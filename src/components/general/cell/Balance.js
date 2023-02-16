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
 *   inline={true}
 *   invisible={true}
 * />
 *
 * balance - Баланс
 * isDifferentColors - Показывать разными цветами (приход зеленым, расход красным)
 * inline - true в span, false в td
 * invisible - Не отображать
 */
const Balance = (props) => {

    let className = 'td'
    if (props.isDifferentColors && props.balance > 0) className += ' td_green'
    if (props.isDifferentColors && props.balance < 0) className += ' td_red'

    const balance = props.balance?.toLocaleString(...Payment.SumConfiguration) || 0

    if (props.invisible) return null

    if (props.inline) {
        return <span className={className}>{balance}</span>
    }

    return <td className={className}>{balance}</td>

}

export default Balance