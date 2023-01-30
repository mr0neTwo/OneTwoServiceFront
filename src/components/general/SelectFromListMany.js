import React, {useEffect, useState, useRef} from 'react'

import Checkbox from './Checkbox'
import Icon from './Icon'
import {ICON} from '../../data/icons'
import {includesObject} from './utils'

/**
 * Компонент позволяет выбрать несколько элементов из списка
 *
 * @component
 * @example
 * <SelectFromListMany
 * id='id'
 * className='className'
 * title='title'
 * mainLabel='Все'
 * list={props.list}
 * checked_list={props.checked_list}
 * func={object => props.selectedObject(object, 'objects')}
 * disabled={props.disabled}
 * />
 *
 * id - id элемента
 * className - стиль оболочки компонента
 * title - Подпись сверху
 * mainLabel - Подпись общего чекбокса
 * list - Список всех элементов
 * checked_list - Список выбранных элементов
 * func - функция выбора элемента
 * disabled - заблокировать
 */

const SelectFromListMany = (props) => {

    const [listVisible, setListVisible] = useState(false)

    const id = `selectFromList${props.id}`

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

    const mainCheckbox = useRef()

    useEffect(() => {
        if(mainCheckbox.current) {
            const values = props.list.filter(el => includesObject(el, props.checked_list))
            if (values.length === props.list.length) {
                mainCheckbox.current.indeterminate = false
                mainCheckbox.current.checked = true
            } else if (!values.length) {
                mainCheckbox.current.indeterminate = false
                mainCheckbox.current.checked = false
            } else {
                mainCheckbox.current.indeterminate = true
            }
        }
    }, [props.checked_list, listVisible])

    const showWord = (len) => {
        switch (len) {

            case 0: {
                return 'Ничего не выбрано'
            }

            case props.list.length: {
                return 'Все'
            }

            default:
                return `Выбрано ${len}`
        }
    }



    return (
        <div
            ref={element}
            className={`select ${props.className} ${listVisible ? 'select_active' : ''}`}
        >
            <div className='label select__label'>{props.title}</div>
            <div
                className='input select__input'
                onClick={() => setListVisible(!listVisible)}
            >
                <div>{showWord(props.checked_list.length)}</div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>
            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        <div className='select__set-items'>

                            <Checkbox
                                id={id + 'Checkbox'}
                                className='mb5'
                                ref={mainCheckbox}
                                label={props.mainLabel}
                                type='squared-five'
                                onChange={() => props.func(props.list)}
                                checked={props.list.every(element => includesObject(element, props.checked_list))}
                                disabled={props.disabled}
                            />
                            {props.list.map(element => {
                                return (
                                    <div
                                        key={element.id}
                                        className='select__item'
                                    >
                                        <Checkbox
                                            id={id + element.id}
                                            className='ml20'
                                            type='squared-five'
                                            label={ element.title || element.name }
                                            onChange={() => props.func([element])}
                                            checked={includesObject(element, props.checked_list)}
                                            disabled={props.disabled}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}


export default SelectFromListMany

// id='id'
// className='className'
// width='250px'
// title='title'
// mainLable='mainLable'
// list={props.list}
// checked_list={props.checked_list}
// func={() => console.log('choose element')}
// employee={false}
// disabled={props.disabled}