import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../Redux/actions'
import {addRemain, changeRemainState} from '../../../Redux/actions/remainAction'
import {changeInventoryState} from '../../../Redux/actions/actionInventory'
import {ICON} from '../../../data/icons'

import Icon from '../../general/Icon'

const componentId = 'AddInventoryPart'

const AddInventoryPart = (props) => {

    useEffect(() => {
        props.changeRemainState({page: 'all'})
        props.addRemain()
    }, [props.remain.filter_warehouse])

    const [listVisible, setListVisible] = useState(false)

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes(componentId)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleSet = (remain) => {
        setListVisible(false)
        remain.actual_count = remain.count
        props.changeInventoryState({parts: props.inventory.parts.concat([remain])})
    }

    const remains = props.remain.warehouse_remains.filter(remain => !(props.inventory.parts.map(rem => rem.title).includes(remain.title)))

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        return className
    }, [props.className, listVisible])


    if (props.inventory.edit) return <div/>

    return (
        <div className={mainClassName}>

            <div className='label select__label'>Наименование товара</div>


            <div
                id={componentId}
                className='input select__input'
                onClick={() => setListVisible(true)}
            >
                <div className='select__input-container-in'>
                    <Icon
                        className='icon select__icon-search'
                        icon={ICON.SEARCH}
                    />
                    <input
                        onChange={event => props.changeRemainState({filter_title: event.target.value})}
                        value={props.remain.filter_title}
                    />
                </div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>
            {listVisible ?
                <div className='select__drop-list' id={componentId}>
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
                </div> : null}


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