import React, {useState} from 'react';
import {connect} from 'react-redux';

import {changeFilterState, resetFilter} from '../../Redux/actions/filterAction'
import {ICON} from '../../data/icons'

import Icon from '../general/Icon'


const Header = props => {

    const [search, setSearch] = useState('')

    const handleChange = event => {
        setSearch(event.target.value)
        if (!search) props.changeFilterState({search: ''})
    }

    const handleSearch = (event) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        if (!props.filter.active_badge) props.resetFilter()
        if (event.key === 'Enter') props.changeFilterState({search})
    }

    return (
        <div className='header'>
            <div className='row g12 ai-c'>
                <h3>Заказы</h3>
                <div className='row g3 ai-c'>
                    <Icon
                        className='icon icon_20'
                        icon={ICON.MAP_PIN}
                        color='var(--success)'
                    />
                    <h3 className='ml5'>Бабушкина</h3>
                    <Icon
                        className='icon icon_24'
                        icon={ICON.DOWN}
                        color='var(--main)'
                    />
                </div>
            </div>
            <div className='input-container w200'>
                <Icon
                    className='icon'
                    icon={ICON.SEARCH}
                    color='var(--secondary)'
                />
                <input
                    placeholder='Минимум 3 символа'
                    onChange={event => handleChange(event)}
                    onKeyPressCapture={event => handleSearch(event)}
                    value={search}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    // color: state.data.current_branch.icon.color
})

const mapDispatchToProps = {
    changeFilterState,
    resetFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)