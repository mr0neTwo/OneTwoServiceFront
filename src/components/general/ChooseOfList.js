import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import Icon from './Icon'
import {setVisibleFlag} from '../../Redux/actions'
import PropTypes from "prop-types";
import {icon_down, icon_left} from '../../data/icons'


/**
 * id='idElement'
 *
 * title='Наменование'
 *
 * className='className'
 *
 * list={props.list}
 *
 * field='field'
 *
 * setElement={props.setElement}
 *
 * current_id={props.current_id}
 *
 * width={'250px'}
 *
 * employee={false}
 *
 * checkedFlag='checkedFlag'
 *
 * checked={flag}
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
const ChooseOfList = (props) => {

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

    const current = props.list.find(element => element.id === props.current_id)

    const handleClickChecked = (element) => {
        props.setElement(element.id, props.field ? props.field : null)
        setListVisible(false)
        props.setVisibleFlag(props.checkedFlag, true)
    }

    const handleClick = (element) => {
        props.setElement(element.id, props.field ? props.field : null)
        setListVisible(false)
    }

    const noChoosed = props.noChoosed || 'Выберете тип'

    return props.invisible ? <div/> :
        <div
            className={`h52 ${props.className}`}
            style={{width: props.width ? props.width : '250px'}}
            id={`chooseOfList${props.id}`}
        >
            <div className='lableImput'>{props.title}{props.checkedFlag ?
                <span className='redStar'>*</span> : null}</div>
            <div
                className='optionsButton'
                onClick={props.disabled ? null : () => setListVisible(!listVisible)}
                style={props.checkedFlag && !props.checked ? {borderColor: 'red'} : null}
            >
                <div className='noWr'>
                    {props.employee ?
                        (current ? `${current.last_name} ${current.first_name}` : 'не назначен') :
                        (current ? (current.title || current.name) : noChoosed)}
                </div>
                <Icon
                    className='icon-s4'
                    icon={listVisible ? icon_left : icon_down}
                />
            </div>
            {props.checkedFlag && !props.checked ? <div
                className='errorMassageInput'>{props.errorMassage ? props.errorMassage : 'Необходимо выбрать'}</div> : null}
            {listVisible ?
                <div
                    className='listOptionsChoose'
                    style={{width: props.width ? props.width : '250px'}}
                >
                    {props.list.map(element => {
                        return (
                            <div
                                key={element.id}
                                className='options'
                                onClick={props.checkedFlag ? () => handleClickChecked(element) : () => handleClick(element)}
                            >
                                {props.employee ? `${element.last_name} ${element.first_name}` : (element.title ? element.title : element.name)}
                            </div>
                        )
                    })}
                </div> : null}
        </div>

}

ChooseOfList.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
    field: PropTypes.string,
    setElement: PropTypes.func,
    current_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.string,
    employee: PropTypes.bool,
    checkedFlag: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    invisible: PropTypes.bool
}

// const mapStateToProps = state => ({
// checked: state.view[props.checkedFlag]
// })

const mapDispatchToProps = {
    setVisibleFlag
}


export default connect(null, mapDispatchToProps)(ChooseOfList)


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