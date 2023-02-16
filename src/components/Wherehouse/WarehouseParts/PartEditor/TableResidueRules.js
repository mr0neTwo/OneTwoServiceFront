import React from 'react'
import { connect } from 'react-redux'

import {editResidueRule} from '../../../../Redux/actions/partAction'
import {changeVisibleState} from '../../../../Redux/actions'
import IconTitle from "../../../general/cell/IconTitle";
import Data from "../../../general/cell/Data";

const TableResidueRules = (props) => {

    const rules = props.part.residue_rules.filter(rule => rule.min_residue || rule.necessary_amount)

    const isData = rules.length

    if(!isData) return  <div className='empty_table'>Пока не создано ни одного првила</div>

    return (
        <table>
            <thead>
                <tr>
                    <th className='th'>Склад</th>
                    <th className='th th_w60'>Минимальное кол-во</th>
                    <th className='th th_w60'>Необходимое кол-во</th>
                </tr>
            </thead>
            <tbody>
            {rules.map(rule => (
                <tr
                    key={rule.id}
                    onDoubleClick={() => props.editResidueRule(rule)}
                >
                    <IconTitle
                        title={rule.warehouse.title}
                        icon={rule.warehouse.branch.icon}
                        color={rule.warehouse.branch.color}
                    />
                    <Data data={rule.min_residue}/>
                    <Data data={rule.necessary_amount}/>
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