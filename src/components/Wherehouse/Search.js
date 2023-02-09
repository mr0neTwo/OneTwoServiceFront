import React, {useState} from 'react'

import Icon from '../general/Icon'
import {ICON} from '../../data/icons'

const Search = (props) => {

    const [value, setValue] = useState('')

    const handlePressKey = (event) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        props.func(value)
    }
    const handleChange = (event) => {
        setValue(event.target.value)
        if (!event.target.value) props.func('')
    }

    if (props.invisible) return <div/>

    return (
        <div className='input-container w200'>
            <Icon
                className='icon'
                icon={ICON.SEARCH}
                color='var(--secondary)'
            />
            <input
                onChange={handleChange}
                value={value}
                onKeyPress={handlePressKey}
                placeholder='Минимум 3 символа'
            />
        </div>
    )
}

export default Search