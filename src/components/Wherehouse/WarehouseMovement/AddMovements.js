import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'


import {ICON} from '../../../data/icons'

import {checkObject} from '../../general/utils'
import {addRemain, changeRemainState} from '../../../Redux/actions/remainAction'
import {changeVisibleState} from '../../../Redux/actions'
import {changeMovementState} from '../../../Redux/actions/warehouseMovementAction'

import Icon from '../../general/Icon'

const AddMovements = (props) => {

    const componentId = 'AddMovements'

    useEffect(() => {
        props.addRemain()
    }, [props.remain.filter_title, props.remain.filter_type, props.remain.filter_warehouse])

    const [showList, setShowList] = useState(false)

    const disabled = !checkObject(props.remain.filter_warehouse)

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes(componentId)) {
            setShowList(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleSet = (remain) => {
        setShowList(false)
        remain.target_count = 1
        props.changeMovementState({parts: props.movement.parts.concat([remain])})
    }

    const remains = props.remain.warehouse_remains.filter(remain => !(props.movement.parts.map(rem => rem.title).includes(remain.title)))

    if (props.movement.edit) return <div/>

    return (
        <div
            id={componentId}
            className={`select ${showList ? 'select_active' : ''}`}
        >

            <div className='label select__label'>Наименование товара</div>

            <div
                className='input select__input'
                onClick={disabled ? null : () => setShowList(true)}
            >
                <div className='select__input-container-in'>
                    <Icon
                        className='icon select__icon-search'
                        icon={ICON.SEARCH}
                    />
                    <input
                        className='optionFilterInput'
                        onChange={event => props.changeRemainState({filter_title: event.target.value})}
                        value={props.remain.filter_title}
                        disabled={disabled}
                    />
                </div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${showList ? 'icon_rotate-90' : ''}`}/>
            </div>
            {!disabled && showList ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        <div className='select__set-items'>
                            <table>
                                <thead>
                                <tr>
                                    <th className='th'>Наименование</th>
                                    <th className='th th_w70'>Адрес</th>
                                    <th className='th th_w70'>Количество</th>
                                </tr>
                                </thead>
                                <tbody>
                                {remains.map((remain, idx) => (
                                    <tr
                                        key={idx}
                                        className='tr'
                                        onClick={() => handleSet(remain)}
                                    >
                                        <td className='td'>
                                            <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title} (${remain.marking})` : remain.title}</div>
                                            <div className='cell_date-payment'>{remain.description}</div>
                                        </td>
                                        <td className='td td_number'>{remain.cell}</td>
                                        <td className='td td_number'>{remain.count}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : null
            }


        </div>
    )
}

const mapStateToProps = state => ({
    remain: state.remain,
    movement: state.movement,
    view: state.view
})

const mapDispatchToProps = {
    addRemain,
    changeMovementState,
    changeVisibleState,
    changeRemainState
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovements)