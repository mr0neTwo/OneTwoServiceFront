import React, {useState} from 'react'

import Icon from '../general/Icon'
import {icon_search} from '../../data/icons'

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
        <div className={`boxSearch w250 ${props.className}`}>
            <Icon
                className='icon-s2 pd5'
                icon={icon_search}
                color='grey'
            />
            <input
                className='searchInput '
                onChange={handleChange}
                value={value}
                onKeyPress={handlePressKey}
                placeholder='Минимум 3 символа'
            />
        </div>
    )
}

export default Search