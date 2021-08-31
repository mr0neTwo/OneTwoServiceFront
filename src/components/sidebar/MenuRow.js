import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { changeStatusMenuRow } from '../../Redux/actions'


function MenuRow(props) {
  return (
    <Link 
    className="menuRow" 
    to={props.row.url}
    style={{backgroundColor: props.menuRows.find(row => row.id === props.row.id).active ? '#53585c' : '#282e33'}}
    onClick={() => props.changeStatusMenuRow(props.row.id)}
    >
      {props.row.image === 'task' ? (
        <div className="taskNumber">
          <span className="taskNumber1">8</span>
        </div>
      ) : (
        <svg className="sidebarIcon">
          <path fillRule="evenodd" clipRule="evenodd" d={props.row.image}></path>
        </svg>
      )}
      <span className="didebarItemsText">{props.row.title}</span>
    </Link>
  )
}

const mapStateToProps = state => ({
  menuRows: state.data.menuRows
})

const mapDispatchToProps = {
  changeStatusMenuRow
}


export default connect(mapStateToProps, mapDispatchToProps) (MenuRow)
