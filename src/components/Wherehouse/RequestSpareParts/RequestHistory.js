import React from 'react'
import { connect } from 'react-redux'

import {selectedReqSparePart} from '../../../Redux/actions/requestSparePartsAction'
import {request_event_types} from '../../../data/data'
import {icon_filter} from '../../../data/icons'

import EditorHistory from '../../general/EditorHistory'
import TableFields from '../../general/TableFields'
import AddComment from './AddComment'

const RequestHistory = (props) => {
    return (
        <div className = 'orderHistory'>
            <div className='jc-c'>
                <TableFields
                    id='requestEvents'
                    height='200px'
                    classNameMenu='aventFilterMenu'
                    list={request_event_types}
                    checked_list={props.reqsp.event_filter}
                    func={props.selectedReqSparePart}
                    field='event_filter'
                    icon={icon_filter}
                />
            </div>
            <EditorHistory
                events={props.reqsp.events}
                event_filter={props.reqsp.event_filter}
            />
            <AddComment/>
        </div>
    )
}

const mapStateToProps = state => ({
    reqsp: state.reqsp
})

const mapDispatchToProps = {
    selectedReqSparePart
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestHistory)