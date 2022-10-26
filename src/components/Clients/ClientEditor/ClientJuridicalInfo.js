import React from 'react'
import { connect } from 'react-redux'

import {changeClientState} from '../../../Redux/actions/clientAction'
import LableInput from '../../general/LableInput'

const ClientJuridicalInfo = (props) => {
  return (
    <div className='clientGenerally'>
      <div className='orderFormTitle'>Реквизиты компании</div>
      <LableInput
        className='w250 mt15'
        title='ОГРН'
        onChange={event => props.changeClientState({ogrn: event.target.value}) }
        value={props.client.ogrn}
      />
      <LableInput
        className='w250 mt15'
        title='ИНН'
        onChange={event => props.changeClientState({inn: event.target.value})}
        value={props.client.inn}
      />
      <LableInput
        className='w250 mt15'
        title='КПП'
        onChange={event => props.changeClientState({kpp: event.target.value})}
        value={props.client.kpp}
      />
      <LableInput
        className='w250 mt15'
        title='Юридический адрес'
        onChange={event => props.changeClientState({juridical_address: event.target.value})}
        value={props.client.juridical_address}
      />
      <LableInput
        className='w250 mt15'
        title='Директор'
        onChange={event => props.changeClientState({director: event.target.value})}
        value={props.client.director}
      />

      <div className='orderFormTitle'>Банковские реквизиты</div>
      <LableInput
        className='w250 mt15'
        title='Название банка'
        onChange={event => props.changeClientState({bank_name: event.target.value}) }
        value={props.client.bank_name}
      />
      <LableInput
        className='w250 mt15'
        title='Р/С'
        onChange={event => props.changeClientState({settlement_account: event.target.value})}
        value={props.client.settlement_account}
      />
      <LableInput
        className='w250 mt15'
        title='К/С'
        onChange={event => props.changeClientState({corr_account: event.target.value})}
        value={props.client.corr_account}
      />
      <LableInput
        className='w250 mt15'
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
