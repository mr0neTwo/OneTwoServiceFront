import React, {useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux'


import {ICON} from '../../data/icons'

import Icon from './Icon'
import Button from './Button'
import Checkbox from './Checkbox'
import {includesObject} from './utils'
import {COLORS} from '../../data/colors'

/**
 * Компонент позволяет выбрать нестолькок статусов из списка.
 *
 * @component
 * @example
 * <ChooseStatuses
 * id='id'
 * className='className'
 * func={props.func}
 * func_clear={props.func_clear}
 * current_list={props.current_list}
 * invisible={false}
 * range={[0, 7]}
 * />
 *
 * id - id компонента
 * className - стиль оболочки компонента
 * func - Функция возвращающая список выбранных статусов
 * func_clear - Функция очищающая список статусов
 * current_list - Список выбранных статусов
 * range - Диапазон групп статусов
 */

const SelectStatuses = (props) => {

    const [listVisible, setListVisible] = useState(false)

    const element = useRef()

    const clickHandel = (event) => {
        if (element.current && listVisible && !element.current.contains(event.target)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const status_group = props.status_group.filter(group => group.type_group > props.range[0] && group.type_group <= props.range[1])
    const allStatuses = props.statuses.filter(status => status.group > props.range[0] && status.group <= props.range[1])

    const getLabel = (length) => {
       switch (length) {
           case 0:
               return 'Ничего не выбрано'
           case allStatuses.length:
               return 'Все'
           default:
               return `Выбрано ${length}`
       }
    }

    return props.invisible ? null : (
        <div
            ref={element}
            className={`select select_statuses ${props.className} ${listVisible ? 'select_active' : ''}`}
        >
            <div className='label select__label'>Выберете статусы</div>
            <div
                className='input select__input'
                onClick={props.disabled ? null : () => setListVisible(!listVisible)}
            >
                <div className='nowrap'>{getLabel(props.current_list.length)}</div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>
            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        {status_group.map(group => (
                            <ChooseStatusesGroup
                                key={group.id}
                                group={group}
                                func={value => props.func(value)}
                                current_list={props.current_list}
                                statuses={props.statuses}
                            />
                        ))}
                    </div>
                    <div className='select__buttons'>
                        <Button
                            size='small'
                            type='tertiary'
                            title='Выбрать все'
                            onClick={() => props.func(allStatuses)}
                            disabled={props.current_list.length === allStatuses.length}
                        />
                        <Button
                            size='small'
                            type='tertiary'
                            title='Отменить все'
                            onClick={props.func_clear}
                        />
                    </div>
                </div>
                : null
            }
        </div>
    )
}

const ChooseStatusesGroup = props => {

    const mainCheckbox = useRef()
    const current_statuses = props.group.statuses

    useEffect(() => {
        if (mainCheckbox.current && current_statuses.length) {
            const selected_values = current_statuses.filter(status => includesObject(status, props.current_list))
            if (selected_values.length === current_statuses.length) {
                mainCheckbox.current.indeterminate = false
                mainCheckbox.current.checked = true
            } else if (!selected_values.length) {
                mainCheckbox.current.indeterminate = false
                mainCheckbox.current.checked = false
            } else {
                mainCheckbox.current.indeterminate = true
            }
        }
    }, [props.current_list])

    return (
        <div className='select__set-items'>
            <Checkbox
                id={props.group.id + 1000}
                className='mb5'
                ref={mainCheckbox}
                label={props.group.name}
                type='squared-four'
                onChange={() => props.func(current_statuses)}
                invisible={!current_statuses.length}
            />
            {current_statuses.map(status => (
                <div
                    key={status.id}
                    className='select__item'
                >
                    <Checkbox
                        id={status.id}
                        className='ml20'
                        type='squared-four'
                        onChange={() => props.func([status])}
                        checked={includesObject(status, props.current_list)}
                        invisible={status.deleted}
                    />
                    <div
                        className='select__status'
                        style={{
                            backgroundColor: `var(--${COLORS.STATUS[status.group]})`,
                            color: COLORS.STATUS[status.group] === 'disabled' ? 'var(--secondary)' : 'var(--background)'
                        }}
                    >
                        {status.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    status_group: state.data.status_group,
    statuses: state.data.status
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectStatuses)
