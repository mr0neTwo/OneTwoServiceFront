import React from 'react'
import { connect } from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'

import Button from '../../../general/Button'
import TableResidueRules from './TableResidueRules'
import ResidueRuleEditor from './ResidueRuleEditor'

const EditResidueRules = (props) => {
    return (
        <div className=''>
            <h3>Контроль остатков</h3>
            <Button
                className='greenButton mt15'
                title='+ Правило'
                onClick={() => props.changeVisibleState({statusResidueRuleEditor: true})}
            />
            {props.residue_rules.filter(rule => rule.min_residue || rule.necessary_amount).length ?
                <TableResidueRules/>
                :
                <div className='tac pd10'>Пока не создано ни одного првила</div>
            }
            {props.statusResidueRuleEditor ? <ResidueRuleEditor/> : null}
            <div className='sip_line mt5'/>
        </div>
    )
}

const mapStateToProps = state => ({
    residue_rules: state.part.residue_rules,
    statusResidueRuleEditor: state.view.statusResidueRuleEditor
})

const mapDispatchToProps = {
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(EditResidueRules)