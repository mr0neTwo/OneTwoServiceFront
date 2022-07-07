
import React, {useState} from 'react'
import { connect } from 'react-redux'

const RangeSlider = (props) => {

    return (
        <div className={`${props.className} rangebox`}>
            <input
                type="range"
                className="participants"
                min="0"
                max="100"
                value={props.value}
                onChange={event => props.onChange(event.target.value)}
            />
            <span
                className="rangeslider"
                style={{top: '-8px', left: `${props.value - 0.15*props.value}%`}}
            >
                {props.value}
            </span>
            <div className='rangeline'/>
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RangeSlider)