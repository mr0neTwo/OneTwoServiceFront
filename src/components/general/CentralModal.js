import React from 'react'
import {connect} from 'react-redux'

import {Modal} from '../../data/data'
import ResidueRuleEditor from "../Wherehouse/WarehouseParts/PartEditor/ResidueRuleEditor";
import RegistrationPartEditor from "../Wherehouse/WarehouseRegistration/RegistrationPartEditor";
import WriteOfEditor from "../Wherehouse/WarehouseWriteOf/WriteOfEditor";
import PaymentCard from '../Payments/PaymentCard'
import WarehouseMovementEditor from "../Wherehouse/WarehouseMovement/WarehouseMovementEditor";
import InventoryEditorPreview from "../Wherehouse/WarehouseInventories/InventoryEditorPreview";


const CentralModal = (props) => {

    const getModal = () => {
        switch (props.view.modalCentralType) {

            case Modal.Type.RESIDUE_RULE:
                return <ResidueRuleEditor/>

            case Modal.Type.REGISTRATION_PART:
                return <RegistrationPartEditor/>

            case Modal.Type.WRITE_OFF:
                return <WriteOfEditor/>

            case Modal.Type.PAYMENT_CARD:
                return <PaymentCard/>

            case Modal.Type.WAREHOUSE_MOVEMENT:
                return <WarehouseMovementEditor/>

            case Modal.Type.INVENTORY_PREVIEW:
                return <InventoryEditorPreview/>
        }
    }

    if (!props.view.isCentralModalOpen) return null

    return (
        <div className="modal z9999">
            <div className='modal__box'>
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