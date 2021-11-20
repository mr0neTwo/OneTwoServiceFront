import React, { useState } from 'react'
import { connect } from 'react-redux'

import Icon from '../../../general/Icon'
import {
  changeBookForm,
  setVisibleFlag,
  editEquipment,
  resetBookEquipment,
} from '../../../../Redux/actions'
import { icon_dishwasher, icon_fridge } from '../../../../data/icons'
import EquipmentEditor from './EquipmentEditor'
import Checkbox from '../../../general/Checkbox'

const BookEquipment = (props) => {

  const [showDeleted, setShowDeteled] = useState(false)

  function sortTitle (a, b) {
    let titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase()
      if (titleA < titleB)
        return -1
      if (titleA > titleB)
        return 1
      return 0 
      }

  const list_brand = props.book.equipment_type ? props.equipment.find(equipment => equipment.id === props.book.equipment_type).equipment_brand.sort(sortTitle) : []

  const list_subtype = props.book.equipment_brand ? props.equipment.find((equipment) => equipment.id === props.book.equipment_type).equipment_brand.find(brand => brand.id === props.book.equipment_brand).equipment_subtype.sort(sortTitle) : []

  const list_model = props.book.equipment_subtype ? props.equipment.find((equipment) => equipment.id === props.book.equipment_type).equipment_brand.find(brand => brand.id === props.book.equipment_brand).equipment_subtype.find(subtype => subtype.id === props.book.equipment_subtype).equipment_model.sort(sortTitle) : []
    

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
          <div 
            className="whiteButton mwmc" 
            onClick={() => {
               props.setVisibleFlag('statusEquipmentEditor', true)
               props.changeBookForm(0, 'type')
               props.resetBookEquipment()
               props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
            }}>
            + Группа
          </div>

          <div className="thead">Группа</div>
          <div className="tbody">
            {props.equipment.filter((equipment) => showDeleted || !equipment.deleted).map((equipment) => (
                <div
                  key={equipment.id}
                  className={`row tr 
                     ${props.book.equipment_type === equipment.id ? 'rowChoosed' : null} 
                     ${equipment.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() => {
                    props.changeBookForm(equipment.id, 'equipment_type')
                    props.changeBookForm(0, 'equipment_brand')
                    props.changeBookForm(0, 'equipment_subtype')
                    props.changeBookForm(0, 'equipment_model')
                  }}
                  onDoubleClick={() => {
                    props.editEquipment(equipment)
                    props.setVisibleFlag('statusEquipmentEditor', true)
                    props.changeBookForm(0, 'type')
                  }}
                >
                  <img src={equipment.icon} className="icon_equipment" />
                  <div className="td">{equipment.title}</div>
                  {/* <span>></span> */}
                </div>
              ))}
          </div>
          <div className="tr">Всего - {props.equipment.length}</div>
        </div>

        <div className="columnEquipment">
          <div 
            className="whiteButton mwmc"
            onClick={() => {
               props.setVisibleFlag('statusEquipmentEditor', true)
               props.changeBookForm(1, 'type')
               props.resetBookEquipment()
               props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
               props.changeBookForm(props.equipment, 'choose_list')
               props.changeBookForm(props.book.equipment_type, 'parent_id')
            }}
         >
            + Бренд
         </div>

          <div className="thead">Бренд</div>
          <div className="tbody">
            {list_brand.length ? (
              list_brand.filter(brand => showDeleted || !brand.deleted).map(brand => (
                <div
                  key={brand.id}
                  className={`row tr 
                     ${props.book.equipment_brand === brand.id ? 'rowChoosed' : null}
                     ${brand.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() => {
                    props.changeBookForm(brand.id, 'equipment_brand')
                    props.changeBookForm(0, 'equipment_subtype')
                    props.changeBookForm(0, 'equipment_model')
                  }}
                  onDoubleClick={() => {
                     props.editEquipment(brand)
                     props.setVisibleFlag('statusEquipmentEditor', true)
                     props.changeBookForm(0, 'equipment_brand')
                     props.changeBookForm(1, 'type')
                     props.changeBookForm(props.equipment, 'choose_list')
                     props.changeBookForm(props.book.equipment_type, 'parent_id')
                   }}
                >
                  <div className="td">{brand.title}</div>
                  {/* <span>></span> */}
                </div>
              ))
            ) : (
              <div className="clPage">
                <div className="tempContainer">Выберете группу</div>
              </div>
            )}
          </div>
          <div className="tr">Всего - {list_brand.length}</div>
        </div>

        <div className="columnEquipment">
          <div 
            className="whiteButton mwmc"
            onClick={props.book.equipment_brand ? () => {
               props.setVisibleFlag('statusEquipmentEditor', true)
               props.changeBookForm(2, 'type')
               props.resetBookEquipment()
               props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
               props.changeBookForm(list_brand, 'choose_list')
               props.changeBookForm(props.book.equipment_brand, 'parent_id')
            } : null}
         >
            + Модуль / Серия
         </div>

          <div className="thead">Модуль / Серия</div>
          <div className="tbody">
            {list_subtype.length ? (
              list_subtype.filter(subtype => showDeleted || !subtype.deleted).map(subtype => (
                <div
                  key={subtype.id}
                  className={`row tr 
                     ${props.book.equipment_subtype === subtype.id ? 'rowChoosed' : null}
                     ${subtype.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() => {
                    props.changeBookForm(subtype.id, 'equipment_subtype')
                    props.changeBookForm(0, 'equipment_model')
                  }}
                  onDoubleClick={() => {
                     props.editEquipment(subtype)
                     props.setVisibleFlag('statusEquipmentEditor', true)
                     props.changeBookForm(0, 'equipment_subtype')
                     props.changeBookForm(2, 'type')
                     props.changeBookForm(list_brand, 'choose_list')
                     props.changeBookForm(props.book.equipment_brand, 'parent_id')
                   }}
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
          <div className="tr">Всего - {list_subtype.length}</div>
        </div>

        <div className="columnEquipment">
          <div 
            className="whiteButton mwmc"
            onClick={props.book.equipment_subtype ? () => {
               props.setVisibleFlag('statusEquipmentEditor', true)
               props.changeBookForm(3, 'type')
               props.resetBookEquipment()
               props.changeBookForm(props.branches.filter(branch => !branch.deleted).map(branch => branch.id), 'branches')
               props.changeBookForm(list_subtype, 'choose_list')
               props.changeBookForm(props.book.equipment_subtype, 'parent_id')
            } : null}
          >
             + Модель
          </div>

          <div className="thead">Модель</div>
          <div className="tbody">
            {list_model.length ? (
              list_model.filter(model => showDeleted || !model.deleted).map((model) => (
                <div
                  key={model.id}
                  className={`row tr 
                     ${props.book.equipment_model === model.id ? 'rowChoosed' : null}
                     ${model.deleted ? 'rowDeleted' : null}
                  `}
                  onClick={() =>
                    props.changeBookForm(model.id, 'equipment_model')
                  }
                  onDoubleClick={() => {
                     props.editEquipment(model)
                     props.setVisibleFlag('statusEquipmentEditor', true)
                     props.changeBookForm(0, 'equipment_model')
                     props.changeBookForm(3, 'type')
                     props.changeBookForm(list_subtype, 'choose_list')
                     props.changeBookForm(props.book.equipment_subtype, 'parent_id')
                   }}
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
          <div className="tr">Всего - {list_model.length}</div>
        </div>
      </div>

      {props.statusEquipmentEditor ? <EquipmentEditor /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  equipment: state.data.equipment,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(BookEquipment)
