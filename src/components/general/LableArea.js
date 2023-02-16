import React, {useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../Redux/actions'
import PropTypes from "prop-types";

/**
 *
 * className='className' // Класс оболочки
 *
 * title='Наименование' // Наименование поля
 *
 * onChange={event => console.log(event.target.value)} // Функция изменения
 *
 * value={props.value} // Значение
 *
 * disabled={false} // Заблокировать
 *
 * checkedFlag='flagname' // Имя флага для проверки
 *
 * checked={props.statusChecked} // Флаг проверки
 *
 * redStar={true} // Добавить красную звездочку к наименованию поля
 *
 * errorMassage='errorMassage' // Ошибка при непройденой проверки
 *
 * @returns {JSX.Element}
 */
const LableArea = (props) => {

    const [focus, setFocus] = useState(false)

    const handleBlur = (event) => {
        if (props.checkedFlag) props.changeVisibleState({[props.checkedFlag]: !!event.target.value})
        setFocus(false)
    }

    const mainClassName = useMemo(() => {
        let className = 'input-label'
        if (props.className) className += ` ${props.className}`
        if (focus) className += ' input-label_focus'
        if (props.checkedFlag && !props.view[props.checkedFlag]) className += ' input-label_error'
        return className
    }, [props.className, focus, props.checkedFlag, props.view[props.checkedFlag]])

    return (
        <div className={mainClassName}>
            <div className='label input-label__label'>
                {props.title}
                {props.redStar ? <span className={props.value ? '' : 'input-label__red-star'}>*</span> : null}
            </div>
            <textarea
                className='textarea'
                autoFocus={props.autoFocus}
                onChange={props.onChange}
                value={props.value}
                onFocus={() => setFocus(true)}
                onBlur={handleBlur}
                disabled={props.disabled}
            />
        </div>
    )
}

LableArea.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    checkedFlag: PropTypes.string,
    checked: PropTypes.bool,
    redStar: PropTypes.bool,
    errorMassage: PropTypes.string
}

const mapStateToProps = state => ({
    view: state.view
})

const mapDispatchToProps = {
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(LableArea)

// className=''
// title=''
// onChange={}
// value={}
// disabled={}
// checkedFlag={}
// checked={}
// redStar={}
// errorMassage=''