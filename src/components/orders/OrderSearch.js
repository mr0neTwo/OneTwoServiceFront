import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import Icon from '../general/Icon'
import {ICON} from '../../data/icons'
import {changeFilterState, resetFilter} from '../../Redux/actions/filterAction'

const OrderSearch = (props) => {

    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!search) props.changeFilterState({search: ''})
    }, [search])

    const handleSearch = (event) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        if (!props.filter.active_badge) props.resetFilter()
        if (event.key === 'Enter') props.changeFilterState({search})
    }

    return (
        <div className='input-container w200'>
            <Icon
                className='icon'
                icon={ICON.SEARCH}
                color='var(--secondary)'
            />
            <input
                placeholder='Минимум 3 символа'
                onChange={event => setSearch(event.target.value)}
                onKeyPressCapture={event => handleSearch(event)}
                value={search}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
})

const mapDispatchToProps = {
    changeFilterState,
    resetFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSearch)