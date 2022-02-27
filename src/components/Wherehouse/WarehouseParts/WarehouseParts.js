import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { addWarehouseCategories, changeWarehouseForm} from '../../../Redux/actions/warehouseAction';
import {addParts, changePartForm, choosePartSelected} from '../../../Redux/actions/partAction'
import {setVisibleFlag} from '../../../Redux/actions';

import Button from '../../general/Button';
import WarehouseCategoryEditor from './WarehouseCategoryEditor';
import CategoryTable from './CategoryTable';
import Checkbox from '../../general/Checkbox';
import PartEditor from './PartEditor';
import PartTable from './PartTable'
import TableFields from '../../general/TableFields'
import {part_table_headers} from '../../../data/tableHeaders'

const WarehouseParts = props => {

    useEffect(() => {
        props.addWarehouseCategories()
    }, [props.warehouse.showDeleted])

    useEffect(() => {
        props.addParts()
    }, [props.part.showDeleted, props.part.page, props.warehouse.current_category])

    const handleAddCategory = () => {
        props.changeWarehouseForm(props.warehouse.current_category, 'current_parent_category')
        props.setVisibleFlag('statusWarehouseCategoryEditor', true)
    }

    const handleAddPart = () => {
        props.changeWarehouseForm(props.warehouse.current_category, 'current_parent_category')
        props.setVisibleFlag('statusPartEditor', true)
    }

    return (
        <div className = 'contentTab'>
            <div className='row al-itm-bl'>
                <div className='wmn300 overv'>
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
                <div className='ml10 w100'>
                    <div className='row jc-sb'>
                        <div className='row'>
                            <Button
                                id='btaddWP'
                                className='greenButton'
                                title='+ Товар'
                                onClick={ handleAddPart }
                                unvisible={!props.permissions.includes('create_new_part')}
                            />
                            <Checkbox
                                className='ml10'
                                label='Показать удаленные'
                                onChange={event => props.changePartForm(event.target.checked, 'showDeleted')}
                                checked={props.part.showDeleted}
                                unvisible={!props.permissions.includes('see_delete_parts')}
                            />
                        </div>
                        <TableFields
                            id='part'
                            height='185px'
                            list={part_table_headers}
                            checked_list={props.part.choosed_headers}
                            func={props.choosePartSelected}
                            field='choosed_headers'
                        />
                    </div>
                    {props.statusPartEditor ? <PartEditor/> : null}
                    <PartTable/>
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    statusWarehouseCategoryEditor: state.view.statusWarehouseCategoryEditor,
    statusPartEditor: state.view.statusPartEditor,
    warehouse: state.warehouse,
    part: state.part,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    addWarehouseCategories,
    changeWarehouseForm,
    addParts,
    choosePartSelected,
    changePartForm
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseParts)