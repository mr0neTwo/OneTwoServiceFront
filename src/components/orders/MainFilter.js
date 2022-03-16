import React from 'react'
import {connect} from 'react-redux'

import Icon from '../general/Icon'
import {changeFilterState, resetFilter} from '../../Redux/actions/filterAction'


// function MainFilter({data: {color, title, count, img, filters}, activeBadge}) {
const MainFilter = props => {

    const handleChoose = () => {
        if (props.active_badge !== props.badge.id) {
            props.changeFilterState({
                ...props.badge.filter,
                active_badge: props.badge.id,
                active_filter: 0
            })
        } else {
            props.resetFilter()
        }
    }

    return (
        <div
            className='mainFilter'
            style={{
                backgroundColor: props.badge.color,
                opacity: props.active_badge === props.badge.id || props.active_badge === 0 ? 1 : 0.3
            }}
            onClick={handleChoose}
        >
            <div className='pd5'>
                <Icon icon={props.badge.icon} className='icon-s25' color='white'/>
            </div>
            <div className='filterName'>
                <div className='filterName-value'>
                    {props.badge.count} {props.badge.count === 1 ? 'заказ' : ((props.badge.count < 5) ? 'заказа' : 'заказов')}
                </div>
                <div className='filterName-title'> {props.badge.title}</div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    active_badge: state.filter.active_badge
})

const mapDispatchToProps = {
    changeFilterState,
    resetFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFilter);