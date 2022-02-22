import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import Button from '../../../general/Button'
import TableWherehouse from './TableWherehouse'
import {addWarehouse} from "../../../../Redux/actions/warehouseAction"
import {setVisibleFlag} from "../../../../Redux/actions"
import WarehouseEditor from "./WarehouseEditor"
import Checkbox from "../../../general/Checkbox";

const SettingWherehouse = (props) => {

    const [showDeleted, setShowDeleted] = useState(false)

    useEffect(() => {
        props.addWarehouse()
    }, [])

    return (
        <div className='settingContent'>

            <div className='Header'>
                <span className='headerTitle'>Склады</span>
            </div>

            <div className='settingPageBody'>
                <h3>Склады товаров или запчастей</h3>
                <p>Перечень складов компании для хранения товаров. Склады могут принадлежать конкретной локации или всей
                    компании.</p>
                <div className='row'>
                    <Button
                        className='greenButton'
                        title='+ Склад'
                        onClick={() => props.setVisibleFlag('statusWarehouseEditor', true)}
                        unvisible={!props.permissions.includes('setting_create_warehouse')}
                    />
                    <Checkbox
                        label='Показать удаленных'
                        onChange={event => setShowDeleted(event.target.checked)}
                        checked={showDeleted}
                        unvisible={!props.permissions.includes('setting_see_deleted_warehouse')}
                    />
                </div>
                {props.statusWarehouseEditor ? <WarehouseEditor/> : null}

                <TableWherehouse showDeleted={showDeleted}/>
            </div>
        </div>
    )
}
// yj
const mapStateToProps = state => ({
    statusWarehouseEditor: state.view.statusWarehouseEditor,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    addWarehouse,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingWherehouse)