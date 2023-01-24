import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import Icon from './Icon'
import {changeVisibleState} from '../../Redux/actions'
import PropTypes from "prop-types";
import {icon_down, icon_left} from '../../data/icons'
import {checkObject} from './utils'


/**
 * id='idElement'
 *
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
 * width={'250px'}
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

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes(`chooseOfList${props.id}`)) {
            if (listVisible) {
                setListVisible(false)
            }
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


    return props.invisible ? <div/> :
        <div
            className={`h52 ${props.className}`}
            style={{width: props.width || '250px'}}
            id={`selectFromList${props.id}`}
        >
            <div className='lableImput'>{props.title}{props.checkedFlag ? <span className='redStar'>*</span> : null}</div>
            <div
                className='optionsButton'
                onClick={props.disabled ? null : () => setListVisible(!listVisible)}
                style={props.checkedFlag && !props.view[props.checkedFlag] ? {borderColor: 'red'} : null}
            >
                <div className='noWr'>{getTitle}</div>
                <Icon
                    className='icon-s4'
                    icon={listVisible ? icon_left : icon_down}
                />
            </div>
            {props.checkedFlag && !props.view[props.checkedFlag] ?
                <div className='errorMassageInput'>
                    {props.errorMassage || 'Необходимо выбрать'}
                </div> : null}

            {listVisible ?
                <div
                    className='listOptionsChoose'
                    style={{width: props.width || '250px'}}
                >
                    {props.list.map(element => {
                        return (
                            <div
                                key={element.id}
                                className='options'
                                onClick={() => handleClick(element)}
                            >
                                {element.title || element.name || `${element.last_name} ${element.first_name}`}
                            </div>
                        )
                    })}
                </div> : null}
        </div>

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