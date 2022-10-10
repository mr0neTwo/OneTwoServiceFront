import React, { useEffect } from 'react'
import { connect } from 'react-redux'


import {changeVisibleState} from '../../../Redux/actions'
import {changeRegistrationState, resetRegistrationPart} from '../../../Redux/actions/registrationAction'

import BottomButtons from '../../general/BottomButtons'
import LableInput from '../../general/LableInput'
import ChooseBotton from '../../general/ChooseBotton'


const RegistrationPartEditor = (props) => {

    const handleClose = () => {
        props.changeVisibleState({statusRegistrationPartEditor: false})
        props.resetRegistrationPart()
    }

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('registrationPartEditor') &&
            !event.path.map((el) => el.id).includes('listWarehousePart')
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

    return (
        <div className='centerBlockFix'>
            <div className='blockWindowFix wmx500 wmn500' id='registrationPartEditor'>
                <div className='createNewTitle'>{props.registration.part.title}</div>

                <div className='row'>
                    <div className='rBorder pr15'>
                        <LableInput
                            className='mt15'
                            width='70px'
                            title='Количество'
                            onChange={event => props.changeRegistrationState({count: event.target.value})}
                            value={props.registration.count}
                            unit=' '
                            checkedFlag='inputRegistrationCountChecked'
                            checked={props.view.inputRegistrationCountChecked}
                            redStar={true}
                        />
                        <LableInput
                            className='mt15'
                            width='70px'
                            title='Закупочная цена'
                            onChange={event => props.changeRegistrationState({buy_cost: event.target.value})}
                            value={props.registration.buy_cost}
                            unit='Руб.'
                            checkedFlag='inputRegistrationBuyCostChecked'
                            checked={props.view.inputRegistrationBuyCostChecked}
                            redStar={true}
                        />
                        <LableInput
                            className='mt15 w250'
                            title='Ячейка'
                            onChange={event => props.changeRegistrationState({cell: event.target.value})}
                            value={props.registration.cell}
                        />
                    </div>
                    <div className='ml15'>
                        <div className='row al-itm-fe'>
                            <LableInput
                                className='w70 mt15'
                                title='Гарантия'
                                onChange={event => props.changeRegistrationState({warranty_period: event.target.value.replace(/[^0-9]/g, '') * props.registration.warranty_value})}
                                value={parseInt(props.registration.warranty_period / props.registration.warranty_value)}
                                unit=' '
                            />
                            <ChooseBotton
                                className='ml30'
                                name={['Дни', 'Мес']}
                                func1 = {() => props.changeRegistrationState({warranty_value: 1*24*60*60})}
                                func2 = {() => props.changeRegistrationState({warranty_value: 30*24*60*60})}
                            />
                        </div>
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
                <div className=''>Цены</div>


                <BottomButtons
                    edit={false}
                    // create={() => props.createSalaryRule()}
                    // save={() => props.saveSalaryRule()}
                    // delete={() => props.deleteSalaryRule(true)}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    registration: state.registration,
    view: state.view
})

const mapDispatchToProps = {
    changeVisibleState,
    resetRegistrationPart,
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPartEditor)