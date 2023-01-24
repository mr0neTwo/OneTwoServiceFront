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

    if (props.invisible) return <div/>

    return (
        <div className='setCustomFilter'>
            <div className="row jc-c al-itm-bl">
                <div className="jc-sb w100 m10">
                    <SelectStatuses
                        id='status'
                        className='mt15'
                        func={value => props.selectedReqSparePart(value, 'filter_status')}
                        current_list={props.reqsp.filter_status}
                        width={'100%'}
                        invisible={false}
                        range={[12, 18]}
                    />


                    <SelectFromListMany
                        id='created_by'
                        className='mt15'
                        width='100%'
                        title='Создал'
                        mainLable='Все'
                        list={props.employees}
                        checked_list={props.reqsp.filter_created_by}
                        func={list => props.selectedReqSparePart(list, 'filter_created_by')}
                        employee={true}
                    />

                </div>
                <div className="jc-sb w100 m10">
                    <ChooseWithSearch
                        id='supplier'
                        className='mt15'
                        width='100%'
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
                        className='mt15'
                        width='100%'
                        title='Исполнитель'
                        mainLable='Все'
                        list={props.employees}
                        checked_list={props.reqsp.filter_executor}
                        func={list => props.selectedReqSparePart(list, 'filter_executor')}
                        employee={true}
                    />

                </div>
                <ChooseDate
                    title='Период'
                    className='mt15 h49'
                    width='100%'
                    range={true}
                    allDate={true}
                    func={date => props.changeReqSparePartState({filter_created_at: date.map(date => Math.round(date / 1000))})}
                    current_date={props.reqsp.filter_created_at}
                />
            </div>
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