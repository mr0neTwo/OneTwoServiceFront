import React from 'react'
import MainFilter from './MainFilter';
import dataMainFilters from '../../data/dataMainFilters'


function Filters() {
    return (
        <div className = 'mainFilters'>
            {Object.keys(dataMainFilters).map(key => {
                return (
                    <MainFilter data = {dataMainFilters[key]} key = {key}/>
                    )
                }
            )
            }
        </div>
    )
}

export default Filters;