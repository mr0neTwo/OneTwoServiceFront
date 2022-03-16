import React, {useState} from 'react';
import { connect } from 'react-redux';

import {changeFilterState, resetFilter} from '../../Redux/actions/filterAction'


const Header = props => {

   const [search, setSearch] = useState('')

    const handleChange = event => {
        setSearch(event.target.value)
        if (!search) props.changeFilterState({search: ''})
    }

    const handleSearch = (event) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        if(!props.filter.active_badge) props.resetFilter()
        if (event.key === 'Enter') props.changeFilterState({search})
    }

    return (
        <div className = 'Header'>
            <div className = 'headerTitle'>Заказы</div>
            <div className = 'imputSearch'>
                <form>
                    <input 
                        className = 'imputSearchForm' 
                        placeholder = 'Минимум 3 символа'
                        onChange={event => handleChange(event)}
                        onKeyPressCapture={event => handleSearch(event)}
                        value = {search}
                    />
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter
})

const mapDispatchToProps = {
    changeFilterState,
    resetFilter
}

export default connect(mapStateToProps, mapDispatchToProps) (Header)