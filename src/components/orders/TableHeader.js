import React from 'react'
import {connect} from 'react-redux'

import {changeFilterState} from '../../Redux/actions/filterAction'


function TableHeader(props) {

    //  let startDrag = 0
    //  let endDrag = 0
    //  let deltaDrag = 0


    //  function handleDragStart(event) {
    //     startDrag = event.pageX


    //  }

    //  function handleDragEnd(event) {
    //     endDrag = event.pageX
    //     deltaDrag = endDrag - startDrag
    //     console.log('отрезок :', deltaDrag)
    //     const currentSize = parseInt(tableOrdersHeaders.find(header => header.field === data.field).width)
    //     resizeOrderHeader(data.field,  currentSize + deltaDrag)

    //  }


    return (
        <>
            <th
                className='tableColumnHeader'
                style={{minWidth: `${props.data.width}px`}}
                onClick={() => props.changeFilterState({
                    field_sort: props.data.field,
                    sort: props.filter.sort === 'asc' ? 'desc' : 'asc'
                })}
            >
                {props.data.title}
                <span>
        {props.filter.field_sort === props.data.field ? (props.filter.sort === 'asc' ? '↓' : '↑') : null}
      </span>
            </th>
            {/* <th
    className = 'cursorResizeTable'
    onDragStart = {handleDragStart}
    onDragEnd = {handleDragEnd}
    /> */}
        </>
    )
}

const mapStateToProps = state => ({
    filter: state.filter
})

const mapDispatchToProps = {
    changeFilterState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader)
