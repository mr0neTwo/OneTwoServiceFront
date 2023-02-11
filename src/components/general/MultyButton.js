import React, {useState} from 'react'

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

    if (props.invisible) return null

    const getButtonClassName = (idx) => {
        let className = 'tab-button__button'
        if (idx === stateButton) className += ' tab-button__button_active'
        if (idx === 0) className += ' tab-button__button_left'
        if (idx === 1) className += ' tab-button__button_center'
        if (idx === 2) className += ' tab-button__button_right'
        return className
    }

    return (
        <div className={`tab-button ${props.className || ''}`}>
            <div className='label'>{props.title}</div>
            <div className='tab-button__box'>
                <div
                    className={getButtonClassName(0)}
                    onClick={props.disabled ? null : () => {
                        setStateButton(0)
                        props.func1()
                    }}
                >
                    {props.name[0]}
                </div>

                <div
                    className={getButtonClassName(1)}
                    onClick={props.disabled ? null : () => {
                        setStateButton(1)
                        props.func2()
                    }}
                >
                    {props.name[1]}
                </div>

                <div
                    className={getButtonClassName(2)}
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
