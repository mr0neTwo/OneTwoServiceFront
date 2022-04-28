import React from 'react'
import {connect} from 'react-redux'

import Icon from '../../general/Icon'

const Equipment = props => {
    return (
        <td>
            <div className="tableText row">
                <div>
                    <img
                        alt=''
                        className="icon_equipment"
                        src={props.order.kindof_good.icon}
                    />
                </div>
                <div>
                    <div className='noWr'>
                        {props.order.kindof_good.icon ? null : <span className="">{props.order.kindof_good.title}</span>}
                        <span className="ml5">{props.order.brand.title}</span>
                    </div>
                    <div className='noWr'>
                        <span>{props.order.subtype.title}</span>
                        <span className="orderDate ml5">{props.order.model.title}</span>
                    </div>
                </div>
            </div>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Equipment)