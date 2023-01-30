import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {resetOperation, changeOperationState, createCustomOperation} from '../../../../Redux/actions/operationActions'
import {saveOperation, deleteOperation} from '../../../../Redux/actions/operationActions'

import LableInput from '../../../general/LableInput'
import LableArea from '../../../general/LableArea'
import BottomButtons from '../../../general/BottomButtons'
import ChooseButton from '../../../general/ChooseButton'
import SelectFromList from '../../../general/SelectFromList'
import {checkObject} from '../../../general/utils'

const OperationEditor = (props) => {

    const id = 'OperationEditor'

    const handleClose = () => {
        props.resetOperation()
        props.changeVisibleState({
            statusOperationEditor: false,
            inputOperationTitleChecked: true,
            inputOperationEngineerChecked: true
        })
    }

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id)) {
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
        const discount = props.operation.percent ? props.operation.price * props.operation.amount * props.operation.discount / 100 : props.operation.discount
        props.changeOperationState({discount_value: discount || 0})
    }, [props.operation.discount, props.operation.percent, props.operation.amount])

    useEffect(() => {
        props.changeOperationState({total: props.operation.price * props.operation.amount - props.operation.discount_value})
    }, [props.operation.price, props.operation.discount_value, props.operation.amount])


    const handleCreate = () => {
        if (props.operation.title && checkObject(props.operation.engineer)) {
            props.createCustomOperation()
            handleClose()
        } else {
            if (!props.operation.title) props.changeVisibleState({inputOperationTitleChecked: false})
            if (!checkObject(props.operation.engineer)) props.changeVisibleState({inputOperationEngineerChecked: false})
        }
    }

    const handleSave = () => {
        if (props.operation.title && checkObject(props.operation.engineer)) {
            props.saveOperation()
            handleClose()
        } else {
            if (!props.operation.title) props.changeVisibleState({inputOperationTitleChecked: false})
            if (!checkObject(props.operation.engineer)) props.changeVisibleState({inputOperationEngineerChecked: false})
        }
    }

    const handleDelete = props.permissions.includes('setting_delete_service') ? () => {
        props.deleteOperation(true)
        handleClose()
    } : null

    const handleRecover = props.permissions.includes('setting_recover_service') ? () => {
        props.deleteOperation(false)
        handleClose()
    } : null

    return (
        <div className='modal'>
            <div className='modal__box modal__box_editor' id={id}>
                <h4>{props.operation.edit ? props.operation.title : 'Новая операция'}</h4>

                <div className='modal__body modal__body-editor'>
                    <div className='modal__forms'>
                        <LableInput
                            title='Наименование'
                            onChange={event => props.changeOperationState({title: event.target.value})}
                            value={props.operation.title}
                            checkedFlag='inputOperationTitleChecked'
                            disabled={props.operation.deleted}
                            redStar={true}
                        />
                        <LableInput
                            title='Количество'
                            onChange={event => props.changeOperationState({amount: parseInt(event.target.value.replace(/[^0-9.]/g, ''))})}
                            value={props.operation.amount}
                            disabled={props.operation.deleted}
                        />
                        <LableInput
                            title='Цена'
                            onChange={event => props.changeOperationState({price: event.target.value.replace(/[^0-9.]/g, '')})}
                            value={props.operation.price}
                            unit='руб'
                            disabled={props.operation.deleted}
                        />

                        <LableInput
                            title='Себестоимость'
                            onChange={event => props.changeOperationState({cost: event.target.value.replace(/[^0-9.]/g, '')})}
                            value={props.operation.cost}
                            unit='руб'
                            disabled={props.operation.deleted || !props.permissions.includes('edit_buy_cost')}
                            invisible={!props.permissions.includes('see_buy_cost')}
                        />
                        <div className='two-buttons'>
                            <LableInput
                                title='Скидка'
                                onChange={event => props.changeOperationState({discount: event.target.value.replace(/[^0-9]/g, '')})}
                                value={props.operation.discount}
                                disabled={props.operation.deleted}
                            />
                            <ChooseButton
                                name={['руб.', '%']}
                                func1={() => props.changeOperationState({percent: false})}
                                func2={() => props.changeOperationState({percent: true})}
                                disabled={props.operation.deleted}
                            />
                        </div>
                        <div className='two-buttons'>
                            <LableInput
                                title='Гарантия'
                                onChange={event => props.changeOperationState({
                                    warranty_period: event.target.value.replace(/[^0-9]/g, '') * props.operation.warranty_value
                                })}
                                value={Math.round(props.operation.warranty_period / props.operation.warranty_value)}
                                disabled={props.operation.deleted}
                            />
                            <ChooseButton
                                name={['Дни', 'Мес']}
                                func1={() => props.changeOperationState({warranty_value: 24 * 60 * 60})}
                                func2={() => props.changeOperationState({warranty_value: 30 * 24 * 60 * 60})}
                                disabled={props.operation.deleted}
                            />

                        </div>
                    </div>


                    <SelectFromList
                        className='w220'
                        title='Исполнитель'
                        list={props.employees.filter(employee => employee.role.permissions.includes('in_list_engineers'))}
                        setElement={engineer => props.changeOperationState({engineer})}
                        current_object={props.operation.engineer}
                        checkedFlag='inputOperationEngineerChecked'
                        noChoosed='Выберете сотрудника'
                        disabled={props.operation.deleted}
                    />

                    <LableArea
                        title='Коментарий'
                        onChange={event => props.changeOperationState({comment: event.target.value})}
                        value={props.operation.comment}
                        disabled={props.operation.deleted}
                    />
                    <div>Сумма скидки: {props.operation.discount_value}</div>
                    <div>Итого: {props.operation.total}</div>


                </div>


                <BottomButtons
                    edit={props.operation.edit}
                    deleted={props.operation.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={handleDelete}
                    recover={handleRecover}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    operation: state.operation,
    view: state.view,
    employees: state.employee.employees.filter(employee => !employee.deleted),
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeVisibleState,
    resetOperation,
    changeOperationState,
    createCustomOperation,
    saveOperation,
    deleteOperation
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationEditor)
