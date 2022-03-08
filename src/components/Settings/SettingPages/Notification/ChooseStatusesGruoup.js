import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'


import Checkbox from '../../../general/Checkbox'


const ChooseStatusesGruoup = props => {


    const mainCheckbox = useRef()

    const current_statuses = props.statuses.filter(status => status.group === props.group)

    useEffect(() => {

        const values = current_statuses.filter(status => props.current_list.includes(status.id))
        if (values.length === props.statuses.length) {
            mainCheckbox.current.indeterminate = false
            mainCheckbox.current.checked = true
        } else if (!values.length) {
            mainCheckbox.current.indeterminate = false
            mainCheckbox.current.checked = false
        } else {
            mainCheckbox.current.indeterminate = true
        }
    }, [props.current_list])



    const handleChoose = (val) => {
        props.func(val)
    }

    return (
        <div className="chackboxes">
            <div className='checkbox'>
                <input
                    ref={mainCheckbox}
                    type='checkbox'
                    onChange={() => handleChoose(current_statuses.map(status => status.id))}
                />
                <label>{props.label}</label>
            </div>
            {current_statuses.map(status => (
                <div
                    key={status.id}
                    className='row'
                >
                    <Checkbox
                        className='ml20'
                        labelClassName='statuses'
                        color={status.color}
                        onChange={() => handleChoose([status.id])}
                        checked={props.current_list.includes(status.id)}
                        unvisible={status.deleted}
                    />
                    <div
                        className='statuses'
                        style={{backgroundColor: status.color}}
                    >
                        {status.name}
                    </div>
                </div>
            ))}


        </div>
    )
}

const mapStateToProps = state => ({
    statuses: state.data.status
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseStatusesGruoup)

// label
// group
// func