import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {setVisibleFlag} from '../../../Redux/actions';
import {changeWarehouseForm, createWarehouseCategory, resetWarehouse} from '../../../Redux/actions/warehouseAction';

import LableInput from '../../general/LableInput'
import BottomButtons from '../../general/BottomButtons'
import ChooseOfList from '../../general/ChooseOfList'

const WarehouseCategoryEditor = props => {

    const handleClose = () => {
        props.setVisibleFlag('statusWarehouseCategoryEditor', false)
        props.setVisibleFlag('inputWCategoryTitleChecked', true)
        props.resetWarehouse()
    }

    const clickHandel = event => {
        if (
            !event.path.map((el) => el.id).includes('wgategoryEditorWindow') &&
            !event.path.map((el) => el.id).includes('btaddWC')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (props.warehouse.title_category) {
            props.createWarehouseCategory()
        } else {
            props.setVisibleFlag('inputWCategoryTitleChecked', false)
        }
    }

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="wgategoryEditorWindow">
                <div className="createNewTitle">Новая категория</div>

                <div className="contentEditor">
                    <LableInput
                        className="w250 mt15"
                        title="Название категории"
                        onChange={event => props.changeWarehouseForm(event.target.value, 'title_category')}
                        value={props.warehouse.title_category}
                        checkedFlag="inputWCategoryTitleChecked"
                        checked={props.inputWCategoryTitleChecked}
                        redStar={ true }
                        disabled={props.warehouse.category_deleted}
                    />
                    <ChooseOfList
                        id='WCat'
                        className='mt15'
                        width='250px'
                        title='Родительская категория'
                        list={props.warehouse.choose_parents_category}
                        current_id={props.warehouse.parent_category_id}
                        setElement={props.changeWarehouseForm}
                        field='parent_category'
                        disabled={props.warehouse.category_deleted}
                    />
                </div>


                <BottomButtons
                    create={ handleCreate }
                    close={ handleClose }
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    warehouse: state.warehouse,
    inputWCategoryTitleChecked: state.view.inputWCategoryTitleChecked
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeWarehouseForm,
    createWarehouseCategory,
    resetWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseCategoryEditor)
