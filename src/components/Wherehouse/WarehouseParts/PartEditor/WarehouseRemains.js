import React from 'react'
import { connect } from 'react-redux'
import Icon from '../../../general/Icon'

const WarehouseRemains = (props) => {
    return (
        <div className=''>
            <table>
                <thead>
                    <tr>
                        <th className='w30'/>
                        <th className='w100'>Склад</th>
                        <th className='w70'>Количество</th>
                    </tr>
                </thead>
                <tbody>
                {props.part.warehouse_remains.map((remain, idx) => (
                    <tr key={idx}>
                        <td>
                            <Icon className='icon-s2' icon={remain.warehouse.branch.icon} color={remain.warehouse.branch.color}/>
                        </td>
                        <td>{remain.warehouse.title}</td>
                        <td className='tac'>{remain.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseRemains)