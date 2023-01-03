import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {addReqSparePart, changeReqSparePartState, selectedReqSparePart} from '../../../Redux/actions/requestSparePartsAction'
import {request_spare_part_headers} from '../../../data/tableHeaders'

import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'

import RequestSparePartTable from './RequestSparePartTable'
import Button from '../../general/Button'
import {changeVisibleState} from '../../../Redux/actions'
import {icon_filter} from '../../../data/icons'
import RequestSparePartFilter from './RequestSparePartFilter'

const RequestSpareParts = props => {

    const [showFilter, setShowFilet] =  useState(true)

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

    const handleNewReqSparePart = () => {
        props.changeReqSparePartState({executor: {id: 0, name: 'Не назначен'}})
        props.changeVisibleState({statusReqSparePartEditor: true})
    }

    return (
        <>
            <div className='row jc-sb al-itm-fs mt15'>
                <div className='row'>
                    <Button
                        id='newReqSparePart'
                        title='+ Запрос'
                        className='greenButton h31'
                        onClick={handleNewReqSparePart}
                    />
                    <Button
                        className='customFilter ml15'
                        title='Фильтр'
                        onClick={() => setShowFilet(!showFilter)}
                        icon={icon_filter}
                        iconClassName='icon-s2'
                        iconColor='282e33'
                    />
                </div>
                <TableFields
                    id='tableFields'
                    className='h31'
                    height='185px'
                    classNameMenu='listOption'
                    list={request_spare_part_headers.filter(header => props.permissions.includes('see_buy_cost') || header.id !== 6)}
                    checked_list={props.reqsp.table_headers}
                    func={props.selectedReqSparePart}
                />
            </div>
            <RequestSparePartFilter invisible={showFilter}/>
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
        </>
    )
}

const mapStateToProps = state => ({
    reqsp: state.reqsp,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    addReqSparePart,
    selectedReqSparePart,
    changeReqSparePartState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSpareParts)