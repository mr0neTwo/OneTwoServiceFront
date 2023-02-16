import React from 'react'
import {connect} from 'react-redux'

const Clients = (props) => {
    return (
        <div className='pageContent'>

            <div className='header'>
                <span className='headerTitle'>Клиенты</span>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Clients)
