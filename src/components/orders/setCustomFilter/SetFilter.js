import React, {useEffect, useMemo} from 'react'
import {connect} from 'react-redux'

import { changeVisibleState,} from '../../../Redux/actions'
import {changeFilterState, deleteFilter, resetTempFilter, selectedFilter} from '../../../Redux/actions/filterAction'
import {addClients, changeClientState} from '../../../Redux/actions/clientAction'
import {icon_cross, icon_trush} from '../../../data/icons'


import FilterEditor from '../FilterEditor'
import Button from '../../general/Button'
import ChooseStatuses from '../../general/ChooseStatuses'
import ChooseOfListMany from '../../general/ChooseOfListMany'
import ChooseWithSearch from '../../general/ChooseWithSearch'
import ChooseDate from '../../general/calandar/ChooseDate'
import SetGroup from './SetGroup'
import SetBrand from './SetBrand'
import SetSubtype from './SetSubtype'

const SetFilter = props => {

    useEffect(() => {
        props.addClients()
    }, [props.client.filter_name])

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
            created_at: props.filter.temp_created_at.length && props.filter.temp_created_at.every(el => el === 0) ? null : props.filter.temp_created_at ,
            kindof_good: props.filter.temp_kindof_good_id,
            brand: props.filter.temp_brand,
            subtype: props.filter.temp_subtype,
            client_id: Object.values(props.filter.temp_client).length ? [props.filter.temp_client.id] : null,
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
                        range={[0, 7]}
                    />
                    <SetGroup/>
                    <ChooseWithSearch
                        id='filterClient'
                        className='mt15 h52'
                        width='100%'
                        title='Клиент'
                        list={props.client.clients}
                        current_element={props.temp_client}
                        setElement={client => props.changeFilterState({temp_client: client})}
                        filter={props.client.filter_name}
                        changeFilter={filter => props.changeClientState({filter_name: filter})}
                        placeholder='Введите имя'
                    />
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
                    <SetBrand/>
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
                    <ChooseDate
                        className='h52'
                        title='Дата'
                        width='100%'
                        range={true}
                        allDate={true}
                        func={date => props.changeFilterState({temp_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.filter.temp_created_at}
                    />
                    <SetSubtype/>
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
    statusCreateNewFilter: state.view.statusCreateNewFilter,
    filter: state.filter,
    order_type: state.data.order_type,
    employees: state.employee.employees.filter(employee => !employee.deleted),
    client: state.client,
    user: state.data.user,
    temp_client: state.filter.temp_client
})

const mapDispatchToProps = {
    addClients,
    resetTempFilter,
    deleteFilter,
    selectedFilter,
    changeFilterState,
    changeVisibleState,
    changeClientState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetFilter)
