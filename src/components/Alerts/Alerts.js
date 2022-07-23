import React from 'react'
import { connect } from 'react-redux'
import Alert from './Alert'

const Alerts = (props) => {
    return (
        <div className='alertAria'>
            {props.alerts.length ? props.alerts.map(alert =>(
                <Alert text={alert.text} type={alert.type} key={alert.id}/>
            )) : null}
        </div>
    )
}

const mapStateToProps = state => ({
    alerts: state.data.alerts
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)