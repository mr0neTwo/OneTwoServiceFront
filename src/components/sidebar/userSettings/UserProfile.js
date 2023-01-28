import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {changeEmployeeState, editEmployee, saveEditEmployee} from '../../../Redux/actions/employeeAction'
import ChangeAvatar from './ChangeAvatar'
import LableInput from '../../general/LableInput'
import Button from '../../general/Button'

const UserProfile = (props) => {

    useEffect(() => {
        if (Object.values(props.user).length) props.editEmployee(props.user)
    }, [props.user])

    const handleSave = () => {
        if (props.employee.first_name && props.employee.email) {
            props.saveEditEmployee()
        } else {
            if (!props.employee.first_name) {
                props.changeVisibleState({inputEmployeeNameChecked: false})
            }
            if (!props.employee.email) {
                props.changeVisibleState({inputEmployeeEmailChecked: false})
            }
        }
    }

    return (
        <div className='box ai-c'>
            <div className='box__forms w250'>
            <ChangeAvatar/>

                <LableInput
                    title="Имя"
                    onChange={event => props.changeEmployeeState({first_name: event.target.value})}
                    value={props.employee.first_name}
                    checkedFlag="inputEmployeeNameChecked"
                    checked={props.view.inputEmployeeNameChecked}
                    redStar={ true }
                    disabled={props.employee.deleted}
                />
                <LableInput
                    title="Фамилия"
                    onChange={event => props.changeEmployeeState({last_name: event.target.value})}
                    value={props.employee.last_name}
                    disabled={props.employee.deleted}
                />
                <LableInput
                    title="email"
                    onChange={event => props.changeEmployeeState({email: event.target.value})}
                    value={props.employee.email}
                    checkedFlag="inputEmployeeEmailChecked"
                    checked={props.view.inputEmployeeEmailChecked}
                    redStar={ true }
                    disabled={props.employee.deleted}
                />
                {props.view.errorSameMail ? (
                    <div className="login__error-message">Такой email уже существует</div>
                ) : null}
                <LableInput
                    title="Телефон"
                    onChange={value => props.changeEmployeeState({phone: value})}
                    value={props.employee.phone}
                    disabled={props.employee.deleted}
                    isPhone={true}
                />
                <LableInput
                    title="ИНН"
                    onChange={event => props.changeEmployeeState({inn: event.target.value})}
                    value={props.employee.inn}
                    disabled={props.employee.deleted}
                />
                <Button
                    size='med'
                    type='primary'
                    title='Сохранить'
                    onClick={handleSave}
                />

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    employee: state.employee,
    view: state.view,
    user: state.data.user
})

const mapDispatchToProps = {
    changeEmployeeState,
    editEmployee,
    saveEditEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)