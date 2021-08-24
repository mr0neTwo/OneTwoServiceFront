import React from 'react'
import { connect } from 'react-redux'

import { changeSortAction, addOrdersAction } from '../../Redux/actions'


function TableHeader({data: {title, field, width, visible, employee_id}, changeSort,  addOrders, token, mainFilter}) {

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

function handleClick() {
  changeSort(field)
}


  return (
     <>
    <th className = 'tableColumnHeader'
      style = {{ minWidth: `${width}px` }}
      onClick = {handleClick}
    >
      {title}
      <span>
        {mainFilter.field_sort === field ? (mainFilter.sort === 'asc' ? '↓' : '↑') : null}
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
  token: state.data.token,
  mainFilter: state.filter.mainFilter
})

const mapDispatchToProps = {
  changeSort: changeSortAction,
  addOrders: addOrdersAction,
}

export default connect(mapStateToProps, mapDispatchToProps) (TableHeader)
