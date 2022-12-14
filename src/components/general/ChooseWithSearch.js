import React, {useEffect, useState} from 'react'
import {icon_cancel, icon_down, icon_left} from '../../data/icons'
import Icon from './Icon'
import {checkObject} from './utils'


/**
 * id='id' // id компонента
 *
 * className='className' // className оболочки компанента
 *
 * width='250px' // ширина компонента
 *
 * title='title' // Подпись сверху
 *
 * list={props.list} // Список элементов
 *
 * current_element={props.current_element} // выбраный элемент
 *
 * setElement={() => console.log('setElement')} // функция выбора элемента
 *
 * filter={props.filter} // фильр поиска элемента
 *
 * changeFilter={() => console.log('changeFilter')} // функция изменения фильтра
 *
 * placeholder='Введите текст'
 *
 * disabled={} // заблокировать
 *
 * @returns {JSX.Element}
 *
 */
const ChooseWithSearch = props => {

    const [listVisible, setListVisible] = useState(false)


    const clickHandel = event => {
        if (!event.path.map(el => el.id).includes(`ChooseWithSearch${props.id}`)) {
            if (listVisible) {
                setListVisible(false)
            }
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
            id={`ChooseWithSearch${props.id}`}
            style={{width: props.width ? props.width : '250px'}}
            className={`h49 ${props.className}`}
        >
            <div className='lableImput'>{props.title}</div>
            <button
                className={props.disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
                onClick={() => setListVisible(true)}
                disabled={props.disabled || selected}
            >
                {selected ?
                    <div>{props.current_element.name || props.current_element.title || props.current_element.id_label}</div>
                    :
                    <input
                        className={props.disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
                        onChange={event => props.changeFilter(event.target.value)}
                        placeholder={props.placeholder}
                        value={props.filter}
                        disabled={props.disabled || selected}
                    />
                }
                {selected ?
                    <div
                        className='al-itm-ct'
                        onClick={() => props.setElement({})}
                    >
                        <Icon icon={icon_cancel} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={listVisible ? icon_down : icon_left} className='icon-s2'/>
                }
            </button>
            {listVisible ?
                <div
                    className='listOptionsChoose'
                    style={{width: props.width ? props.width : '250px'}}
                >
                    {props.list.map((element, idx) => {
                        return (
                            <div
                                key={idx}
                                className='options'
                                onClick={() => {
                                    props.setElement(element)
                                    setListVisible(false)
                                }}
                            >
                                {element.title || element.name || element.id_label}
                            </div>
                        )
                    })}
                </div> : null}
        </div>
    )
}


export default ChooseWithSearch



