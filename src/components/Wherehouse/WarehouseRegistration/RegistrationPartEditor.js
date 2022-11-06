import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {changeVisibleState} from '../../../Redux/actions'
import {resetRegistrationPart, saveRegistrationPart} from '../../../Redux/actions/registrationAction'
import {addRegistrationPart, changeRegistrationState, deleteRegistrationPart} from '../../../Redux/actions/registrationAction'
import {addDiscountMargin, changePriceState} from '../../../Redux/actions/priceAction'

import BottomButtons from '../../general/BottomButtons'
import LableInput from '../../general/LableInput'
import TablePartPrices from './TablePartPrices'


const RegistrationPartEditor = (props) => {

    const disabled = props.registration.edit

    useEffect(() => {
        if (!props.registration.edit_part) {
            props.changeRegistrationState({
                part_margin: props.discount_margin.map(margin => ({
                    cost: 0,
                    discount_margin_id: margin.id,
                    part_id: props.registration.part.id,
                }))
            })
        }
    }, [])

    const handleClose = () => {
        props.changeVisibleState({
            statusRegistrationPartEditor: false,
            inputRegistrationCountChecked: true
        })
        props.resetRegistrationPart()
    }

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('registrationPartEditor') &&
            !event.path.map((el) => el.id).includes('listWarehousePart') &&
            !event.path.map((el) => el.id).includes('registrationTableParts')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (props.registration.count) {
            props.addRegistrationPart()
            handleClose()
        } else {
            props.changeVisibleState({inputRegistrationCountChecked: false})
        }

    }

    const handleSave = (idx) => {
        if (props.registration.count) {
            props.saveRegistrationPart(idx)
            handleClose()
        } else {
            props.changeVisibleState({inputRegistrationCountChecked: false})
        }
    }

    const handleDelete = (idx) => {
        props.deleteRegistrationPart(idx)
        handleClose()
    }

    return (
        <div className='centerBlockFix'>
            <div className='blockWindowFix wmn500' id='registrationPartEditor'>
                <div className='createNewTitle'>{props.registration.part.title}</div>

                <div className='row'>
                    <div className='rBorder pr15 w250'>
                        <LableInput
                            className='mt15'
                            width='70px'
                            title='Количество'
                            onChange={event => props.changeRegistrationState({count: parseInt(event.target.value.replace(/[^0-9]/g, '')) || 0})}
                            value={props.registration.count}
                            unit=' '
                            checkedFlag='inputRegistrationCountChecked'
                            checked={props.view.inputRegistrationCountChecked}
                            redStar={true}
                            disabled={disabled}
                        />
                        <LableInput
                            className='mt15'
                            width='70px'
                            title='Закупочная цена'
                            onChange={event => props.changeRegistrationState({buy_cost: event.target.value.replace(/[^0-9.,]/g, '')})}
                            value={props.registration.buy_cost}
                            unit='Руб.'
                            disabled={!props.permissions.includes('see_buy_cost')}
                            invisible={!props.permissions.includes('edit_buy_cost')}
                        />
                        {props.permissions.includes('edit_buy_cost') ? null :
                        <div className='row'>
                            <LableInput
                                className='mt15 w250'
                                title='Место хранения'
                                onChange={event => props.changeRegistrationState({cell: event.target.value})}
                                value={props.registration.cell}
                                disabled={!Object.values(props.registration.warehouse).length}
                            />
                            {!Object.values(props.registration.warehouse).length ?
                                <div className='errorMassageInput mt35 ml10'>{'<= Необходимо выбрать склад'}</div>
                                : null}
                        </div>}
                    </div>
                    <div className='ml15'>
                        <LableInput
                            className='mt15 w250'
                            title='Продавец'
                            onChange={event => props.changeRegistrationState({seller: event.target.value})}
                            value={props.registration.seller}
                        />
                        <LableInput
                            className='mt15 w250'
                            title='Ссылка на товар'
                            onChange={event => props.changeRegistrationState({where_to_buy: event.target.value})}
                            value={props.registration.where_to_buy}
                        />
                    </div>
                </div>
                {props.permissions.includes('edit_buy_cost') ?
                <div className='row'>
                    <LableInput
                        className='mt15 w250'
                        title='Место хранения'
                        onChange={event => props.changeRegistrationState({cell: event.target.value})}
                        value={props.registration.cell}
                        disabled={!Object.values(props.registration.warehouse).length}
                    />
                    {!Object.values(props.registration.warehouse).length ?
                        <div className='errorMassageInput mt35 ml10'>{'<= Необходимо выбрать склад'}</div>
                        : null}
                </div> : null}
                <h3 className='mt15'>Цены</h3>
                <TablePartPrices/>


                <BottomButtons
                    edit={props.registration.edit_part}
                    create={handleCreate}
                    save={() => handleSave(props.registration.edit_part)}
                    delete={disabled ? null : () => handleDelete(props.registration.edit_part - 1)}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    discount_margin: state.price.discount_margin,
    registration: state.registration,
    view: state.view,
    permissions: state.data.user.role.permissions

})

const mapDispatchToProps = {
    changeVisibleState,
    resetRegistrationPart,
    changeRegistrationState,
    changePriceState,
    addDiscountMargin,
    addRegistrationPart,
    saveRegistrationPart,
    deleteRegistrationPart
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPartEditor)