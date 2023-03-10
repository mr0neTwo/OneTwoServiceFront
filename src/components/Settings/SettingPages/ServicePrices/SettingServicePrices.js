import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {
    addGroupeService,
    setVisibleFlag,
    editGroupDictService,
    addDictService,
    changeDictServiceForm,
    selectedService,
    editDictService
} from '../../../../Redux/actions'
import {addDiscountMargin, addServicePrices} from '../../../../Redux/actions/priceAction'

import Button from '../../../general/Button'
import Checkbox from '../../../general/Checkbox'
import TableFields from '../../../general/TableFields'
import GroupServiceEditor from './GroupServiceEditor'
import ServiceEditor from './ServiceEditor'
import ServicePrice from './ServicePrice'
import {includesObject} from '../../../general/utils'
import {Table} from '../../../../data/tableHeaders'

const SettingServicePrices = (props) => {

    useEffect(() => {
        props.addGroupeService()
        props.addDiscountMargin()
        props.addServicePrices()
        return () => {
            props.changeDictServiceForm(null, 'seted_categiry')
        }
    }, [])

    useEffect(() => {
        props.addDictService()
    }, [props.dictService.seted_categiry])

    const [showDeleted, setShowDeleted] = useState(false)

    const group = props.group_dict_service.filter(group => showDeleted | !group.deleted)
    const count_group = group.length
    const services = props.dict_service.filter(service => showDeleted | !service.deleted)
    const count_services = services.length

    const tableFields = Table.Fields.Service.filter(header => includesObject(header, props.dictService.chosed_fields))
    const tableMarginFields = props.discount_margin.filter(margin => margin.margin_type === 1).map((margin, idx) => (
        {
            id: idx + 6,
            margin_id: margin.id,
            title: margin.title
        }
    ))
    const tableMarginFieldsFiltered = tableMarginFields.filter(header => includesObject(header, props.dictService.chosed_fields) )

    const editGroup = (group) => {
        if (props.permissions.includes('setting_edit_service')) {
            props.editGroupDictService(group)
            props.setVisibleFlag('statusGroupServiceEditor', true)
        }
    }

    const editService = (service) => {
        if (props.permissions.includes('setting_edit_service')) {
            props.editDictService(service)
            props.setVisibleFlag('statusServiceEditor', true)
        }
    }

    return (
        <div className='settingContent'>

            <div className='header'>
                <span className='headerTitle'>???????????????? ?????????? ?? ??????????</span>
            </div>

            <div className='settingPageBody'>

                <p>?????????????????????? ?????????? ?? ?????????? ?????????????????????????? ?? ?????????? ???????????????? ?? ?????????????????? ???????? ???? ????????????/????????????</p>
                <Checkbox
                    label='???????????????? ????????????????'
                    onChange={event => setShowDeleted(event.target.checked)}
                    value={showDeleted}
                    invisible={!props.permissions.includes('setting_see_deleted_service')}
                />

                <div className='row al-itm-bl'>

                    <div className='w250'>
                        <Button
                            title='+ ??????????????????'
                            className='greenButton'
                            onClick={() => props.setVisibleFlag('statusGroupServiceEditor', true)}
                            invisible={!props.permissions.includes('setting_create_service')}
                        />
                        <table>
                            <thead>
                            <tr>
                                <th>??????????????????</th>
                                <th>??????-????</th>
                            </tr>
                            </thead>
                            <tbody>
                            {group.map(group => (
                                <tr
                                    key={group.id}
                                    className={group.deleted ? 'rowDeleted' : null}
                                    onClick={() => props.changeDictServiceForm(group.id, 'seted_categiry')}
                                    onDoubleClick={() => editGroup(group)}
                                    style={group.id === props.dictService.seted_categiry ? {backgroundColor: '#cae1f5'} : null}
                                >
                                    <td>{group.title}</td>
                                    <td>{group.count}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div>?????????? - {count_group}</div>
                        {props.statusGroupServiceEditor ? <GroupServiceEditor/> : null}
                    </div>

                    <div className='ml10 w100'>
                        <div className='row jc-sb'>
                            <Button
                                title='+ ????????????'
                                className='greenButton'
                                onClick={() => props.setVisibleFlag('statusServiceEditor', true)}
                                invisible={!props.permissions.includes('setting_create_service')}
                            />
                            <TableFields
                                id='service'
                                height='185px'
                                classNameMenu='listOption'
                                list={Table.Fields.Service.concat(tableMarginFields)}
                                checked_list={props.dictService.chosed_fields}
                                func={props.selectedService}
                                field='chosed_fields'
                            />
                        </div>
                        <table>
                            <thead>
                            <tr>
                                {tableFields.map(header => (
                                    <th key={header.id}>{header.title}</th>
                                ))}
                                {tableMarginFieldsFiltered.map(header => (
                                    <th key={header.id}>{header.title}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {services.map(service => (
                                <tr
                                    key={service.id}
                                    className={service.deleted ? 'rowDeleted' : null}
                                >
                                    {tableFields.map(header => (
                                        <td key={header.id}
                                            onDoubleClick={() => editService(service)}>{service[header.field]}</td>
                                    ))}
                                    {tableMarginFieldsFiltered.map(header => (
                                        <ServicePrice
                                            key={header.id}
                                            margin_id={header.margin_id}
                                            service_id={service.id}
                                            disabled={!props.permissions.includes('setting_edit_service')}
                                        />
                                    ))}
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        <div>?????????? - {count_services}</div>
                        {props.statusServiceEditor ? <ServiceEditor/> : null}
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    group_dict_service: state.data.group_dict_service,
    dict_service: state.data.dict_service,
    statusGroupServiceEditor: state.view.statusGroupServiceEditor,
    statusServiceEditor: state.view.statusServiceEditor,
    dictService: state.dictService,
    discount_margin: state.price.discount_margin,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    addGroupeService,
    setVisibleFlag,
    editGroupDictService,
    addDictService,
    changeDictServiceForm,
    selectedService,
    addDiscountMargin,
    addServicePrices,
    editDictService
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingServicePrices)