import React, {useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux'


import {icon_down, icon_left} from '../../data/icons'

import Icon from './Icon'
import Button from './Button'
import Checkbox from './Checkbox'
import {includesObject} from './utils'

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
 * width={'250px'}
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

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes('chooseOfListStatuses') ) {
            if (listVisible) {
                setListVisible(false)
            }}
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const status_group = props.status_group.filter(group => group.type_group > props.range[0] && group.type_group <= props.range[1])
    const allStatuses = props.statuses.filter(status => status.group > props.range[0] && status.group <= props.range[1])

    return props.invisible ? null : (
        <div
            className={`h49 ${props.className}`}
            style={{width: props.width ? props.width : '250px'}}
            id='chooseOfListStatuses'
        >
            <div className='lableImput'>Выберете статусы</div>
            <div
                className='optionsButton al-itm-ct'
                onClick={props.disabled ? null : () => setListVisible(!listVisible)}
            >
                <div className='noWr'>{`Выбрано ${props.current_list.length}`}</div>
                <Icon icon={listVisible ? icon_down : icon_left} className='icon-s2' color='grey'/>
            </div>
            {listVisible ?
                <div className='liststatus'>
                    <div
                        className='blocList'
                        style={{width: props.width ? props.width : '250px'}}
                    >
                        {status_group.map(group => (
                            <ChooseStatusesGroup
                                key={group.id}
                                label={group.name}
                                group={group.type_group}
                                func={value => props.func(value)}
                                current_list={props.current_list}
                                statuses={props.statuses}
                            />
                        ))}
                    </div>
                    <div className='btmsts'>
                        <Button
                            className='whiteBlueBotton'
                            title='Выбрать все'
                            onClick={() => props.func(allStatuses)}
                            disabled={props.current_list.length === allStatuses.length}
                        />
                        <Button
                            className='whiteBlueBotton'
                            title='Отменить все'
                            onClick={() => props.func([])}
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
    const current_statuses = props.statuses.filter(status => status.group === props.group)

    useEffect(() => {

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
    }, [props.current_list])


    return (
        <div className="chackboxes">
            <div className='checkbox'>
                <input
                    ref={mainCheckbox}
                    type='checkbox'
                    onChange={() => props.func(current_statuses)}
                />
                <label>{props.label}</label>
            </div>
            {current_statuses.map(status => (
                <div
                    key={status.id}
                    className='row'
                >
                    <Checkbox
                        className='ml20'
                        labelClassName='statuses'
                        color={status.color}
                        onChange={() => props.func([status])}
                        checked={includesObject(status, props.current_list)}
                        invisible={status.deleted}
                    />
                    <div
                        className='statuses'
                        style={{backgroundColor: status.color}}
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
