import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { addWarehouseCategories, changeWarehouseForm} from '../../../Redux/actions/warehouseAction';
import {setVisibleFlag} from '../../../Redux/actions';

import Button from '../../general/Button';
import WarehouseCategoryEditor from './WarehouseCategoryEditor';
import CategoryTable from './CategoryTable';

const WarehouseParts = props => {

    useEffect(() => {
        props.addWarehouseCategories()
    }, [])

    const handleAddCategory = () => {
        // props.changeWarehouseForm(props.warehouse.warehouses_categories, 'choose_parents_category')
        props.changeWarehouseForm(props.warehouse.current_category, 'parent_category_id')
        props.setVisibleFlag('statusWarehouseCategoryEditor', true)
    }

    return (
        <div className = 'contentTab'>
            <div className='row al-itm-bl'>
                <div className='w250 overv'>
                    <Button
                        id='btaddWC'
                        className='greenButton'
                        title='+ категорию'
                        onClick={ handleAddCategory }
                        unvisible={false}
                        disabled={false}
                    />
                    {props.statusWarehouseCategoryEditor ? <WarehouseCategoryEditor/> : null}
                    <CategoryTable/>
                </div>
                <div className='ml10'>
                    <Button
                        className='greenButton'
                        title='+ Товар'
                        onClick={() => console.log('click')}
                        unvisible={false}
                        disabled={false}
                    />
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    statusWarehouseCategoryEditor: state.view.statusWarehouseCategoryEditor,
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    setVisibleFlag,
    addWarehouseCategories,
    changeWarehouseForm
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseParts)