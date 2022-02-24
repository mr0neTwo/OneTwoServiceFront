import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {setVisibleFlag} from '../../../Redux/actions';
import {changeWarehouseForm, createWarehouseCategory, resetWarehouse} from '../../../Redux/actions/warehouseAction';
import {saveWarehouseCategory, deleteWarehouseCategory} from '../../../Redux/actions/warehouseAction';

import LableInput from '../../general/LableInput'
import BottomButtons from '../../general/BottomButtons'
import ChooseCategory from './ChooseCategory';

const WarehouseCategoryEditor = props => {

    const handleClose = () => {
        props.setVisibleFlag('statusWarehouseCategoryEditor', false)
        props.setVisibleFlag('inputWCategoryTitleChecked', true)
        props.resetWarehouse()
    }

    const clickHandel = event => {
        if (
            !event.path.map((el) => el.id).includes('wgategoryEditorWindow') &&
            !event.path.map((el) => el.id).includes('btaddWC')
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

    const handleCreate = () => {
        if (props.warehouse.title_category) {
            props.createWarehouseCategory()
        } else {
            props.setVisibleFlag('inputWCategoryTitleChecked', false)
        }
    }

    const handleSave = () => {
        if (props.warehouse.title_category) {
            props.saveWarehouseCategory()
        } else {
            props.setVisibleFlag('inputWCategoryTitleChecked', false)
        }
    }

    const can_delete = props.permissions.includes('delete_warehouse_categories')
    const can_recover = props.permissions.includes('recover_warehouse_categories')

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="wgategoryEditorWindow">
                <div className="createNewTitle">Новая категория</div>

                <div className="contentEditor">
                    <LableInput
                        className="w250 mt15"
                        title="Название категории"
                        onChange={event => props.changeWarehouseForm(event.target.value, 'title_category')}
                        value={props.warehouse.title_category}
                        checkedFlag="inputWCategoryTitleChecked"
                        checked={props.inputWCategoryTitleChecked}
                        redStar={ true }
                        disabled={props.warehouse.category_deleted}
                    />
                    <ChooseCategory/>
                </div>


                <BottomButtons
                    edit={props.warehouse.edit}
                    deleted={props.warehouse.category_deleted}
                    create={ handleCreate }
                    save={ handleSave }
                    delete={can_delete ? () => props.deleteWarehouseCategory(true) : null}
                    recover={can_recover ? () => props.deleteWarehouseCategory(false) : null}
                    close={ handleClose }
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    warehouse: state.warehouse,
    inputWCategoryTitleChecked: state.view.inputWCategoryTitleChecked,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeWarehouseForm,
    createWarehouseCategory,
    resetWarehouse,
    saveWarehouseCategory,
    deleteWarehouseCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseCategoryEditor)
