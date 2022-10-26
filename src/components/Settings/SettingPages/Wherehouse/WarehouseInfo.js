
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import {changeWarehouseForm, chooseWarehouseSelected} from "../../../../Redux/actions/warehouseAction";

import LableInput from "../../../general/LableInput";
import LableArea from "../../../general/LableArea";
import ChooseButton from "../../../general/ChooseButton";
import ChooseOfList from "../../../general/ChooseOfList";
import Checkbox from "../../../general/Checkbox";


const WarehouseInfo = props => {
    return (
        <div className=''>
            <LableInput
                className="w250 mt15"
                title="Наименование"
                onChange={event => props.changeWarehouseForm(event.target.value, 'title')}
                value={props.warehouse.title}
                checkedFlag="inputWarehouseTitleChecked"
                checked={props.inputBookTitleChecked}
                redStar={ true }
                disabled={props.warehouse.deleted}
            />

            <LableArea
                className="w250 mt15"
                title="Описание"
                onChange={event => props.changeWarehouseForm(event.target.value, 'description')}
                value={props.warehouse.description}
                disabled={props.warehouse.deleted}
            />
            <ChooseButton
                className='mt15'
                title='Выберите тип'
                name={['Склад компании', 'Склад локации']}
                func1 = {() => props.changeWarehouseForm(true, 'isGlobal')}
                func2 = {() => props.changeWarehouseForm(false, 'isGlobal')}
                // checked = { true }
                disabled={props.warehouse.deleted}
                invisible={false}
            />
            <ChooseOfList
                id='brWH'
                title='Филиал'
                className='mt15'
                list={props.branches}
                field='branch_id'
                setElement={props.changeWarehouseForm}
                current_id={ props.warehouse.branch_id }
                disabled={props.warehouse.deleted}
                invisible={props.warehouse.isGlobal}
            />
            <div className='lableImput mt15'>Допустимые действия с кассой</div>
            <Checkbox
                className='mt15'
                label='Видеть остатки'
                onChange={() => props.chooseWarehouseSelected(['show_warehouse_remains'], 'permissions')}
                checked={props.warehouse.permissions.includes('show_warehouse_remains')}
                disabled={props.warehouse.deleted}
            />
            <div className='row al-itm-bl'>
                <div>
                    <div className='lableImput mt15'>Входящие операции:</div>
                    <Checkbox
                        className='mt15'
                        label='Оприходование'
                        onChange={() => props.chooseWarehouseSelected(['warehouse_registration'], 'permissions')}
                        checked={props.warehouse.permissions.includes('warehouse_registration')}
                        disabled={props.warehouse.deleted}
                    />
                    <Checkbox
                        className='mt15'
                        label='Перемещение'
                        onChange={() => props.chooseWarehouseSelected(['move_in'], 'permissions')}
                        checked={props.warehouse.permissions.includes('move_in')}
                        disabled={props.warehouse.deleted}
                    />
                    <Checkbox
                        className='mt15'
                        label='Возврат от клиента'
                        onChange={() => props.chooseWarehouseSelected(['return_from_client'], 'permissions')}
                        checked={props.warehouse.permissions.includes('return_from_client')}
                        disabled={props.warehouse.deleted}
                    />
                </div>
                <div>
                    <div className='lableImput mt15'>Исходящие операции:</div>
                    <Checkbox
                        className='mt15'
                        label='Списание'
                        onChange={() => props.chooseWarehouseSelected(['write_off'], 'permissions')}
                        checked={props.warehouse.permissions.includes('write_off')}
                        disabled={props.warehouse.deleted}
                    />
                    <Checkbox
                        className='mt15'
                        label='Перемещение'
                        onChange={() => props.chooseWarehouseSelected(['move_out'], 'permissions')}
                        checked={props.warehouse.permissions.includes('move_out')}
                        disabled={props.warehouse.deleted}
                    />
                    <Checkbox
                        className='mt15'
                        label='Добавление в заказ'
                        onChange={() => props.chooseWarehouseSelected(['add_to_order'], 'permissions')}
                        checked={props.warehouse.permissions.includes('add_to_order')}
                        disabled={props.warehouse.deleted}
                    />
                    <Checkbox
                        className='mt15'
                        label='Добавление в продажу'
                        onChange={() => props.chooseWarehouseSelected(['add_to_sale'], 'permissions')}
                        checked={props.warehouse.permissions.includes('add_to_sale')}
                        disabled={props.warehouse.deleted}
                    />
                    <Checkbox
                        className='mt15'
                        label='Возврат поставщику'
                        onChange={() => props.chooseWarehouseSelected(['return_to_supplier'], 'permissions')}
                        checked={props.warehouse.permissions.includes('return_to_supplier')}
                        disabled={props.warehouse.deleted}
                    />
                </div>
            </div>
        </div>
    )
}

WarehouseInfo.propTypes = {
    // setVisibleFlag: PropTypes.func,
    // changeWarehouseForm: PropTypes.func,
    warehouse: PropTypes.shape({
        warehouses: PropTypes.arrayOf(PropTypes.object),

        edit: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        deleted: PropTypes.bool,
        isGlobal: PropTypes.bool,
        permissions: PropTypes.arrayOf(PropTypes.string),
        branch_id: PropTypes.number,
        branch: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            icon: PropTypes.string,
            color: PropTypes.string
        }),
        categories: PropTypes.arrayOf(PropTypes.object)
    }),
    branches: PropTypes.arrayOf(PropTypes.object),
    inputBookTitleChecked: PropTypes.bool
}

const mapStateToProps = state => ({
    warehouse: state.warehouse,
    branches: state.branch.branches.filter(branch => !branch.deleted),
    inputBookTitleChecked: state.view.inputBookTitleChecked
})

const mapDispatchToProps = {
    changeWarehouseForm,
    chooseWarehouseSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseInfo)