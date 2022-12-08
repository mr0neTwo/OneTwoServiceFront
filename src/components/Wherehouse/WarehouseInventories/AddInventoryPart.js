import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../Redux/actions'
import {addRemain, changeRemainState} from '../../../Redux/actions/remainAction'
import {changeInventoryState} from '../../../Redux/actions/actionInventory'
import {icon_down, icon_left} from '../../../data/icons'

import Icon from '../../general/Icon'

const AddInventoryPart = (props) => {

    useEffect(() => {
        props.changeRemainState({page: 'all'})
        props.addRemain()
    }, [props.remain.filter_warehouse])

    const [showList, setShowList] = useState(false)

    const clickHandel = (event) => {
        if (
            !event.path.map(el => el.id).includes('remainInventory') &&
            !event.path.map(el => el.id).includes('listRemainInventory')
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
        remain.actual_count = remain.count
        props.changeInventoryState({parts: props.inventory.parts.concat([remain])})
    }

    const remains = props.remain.warehouse_remains.filter(remain => !(props.inventory.parts.map(rem => rem.title).includes(remain.title)))

    if (props.inventory.edit) return <div/>

    return (
        <div className='w100 h52'>

            <div className='lableImput mt15'>Наименование товара</div>

            <div className='blockInput'>
                <div
                    id='remainInventory'
                    className='orderInputBox'
                    onClick={() => setShowList(true) }
                >
                    <input
                        className='optionFilterInput'
                        onChange={event => props.changeRemainState({filter_title: event.target.value})}
                        value={props.remain.filter_title}
                    />
                    <Icon
                        className='icon-s4'
                        icon={showList ? icon_left : icon_down}
                    />
                </div>
                {showList ?
                    <div className='listFilter'>
                        <table id='listRemainInventory'>
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
    inventory: state.inventory,
    view: state.view
})

const mapDispatchToProps = {
    addRemain,
    changeInventoryState,
    changeVisibleState,
    changeRemainState
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInventoryPart)