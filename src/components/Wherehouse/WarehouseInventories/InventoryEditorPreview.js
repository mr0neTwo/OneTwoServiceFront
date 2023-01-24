import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {changeRemainState} from '../../../Redux/actions/remainAction'
import {checkObject} from '../../general/utils'
import {changeVisibleState} from '../../../Redux/actions'

import SelectFromList from '../../general/SelectFromList'
import ChooseCategory from '../WarehouseParts/ChooseCategory'
import Button from '../../general/Button'


const InventoryEditorPreview = (props) => {

    const handleClose = () => {
        props.changeVisibleState({
            statusInventoryEditorPreview: false,
            inputWarehouseInventory: true
        })
    }

    const clickHandel = (event) => {
        if (
            !event.composedPath().map((el) => el.id).includes('inventoryEditorPreview') &&
            !event.composedPath().map((el) => el.id).includes('addInventory')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })


    const handleStartInventory = () => {
        if (checkObject(props.remain.filter_warehouse)) {
            props.changeVisibleState({
                statusInventoryEditor: true,
                statusInventoryEditorPreview: false
            })
        } else {
            if (!checkObject(props.remain.filter_warehouse)) {
                props.changeVisibleState({inputWarehouseInventory: false})
            }
        }
    }

    return (
        <div className='centerBlockFix'>
            <div className='blockWindowFix wmn500' id='inventoryEditorPreview'>
                <div className='createNewTitle'>Новая инвентаризация</div>
                <div className='row mt15'>
                    <SelectFromList
                        id='selWarInent'
                        title='Склад'
                        list={props.warehouses}
                        setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                        current_object={props.remain.filter_warehouse}
                        checkedFlag='inputWarehouseInventory'
                        noChoosed='Выберете склад'
                        width={'210px'}
                    />
                    <ChooseCategory
                        className='ml10'
                        width={'210px'}
                        setCategory={category => props.changeRemainState({filter_category: category})}
                        current_category={props.remain.filter_category}
                        disabled={false}
                    />
                </div>
                <img
                    src={`${process.env.REACT_APP_LOCAL_SOURCE}/data/pictures/inventory.png`}
                    className='h300 mt5'
                    alt='inventory'
                />
                <div className='row mt15'>
                    <Button
                        id='addInventory'
                        className='blueButton'
                        title='Начать'
                        onClick={handleStartInventory}
                        disabled={false}
                    />
                    <Button
                        id='addInventory'
                        className='whiteBlueBotton ml15'
                        title='Закрыть'
                        onClick={handleClose}
                    />

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    warehouses: state.warehouse.warehouses,
    remain: state.remain
})

const mapDispatchToProps = {
    changeRemainState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryEditorPreview)