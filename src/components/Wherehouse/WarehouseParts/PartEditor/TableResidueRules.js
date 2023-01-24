import React from 'react'
import { connect } from 'react-redux'
import Icon from '../../../general/Icon'
import {editResidueRule} from '../../../../Redux/actions/partAction'
import {changeVisibleState} from '../../../../Redux/actions'

const TableResidueRules = (props) => {

    const handleEdit = (rule) => {
        props.editResidueRule(rule)
        props.changeVisibleState({statusResidueRuleEditor: true})
    }

    return (
        <table className='mt15'>
            <thead>
                <tr>
                    <th>Склад</th>
                    <th className='w50'>Минимальное кол-во</th>
                    <th className='w50'>Необходимое кол-во</th>
                </tr>
            </thead>
            <tbody>
            {props.part.residue_rules.filter(rule => rule.min_residue || rule.necessary_amount).map(rule => (
                <tr
                    key={rule.id}
                    onDoubleClick={() => handleEdit(rule)}
                >
                    <td>
                        <div className='row'>
                            <Icon className='icon-s2' icon={rule.warehouse.branch.icon} color={rule.warehouse.branch.color}/>
                            <div className='ml5'>{rule.warehouse.title}</div>
                        </div>

                    </td>
                    <td>{rule.min_residue}</td>
                    <td>{rule.necessary_amount}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {
    editResidueRule,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableResidueRules)