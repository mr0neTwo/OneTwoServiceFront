import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {changeEmployeeState, createEmployee, deleteEmployee, saveEditEmployee} from '../../../../Redux/actions/employeeAction'
import {addPayrules} from '../../../../Redux/actions/payrulleAction'

import EditEmployeeGenerally from './EditEmployeeGenerally'
import EditEmployeePermission from './EditEmployeePermission'
import BottomButtons from '../../../general/BottomButtons'
import Tabs from '../../../general/Tabs'


const EmploeeyEditor = (props) => {

    const handleClose = () => {
        props.changeVisibleState({
            statusEmployeeEditor: false,
            inputEmployeeNameChecked: true,
            inputEmployeeEmailChecked: true,
            inputEmployeeLoginChecked: true,
            inputEmployeePasswordChecked: true,
            inputEmployeeRoleChecked: true
        })
    }

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('createNewRoleWiondow')) {
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
        props.addPayrules()
    }, [])

    const hangleCreate = () => {
        if (
            props.employee.first_name &&
            props.employee.email &&
            props.employee.login &&
            props.employee.password &&
            props.employee.role_id !== 0
        ) {
            props.createEmployee()
        } else {
            if (!props.employee.first_name) {
                props.changeVisibleState({inputEmployeeNameChecked: false})
            }
            if (!props.employee.email) {
                props.changeVisibleState({inputEmployeeEmailChecked: false})
            }
            if (!props.employee.login) {
                props.changeVisibleState({inputEmployeeLoginChecked: false})
            }
            if (!props.employee.password) {
                props.changeVisibleState({inputEmployeePasswordChecked: false})
            }
            if (props.employee.role_id === 0) {
                props.changeVisibleState({inputEmployeeRoleChecked: false})
            }
        }
    }

    const hangleSave = () => {
        if (
            props.employee.first_name &&
            props.employee.email &&
            props.employee.login
        ) {
            props.saveEditEmployee()
        } else {
            if (!props.employee.first_name) {
                props.changeVisibleState({inputEmployeeNameChecked: false})
            }
            if (!props.employee.email) {
                props.changeVisibleState({inputEmployeeEmailChecked: false})
            }
            if (!props.employee.login) {
                props.changeVisibleState({inputEmployeeLoginChecked: false})
            }
        }
    }

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="createNewRoleWiondow">
                <div className="createNewTitle">
                    {props.edit
                        ? `${props.employee.last_name} ${props.employee.first_name}`
                        : 'Новый сотрудник'}
                </div>

                <Tabs
                    list={['Общие', 'Доступ']}
                    func={idx => props.changeEmployeeState({tabs: idx})}
                    tab={props.tabs}
                />

                {props.tabs === 0 ? <EditEmployeeGenerally/> : null}
                {props.tabs === 1 ? <EditEmployeePermission/> : null}

                <BottomButtons
                    edit={props.edit}
                    create={hangleCreate}
                    save={hangleSave}
                    delete={() => props.deleteEmployee(true)}
                    recover={props.permissions.includes('setting_recover_employees') ? () => props.deleteEmployee(false) : null}
                    close={handleClose}
                    deleted={props.employee.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tabs: state.employee.tabs,
    edit: state.employee.edit,
    employee: state.employee,
    permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
    changeEmployeeState,
    changeVisibleState,
    createEmployee,
    saveEditEmployee,
    deleteEmployee,
    addPayrules
}

export default connect(mapStateToProps, mapDispatchToProps)(EmploeeyEditor)
