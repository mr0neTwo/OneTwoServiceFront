import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'


import {ICON} from '../../../data/icons'

import {checkObject} from '../../general/utils'
import {addRemain, changeRemainState} from '../../../Redux/actions/remainAction'
import {changeVisibleState} from '../../../Redux/actions'
import {changeMovementState} from '../../../Redux/actions/warehouseMovementAction'

import Icon from '../../general/Icon'

const AddMovements = (props) => {

    useEffect(() => {
        props.addRemain()
    }, [props.remain.filter_title, props.remain.filter_type, props.remain.filter_warehouse])

    const [showList, setShowList] = useState(false)

    const disabled = !checkObject(props.remain.filter_warehouse)

    const clickHandel = (event) => {
        if (
            !event.path.map(el => el.id).includes('listRemainMovement') &&
            !event.path.map(el => el.id).includes('remainMovement')
        ) {
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
        <div className='w100 h52'>

            <div className='lableImput mt15'>Наименование товара</div>

            <div className='blockInput'>
                <div
                    id='remainMovement'
                    className='orderInputBox'
                    onClick={disabled ? null : () => setShowList(true) }
                >
                    <input
                        className='optionFilterInput'
                        onChange={event => props.changeRemainState({filter_title: event.target.value})}
                        value={props.remain.filter_title}
                        disabled={disabled}
                    />
                    <Icon
                        className='icon-s4'
                        icon={showList ? ICON.LEFT : ICON.DOWN}
                    />
                </div>
                {!disabled && showList ?
                    <div className='listFilter'>
                        <table id='listRemainMovement'>
                            <thead>
                            <tr>
                                <th>Наименование</th>
                                <th className='w70'>Адрес</th>
                                <th className='w70 tac'>Количество</th>
                            </tr>
                            </thead>
                            <tbody>
                            {remains.map((remain, idx) => (
                                <tr
                                    key={idx}
                                    onClick={() => handleSet(remain)}
                                >
                                    <td>
                                        <div>{(remain.marking !== remain.title) && !!remain.marking ? `${remain.title } (${remain.marking})`: remain.title}</div>
                                        <div className='orderDate noWr'>{remain.description}</div>
                                    </td>
                                    <td className='tac'>{remain.cell}</td>
                                    <td className='tac'>{remain.count}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>: null}

            </div>
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