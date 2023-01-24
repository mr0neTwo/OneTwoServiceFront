import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {changeStatus} from '../../../../Redux/actions/requestSparePartsAction'

const Status = props => {

    const [listVisible, setVisibleList] = useState(false)

    const clickHandel = event => {
        if (!event.composedPath().map(el => el.id).includes(`status_${props.status.id * (props.request_spare_part_id + 1)}`)) {
            if (listVisible) {
                setVisibleList(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const statuses = props.statuses.filter(status => [13, 14, 15, 16, 17, 18].indexOf(status.group) !== -1)

    const handleSetStatus = (status) => {
        props.changeStatus(status.id, props.request_spare_part_id)
        setVisibleList(false)
    }

    return (
        <div id={`status_${props.status.id * (props.edit + 1)}`}>
            <div className="orderStatus">
                <button
                    className="statusButtom"
                    type="button"
                    style={{backgroundColor: props.status.color}}
                    onClick={() => setVisibleList(!listVisible)}
                >
                    {props.status.name}
                    <span className="statusSeparate"> | &#6662;</span>
                </button>
                {listVisible ?
                    <div className='statusList'>
                        {statuses.map(status => (
                                <li
                                    key={status.id}
                                    className="statusListRow fs14"
                                    style={{backgroundColor: status.color}}
                                    onClick={() => handleSetStatus(status)}
                                >
                                    {status.name}
                                </li>
                            )
                        )}
                    </div> : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    statuses: state.data.status
})

const mapDispatchToProps = {
    changeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Status)