import React from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag,} from '../../../Redux/actions'
import {addClientTag, changeClientState, deleteClientTag} from '../../../Redux/actions/clientAction'
import {check0_100} from '../../general/utils'

import AddTags from '../../general/AddTags'
import LableInput from '../../general/LableInput'
import ChooseButton from '../../general/ChooseButton'
import LableArea from '../../general/LableArea'
import SelectFromList from '../../general/SelectFromList'

const ClientAnotherInfo = (props) => {


    return (
        <div className="modal__block-forms">
            <h5>Прочее</h5>
            <LableInput
                className='w220'
                title='Скидочная карта'
                onChange={event => props.changeClientState({discount_code: event.target.value})}
                value={props.client.discount_code}
                disabled={props.client.deleted}
            />
            <div className='two-buttons'>
                <ChooseButton
                    title='Скидка на услуги в Заказе'
                    name={['Фиксированная', 'От типа цены']}
                    func1={() => props.changeClientState({discount_service_type: false})}
                    func2={() => props.changeClientState({discount_service_type: true})}
                    checked={true}
                    disabled={props.client.deleted}
                />
                {props.client.discount_service_type ? (
                    <SelectFromList
                        title='Тип скидки'
                        list={props.discount_margin.filter(margin => !margin.deleted && margin.margin_type === 1)}
                        setElement={margin => props.changeClientState({discount_service_margin: margin})}
                        current_object={props.client.discount_service_margin}
                    />
                ) : (
                    <LableInput
                        onChange={event => props.changeClientState({discount_services: event.target.value.replace(/[^0-9]/g, '')})}
                        value={props.client.discount_services}
                        unit='%'
                        disabled={props.client.deleted}
                        checkedFlag='inputClientDiscServChecked'
                        checked={check0_100(props.client.discount_services)}
                    />
                )}
            </div>
            <div className='two-buttons'>
                <ChooseButton
                    title='Скидка на материалы в Заказе'
                    name={['Фиксированная', 'От типа цены']}
                    func1={() => props.changeClientState({discount_materials_type: false})}
                    func2={() => props.changeClientState({discount_materials_type: true})}
                    checked={props.client.discount_materials_type}
                    disabled={props.client.deleted}
                />
                {props.client.discount_materials_type ? (
                    <SelectFromList
                        title='Тип скидки'
                        list={props.discount_margin.filter(margin => !margin.deleted && margin.margin_type === 2)}
                        setElement={margin => props.changeClientState({discount_materials_margin: margin})}
                        current_object={props.client.discount_materials_margin}
                    />
                ) : (
                    <LableInput
                        onChange={event => props.changeClientState({discount_materials: event.target.value.replace(/[^0-9]/g, '')})}
                        value={props.client.discount_materials}
                        unit='%'
                        disabled={props.client.deleted}
                        checkedFlag='inputClientDiscMatChecked'
                        checked={check0_100(props.client.discount_materials)}
                    />
                )}
            </div>
            <div className='two-buttons'>
                <ChooseButton
                    title='Скидка на товары в Продажах'
                    name={['Фиксированная', 'От типа цены']}
                    func1={() => props.changeClientState({discount_good_type: false})}
                    func2={() => props.changeClientState({discount_good_type: true})}
                    checked={props.client.discount_good_type}
                    disabled={props.client.deleted}
                />
                {props.client.discount_good_type ? (
                    <SelectFromList
                        title='Тип скидки'
                        list={props.discount_margin.filter(margin => !margin.deleted && margin.margin_type === 3)}
                        setElement={margin => props.changeClientState({discount_goods_margin: margin})}
                        current_object={props.client.discount_goods_margin}
                    />
                ) : (
                    <LableInput
                        onChange={event => props.changeClientState({discount_goods: event.target.value.replace(/[^0-9]/g, '')})}
                        value={props.client.discount_goods}
                        unit='%'
                        disabled={props.client.deleted}
                        checkedFlag='inputClientDiscGoodChecked'
                        checked={check0_100(props.client.discount_goods)}
                    />
                )}
            </div>
            <LableArea
                title='Примечание'
                onChange={event => props.changeClientState({notes: event.target.value})}
                value={props.client.notes}
                disabled={props.client.deleted}
            />
            <AddTags
                tags={props.client.tags}
                addTag={props.addClientTag}
                daleteTag={props.deleteClientTag}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    client: state.client,
    discount_margin: state.price.discount_margin,
    inputClientDiscServChecked: state.view.inputClientDiscServChecked,
    inputClientDiscMatChecked: state.view.inputClientDiscMatChecked,
    inputClientDiscGoodChecked: state.view.inputClientDiscGoodChecked,
})

const mapDispatchToProps = {
    changeClientState,
    addClientTag,
    deleteClientTag,
    setVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientAnotherInfo)
