import React from 'react'




function MainFilter(props) { 
    const {color, title, count, image} = props.data
    return (
        <div className = 'mainFilter' style = {{backgroundColor: color}}>
            <div className = 'filterIcon'>
                <svg className = "svgFilterIcon">
                    <path  d = {image}></path>
                </svg>
            </div>
            <div className = 'filterName'>
                <div className = 'filterName-value'>{count} {count === 1 ? 'заказ': ((count < 5) ? 'заказа': 'заказов') }</div>
                <div className = 'filterName-title'> {title}</div>
            </div>
        </div>
    )
}

export default MainFilter;