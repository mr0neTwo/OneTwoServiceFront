import React from 'react'
import { connect } from 'react-redux'

import {changeClientState} from '../../../Redux/actions/clientAction'
import LableInput from '../../general/LableInput'

const ClientJuridicalInfo = (props) => {
  return (
    <div className='modal__block-forms w220'>
      <h5>Реквизиты компании</h5>
      <LableInput
        title='ОГРН'
        onChange={event => props.changeClientState({ogrn: event.target.value}) }
        value={props.client.ogrn}
      />
      <LableInput
        title='ИНН'
        onChange={event => props.changeClientState({inn: event.target.value})}
        value={props.client.inn}
      />
      <LableInput
        title='КПП'
        onChange={event => props.changeClientState({kpp: event.target.value})}
        value={props.client.kpp}
      />
      <LableInput
        title='Юридический адрес'
        onChange={event => props.changeClientState({juridical_address: event.target.value})}
        value={props.client.juridical_address}
      />
      <LableInput
        title='Директор'
        onChange={event => props.changeClientState({director: event.target.value})}
        value={props.client.director}
      />

      <div className='orderFormTitle'>Банковские реквизиты</div>
      <LableInput
        title='Название банка'
        onChange={event => props.changeClientState({bank_name: event.target.value}) }
        value={props.client.bank_name}
      />
      <LableInput
        title='Р/С'
        onChange={event => props.changeClientState({settlement_account: event.target.value})}
        value={props.client.settlement_account}
      />
      <LableInput
        title='К/С'
        onChange={event => props.changeClientState({corr_account: event.target.value})}
        value={props.client.corr_account}
      />
      <LableInput
        title='БИК'
        onChange={event => props.changeClientState({bic: event.target.value})}
        value={props.client.bic}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  client: state.client,
})

const mapDispatchToProps = {
    changeClientState
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientJuridicalInfo)
