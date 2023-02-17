import React, {useEffect, useMemo, useRef} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState,} from '../../../Redux/actions'
import {changeFilterState, deleteFilter, resetTempFilter, selectedFilter} from '../../../Redux/actions/filterAction'
import {addClients, changeClientState} from '../../../Redux/actions/clientAction'
import {ICON} from '../../../data/icons'


import FilterEditor from '../FilterEditor'
import Button from '../../general/Button'
import ChooseWithSearch from '../../general/ChooseWithSearch'
import ChooseDate from '../../general/calandar/ChooseDate'
import SetGroup from './SetGroup'
import SetBrand from './SetBrand'
import SetSubtype from './SetSubtype'
import SelectStatuses from '../../general/SelectStatuses'
import SelectFromListMany from '../../general/SelectFromListMany'

const SetFilter = props => {

    useEffect(() => {
        props.addClients()
    }, [props.client.filter_name])

    const handleSet = () => {
        const data = {
            page: 0,
            engineer_id: props.filter.temp_engineers.length ? props.filter.temp_engineers.map(engineer => engineer.id) : null,
            overdue: null,
            status_id: props.filter.temp_statuses.length ? props.filter.temp_statuses.map(status => status.id) : null,
            status_overdue: null,
            urgent: null,
            order_type_id: props.filter.temp_order_types.length ? props.filter.temp_order_types.map(order_type => order_type.id) : null,
            manager_id: props.filter.temp_managers.length ? props.filter.temp_managers.map(manager => manager.id) : null,
            created_at: props.filter.temp_created_at.length && props.filter.temp_created_at.every(el => el === 0) ? null : props.filter.temp_created_at,
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
        <div className={`custom-filter ${props.invisible || ''}`}>
            <SelectStatuses
                id='customFilterStatus'
                func={value => props.selectedFilter(value, 'temp_statuses')}
                func_clear={() => props.changeFilterState({temp_statuses: []})}
                current_list={props.filter.temp_statuses}
                range={[0, 7]}
            />
            <SelectFromListMany
                id='customFilterOrderType'
                title='Тип заказа'
                mainLabel='Все'
                list={props.order_type}
                checked_list={props.filter.temp_order_types}
                func={value => props.selectedFilter(value, 'temp_order_types')}
            />
            <ChooseDate
                title='Дата'
                func={date => props.changeFilterState({temp_created_at: date.map(date => parseInt(date / 1000))})}
                current_date={props.filter.temp_created_at}
                range={true}
                allDate={true}
                time={false}
            />
            <SetGroup/>
            <SetBrand/>
            <SetSubtype/>
            <ChooseWithSearch
                id='customFilterClient'
                title='Клиент'
                list={props.client.clients}
                current_element={props.temp_client}
                setElement={client => props.changeFilterState({temp_client: client})}
                filter={props.client.filter_name}
                changeFilter={filter => props.changeClientState({filter_name: filter})}
                placeholder='Введите имя'
            />

            <SelectFromListMany
                id='customFilterManager'
                title='Менеджер'
                mainLabel='Все'
                list={props.employees.filter(employee => employee.role.permissions.includes('in_list_managers'))}
                checked_list={props.filter.temp_managers}
                func={value => props.selectedFilter(value, 'temp_managers')}
            />
            <SelectFromListMany
                id='customFilterManager'
                title='Инженер'
                mainLabel='Все'
                list={props.employees.filter(employee => employee.role.permissions.includes('in_list_engineers'))}
                checked_list={props.filter.temp_engineers}
                func={value => props.selectedFilter(value, 'temp_engineers')}
            />


            <div className="custom-filter__buttons">
                <Button
                    id='customFilterSet'
                    size='med'
                    type='primary'
                    title='Применить'
                    onClick={handleSet}
                />
                {props.filter.active_filter ?
                    <Button
                        id='customFilterTrash'
                        size='med'
                        type='destructive'
                        icon={ICON.TRASH}
                        onClick={() => props.deleteFilter()}
                    />
                    :
                    <Button
                        id='customFilterCreate'
                        size='med'
                        type='create'
                        title='Создать фильтр'
                        onClick={() => props.changeVisibleState({statusCreateNewFilter: true})}
                    />
                }
                <Button
                    id='customFilterReset'
                    size='med'
                    type='tertiary'
                    title='Сбросить параметы'
                    onClick={() => props.resetTempFilter()}
                    icon={ICON.CROSS}
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
    temp_client: state.filter.temp_client,
    status_group: state.data.status_group
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
