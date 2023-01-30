import React, {useEffect, useMemo, useRef, useState} from 'react'
import {connect} from 'react-redux'

import Icon from './Icon'
import {changeVisibleState} from '../../Redux/actions'
import PropTypes from "prop-types";
import {ICON} from '../../data/icons'
import {checkObject} from './utils'


/**
 * title='Наменование'
 *
 * className='className'
 *
 * list={props.list}
 *
 * setElement={props.setElement}
 *
 * current_object={props.current_object}
 *
 * checkedFlag='checkedFlag'
 *
 * noChoosed='Выберете тип'
 *
 * disabled={false}
 *
 * invisible={false}
 *
 * @returns {JSX.Element}
 *
 */
const SelectFromList = (props) => {

    const [listVisible, setListVisible] = useState(false)

    const elementRef = useRef()

    const clickHandel = (event) => {
        if (elementRef.current && listVisible && !elementRef.current.contains(event.target)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleClick = (element) => {
        props.setElement(element)
        setListVisible(false)
        if (props.checkedFlag) {
            props.changeVisibleState({[props.checkedFlag]: true})
        }
    }

    const getTitle = useMemo(() => {
        if (checkObject(props.current_object)) {
            return props.current_object.title ||
                    props.current_object.name ||
                    `${props.current_object.last_name} ${props.current_object.first_name}`
        } else {
            return props.noChoosed || 'Выберете тип'
        }
    })

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (props.checkedFlag && !props.view[props.checkedFlag]) className += ' select_error'
        return className
    }, [props.className, listVisible, props.checkedFlag, props.view[props.checkedFlag]])

    if (props.invisible) return null

    return (
        <div
            ref={elementRef}
            className={mainClassName}
        >
            <div className='label select__label'>
                {props.title}
                {props.checkedFlag ? <span className={checkObject(props.current_object) ? '' : 'input-label__red-star'}>*</span> : null}
            </div>
            <div
                className='input select__input'
                onClick={props.disabled ? null : () => setListVisible(!listVisible)}
            >
                <div className='nowrap'>{getTitle}</div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>

            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        {props.list.map(element => {
                            return (
                                <div
                                    key={element.id}
                                    className='select__item select__item_option'
                                    onClick={() => handleClick(element)}
                                >
                                    {element.title || element.name || `${element.last_name} ${element.first_name}`}
                                </div>
                            )
                        })}
                    </div>
                </div> : null}
        </div>
    )

}

SelectFromList.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
    field: PropTypes.string,
    setElement: PropTypes.func,
    current_object: PropTypes.object,
    width: PropTypes.string,
    checkedFlag: PropTypes.string,
    disabled: PropTypes.bool,
    invisible: PropTypes.bool
}

const mapStateToProps = state => ({
    view: state.view
})

const mapDispatchToProps = {
    changeVisibleState
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectFromList)


// id={}
// title='Наменование'
// className='className'
// list={props.list}
// field='field'
// setElement={props.setElement}
// current_id={props.current_id}
// width={'250px'}
// employee={false}
// checkedFlag='checkedFlag'
// checked={flag}
// disabled={false}
// invisible={false}