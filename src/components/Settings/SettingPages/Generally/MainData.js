import React from 'react'
import { connect } from 'react-redux'

import {
  changeMaindataForm,
  saveGenerallyInfo,
} from '../../../../Redux/actions'
import { ICON } from '../../../../data/icons'
import LableInput from '../../../general/LableInput'
import LableArea from '../../../general/LableArea'

const MainData = (props) => {
  return (
    <div className="settingSubpage">
      <div className="formRow">
        <svg className="icon-table" viewBox="0 0 32 32">
          <path d={ICON.HOUSE} />
        </svg>
        <h4>Реквизиты компании</h4>
      </div>

      <LableInput
        className="wm500 mt15"
        title="Название компании"
        onChange={(event) => props.changeMaindataForm('name', event.target.value)}
        value={props.maindata.name}
        checkedFlag="inputMaindataNameChecked"
        checked={props.view.inputMaindataNameChecked}
        redStar={ true }
      />
      <LableArea
        className="wm500 mt15"
        title="Адрес"
        onChange={(event) => props.changeMaindataForm('address', event.target.value)}
        value={props.maindata.address}
      />
      <LableInput
        className="wm500 mt15"
        title="Email"
        onChange={(event) => props.changeMaindataForm('email', event.target.value)}
        value={props.maindata.email}
      />
      <LableInput
        className="wm500 mt15"
        title="ОГРН"
        onChange={(event) => props.changeMaindataForm('ogrn', event.target.value)}
        value={props.maindata.ogrn}
      />
      <LableInput
        className="wm500 mt15"
        title="КПП"
        onChange={(event) => props.changeMaindataForm('kpp', event.target.value)}
        value={props.maindata.kpp}
      />
      <LableArea
        className="wm500 mt15"
        title="Юредический адрес"
        onChange={(event) =>
          props.changeMaindataForm('juridical_address', event.target.value)
        }
        value={props.maindata.juridical_address}
      />
      <LableInput
        className="wm500 mt15"
        title="Директор"
        onChange={(event) => props.changeMaindataForm('director', event.target.value)}
        value={props.maindata.director}
      />
      <LableInput
        className="wm500 mt15"
        title="Наименование банка"
        onChange={(event) => props.changeMaindataForm('bank_name', event.target.value)}
        value={props.maindata.bank_name}
      />
      <LableInput
        className="wm500 mt15"
        title="Р/С"
        onChange={(event) => props.changeMaindataForm('settlement_account', event.target.value)}
        value={props.maindata.settlement_account}
      />
      <LableInput
        className="wm500 mt15"
        title="К/с"
        onChange={(event) => props.changeMaindataForm('corr_account', event.target.value)}
        value={props.maindata.corr_account}
      />
      <LableInput
        className="wm500 mt15"
        title="БИК"
        onChange={(event) => props.changeMaindataForm('bic', event.target.value)}
        value={props.maindata.bic}
      />
      <div
        className="blueButton buttonSaveSet"
        onClick={() => props.saveGenerallyInfo()}
      >
        Сохранить
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  maindata: state.maindata,
  view: state.view,
})

const mapDispatchToProps = {
  changeMaindataForm,
  saveGenerallyInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainData)
