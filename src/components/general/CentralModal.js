import React from 'react'
import {connect} from 'react-redux'

import {Modal} from '../../data/data'
import ResidueRuleEditor from "../Wherehouse/WarehouseParts/PartEditor/ResidueRuleEditor";
import RegistrationPartEditor from "../Wherehouse/WarehouseRegistration/RegistrationPartEditor";


const CentralModal = (props) => {

    const getModal = () => {
        switch (props.view.modalCentralType) {

            case Modal.Type.RESIDUE_RULE:
                return <ResidueRuleEditor/>

            case Modal.Type.REGISTRATION_PART:
                return <RegistrationPartEditor/>
        }
    }

    if (!props.view.isCentralModalOpen) return null

    return (
        <div className="modal">
            <div className='modal__box z9999'>
                <div>{getModal()}</div>
            </div>

        </div>
    )

}

const mapStateToProps = state => ({
    view: state.view
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CentralModal)