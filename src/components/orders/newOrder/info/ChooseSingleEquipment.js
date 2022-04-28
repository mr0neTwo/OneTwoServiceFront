import React from 'react'
import {connect} from 'react-redux'

import {changeOrderForm, addAnotherEquipment, deleteDevice, changeOrderFormS} from '../../../../Redux/actions'

import LabelInputOrder from './LabelInputOrder'
import SetOrderBrand from './SetOrderBrand'
import SetOrderGroup from './SetOrderGroup'
import SetOrderModel from './SetOrderModel'
import SetOrderSubtype from './SetOrderSubtype'

const ChooseSingleEquipment = (props) => {
    return (
        <div>

            <div className='formRow mt15'>
                <div className='optionsTitle'></div>
                <div className='orderFormTitle'>Изделиe и неисправность</div>
            </div>

            <div className='orderDevice'>

                <div className='formRow'>
                    <div className='optionsTitle'>
                        Тип устройства<span className='redStar'>*</span>
                    </div>
                    <div className='blockImput'>
                        <SetOrderGroup idx={0}/>
                    </div>
                </div>

                <div className='formRow'>
                    <div className='optionsTitle'>
                        Бренд<span className='redStar'>*</span>
                    </div>
                    <div className='blockImput'>
                        <SetOrderBrand idx={0}/>
                    </div>
                </div>

                <div className='formRow'>
                    <div className='optionsTitle'>
                        Модуль / Серия<span className='redStar'>*</span>
                    </div>
                    <div className='blockImput'>
                        <SetOrderSubtype idx={0}/>
                    </div>
                </div>

                <div className='formRow'>
                    <div className='optionsTitle'>Модель</div>
                    <div className='blockImput'>
                        <SetOrderModel idx={0}/>
                    </div>
                </div>

                <LabelInputOrder
                    idx={23}
                    className='formRow'
                    title='Неисправность'
                    name='malfunction'
                    onChange={(event) => props.changeOrderFormS(event.target.value, 'malfunction')}
                    value={props.order.malfunction}
                    checkedFlag='inputMalfunctionChecked'
                    checked={props.view.inputMalfunctionChecked}
                    disabled={!props.permissions.includes('edit_info_orders')}
                />
                <LabelInputOrder
                    className='formRow'
                    title='Комплектация'
                    name='packagelist'
                    onChange={(event) => props.changeOrderFormS(event.target.value, 'packagelist')}
                    value={props.order.packagelist}
                    disabled={!props.permissions.includes('edit_info_orders')}
                />
                <LabelInputOrder
                    className='formRow'
                    title='Внешинй вид'
                    name='appearance'
                    onChange={(event) => props.changeOrderFormS(event.target.value, 'appearance')}
                    value={props.order.appearance}
                    disabled={!props.permissions.includes('edit_info_orders')}
                />
                <div className='formRow'>
                    <div className='optionsTitle'>Срочно</div>
                    <div className='blockImput'>
                        <div className='checkbox pd-tb-5 al-itm-fs'>
                            <input
                                type='checkbox'
                                onChange={event => props.changeOrderFormS(event.target.checked, 'urgent')}
                                checked={props.order.urgent}
                                disabled={!props.permissions.includes('edit_info_orders')}
                            />
                            <label></label>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.order,
    view: state.view,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeOrderForm,
    addAnotherEquipment,
    deleteDevice,
    changeOrderFormS
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSingleEquipment)
