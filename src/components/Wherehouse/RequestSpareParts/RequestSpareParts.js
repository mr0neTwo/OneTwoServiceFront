import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addReqSparePart, changeReqSparePartState, selectedReqSparePart} from '../../../Redux/actions/requestSparePartsAction'
import {addClients, changeClientState} from '../../../Redux/actions/clientAction'
import {request_spare_part_headers} from '../../../data/tableHeaders'

import ChooseDate from '../../general/calandar/ChooseDate'
import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'
import SelectFromListMany from '../../general/SelectFromListMany'
import SelectStatuses from '../../general/SelectStatuses'
import ChooseWithSearch from '../../general/ChooseWithSearch'
import RequestSparePartTable from './RequestSparePartTable'
import Button from '../../general/Button'
import {changeVisibleState} from '../../../Redux/actions'

const RequestSpareParts = props => {

    useEffect(() => {
        props.addReqSparePart()
    }, [
        props.reqsp.show_deleted,
        props.reqsp.filter_status,
        props.reqsp.filter_created_by,
        props.reqsp.filter_executor,
        props.reqsp.filter_supplier,
        props.reqsp.filter_created_at,
        props.reqsp.page
    ])

    useEffect(() => {
        props.addClients()
    }, [props.filter_name])

    const handleNewReqSparePart = () => {
        props.changeReqSparePartState({executor: {id: 0, name: 'Не назначен'}})
        props.changeVisibleState({statusReqSparePartEditor: true})
    }

    return (
        <div className = 'contentTab'>
            <Button
                id='newReqSparePart'
                title='+ Запрос'
                className='greenButton h31'
                onClick={handleNewReqSparePart}
                // invisible={!props.permissions.includes('create_inventory')}
            />
            <div className='row jc-sb al-itm-fe'>
                <div className='row al-itm-fe mt15'>
                    <ChooseDate
                        title='Период'
                        className='ml10 h49'
                        width='200px'
                        range={true}
                        func={date => props.changeReqSparePartState({filter_created_at: date.map(date => Math.round(date / 1000))})}
                        current_date={props.reqsp.filter_created_at}
                    />
                    <SelectFromListMany
                        id='created_by'
                        className='ml10'
                        width='200px'
                        title='Создал'
                        mainLable='Все'
                        list={props.employees}
                        checked_list={props.reqsp.filter_created_by}
                        func={list => props.selectedReqSparePart(list, 'filter_created_by')}
                        employee={true}
                    />
                    <SelectFromListMany
                        id='executor'
                        className='ml10'
                        width='200px'
                        title='Исполнитель'
                        mainLable='Все'
                        list={props.employees}
                        checked_list={props.reqsp.filter_executor}
                        func={list => props.selectedReqSparePart(list, 'filter_executor')}
                        employee={true}
                    />
                    <SelectStatuses
                        id='status'
                        className='ml10'
                        func={value => props.selectedReqSparePart(value, 'filter_status')}
                        current_list={props.reqsp.filter_status}
                        width={'240px'}
                        invisible={false}
                        range={[12, 18]}
                    />
                    <ChooseWithSearch
                        id='supplier'
                        className='ml10'
                        width='250px'
                        title='Поставщик'
                        list={props.clients}
                        current_element={props.reqsp.filter_supplier}
                        setElement={supplier => props.changeReqSparePartState({filter_supplier: supplier})}
                        filter={props.filter_name}
                        changeFilter={filter => props.changeClientState({filter_name: filter})}
                        placeholder='Введите имя'
                    />
                </div>
                <TableFields
                    id='tableFields'
                    height='185px'
                    classNameMenu='listOption'
                    list={request_spare_part_headers.filter(header => props.permissions.includes('see_buy_cost') || header.id !== 6)}
                    checked_list={props.reqsp.table_headers}
                    func={props.selectedReqSparePart}
                />
            </div>
            <RequestSparePartTable/>
            <div className='row'>
                <Paginate
                    allItems={props.reqsp.count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => props.changeReqSparePartState({page})}
                />
                <div className='ml10'>Всего - {props.reqsp.count}</div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    reqsp: state.reqsp,
    employees: state.employee.employees.filter(employee => !employee.deleted),
    clients: state.client.clients,
    filter_name: state.client.filter_name,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    addReqSparePart,
    selectedReqSparePart,
    changeReqSparePartState,
    changeClientState,
    addClients,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSpareParts)