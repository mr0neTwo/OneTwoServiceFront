import React, {useState} from 'react'
import PropTypes from "prop-types"

/**
 *
 * className='className'
 *
 * title= 'Подпись'
 *
 * name={['Имя1', 'Имя2']}
 *
 * func1 = {() => function()}
 *
 * func2 = {() => function()}
 *
 *
 * checked = { true }
 *
 * disabled={false}
 *
 * invisible={false}
 *
 * @returns {JSX.Element}
 *
 */
const ChooseButton = (props) => {

    const [stateButton, setStateButton] = useState(props.checked ? props.checked : false)



    return props.invisible ? (<div/>) : (
        <div className={props.className}>
            <div className='lableImput'>{props.title}</div>
            <div className='checkButton'>
                <div
                    className={stateButton ? 'checkButtonTwo' : 'checkButtonOne'}
                    onClick={props.disabled ? null : () => {
                        setStateButton(true)
                        props.func1()
                    }}
                >
                    {props.name[0]}
                </div>
                <div
                    className={stateButton ? 'checkButtonOne' : 'checkButtonTwo'}
                    onClick={props.disabled ? null : () => {
                        setStateButton(false)
                        props.func2()
                    }}
                >
                    {props.name[1]}
                </div>
            </div>
        </div>
    )
}

ChooseButton.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.arrayOf(PropTypes.string),
    func1: PropTypes.func,
    func2: PropTypes.func,
    func3: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    invisible: PropTypes.bool
}

export default ChooseButton


// className='className'
// title= Подпись'
// name={['Имя1', 'Имя2']}
// func1 = {() => function()}
// func2 = {() => function()}
// checked = { true }
// disabled={false}
// invisible={false}