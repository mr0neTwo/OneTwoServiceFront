import React from 'react'
import {connect} from 'react-redux'

import MainFilter from './MainFilter'

const Filters = props => {

    return (
        <div className='mainFilters'>
            {props.badges.map(badge => (
                    badge.count ? <MainFilter badge={badge} key={badge.id}/> : null
                ))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    badges: state.filter.badges
})

export default connect(mapStateToProps)(Filters)