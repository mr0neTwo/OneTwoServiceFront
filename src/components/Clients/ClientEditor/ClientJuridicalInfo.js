import React from 'react'
import { connect } from 'react-redux'

import { changeClientEditorForm } from '../../../Redux/actions'
import LableInput from '../../general/LableInput'

const ClientJuridicalInfo = (props) => {
  return (
    <div className="clientGenerally">
      <div className="orderFormTitle">Реквизиты компании</div>
      <LableInput
        className="w250 mt15"
        title="ОГРН"
        onChange={(event) => props.changeClientEditorForm('ogrn', event.target.value) }
        value={props.client.ogrn}
      />
      <LableInput
        className="w250 mt15"
        title="ИНН"
        onChange={(event) => props.changeClientEditorForm('inn', event.target.value)}
        value={props.client.inn}
      />
      <LableInput
        className="w250 mt15"
        title="КПП"
        onChange={(event) => props.changeClientEditorForm('kpp', event.target.value)}
        value={props.client.kpp}
      />
      <LableInput
        className="w250 mt15"
        title="Юридический адрес"
        onChange={(event) => props.changeClientEditorForm('juridical_address', event.target.value)}
        value={props.client.juridical_address}
      />
      <LableInput
        className="w250 mt15"
        title="Директор"
        onChange={(event) => props.changeClientEditorForm('director', event.target.value)}
        value={props.client.director}
      />

      <div className="orderFormTitle">Банковские реквизиты</div>
      <LableInput
        className="w250 mt15"
        title="Название банка"
        onChange={(event) => props.changeClientEditorForm('bank_name', event.target.value) }
        value={props.client.bank_name}
      />
      <LableInput
        className="w250 mt15"
        title="Р/С"
        onChange={(event) => props.changeClientEditorForm('settlement_account', event.target.value)}
        value={props.client.settlement_account}
      />
      <LableInput
        className="w250 mt15"
        title="К/С"
        onChange={(event) => props.changeClientEditorForm('corr_account', event.target.value)}
        value={props.client.corr_account}
      />
      <LableInput
        className="w250 mt15"
        title="БИК"
        onChange={(event) => props.changeClientEditorForm('bic', event.target.value)}
        value={props.client.bic}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  client: state.client,
})

const mapDispatchToProps = {
  changeClientEditorForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientJuridicalInfo)
