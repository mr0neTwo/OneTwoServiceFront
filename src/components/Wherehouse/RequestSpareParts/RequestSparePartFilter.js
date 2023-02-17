import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import ChooseDate from '../../general/calandar/ChooseDate'
import SelectFromListMany from '../../general/SelectFromListMany'
import SelectStatuses from '../../general/SelectStatuses'
import ChooseWithSearch from '../../general/ChooseWithSearch'

import {changeReqSparePartState, selectedReqSparePart} from '../../../Redux/actions/requestSparePartsAction'
import {addClients, changeClientState} from '../../../Redux/actions/clientAction'

const RequestSparePartFilter = (props) => {

    useEffect(() => {
        props.addClients()
    }, [props.filter_name])

    if (props.invisible) return null

    return (
        <div className='custom-filter'>
            <SelectStatuses
                id='status'
                func={value => props.selectedReqSparePart(value, 'filter_status')}
                func_clear={() => props.changeReqSparePartState({filter_status: []})}
                current_list={props.reqsp.filter_status}
                range={[12, 18]}
            />
            <SelectFromListMany
                id='created_by'
                title='Создал'
                mainLabel='Все'
                list={props.employees}
                checked_list={props.reqsp.filter_created_by}
                func={list => props.selectedReqSparePart(list, 'filter_created_by')}
            />
            <ChooseWithSearch
                id='supplier'
                title='Поставщик'
                list={props.clients}
                current_element={props.reqsp.filter_supplier}
                setElement={supplier => props.changeReqSparePartState({filter_supplier: supplier})}
                filter={props.filter_name}
                changeFilter={filter => props.changeClientState({filter_name: filter})}
                placeholder='Введите имя'
            />
            <SelectFromListMany
                id='executor'
                title='Исполнитель'
                mainLabel='Все'
                list={props.employees}
                checked_list={props.reqsp.filter_executor}
                func={list => props.selectedReqSparePart(list, 'filter_executor')}
            />
            <ChooseDate
                title='Период'
                func={date => props.changeReqSparePartState({filter_created_at: date.map(date => Math.round(date / 1000))})}
                current_date={props.reqsp.filter_created_at}
                range={true}
                allDate={true}
                time={false}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    reqsp: state.reqsp,
    clients: state.client.clients,
    filter_name: state.client.filter_name,
    employees: state.employee.employees.filter(employee => !employee.deleted),
})

const mapDispatchToProps = {
    selectedReqSparePart,
    changeReqSparePartState,
    changeClientState,
    addClients
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSparePartFilter)