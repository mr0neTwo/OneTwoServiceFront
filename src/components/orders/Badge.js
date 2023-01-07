import React from 'react'
import {connect} from 'react-redux'

import {changeFilterState, resetFilter} from '../../Redux/actions/filterAction'
import {ICON} from '../../data/icons'

import Icon from '../general/Icon'

const Badge = props => {

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

    const isActive = props.active_badge === props.badge.id && props.active_badge !== 0

    const getWord = (badge) => {
        const last_digit = badge.count.toString().split('').pop()
        if (badge.id === 5) {
            if (badge.count > 4 && badge.count < 21) return 'статусов'
            else if (last_digit === '1') return 'статус'
            else if (last_digit === '0')  return 'статусов'
            else if (parseInt(last_digit) < 5) return 'статуса'
            else return 'статусов'
        } else {
            if (badge.count > 4 && badge.count < 21) return 'заказов'
            else if (last_digit === '1') return 'заказ'
            else if (last_digit === '0') return 'заказов'
            else if (parseInt(last_digit) < 5) return 'заказа'
            else return 'заказов'
        }
    }


    return (
        <div
            className='badge'
            style={{
                backgroundColor: props.badge.color,
                opacity: isActive ? 1 : 0.4
            }}
            onClick={handleChoose}
        >
            <Icon
                className='icon-24'
                icon={ICON[props.badge.icon]}
            />
            <div className='colm'>
                <div className='f-large fw-bold'> {`${props.badge.count} ${getWord(props.badge)}`}</div>
                <div> {props.badge.title}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Badge);