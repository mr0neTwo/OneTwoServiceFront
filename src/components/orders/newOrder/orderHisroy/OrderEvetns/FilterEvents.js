import React, {useEffect, useState, useRef} from 'react'

import {icon_filter, icon_down, icon_left} from '../../../../../data/icons'
import Icon from '../../../../general/Icon'
import Checkbox from '../../../../general/Checkbox'

const FilterEvents = props => {

    const [listVisible, setListVisible] = useState(false)

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes(`chooseOfList${props.id}`)) {
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

    const mainCheckbox = useRef()

    useEffect(() => {
        if(mainCheckbox.current) {
            const values = props.list.filter(el => props.checked_list.includes(el.id))
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


    return (
        <div
            style={{width: props.width ? props.width : '250px'}}
            id={`chooseOfList${props.id}`}
            className={props.className}
        >
            <div
                className='optionsButton al-itm-ct'
                onClick={() => setListVisible(!listVisible)}
            >
                <Icon icon={icon_filter} className='icon-s2' color='#282e33'/>
                <Icon icon={listVisible ? icon_down : icon_left} className='icon-s2' color='#282e33'/>
            </div>
            {listVisible ?
                <div
                    className='listOptionsChoose'
                    style={{width: props.width ? props.width : '250px'}}
                >
                    <div className='checkbox'>
                        <input
                            ref={mainCheckbox}
                            type='checkbox'
                            onChange={() => props.func(props.list)}
                            disabled={props.disabled}
                        />
                        <label>Все</label>
                    </div>

                    {props.list.map((element, idx) => {
                        return (
                            <div
                                key={idx}
                                className='options'
                            >
                                <Checkbox
                                    className='ml10'
                                    label={element}
                                    onChange={() => props.func([element])}
                                    checked={props.checked_list.includes(element)}
                                    disabled={props.disabled}
                                />
                            </div>
                        )
                    })}
                </div> : null}
        </div>
    )
}


export default FilterEvents

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