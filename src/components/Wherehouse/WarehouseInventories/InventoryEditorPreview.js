import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeRemainState} from '../../../Redux/actions/remainAction'
import {checkObject} from '../../general/utils'
import {changeVisibleState} from '../../../Redux/actions'

import SelectFromList from '../../general/SelectFromList'
import ChooseCategory from '../WarehouseParts/ChooseCategory'
import Button from '../../general/Button'
import {addWarehouseCategories} from "../../../Redux/actions/warehouseAction";
import {Modal} from "../../../data/data";


const InventoryEditorPreview = (props) => {

    const componentId = 'InventoryEditorPreview'

    useEffect(() => {
        props.addWarehouseCategories()
    }, [])

    const handleClose = () => {
        props.changeVisibleState({
            isCentralModalOpen: false,
            modalCentralType: '',
            inputWarehouseInventory: true
        })
    }

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(componentId)) {
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
                isRightModalOpen: true,
                modalType: Modal.Type.INVENTORY,
                isCentralModalOpen: false,
                modalCentralType: '',
            })
        } else {
            if (!checkObject(props.remain.filter_warehouse)) {
                props.changeVisibleState({inputWarehouseInventory: false})
            }
        }
    }

    return (

        <div className='modal__box modal__box_editor' id={componentId}>
            <h4>Новая инвентаризация</h4>
            <div className='modal__body modal__body-editor'>
                <div className='two-buttons'>
                    <SelectFromList
                        title='Склад'
                        list={props.warehouses}
                        setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                        current_object={props.remain.filter_warehouse}
                        checkedFlag='inputWarehouseInventory'
                        noChoosed='Выберете склад'
                    />
                    <ChooseCategory
                        setCategory={category => props.changeRemainState({filter_category: category})}
                        current_category={props.remain.filter_category}
                        disabled={false}
                    />
                </div>

                <img
                    src={`${process.env.REACT_APP_LOCAL_SOURCE}/data/pictures/inventory.png`}
                    className='h300'
                    alt='inventory'
                />
            </div>
            <div className='two-buttons'>
                <Button
                    id='InventoryEditor'
                    size='med'
                    type='primary'
                    title='Начать'
                    onClick={handleStartInventory}
                    disabled={false}
                />
                <Button
                    id='InventoryEditor'
                    size='med'
                    type='tertiary'
                    title='Закрыть'
                    onClick={handleClose}
                />

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
    changeVisibleState,
    addWarehouseCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryEditorPreview)