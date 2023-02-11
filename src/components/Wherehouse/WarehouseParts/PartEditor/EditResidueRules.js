import React from 'react'
import { connect } from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'

import Button from '../../../general/Button'
import TableResidueRules from './TableResidueRules'
import {Modal} from "../../../../data/data";

const EditResidueRules = (props) => {
    return (
        <div className='modal__block-forms'>
            <h5>Контроль остатков</h5>
            <Button
                id='ResidueRuleEditor'
                size='med'
                type='create'
                title='Правило'
                onClick={() => props.changeVisibleState({
                    isCentralModalOpen: true,
                    modalCentralType: Modal.Type.RESIDUE_RULE
                })}
            />
            <TableResidueRules/>
        </div>
    )
}

const mapStateToProps = state => ({
    residue_rules: state.part.residue_rules,
    view: state.view
})

const mapDispatchToProps = {
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(EditResidueRules)