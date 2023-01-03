import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {addWarehouseCategories, changeWarehouseForm} from '../../../Redux/actions/warehouseAction';
import {addParts, changePartState, choosePartSelected} from '../../../Redux/actions/partAction'
import {changeVisibleState, setVisibleFlag} from '../../../Redux/actions';
import {part_table_headers} from '../../../data/tableHeaders'

import Button from '../../general/Button';
import WarehouseCategoryEditor from './WarehouseCategoryEditor';
import CategoryTable from './CategoryTable';
import Checkbox from '../../general/Checkbox';
import PartTable from './PartTable'
import TableFields from '../../general/TableFields'
import Paginate from '../../general/Paginate'
import WarehouseSearch from '../Search'

const WarehouseParts = props => {

    useEffect(() => {
        props.addWarehouseCategories()
    }, [props.warehouse.showDeleted])

    useEffect(() => {
        props.addParts()
    }, [props.part.showDeleted, props.part.page, props.warehouse.current_category, props.part.filter_name])

    const handleAddCategory = () => {
        props.changeWarehouseForm(props.warehouse.current_category, 'current_parent_category')
        props.setVisibleFlag('statusWarehouseCategoryEditor', true)
    }

    const handleAddPart = () => {
        props.changeWarehouseForm(props.warehouse.current_category, 'current_parent_category')
        props.changePartState({warehouse_category: props.warehouse.warehouse_categories})
        props.changeVisibleState({statusPartEditor: true})
    }

    return (
        <>
            <div className='row al-itm-bl mt15'>
                <div className='wp25 '>
                    <div className='row al-itm-ct'>
                        <Button
                            id='btaddWC'
                            className='greenButton'
                            title='+ категорию'
                            onClick={ handleAddCategory }
                            invisible={!props.permissions.includes('create_warehouse_categories')}
                        />
                        <Checkbox
                            className='ml10'
                            label='Показать удаленные'
                            onChange={event => props.changeWarehouseForm(event.target.checked, 'showDeleted')}
                            checked={props.warehouse.showDeleted}
                            invisible={!props.permissions.includes('see_deleted_warehouse_categories')}
                        />
                    </div>
                    {props.statusWarehouseCategoryEditor ? <WarehouseCategoryEditor/> : null}
                    <CategoryTable/>
                </div>
                <div className='ml10 wp75 overv'>
                    <div className='row jc-sb'>
                        <div className='row al-itm-ct'>
                            <Button
                                id='btaddWP'
                                className='greenButton'
                                title='+ Товар'
                                onClick={ handleAddPart }
                                invisible={!props.permissions.includes('create_new_part')}
                            />
                            <Checkbox
                                className='ml10'
                                label='Показать удаленные'
                                onChange={event => props.changePartState({showDeleted: event.target.checked})}
                                checked={props.part.showDeleted}
                                invisible={!props.permissions.includes('see_delete_parts')}
                            />
                            <WarehouseSearch
                                func={search => props.changePartState({filter_name: search})}
                            />
                        </div>
                        <TableFields
                            id='part'
                            height='185px'
                            classNameMenu='listOption'
                            list={part_table_headers}
                            checked_list={props.part.choosed_headers}
                            func={props.choosePartSelected}
                            field='choosed_headers'
                        />
                    </div>
                    <PartTable/>
                    <div className='row'>
                        <Paginate
                            allItems={props.part.count_parts}
                            onPage={50}
                            count={2}
                            count_start_end={0}
                            navigation={true}
                            func={page => props.changePartState({page})}
                        />
                        <div className='ml10'>Всего - {props.part.count_parts}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    statusWarehouseCategoryEditor: state.view.statusWarehouseCategoryEditor,
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
    changePartState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseParts)