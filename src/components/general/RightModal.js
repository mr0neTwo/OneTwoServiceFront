import React from 'react'
import {connect} from 'react-redux'


import {Modal} from '../../data/data'
import PartEditor from '../Wherehouse/WarehouseParts/PartEditor/PartEditor'


const RightModal = (props) => {

    const getModal = () => {
        switch (props.view.modalType) {
            case Modal.Type.PART:
                return <PartEditor/>
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