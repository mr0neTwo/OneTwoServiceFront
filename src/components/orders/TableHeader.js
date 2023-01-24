import React, {useState} from 'react'
import {connect} from 'react-redux'

import {changeFilterState} from '../../Redux/actions/filterAction'
import {changeOrderField, changeOrderState, reorderOrderField} from '../../Redux/actions/orderActions'


function TableHeader(props) {

    const [columnWidth, setColumnWidth] = useState(props.data.width)

    const mouseMove = (event) => {
        const deltaDrag = event.pageX - props.order.position_cursor
        if (deltaDrag) setColumnWidth(columnWidth + deltaDrag)
    }

    const mouseUp = (event) => {
        const deltaDrag = event.pageX - props.order.position_cursor
        setColumnWidth(columnWidth + deltaDrag)
        props.changeOrderField(props.data.id, 'width', columnWidth + deltaDrag)
        window.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseUp)
    }

    const handleDragStart = event => {
        props.changeOrderState({position_cursor: event.pageX})
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const handleEndDrag = () => {
        props.reorderOrderField(props.data.id, props.order.position_over)
        props.changeOrderState({position_over: null})
    }
    const handleDragOver = (order_position) => {
        if (props.order.position_over !== order_position) {
            props.changeOrderState({position_over: order_position})
        }
    }

    return (
        <th
            className='tableColumnHeader'
            style={{minWidth: `${columnWidth}px`}}
        >
            <div className='row'>

                <div
                    className='ml5 w100 '
                    onClick={() => props.changeFilterState({
                        field_sort: props.data.field,
                        sort: props.filter.sort === 'asc' ? 'desc' : 'asc'
                    })}
                    draggable
                    onDragEnd={handleEndDrag}
                >
                    {props.data.title}
                    <span>
                        {props.filter.field_sort === props.data.field ? (props.filter.sort === 'asc' ? '↓' : '↑') : null}
                    </span>
                </div>
                <div
                    style={{height: '40px'}}
                    className='curResize'
                    onMouseDown={handleDragStart}
                />
                <div
                    style={{display: props.order.position_over === props.data.order ? 'block' : 'none'}}
                    className='dragOver'
                />
                <div
                    className='overArea'
                    onDragOver={() => handleDragOver(props.data.order)}
                />
            </div>

        </th>

    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    order: state.order
})

const mapDispatchToProps = {
    changeFilterState,
    changeOrderField,
    changeOrderState,
    reorderOrderField
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader)
