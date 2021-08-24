import React from 'react'
import { connect } from 'react-redux'

import { activeBadgeAction } from '../../Redux/actions'




function MainFilter({data: {color, title, count, img, filters}, activeBadge}) { 

    return (
        <div 
        className = 'mainFilter' 
        style = {{backgroundColor: color}}
        onClick = {() => activeBadge(filters)}
        >
            <div className = 'filterIcon'>
                <svg className = "svgFilterIcon">
                    <path  d = {img}></path>
                </svg>
            </div>
            <div className = 'filterName'>
                <div className = 'filterName-value'>{count} {count === 1 ? 'заказ': ((count < 5) ? 'заказа': 'заказов') }</div>
                <div className = 'filterName-title'> {title}</div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    activeBadge: activeBadgeAction
}

export default connect(null, mapDispatchToProps) (MainFilter);