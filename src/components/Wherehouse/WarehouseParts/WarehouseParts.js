import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { addWarehouseCategories, changeWarehouseForm} from '../../../Redux/actions/warehouseAction';
import {setVisibleFlag} from '../../../Redux/actions';

import Button from '../../general/Button';
import WarehouseCategoryEditor from './WarehouseCategoryEditor';
import CategoryTable from './CategoryTable';
import Checkbox from '../../general/Checkbox';

const WarehouseParts = props => {

    useEffect(() => {
        props.addWarehouseCategories()
    }, [props.warehouse.showDeleted])

    const handleAddCategory = () => {
        props.changeWarehouseForm(props.warehouse.current_category, 'current_parent_category')
        props.setVisibleFlag('statusWarehouseCategoryEditor', true)
    }

    return (
        <div className = 'contentTab'>
            <div className='row al-itm-bl'>
                <div className='w300 overv'>
                    <div className='row'>
                        <Button
                            id='btaddWC'
                            className='greenButton'
                            title='+ категорию'
                            onClick={ handleAddCategory }
                            unvisible={!props.permissions.includes('create_warehouse_categories')}
                        />
                        <Checkbox
                            className='ml10'
                            label='Показать удаленные'
                            onChange={event => props.changeWarehouseForm(event.target.checked, 'showDeleted')}
                            checked={props.warehouse.showDeleted}
                            unvisible={!props.permissions.includes('see_deleted_warehouse_categories')}
                        />
                    </div>
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
    warehouse: state.warehouse,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    addWarehouseCategories,
    changeWarehouseForm
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseParts)