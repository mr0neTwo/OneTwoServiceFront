import React, {useState} from 'react'
import PropTypes from "prop-types"

/**
 *
 * className='className'
 *
 * title= 'Подпись'
 *
 * name={['Имя1', 'Имя2', 'Имя3']}
 *
 * func1 = {() => concolse.log('func1')}
 *
 * func2 = {() => concolse.log('func2')}
 *
 * func3 = {() => concolse.log('func3')}
 *
 * checked = { 0 }
 *
 * disabled={false}
 *
 * invisible={false}
 *
 * @returns {JSX.Element}
 *
 */
const MultyButton = (props) => {

    const [stateButton, setStateButton] = useState( props.checked || 0)

    return props.invisible ? (<div/>) : (
        <div className={props.className}>
            <div className='lableImput'>{props.title}</div>
            <div className='checkButton'>

                <div
                    className={stateButton === 0 ? 'checkButtonTwo' : 'checkButtonOne'}
                    onClick={props.disabled ? null : () => {
                        setStateButton(0)
                        props.func1()
                    }}
                >
                    {props.name[0]}
                </div>

                <div
                    className={stateButton === 1 ? 'checkButtonTwo' : 'checkButtonOne'}
                    onClick={props.disabled ? null : () => {
                        setStateButton(1)
                        props.func2()
                    }}
                >
                    {props.name[1]}
                </div>

                <div
                    className={stateButton === 2 ? 'checkButtonTwo' : 'checkButtonOne'}
                    onClick={props.disabled ? null : () => {
                        setStateButton(2)
                        props.func3()
                    }}
                >
                    {props.name[2]}
                </div>

            </div>
        </div>
    )
}

export default MultyButton


// className='className'
// title= Подпись'
// name={['Имя1', 'Имя2']}
// func1 = {() => function()}
// func2 = {() => function()}
// checked = { true }
// disabled={false}
// invisible={false}