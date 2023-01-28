
import React from 'react'
import {showDate} from '../utils'
import {ICON} from '../../../data/icons'
import Icon from '../Icon'


/**
 * Заголовок столбца "Создан"
 *
 * @component
 * @example
 * <CreatedAt
 * description={payment.description}
 * clientName={payment.client.name}
 * cashflowCategory={payment.cashflowCategory}
 * />
 *
 * description - Описание
 * clientName - Имя плательщика
 * cashflowCategory - Категория
 */
const PaymentDescription = (props) => {

    return (
        <td>
            <div className='nowrap'>
                {props.description}
                {props.clientName ?` (Клиент: ${props.clientName})` : null }
            </div>
            {props.cashflowCategory ?
                <div className='cell_cashflow-category'>
                    <Icon className='icon icon_12' icon={ICON.FILE_TEXT}/>
                    <div>{props.cashflowCategory}</div>
                </div>
                : null
            }
        </td>
    )
}

export default PaymentDescription