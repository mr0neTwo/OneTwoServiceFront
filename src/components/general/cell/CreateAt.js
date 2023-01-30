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
 * creator={props.createdAt}
 * date={props.date}
 * customDate={props.customDate}
 * />
 *
 * creator - Заказ создал
 * date - Дата создания
 * customDate - Пользовательская дата создания
 */
const CreatedAt = (props) => {

    const check = props.customDate && props.customDate !== props.date

    return (
        <td>
            <div className='cell cell_date'>
                <div className='cell_text'>{props.creator}</div>
                <div
                    className='cell_date-payment'
                >
                    <div>{showDate(props.customDate || props.date)}</div>
                    {check ?
                        <div title={`Платеж добавлен задним числом\n${showDate(props.date)}` }>
                            <Icon
                                className='icon icon_12'
                                icon={ICON.WARNING}
                            />
                        </div>
                        : null
                    }
                </div>
            </div>

        </td>
    )
}

export default CreatedAt