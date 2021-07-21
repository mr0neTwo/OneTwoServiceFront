import React from 'react'


function TableHeader({data, onSort, sortField, sort}) {

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
    <th className = 'tableColumnHeader'
      style = {{ minWidth: data.width }}
      onClick = {() => {onSort(data.field)}}
    >
      {data.title}
      <span>
        {sortField.current === data.field ? (sort.current === 'asc' ? '↓' : '↑') : null}
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




export default TableHeader
