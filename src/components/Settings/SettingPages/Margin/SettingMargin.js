import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {addDiscountMargin, changePriceState} from '../../../../Redux/actions/priceAction'
import {setVisibleFlag} from '../../../../Redux/actions'

import TablePrice from './TablePrice'
import PriceEditor from './PriceEditor'
import Checkbox from '../../../general/Checkbox'
import Button from '../../../general/Button'


const SettingMargin = (props) => {

    useEffect(() => {
        props.changePriceState({filter_type: null})
        props.addDiscountMargin()
    }, [props.price.showDeleted])

    return (
        <div className='settingContent'>

            <div className='header'>
                <span className='headerTitle'>Цены и скидки</span>
            </div>

            <div className='settingPageBody'>

                <h3>Цены на товары</h3>
                <p>Настройка цен на товары.</p>

                <div className='row'>
                    <Button
                        className='greenButton'
                        title='+ Цена'
                        onClick={() => {
                            props.setVisibleFlag('statusPriceEditor', true)
                            props.changePriceState({margin_type: 2})
                        }}
                        invisible={!props.permissions.includes('setting_create_price')}
                    />
                    <Checkbox
                        label='Показать удаленных'
                        onChange={event => props.changePriceState({showDeleted: event.target.checked})}
                        checked={props.price.showDeleted}
                        invisible={!props.permissions.includes('setting_price_show_deleted')}
                    />
                </div>
                {props.statusPriceEditor ? <PriceEditor/> : null}

                <TablePrice type={2}/>

                <h3>Цены на работы</h3>
                <p>Настройка цен на работы.</p>

                <div className='row'>
                    <Button
                        className='greenButton'
                        title='+ Цена'
                        onClick={() => {
                            props.setVisibleFlag('statusPriceEditor', true)
                            props.changePriceState({margin_type: 1})
                        }}
                        invisible={!props.permissions.includes('setting_create_price')}
                    />
                    <Checkbox
                        label='Показать удаленных'
                        onChange={event => props.changePriceState({showDeleted: event.target.checked})}
                        checked={props.price.showDeleted}
                        invisible={!props.permissions.includes('setting_price_show_deleted')}
                    />
                </div>
                <TablePrice type={1}/>

            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    statusPriceEditor: state.view.statusPriceEditor,
    permissions: state.data.user.role.permissions,
    price: state.price
})

const mapDispatchToProps = {
    addDiscountMargin,
    setVisibleFlag,
    changePriceState
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingMargin)