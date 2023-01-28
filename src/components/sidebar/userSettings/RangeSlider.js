import React, {useState} from 'react'
import { connect } from 'react-redux'

const RangeSlider = (props) => {

    return (
        <div className={`${props.className} range`}>
            <input
                type="range"
                className="participants"
                min="0"
                max="100"
                value={props.value}
                onChange={event => props.onChange(event.target.value)}
                disabled={props.disabled}
            />
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RangeSlider)