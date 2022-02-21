import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import { setVisibleFlag } from '../../../../Redux/actions'
import {changeWarehouseForm, resetWarehouse} from "../../../../Redux/actions/warehouseAction";

import BottomButtons from '../../../general/BottomButtons'
import Tabs from "../../../general/Tabs";
import WarehouseInfo from "./WarehouseInfo";


const WarehouseEditor = props => {

    const handleClose = () => {
        props.resetWarehouse()
        props.setVisibleFlag('statusWarehouseEditor', false)
        props.setVisibleFlag('inputWarehouseTitleChecked', true)
    }

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('warehouseEditorWindow')) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    // const handleCreateEquipment = () => {
    //     if (props.book.title) {
    //         props.createBookElement()
    //         props.setVisibleFlag('statusWarehouseEditor', false)
    //     } else {
    //         props.setVisibleFlag('inputBookTitleChecked', false)
    //     }
    // }

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="warehouseEditorWindow">
                <div className="createNewTitle">Новый склад</div>

                <div className="contentEditor">

                    <Tabs
                        className='mt15'
                        list={['Общие', 'Доступ']}
                        tab={props.tabs}
                        func={props.changeWarehouseForm}
                    />
                    {props.tabs === 0 ? <WarehouseInfo/> : null}
                    {props.tabs === 1 ? null : null}




                </div>


                <BottomButtons
                    // create={handleCreateEquipment}
                    close={ handleClose }
                />
            </div>
        </div>
    )
}

WarehouseEditor.propTypes = {
    tabs: PropTypes.number
}

const mapStateToProps = state => ({
    tabs: state.warehouse.tabs
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeWarehouseForm,
    resetWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseEditor)
