import React, {useEffect, useRef, useState} from 'react'

import {ICON} from '../../data/icons'
import Icon from './Icon'
import {checkObject} from './utils'


/**
 * Выбор элемента из списка с помощью строки поиска
 *
 * @component
 * @example
 * <SelectFromListMany
 * className='className'
 * title='title'
 * list={props.list}
 * current_element={props.current_element}
 * setElement={() => console.log('setElement')}
 * filter={props.filter}
 * changeFilter={() => console.log('changeFilter')}
 * placeholder='Введите текст'
 * disabled={false}
 * />
 *
 * className - стиль оболочки компанента
 * title - Подпись сверху
 * list - Список элементов
 * current_element - выбраный элемент
 * setElement - функция выбора элемента
 * filter - фильтр поиска элемента
 * changeFilter - функция изменения фильтра
 * placeholder - приглашение ко вводу
 * disabled - заблокировать
 */
const ChooseWithSearch = props => {

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

    const selected = checkObject(props.current_element)

    return (
        <div
            ref={element}
            className={`select ${props.className} ${listVisible ? 'select_active' : ''}`}
        >
            <div className='label select__label'>{props.title}</div>
            <button
                className='input select__input'
                onClick={() => setListVisible(true)}
                disabled={props.disabled || selected}
            >
                {selected ?
                    <div>{props.current_element.name || props.current_element.title || props.current_element.id_label}</div>
                    :
                    <div className='select__input-container-in'>
                        <Icon
                            className='icon select__icon-search'
                            icon={ICON.SEARCH}
                        />
                        <input
                            className='w100p'
                            onChange={event => props.changeFilter(event.target.value)}
                            placeholder={props.placeholder}
                            value={props.filter}
                            disabled={props.disabled || selected}
                        />
                    </div>
                }
                {selected ?
                    <div
                        onClick={() => props.setElement({})}
                    >
                        <Icon icon={ICON.CANCEL} className='icon'/>
                    </div>
                    :
                    <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
                }
            </button>
            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                            {props.list.map((element, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className='select__item select__item_option'
                                        onClick={() => {
                                            props.setElement(element)
                                            setListVisible(false)
                                        }}
                                    >
                                        {element.title || element.name || element.id_label}
                                    </div>
                                )
                            })}
                        </div>
                </div> : null}
            </div>
    )
}

export default ChooseWithSearch



