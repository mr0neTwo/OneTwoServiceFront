import React from 'react'
import {connect} from 'react-redux'


import {Modal} from '../../data/data'
import PartEditor from '../Wherehouse/WarehouseParts/PartEditor/PartEditor'
import RequestSparePartEditor from "../Wherehouse/RequestSpareParts/RequestSparePartEditor";
import RegistrationEditor from "../Wherehouse/WarehouseRegistration/RegistrationEditor";
import InventoryEditor from "../Wherehouse/WarehouseInventories/InventoryEditor";


const RightModal = (props) => {

    const getModal = () => {
        switch (props.view.modalType) {

            case Modal.Type.PART:
                return <PartEditor/>

            case Modal.Type.REQUEST_SPARE_PART:
                return <RequestSparePartEditor/>

            case Modal.Type.REGISTRATION:
                return <RegistrationEditor/>

            case Modal.Type.INVENTORY:
                return <InventoryEditor/>
        }
    }

    if (!props.view.isRightModalOpen) return null

    return (
        <div className="modal">
            <div className='modal_right'>
                <div>{getModal()}</div>
            </div>

        </div>)

}

const mapStateToProps = state => ({
    view: state.view
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RightModal)