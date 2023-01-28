import React from 'react'
import {connect} from 'react-redux'

import {changeCashboxState, chooseCashboxSelected} from '../../../Redux/actions/cashboxAction'

import ChooseButton from '../../general/ChooseButton'
import Checkbox from '../../general/Checkbox'
import LableInput from '../../general/LableInput'

const DataCashbox = (props) => {
    return (
        <div className='modal__body modal__body-editor'>

            <div className='modal__block-forms'>

                <LableInput
                    title='Наименование'
                    className='w220'
                    onChange={event => props.changeCashboxState({title: event.target.value})}
                    value={props.cashbox.title}
                    checkedFlag="inputCashboxTitleChecked"
                    checked={props.view.inputCashboxTitleChecked}
                    redStar={true}
                    disabled={props.cashbox.deleted}
                />
                <ChooseButton
                    title='Тип'
                    name={['Касса компании', 'Касса локации']}
                    func1={() => props.changeCashboxState({isGlobal: true})}
                    func2={() => props.changeCashboxState({isGlobal: false})}
                    checked={props.cashbox.isGlobal}
                    disabled={props.cashbox.deleted}
                />
                <Checkbox
                    id='CashboxEditorIsVirtual'
                    type='slide-three'
                    label='Виртуальная касса'
                    onChange={event => props.changeCashboxState({isVirtual: event.target.checked})}
                    checked={props.cashbox.isVirtual}
                    disabled={props.cashbox.deleted}
                    invisible={true}
                />
                <ChooseButton
                    title='Способ расчета'
                    name={['Наличный', 'Безналичный']}
                    func1={() => props.changeCashboxState({type: 0})}
                    func2={() => props.changeCashboxState({type: 1})}
                    checked={true}
                    disabled={props.cashbox.deleted}
                />
                <h5>Допустимые действия с кассой</h5>
                <Checkbox
                    id='CashboxEditorCanRemain'
                    type='slide-three'
                    label='Видеть остаток денег в кассе'
                    onChange={() => props.chooseCashboxSelected(['show_cashbox_remains'], 'permissions')}
                    checked={props.cashbox.permissions.includes('show_cashbox_remains')}
                    disabled={props.cashbox.deleted}
                />
                <Checkbox
                    id='CashboxEditorCashflow'
                    type='slide-three'
                    label='Видеть денежный поток'
                    onChange={() => props.chooseCashboxSelected(['show_cash_flow'], 'permissions')}
                    checked={props.cashbox.permissions.includes('show_cash_flow')}
                    disabled={props.cashbox.deleted}
                />
                <div className='modal__block-forms_row'>
                    <div className='modal__block-forms'>
                        <h5>Входящие операции:</h5>
                        <Checkbox
                            id='CashboxEditorIncome'
                            type='slide-three'
                            label='Приход'
                            onChange={() => props.chooseCashboxSelected(['incoming'], 'permissions')}
                            checked={props.cashbox.permissions.includes('incoming')}
                            disabled={props.cashbox.deleted}
                        />
                        <Checkbox
                            id='CashboxEditorIcomeMove'
                            type='slide-three'
                            label='Перемещение'
                            onChange={() => props.chooseCashboxSelected(['incoming_move'], 'permissions')}
                            checked={props.cashbox.permissions.includes('incoming_move')}
                            disabled={props.cashbox.deleted}
                        />
                    </div>
                    <div className='modal__block-forms'>
                        <h5>Исходящие операции:</h5>
                        <Checkbox
                            id='CashboxEditorOutcome'
                            type='slide-three'
                            label='Приход'
                            onChange={() => props.chooseCashboxSelected(['outcoming'], 'permissions')}
                            checked={props.cashbox.permissions.includes('outcoming')}
                            disabled={props.cashbox.deleted}
                        />
                        <Checkbox
                            id='CashboxEditorOutcomeMove'
                            type='slide-three'
                            label='Перемещение'
                            onChange={() => props.chooseCashboxSelected(['outcoming_move'], 'permissions')}
                            checked={props.cashbox.permissions.includes('outcoming_move')}
                            disabled={props.cashbox.deleted}
                        />
                    </div>
                </div>
                <div/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cashbox: state.cashbox,
    view: state.view

})

const mapDispatchToProps = {
    changeCashboxState,
    chooseCashboxSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(DataCashbox)