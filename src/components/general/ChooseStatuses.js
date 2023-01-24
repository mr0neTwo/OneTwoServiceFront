import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'


import {icon_down, icon_left} from '../../data/icons'

import ChooseStatusesGruoup from './ChooseStatusesGruoup'
import Icon from './Icon'
import Button from './Button'

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


const ChooseStatuses = (props) => {

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

    // const allStatuses = props.statuses.map(status => status.id)

    const status_group = props.status_group.filter(group => group.type_group > props.range[0] && group.type_group <= props.range[1])
    const allStatuses = props.statuses.filter(status => status.group > props.range[0] && status.group <= props.range[1]).map(status => status.id)

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
                            <ChooseStatusesGruoup
                                key={group.id}
                                label={group.name}
                                group={group.type_group}
                                func={value => props.func(value)}
                                current_list={props.current_list}
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

const mapStateToProps = state => ({
    status_group: state.data.status_group,
    statuses: state.data.status
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseStatuses)
