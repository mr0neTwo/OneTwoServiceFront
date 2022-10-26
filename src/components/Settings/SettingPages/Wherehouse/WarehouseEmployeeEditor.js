
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from "../../../../Redux/actions"
import { changeWarehousePermission } from '../../../../Redux/actions/warehouseAction'
import ChooseButton from '../../../general/ChooseButton'
import WarningOrange from '../../../general/WarningOrange'
import Checkbox from '../../../general/Checkbox'

const WarehouseEmployeeEditor = (props) => {

    const [perm, setPerm] = useState( props.warehouse.employees[props.warehouse.permissions_employee].like_warehouse )

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('warehouseEmployeeEditor')) {
            props.setVisibleFlag('statusWarehouseEmployeeEditor', false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    return (
        <div className="centerBlock">
            <div className="blockWindow" id='warehouseEmployeeEditor'>
                <div className="createNewTitle">{`${props.employee.last_name} ${props.employee.first_name}`}</div>
                <div className="createNewTitle mt0">
                    {props.employee.role_title}
                </div>
                <WarningOrange
                    text="Сотрудник сможет выполнять только те действия, которые разрешены в настройках его роли"
                    width="500px"
                />
                <ChooseButton
                    className='mt15'
                    title='Выберите права'
                    name={['Доступные для склада', 'Персональные']}
                    func1={() => {
                        setPerm(true)
                        props.changeWarehousePermission(true, 'like_warehouse')
                    }}
                    func2={() => {
                        setPerm(false)
                        props.changeWarehousePermission(false, 'like_warehouse')
                    }}
                    checked={props.warehouse.employees[props.warehouse.permissions_employee].like_warehouse}
                    disabled={props.warehouse.deleted}
                />
                <Checkbox
                    className='mt15'
                    label='Видеть остатки'
                    onChange={() => props.changeWarehousePermission('show_warehouse_remains', 'permissions')}
                    checked={
                        perm ?
                            props.warehouse.permissions.includes('show_warehouse_remains') :
                            props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('show_warehouse_remains')
                    }
                    disabled={props.warehouse.deleted || perm}
                />
                <div className='row'>
                    <div>
                        <div className='lableImput mt15'>Входящие операции:</div>
                        <Checkbox
                            className='mt15'
                            label='Оприходование'
                            onChange={() => props.changeWarehousePermission('warehouse_registration', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('warehouse_registration') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('warehouse_registration')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                        <Checkbox
                            className='mt15'
                            label='Перемещение'
                            onChange={() => props.changeWarehousePermission('move_in', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('move_in') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('move_in')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                        <Checkbox
                            className='mt15'
                            label='Возврат от клиента'
                            onChange={() => props.changeWarehousePermission('return_from_client', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('return_from_client') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('return_from_client')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                    </div>
                    <div className='ml30'>
                        <div className='lableImput mt15'>Исходящие операции:</div>
                        <Checkbox
                            className='mt15'
                            label='Списание'
                            onChange={() => props.changeWarehousePermission('write_off', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('write_off') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('write_off')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                        <Checkbox
                            className='mt15'
                            label='Перемещение'
                            onChange={() => props.changeWarehousePermission('move_out', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('move_out') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('move_out')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                        <Checkbox
                            className='mt15'
                            label='Добавление в заказ'
                            onChange={() => props.changeWarehousePermission('add_to_order', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('add_to_order') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('add_to_order')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                        <Checkbox
                            className='mt15'
                            label='Добавление в продажу'
                            onChange={() => props.changeWarehousePermission('add_to_sale', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('add_to_sale') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('add_to_sale')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                        <Checkbox
                            className='mt15'
                            label='Возврат поставщику'
                            onChange={() => props.changeWarehousePermission('return_to_supplier', 'permissions')}
                            checked={
                                perm ?
                                    props.warehouse.permissions.includes('return_to_supplier') :
                                    props.warehouse.employees[props.warehouse.permissions_employee].permissions.includes('return_to_supplier')
                            }
                            disabled={props.warehouse.deleted || perm}
                        />
                    </div>
                </div>

                <div className="row">
                    <div
                        className="blueButton mr-lf-0"
                        onClick={() => props.setVisibleFlag('statusWarehouseEmployeeEditor', false)}
                    >
                        Сохранить
                    </div>
                    <div
                        className="whiteBlueBotton"
                        onClick={() => props.setVisibleFlag('statusWarehouseEmployeeEditor', false)}
                    >
                        Закрыть
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    employee: state.employee,
    roles: state.data.roles,
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeWarehousePermission
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseEmployeeEditor)
