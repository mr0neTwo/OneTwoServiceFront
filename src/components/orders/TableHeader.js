import React from 'react'
import { connect } from 'react-redux'

import { ordersSort, resizeOrderHeader } from '../../Redux/actions'

function TableHeader({data, sortOrderTable, sortFieldOrderTable, ordersSort, tableOrdersHeaders, resizeOrderHeader}) {

   let startDrag = 0
   let endDrag = 0
   let deltaDrag = 0
   
   
   
   function handleDragStart(event) {
      startDrag = event.pageX
      
      
   }

   function handleDragEnd(event) {
      endDrag = event.pageX
      deltaDrag = endDrag - startDrag 
      console.log('отрезок :', deltaDrag)
      const currentSize = parseInt(tableOrdersHeaders.find(header => header.field === data.field).width)
      resizeOrderHeader(data.field,  currentSize + deltaDrag)

   }




  return (
     <>
    <th className = 'tableColumnHeader'
      style = {{ minWidth: data.width }}
      onClick = {() => {
        ordersSort(data.field)
      }}
    >
      {data.title}
      <span>
        {sortFieldOrderTable === data.field ? (sortOrderTable === 'asc' ? '↓' : '↑') : null}
      </span>
    </th>
    <th 
    className = 'cursorResizeTable'
    onDragStart = {handleDragStart}
    onDragEnd = {handleDragEnd}
    />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    sortOrderTable: state.data.sortOrderTable,
    sortFieldOrderTable: state.data.sortFieldOrderTable,
    tableOrdersHeaders: state.data.tableOrdersHeaders
  }
}


export default connect(mapStateToProps, { ordersSort, resizeOrderHeader })(TableHeader)
