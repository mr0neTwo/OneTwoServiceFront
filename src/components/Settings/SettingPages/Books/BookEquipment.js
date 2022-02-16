import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, editEquipment} from '../../../../Redux/actions'
import { changeBookForm, addEquipmentType, addEquipmentBrand } from '../../../../Redux/actions/bookActions'
import { addEquipmentSubtype, addEquipmentModel, resetBookEquipment } from '../../../../Redux/actions/bookActions'
import EquipmentEditor from './EquipmentEditor'
import Checkbox from '../../../general/Checkbox'
import Button from '../../../general/Button'
import Paginate from '../../../general/Paginate'
import SearchInput from '../../../general/SearchInput'

const BookEquipment = (props) => {

  const [showDeleted, setShowDeteled] = useState(false)


  useEffect(() => {
    props.changeBookForm('', 'filter_type')
    props.changeBookForm('', 'filter_brand')
    props.changeBookForm('', 'filter_subtype')
    props.changeBookForm('', 'filter_model')
  }, [])

  useEffect(() => {
    props.addEquipmentType()
  }, [props.book.filter_type, props.book.page_type])

  useEffect(() => {
    props.addEquipmentBrand()
  }, [props.book.equipment_type, props.book.filter_brand, props.book.page_brand])

  useEffect(() => {
    props.addEquipmentSubtype()
  }, [props.book.equipment_brand, props.book.filter_subtype, props.book.page_subtype])

  useEffect(() => {
    props.addEquipmentModel()
  }, [props.book.equipment_subtype, props.book.filter_model, props.book.page_model])

  const addType = () => {
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(0, 'type')
    props.resetBookEquipment()
    props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
  }

  const addBrand = () => {
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(1, 'type')
    props.resetBookEquipment()
    props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
    props.changeBookForm(props.equipment_types, 'choose_list')
    props.changeBookForm(props.book.equipment_type.id, 'parent_id')
  }

  const addSubtype = () => {
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(2, 'type')
    props.resetBookEquipment()
    props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
    props.changeBookForm(props.equipment_brands, 'choose_list')
    props.changeBookForm(props.book.equipment_brand.id, 'parent_id')
  }

  const addModel = () => {
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(3, 'type')
    props.resetBookEquipment()
    props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
    props.changeBookForm(props.equipment_subtypes, 'choose_list')
    props.changeBookForm(props.book.equipment_subtype.id, 'parent_id')
  }
 
  const chooseType = (equipment) => {
    props.changeBookForm(equipment, 'equipment_type')
    props.changeBookForm({}, 'equipment_brand')
    props.changeBookForm({}, 'equipment_subtype')
    props.changeBookForm({}, 'equipment_model')
  }

  const chooseBrand = (brand) => {
    props.changeBookForm(brand, 'equipment_brand')
    props.changeBookForm(0, 'equipment_subtype')
    props.changeBookForm(0, 'equipment_model')
  }

  const chooseSubtype = (subtype) => {
    props.changeBookForm(subtype, 'equipment_subtype')
    props.changeBookForm(0, 'equipment_model')
  }

  const chooseModel = (model) => {
    props.changeBookForm(model, 'equipment_model')
  }

  const editType = (equipment) => {
    props.editEquipment(equipment)
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(0, 'type')
  }

  const editBrand = (brand) => {
    props.editEquipment(brand)
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(0, 'equipment_brand')
    props.changeBookForm(1, 'type')
    props.changeBookForm(props.equipment_types, 'choose_list')
    props.changeBookForm(props.book.equipment_type.id, 'parent_id')
  }
  
  const editSubtype = (subtype) => {
    props.editEquipment(subtype)
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(0, 'equipment_subtype')
    props.changeBookForm(2, 'type')
    props.changeBookForm(props.equipment_brands, 'choose_list')
    props.changeBookForm(props.book.equipment_brand.id, 'parent_id')
  }

  const editModel = (model) => {
    props.editEquipment(model)
    props.setVisibleFlag('statusEquipmentEditor', true)
    props.changeBookForm(0, 'equipment_model')
    props.changeBookForm(3, 'type')
    props.changeBookForm(props.equipment_subtypes, 'choose_list')
    props.changeBookForm(props.book.equipment_subtype.id, 'parent_id')
  }

  const searchType = (value) => {
    props.changeBookForm(1, 'page_type')
    props.changeBookForm(value, 'filter_type')
  }

  const searchBrand = (value) => {
    props.changeBookForm(1, 'page_brand')
    props.changeBookForm(value, 'filter_brand')
  }

  const searchSubtype = (value) => {
    props.changeBookForm(1, 'page_subtype')
    props.changeBookForm(value, 'filter_subtype')
  }

  const searchModel = (value) => {
    props.changeBookForm(1, 'page_model')
    props.changeBookForm(value, 'filter_model')
  }

  const isTypeChoosed = !!Object.values(props.book.equipment_type).length
  const isBrandChoosed = !!Object.values(props.book.equipment_brand).length
  const isSubtypeChoosed = !!Object.values(props.book.equipment_subtype).length

  return (
    <div className="contentTab">
      <h4 className="mt15">Изделия</h4>
      <p>Многоуровневый справочник изделий, которые компания принимает на обслуживание</p>
      
      {props.permissions.includes('setting_see_equipment') ? 
      <Checkbox
        className="mt15"
        label="Показать удаленные"
        onChange={(event) => setShowDeteled(event.target.checked)}
        checked={showDeleted}
      /> : null}

      <div className="bookEquipment mt15">
        <div className="columnEquipment">
          <Button
            className='whiteButton mwmc'
            title='+ Группа'
            onClick={ addType }
          />
          <div className="thead">Группа</div>
          <SearchInput
             onChange={event => searchType(event.target.value)}
             value={props.book.filter_type}
          />
          <div className="tbody">
            {props.equipment_types.filter(equipment => showDeleted || !equipment.deleted).map(equipment => (
                <div
                  key={equipment.id}
                  className={`row tr 
                     ${props.book.equipment_type.id === equipment.id ? 'rowChoosed' : null} 
                     ${equipment.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() => chooseType(equipment)}
                  onDoubleClick={() => editType(equipment)}
                >
                  <img src={equipment.icon} className="icon_equipment" />
                  <div className="td">{equipment.title}</div>
                </div>
              ))}
          </div>
          <Paginate
            allItems={props.equipment_type_count}
            onPage={50}
            count={2}
            count_start_end={0}
            navigation={true}
            func={page => props.changeBookForm(page, 'page_type')}
          />
          <div className="tr">Всего - {props.equipment_type_count}</div>
        </div>

        <div className="columnEquipment">
          <Button
            className='whiteButton mwmc'
            title='+ Бренд'
            onClick={isTypeChoosed ? addBrand : null}
          />  
          <div className="thead">Бренд</div>
          <SearchInput
             onChange={event => searchBrand(event.target.value)}
             value={props.book.filter_brand}
          />
          <div className="tbody">
            {isTypeChoosed ? (
              props.equipment_brands.filter(brand => showDeleted || !brand.deleted).map(brand => (
                <div
                  key={brand.id}
                  className={`row tr 
                     ${props.book.equipment_brand.id === brand.id ? 'rowChoosed' : null}
                     ${brand.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() => chooseBrand(brand)}
                  onDoubleClick={() => editBrand(brand)}
                >
                  <div className="td">{brand.title}</div>
                </div>
              ))
            ) : (
              <div className="clPage">
                <div className="tempContainer">Выберете группу</div>
              </div>
            )}
          </div>
          <Paginate
            allItems={isTypeChoosed ? props.equipment_brand_count : 0}
            onPage={50}
            count={2}
            count_start_end={0}
            navigation={true}
            func={page => props.changeBookForm(page, 'page_brand')}
          />
          <div className="tr">Всего - {isTypeChoosed ? props.equipment_brand_count : 0}</div>
        </div>

        <div className="columnEquipment">
          <Button
            className='whiteButton mwmc'
            title='+ Модуль / Серия'
            onClick={isBrandChoosed ?  addSubtype : null}
          />
          <div className="thead">Модуль / Серия</div>
          <SearchInput
             onChange={event => searchSubtype(event.target.value)}
             value={props.book.filter_subtype}
          />
          <div className="tbody">
            {isBrandChoosed ? (
              props.equipment_subtypes.filter(subtype => showDeleted || !subtype.deleted).map(subtype => (
                <div
                  key={subtype.id}
                  className={`row tr 
                     ${props.book.equipment_subtype.id === subtype.id ? 'rowChoosed' : null}
                     ${subtype.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() => chooseSubtype(subtype)}
                  onDoubleClick={() => editSubtype(subtype)}
                >
                   <img src={subtype.url} className='miniImg'/>
                  <div className="td">{subtype.title}</div>
                  {/* <span>></span> */}
                </div>
              ))
            ) : (
              <div className="clPage">
                <div className="tempContainer">Выберете бренд</div>
              </div>
            )}
          </div>
          <Paginate
            allItems={isBrandChoosed ? props.equipment_subtype_count : 0}
            onPage={50}
            count={2}
            count_start_end={0}
            navigation={true}
            func={page => props.changeBookForm(page, 'page_subtype')}
          />
          <div className="tr">Всего - {isBrandChoosed ? props.equipment_subtype_count : 0}</div>
        </div>

        <div className="columnEquipment">
          <Button
            className='whiteButton mwmc'
            title='+ Модель'
            onClick={isSubtypeChoosed ? addModel : null}
          />
          <div className="thead">Модель</div>
          <SearchInput
             onChange={event => searchModel(event.target.value)}
             value={props.book.filter_model}
          />
          <div className="tbody">
            {isSubtypeChoosed ? (
              props.equipment_models.filter(model => showDeleted || !model.deleted).map((model) => (
                <div
                  key={model.id}
                  className={`row tr 
                     ${props.book.equipment_model.id === model.id ? 'rowChoosed' : null}
                     ${model.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() => chooseModel(model)}
                  onDoubleClick={() => editModel(model)}
                >
                  <div className="td">{model.title}</div>
                  {/* <span>></span> */}
                </div>
              ))
            ) : (
              <div className="clPage">
                <div className="tempContainer">Выберете модуль / серию</div>
              </div>
            )}
          </div>
          <Paginate
            allItems={isSubtypeChoosed ? props.equipment_models_count : 0}
            onPage={50}
            count={2}
            count_start_end={0}
            navigation={true}
            func={page => props.changeBookForm(page, 'page_model')}
          />
          <div className="tr">Всего - {isSubtypeChoosed ? props.equipment_models_count : 0}</div>
        </div>
      </div>

      {props.statusEquipmentEditor ? <EquipmentEditor /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  equipment_types: state.data.equipment_types,
  equipment_type_count: state.data.equipment_type_count,
  equipment_brands: state.data.equipment_brands,
  equipment_brand_count: state.data.equipment_brand_count,
  equipment_subtypes: state.data.equipment_subtypes,
  equipment_subtype_count: state.data.equipment_subtype_count,
  equipment_models: state.data.equipment_models,
  equipment_models_count: state.data.equipment_models_count,
  book: state.book,
  statusEquipmentEditor: state.view.statusEquipmentEditor,
  branches: state.data.branches,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  changeBookForm,
  setVisibleFlag,
  editEquipment,
  resetBookEquipment,
  addEquipmentType,
  addEquipmentBrand,
  addEquipmentSubtype,
  addEquipmentModel
}

export default connect(mapStateToProps, mapDispatchToProps)(BookEquipment)
