import React from 'react'
import { connect } from 'react-redux'

const Clients = (props) => {
  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут клиенты</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Clients)
