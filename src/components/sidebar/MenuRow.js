import React from 'react'
import { Link } from 'react-router-dom'

function MenuRow({ row }) {
  return (
    <Link className="menuRow" to={row.url}>
      {row.image === 'task' ? (
        <div className="taskNumber">
          <span className="taskNumber1">8</span>
        </div>
      ) : (
        <svg className="sidebarIcon">
          <path fillRule="evenodd" clipRule="evenodd" d={row.image}></path>
        </svg>
      )}
      <span className="didebarItemsText">{row.title}</span>
    </Link>
  )
}

export default MenuRow
