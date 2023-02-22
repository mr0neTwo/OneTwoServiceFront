import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {addReqSparePart, changeReqSparePartState} from '../../../Redux/actions/requestSparePartsAction'

import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'

import RequestSparePartTable from './RequestSparePartTable'
import Button from '../../general/Button'
import {changeVisibleState} from '../../../Redux/actions'
import {ICON} from '../../../data/icons'
import RequestSparePartFilter from './RequestSparePartFilter'
import {Modal} from "../../../data/data";

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
        props.changeVisibleState({isRightModalOpen: true, modalType: Modal.Type.REQUEST_SPARE_PART})
    }

    const table_headers = props.reqsp.table_headers.filter(header => props.permissions.includes('see_buy_cost') || header.id !== 6)

    return (
        <div className='box'>
            <div className='row jc-sb'>
                <div className='two-buttons'>
                    <Button
                        id='RequestSparePartEditor'
                        size='med'
                        type='create'
                        title='Запрос'
                        onClick={handleNewReqSparePart}
                    />
                    <Button
                        size='med'
                        type='tertiary'
                        title='Фильтр'
                        onClick={() => setShowFilet(!showFilter)}
                        icon={ICON.FILTER}
                    />
                </div>
                <TableFields
                    id='requests'
                    list={table_headers}
                    func={table_headers => props.changeReqSparePartState({table_headers})}
                />
            </div>
            <RequestSparePartFilter invisible={showFilter}/>
            <RequestSparePartTable/>
            <Paginate
                allItems={props.reqsp.count}
                onPage={50}
                count={2}
                count_start_end={2}
                navigation={true}
                func={page => props.changeReqSparePartState({page})}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    reqsp: state.reqsp,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    addReqSparePart,
    changeReqSparePartState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSpareParts)