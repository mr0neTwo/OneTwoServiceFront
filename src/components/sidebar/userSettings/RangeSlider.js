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
                disabled={props.disabled}
            />
            <span
                className="rangeslider"
                style={{
                    top: '-8px',
                    left: `${props.value - 0.15*props.value}%`,
                    display: props.disabled ? 'none': 'flex'
                }}
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