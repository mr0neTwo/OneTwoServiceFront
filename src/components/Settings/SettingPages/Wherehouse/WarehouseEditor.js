import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import { setVisibleFlag } from '../../../../Redux/actions'
import {changeWarehouseForm, resetWarehouse, createWarehouse} from "../../../../Redux/actions/warehouseAction";
import {saveWarehouse, deleteWarehouse} from "../../../../Redux/actions/warehouseAction";

import BottomButtons from '../../../general/BottomButtons'
import Tabs from "../../../general/Tabs";
import WarehouseInfo from "./WarehouseInfo"
import WarehouseAccess from "./WarehouseAccess";
import { permission_warehouse} from "../../../../data/permissions";


const WarehouseEditor = props => {

    const handleClose = () => {
        props.resetWarehouse()
        props.setVisibleFlag('statusWarehouseEditor', false)
        props.setVisibleFlag('inputWarehouseTitleChecked', true)
    }

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('warehouseEditorWindow')) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    useEffect(() => {
        if (!props.warehouse.edit) {
            let list_per = {}
            props.employees.forEach(employee => {
                list_per[employee.id] = {}
                list_per[employee.id].available = true
                list_per[employee.id].like_warehouse = true
                list_per[employee.id].permissions = permission_warehouse
            })
            props.changeWarehouseForm(list_per, 'employees')
        }
    }, [])

    const handleCreate = () => {
        if (props.warehouse.title) {
            props.createWarehouse()
        } else {
            props.setVisibleFlag('inputWarehouseTitleChecked', false)
        }
    }

    const handleSave = () => {
        if (props.warehouse.title) {
            props.saveWarehouse()
        } else {
            props.setVisibleFlag('inputWarehouseTitleChecked', false)
        }
    }

    const can_delete = props.permissions.includes('setting_delete_warehouse')
    const can_recover = props.permissions.includes('setting_recover_warehouse')

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="warehouseEditorWindow">
                <div className="createNewTitle">Новый склад</div>

                <div className="contentEditor">

                    <Tabs
                        className='mt15'
                        list={['Общие', 'Доступ']}
                        tab={props.warehouse.tabs}
                        func={idx => props.changeWarehouseForm(idx, 'tabs')}
                    />
                    {props.warehouse.tabs === 0 ? <WarehouseInfo/> : null}
                    {props.warehouse.tabs === 1 ? <WarehouseAccess/> : null}

                </div>

                <BottomButtons
                    edit={ props.warehouse.edit }
                    deleted={ props.warehouse.deleted }
                    create={ handleCreate }
                    save={ handleSave }
                    delete={ can_delete ? () => props.deleteWarehouse(true) : null }
                    recover={ can_recover ? () => props.deleteWarehouse(false) : null }
                    close={ handleClose }
                />
            </div>
        </div>
    )
}

WarehouseEditor.propTypes = {
    tabs: PropTypes.number
}

const mapStateToProps = state => ({
    warehouse: state.warehouse,
    employees: state.data.employees.filter(employee => !employee.deleted),
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeWarehouseForm,
    resetWarehouse,
    createWarehouse,
    saveWarehouse,
    deleteWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseEditor)
