import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag, addDiscountMargin, addRoles, changeShowDeleted, resetEmoloyee} from '../../../../Redux/actions'
import Checkbox from '../../../general/Checkbox'
import EmploeeyEditor from './EmploeeyEditor'
import RoleEditor from './RoleEditor'
import TableEmployees from './TableEmployees'
import TableRoles from './TableRoles'
import Button from '../../../general/Button'

const SettingEmployees = (props) => {

    useEffect(() => {
        props.addDiscountMargin()
        props.addRoles()
    }, [])

    return (
        <div className='settingContent'>
            <div className='Header'>
                <span className='headerTitle'>Сотрудники</span>
            </div>
            <div className='settingPageBody'>

                {props.permission.includes('setting_roles') ?
                    <>
                        <h3>Роли</h3>
                        <p>Роль — это список прав и возможностей сотрудника.</p>
                        <Button
                            className='greenButton'
                            title='+ Роль'
                            onClick={() => props.setVisibleFlag('statusCreateNewRole', true)}
                        />
                        {props.statusCreateNewRole ? <RoleEditor/> : null}

                        <TableRoles/>
                    </> : null}

                <h3>Сотрудники</h3>
                <p>Каждый сотрудник имеет свой логин и пароль для входа в OneTwoService</p>

                <div className='buttons'>
                    <Button
                        className='greenButton'
                        title='+ Сотрудник'
                        onClick={() => {
                            props.resetEmoloyee()
                            props.setVisibleFlag('statusEmployeeEditor', true)
                        }}
                    />
                    <Checkbox
                        label='Показать удаленных'
                        onChange={() => props.changeShowDeleted()}
                        checked={props.showDeleted}
                        unvisible={!props.permission.includes('setting_see_employees')}
                    />
                </div>

                {props.statusEmployeeEditor ? <EmploeeyEditor/> : null}

                <TableEmployees/>


            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    statusCreateNewRole: state.view.statusCreateNewRole,
    statusEmployeeEditor: state.view.statusEmployeeEditor,
    showDeleted: state.employee.showDeleted,
    permission: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    addDiscountMargin,
    addRoles,
    changeShowDeleted,
    resetEmoloyee
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingEmployees)