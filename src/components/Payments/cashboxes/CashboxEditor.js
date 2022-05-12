import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import { setVisibleFlag} from '../../../Redux/actions'
import {changeCashboxState, createCashbox, deleteCashbox, saveEditCashbox} from '../../../Redux/actions/cashboxAction'
import {permission_cahsbox} from "../../../data/permissions"

import BottomButtons from '../../general/BottomButtons'
import Tabs from '../../general/Tabs'
import CashboxAccess from './CashboxAccess'
import DataCashbox from './DataCashbox'

const CashboxEditor = (props) => {

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('cashboxEditorWiondow')) {
            props.setVisibleFlag('statusCashboxEditor', false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    useEffect(() => {
        if (!props.cashbox.edit) {
            let list_per = {}
            props.employees.filter(employee => !employee.deleted).forEach(employee => {
                list_per[employee.id] = {}
                list_per[employee.id].available = true
                list_per[employee.id].like_cashbox = true
                list_per[employee.id].permissions = permission_cahsbox
            })
            props.changeCashboxState({employees: list_per})
        }
    }, [])

    const hangleCreate = () => {
        if (props.cashbox.title) {
            props.createCashbox()
        } else {
            if (!props.cashbox.title) {
                props.setVisibleFlag('inputCashboxTitleChecked', false)
            }
        }
    }

    const hangleSave = () => {
        if (props.cashbox.title) {
            props.saveEditCashbox()
        } else {
            if (!props.cashbox.title) {
                props.setVisibleFlag('inputCashboxTitleChecked', false)
            }
        }
    }

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow wmn500" id="cashboxEditorWiondow">
                <div className="createNewTitle">
                    {props.cashbox.edit ? props.cashbox.title : 'Новая касса'}
                </div>

                <Tabs
                    list={['Общие', 'Доcтуп']}
                    func={idx => props.changeCashboxState({tabs_editor: idx})}
                    tab={props.cashbox.tabs_editor}
                    tab_field="tabs_editor"
                />

                {props.cashbox.tabs_editor === 0 ? <DataCashbox/> : null}
                {props.cashbox.tabs_editor === 1 ? <CashboxAccess/> : null}

                <BottomButtons
                    edit={props.cashbox.edit}
                    create={hangleCreate}
                    save={hangleSave}
                    delete={props.permissions.includes('edit_cash') ? () => props.deleteCashbox(true) : null}
                    recover={props.permissions.includes('edit_cash') ? () => props.deleteCashbox(false) : null}
                    close={() => props.setVisibleFlag('statusCashboxEditor', false)}
                    deleted={props.cashbox.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cashbox: state.cashbox,
    employees: state.data.employees,
    view: state.view,
    permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
    changeCashboxState,
    setVisibleFlag,
    createCashbox,
    saveEditCashbox,
    deleteCashbox
}

export default connect(mapStateToProps, mapDispatchToProps)(CashboxEditor)
