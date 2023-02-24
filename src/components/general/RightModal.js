import React from 'react'
import {connect} from 'react-redux'


import {Modal} from '../../data/data'
import PartEditor from '../Wherehouse/WarehouseParts/PartEditor/PartEditor'
import RequestSparePartEditor from "../Wherehouse/RequestSpareParts/RequestSparePartEditor";
import RegistrationEditor from "../Wherehouse/WarehouseRegistration/RegistrationEditor";


const RightModal = (props) => {

    const getModal = () => {
        switch (props.view.modalType) {

            case Modal.Type.PART:
                return <PartEditor/>

            case Modal.Type.REQUEST_SPARE_PART:
                return <RequestSparePartEditor/>

            case Modal.Type.REGISTRATION:
                return <RegistrationEditor/>
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