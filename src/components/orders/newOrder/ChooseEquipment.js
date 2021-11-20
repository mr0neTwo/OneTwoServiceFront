import React from 'react'
import { connect } from 'react-redux'

import {
  changeOrderForm,
  addAnotherEquipment,
  deleteDevice,
} from '../../../Redux/actions'
import { icon_trush } from '../../../data/icons'

import LabelInputOrder from './LabelInputOrder'
import SetOrderBrand from './SetOrderBrand'
import SetOrderGroup from './SetOrderGroup'
import SetOrderModel from './SetOrderModel'
import SetOrderSubtype from './SetOrderSubtype'
import { sortedIndex } from 'lodash'

const ChooseEquipment = (props) => {
  return (
    <div>
      <div className="formRow mt15">
        <div className="optionsTitle"></div>
        <div className="orderFormTitle">Изделиe и неисправность</div>
      </div>
      {props.order.equipments.map((equipment, idx) => {
        return (
          <div className="orderDevice" key={idx}>
            <div className="formRow">
              <div className="optionsTitle">
                Тип устройства<span className="redStar">*</span>
              </div>
              <div className="blockImput">
                <SetOrderGroup idx={idx} />
              </div>
            </div>
            <div className="formRow">
              <div className="optionsTitle">
                Бренд<span className="redStar">*</span>
              </div>
              <div className="blockImput">
                <SetOrderBrand idx={idx} />
              </div>
            </div>
            <div className="formRow">
              <div className="optionsTitle">
                Модуль / Серия<span className="redStar">*</span>
              </div>
              <div className="blockImput">
                <SetOrderSubtype idx={idx} />
              </div>
            </div>
            <div className="formRow">
              <div className="optionsTitle">Модель</div>
              <div className="blockImput">
                <SetOrderModel idx={idx} />
              </div>
            </div>
            <LabelInputOrder
              idx={idx}
              className="formRow"
              title="Неисправность"
              name="malfunction"
              onChange={(event) =>
                props.changeOrderForm(idx, 'malfunction', event.target.value)
              }
              value={props.order.equipments[idx].malfunction}
              checkedFlag="inputMalfunctionChecked"
              checked={props.view.inputMalfunctionChecked[idx]}
            />
            <LabelInputOrder
              className="formRow"
              title="Комплектация"
              name="packagelist"
              onChange={(event) =>
                props.changeOrderForm(idx, 'packagelist', event.target.value)
              }
              value={props.order.equipments[idx].packagelist}
            />
            <LabelInputOrder
              className="formRow"
              title="Внешинй вид"
              name="appearance"
              onChange={(event) =>
                props.changeOrderForm(idx, 'appearance', event.target.value)
              }
              value={props.order.equipments[idx].appearance}
            />
            <div className="formRow">
              <div className="optionsTitle">Срочно</div>
              <div className="blockImput">
                <div className="checkbox pd-tb-5 al-itm-fs">
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      props.changeOrderForm(idx, 'urgent', event.target.checked)
                    }
                    checked={props.order.equipments[idx].urgent}
                  />
                  <label></label>
                  <div
                    className="whiteButton simbolBotton pz-r320"
                    onClick={() => props.deleteDevice(idx)}
                  >
                    <svg className="icon-table-red-basket" viewBox="0 0 32 32">
                      <path d={icon_trush} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div className="formRow jc-c">
        <div
          className="fs14 addPhone"
          onClick={() => props.addAnotherEquipment()}
        >
          + Устройство
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  order: state.order,
  view: state.view,
})

const mapDispatchToProps = {
  changeOrderForm,
  addAnotherEquipment,
  deleteDevice,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseEquipment)
