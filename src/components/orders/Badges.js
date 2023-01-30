import React from 'react'
import {connect} from 'react-redux'

import Badge from './Badge'

const Badges = props => {

    return (
        <div className='badges-container'>
            {props.badges.map(badge => (
                    badge.count ? <Badge key={badge.id} badge={badge}/> : null
                ))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    badges: state.filter.badges
})

export default connect(mapStateToProps)(Badges)