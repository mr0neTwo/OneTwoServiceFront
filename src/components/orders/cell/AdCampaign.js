import React from 'react'
import { connect } from 'react-redux'

const AdCampaign = props => {
    return (
        <td>
            <div className="tableText tableOne">
                {props.order.ad_campaign.name}
            </div>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(AdCampaign)