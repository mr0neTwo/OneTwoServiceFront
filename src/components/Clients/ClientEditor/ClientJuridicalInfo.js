import React from 'react'
import { connect } from 'react-redux'

import { changeClientEditorForm } from '../../../Redux/actions'
import LableInput from '../../general/LableInput'

const ClientJuridicalInfo = (props) => {
  return (
    <div className='clientGenerally'>
      <div className='orderFormTitle'>Реквизиты компании</div>
      <LableInput
        className='w250 mt15'
        title='ОГРН'
        onChange={event => props.changeClientEditorForm(event.target.value, 'ogrn') }
        value={props.client.ogrn}
      />
      <LableInput
        className='w250 mt15'
        title='ИНН'
        onChange={event => props.changeClientEditorForm(event.target.value, 'inn')}
        value={props.client.inn}
      />
      <LableInput
        className='w250 mt15'
        title='КПП'
        onChange={event => props.changeClientEditorForm(event.target.value, 'kpp')}
        value={props.client.kpp}
      />
      <LableInput
        className='w250 mt15'
        title='Юридический адрес'
        onChange={event => props.changeClientEditorForm(event.target.value, 'juridical_address')}
        value={props.client.juridical_address}
      />
      <LableInput
        className='w250 mt15'
        title='Директор'
        onChange={event => props.changeClientEditorForm(event.target.value, 'director')}
        value={props.client.director}
      />

      <div className='orderFormTitle'>Банковские реквизиты</div>
      <LableInput
        className='w250 mt15'
        title='Название банка'
        onChange={event => props.changeClientEditorForm(event.target.value, 'bank_name') }
        value={props.client.bank_name}
      />
      <LableInput
        className='w250 mt15'
        title='Р/С'
        onChange={event => props.changeClientEditorForm(event.target.value, 'settlement_account')}
        value={props.client.settlement_account}
      />
      <LableInput
        className='w250 mt15'
        title='К/С'
        onChange={event => props.changeClientEditorForm(event.target.value, 'corr_account')}
        value={props.client.corr_account}
      />
      <LableInput
        className='w250 mt15'
        title='БИК'
        onChange={event => props.changeClientEditorForm(event.target.value, 'bic')}
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
