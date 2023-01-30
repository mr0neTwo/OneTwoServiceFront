import React, {useState} from 'react'
import {connect} from 'react-redux'

import {changeFilterState, resetFilter} from '../../Redux/actions/filterAction'
import {ICON} from '../../data/icons'

import Icon from '../general/Icon'
import {COLORS} from '../../data/colors'

const Badge = props => {
    const [hover, setHover] = useState(false)

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


    const style = {backgroundColor: `var(--${COLORS.BADGE[props.badge.id]}${isActive || hover ? '' : '-no-active'})`}


    return (
        <div
            className={`badge ${isActive || hover ? 'badge-full' : ''}`}
            style={style}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={handleChoose}
        >
            <Icon
                className='icon'
                icon={ICON[props.badge.icon]}
            />
            <div className='full-data'>
                <div className='fl-bold nowrap'> {`${props.badge.count} ${getWord(props.badge)}`}</div>
                <div className='nowrap'> {props.badge.title}</div>
            </div>
            <div className='short-data'>
                <h3>{props.badge.count}</h3>
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