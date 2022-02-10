import React from 'react'
import { connect } from 'react-redux'


import { changeSortAction } from '../../Redux/actions'


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
    <th className = 'tableColumnHeader'
      style = {{ minWidth: `${props.data.width}px` }}
      onClick = {() => props.changeSort(props.data.field)}
    >
      {props.data.title}
      <span>
        {props.mainFilter.field_sort === props.data.field ? (props.mainFilter.sort === 'asc' ? '↓' : '↑') : null}
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
  mainFilter: state.filter.mainFilter
})

const mapDispatchToProps = {
  changeSort: changeSortAction,
}

export default connect(mapStateToProps, mapDispatchToProps) (TableHeader)
