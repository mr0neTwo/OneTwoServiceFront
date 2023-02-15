import React from 'react'
import {connect} from 'react-redux'
// import TableClients from './TableClients'

const Clients = (props) => {
    return (
        <div className='pageContent'>

            <div className='header'>
                <span className='headerTitle'>Клиенты</span>
            </div>
            {/*<TableClients/>*/}
        </div>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Clients)
