import React from 'react'
import MainFilter from './MainFilter';
import dataMainFilters from '../../data/dataMainFilters'
import { connect } from 'react-redux';


function Filters({badges}) {
 
    return (
        <div className = 'mainFilters'>
            {badges.map(badge => {
                return (
                   badge.count ? <MainFilter data = {badge} key = {badge.id}/> : null
                    )
                }
            )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    badges: state.data.badges
})

export default connect(mapStateToProps) (Filters);