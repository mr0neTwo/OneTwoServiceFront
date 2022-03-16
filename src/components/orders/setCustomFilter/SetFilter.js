import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addClients, changeVisibleState,} from '../../../Redux/actions'
import {changeFilterState, deleteFilter, resetTempFilter, selectedFilter} from '../../../Redux/actions/filterAction'
import {icon_cross, icon_trush} from '../../../data/icons'

// import SetBrand from './SetBrand'
// import SetClient from './SetClient'
// import SetDataCreate from './SetDataCreate'
// import SetGroup from './SetGroup'
// import SetSubtype from './SetSubtype'
import FilterEditor from '../FilterEditor'
import Button from '../../general/Button'
import ChooseStatuses from '../../Settings/SettingPages/Notification/ChooseStatuses'
import ChooseOfListMany from '../../general/ChooseOfListMany'

const SetFilter = props => {

    useEffect(() => {
        props.addClients()
    }, [props.clientFilter])

    const handleSet = () => {
        const data = {
            page: 0,
            engineer_id: props.filter.temp_engineers.length ? props.filter.temp_engineers : null,
            overdue: null,
            status_id: props.filter.temp_statuses.length ? props.filter.temp_statuses : null,
            status_overdue: null,
            urgent: null,
            order_type_id: props.filter.temp_order_types.length ? props.filter.temp_order_types : null,
            manager_id: props.filter.temp_managers.length ? props.filter.temp_managers : null,
            created_at: props.filter.temp_created_at,
            kindof_good: props.filter.temp_kindof_good_id,
            brand: props.filter.temp_brand,
            subtype: props.filter.temp_subtype,
            client_id: props.filter.temp_client,
            active_badge: 0,
            active_filter: 0
        }
        props.changeFilterState(data)
    }

    return (
        <div className="setCustomFilter">
            <div className="row jc-c">

                <div className="jc-sb w100 m10">
                    <ChooseStatuses
                        className='h52'
                        width='100%'
                        func={value => props.selectedFilter(value, 'temp_statuses')}
                        func_clear={() => props.changeFilterState({temp_statuses: []})}
                        current_list={props.filter.temp_statuses}
                    />
                    {/*<div className='mt15'><SetGroup/></div>*/}
                    {/*<div className='mt15'><SetClient/></div>*/}
                </div>

                <div className="jc-sb w100 m10">
                    <ChooseOfListMany
                        id='idTypeOrders'
                        className='h52'
                        width='100%'
                        title='Тип заказа'
                        mainLable='Все'
                        list={props.order_type}
                        checked_list={props.filter.temp_order_types}
                        func={value => props.selectedFilter(value, 'temp_order_types')}
                    />
                    {/*<div className='mt15'><SetBrand/></div>*/}
                    <ChooseOfListMany
                        id='idManagerOrders'
                        className='h52 mt15'
                        width='100%'
                        title='Менеджер'
                        mainLable='Все'
                        list={props.employees.filter(employee => employee.role.permissions.includes('in_list_managers'))}
                        employee={true}
                        checked_list={props.filter.temp_managers}
                        func={value => props.selectedFilter(value, 'temp_managers')}
                    />
                </div>
                <div className="jc-sb w100 m10">
                    {/*<SetDataCreate/>*/}
                    {/*<div className='mt15'><SetSubtype/></div>*/}
                    <ChooseOfListMany
                        id='idEngineerOrders'
                        className='h52 mt15'
                        width='100%'
                        title='Инженер'
                        mainLable='Все'
                        list={props.employees.filter(employee => employee.role.permissions.includes('in_list_engineers'))}
                        employee={true}
                        checked_list={props.filter.temp_engineers}
                        func={value => props.selectedFilter(value, 'temp_engineers')}
                        disabled={!props.user.role.orders_visibility}
                    />
                </div>
            </div>
            <div className="buttons fs14 mt15">
                <Button
                    className='blueButton'
                    title='Применить'
                    onClick={handleSet}
                />
                {props.filter.active_filter ?
                    <Button
                        className='whiteButton bcr'
                        icon={icon_trush}
                        iconClassName='icon-s1 pd1'
                        iconColor='white'
                        onClick={() => props.deleteFilter()}
                    />
                    :
                    <Button
                        className='whiteButton'
                        title='Создать фильтр'
                        onClick={() => props.changeVisibleState({statusCreateNewFilter: true})}
                    />
                }
                <Button
                    className='whiteButton'
                    title='Сбросить параметы'
                    onClick={() => props.resetTempFilter()}
                    icon={icon_cross}
                    iconClassName='icon-sm8'
                    iconColor='#282e33'
                />
            </div>
            {props.statusCreateNewFilter ? <FilterEditor/> : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    clientFilter: state.filter.clientFilter,
    statusCreateNewFilter: state.view.statusCreateNewFilter,
    filter: state.filter,
    order_type: state.data.order_type,
    employees: state.data.employees.filter(employee => !employee.deleted),
    user: state.data.user,
})

const mapDispatchToProps = {
    addClients,
    resetTempFilter,
    deleteFilter,
    selectedFilter,
    changeFilterState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetFilter)
