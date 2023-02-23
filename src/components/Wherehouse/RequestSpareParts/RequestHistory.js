import React from 'react'
import { connect } from 'react-redux'

import {changeRegistrationState} from "../../../Redux/actions/registrationAction"


import EditorHistory from '../../general/EditorHistory'
import TableFields from '../../general/TableFields'
import AddComment from './AddComment'

const RequestHistory = (props) => {
    return (
        <div className = 'history-order-editor'>
            <div className='history-order-editor__buttons'>
                <TableFields
                    id='requestEvents'
                    list={props.reqsp.event_filter}
                    func={event_filter => props.changeRegistrationState({event_filter})}
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
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestHistory)