import React from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag,} from '../../../Redux/actions'
import {changeClientState} from '../../../Redux/actions/clientAction'

import AddPhones from './AddPhones'
import ClientJuridicalInfo from './ClientJuridicalInfo'
import LableInput from '../../general/LableInput'
import Checkbox from '../../general/Checkbox'
import SelectFromList from '../../general/SelectFromList'

const ClientGenerallyInfo = (props) => {
    return (
        <div className='modal__block-forms_row'>
            <div className='modal__block-forms w220'>
                <h5>Общая информация</h5>
                <LableInput
                    title={props.client.juridical ? 'Название компании' : 'Имя клиета'}
                    redStar={true}
                    onChange={event => props.changeClientState({name: event.target.value})}
                    value={props.client.name}
                    checkedFlag='inputClientNameChecked'
                />
                <LableInput
                    title='Обращение'
                    onChange={event => props.changeClientState({name_doc: event.target.value})}
                    value={props.client.name_doc}
                />
                <AddPhones/>
                <LableInput
                    title='Email'
                    onChange={event => props.changeClientState({email: event.target.value})}
                    value={props.client.email}
                />
                <Checkbox
                    id='ClientEditorEmail'
                    type='slide-three'
                    label='Согласен получать Email'
                    onChange={event => props.changeClientState({should_send_email: event.target.checked})}
                    checked={props.client.should_send_email}
                />
                <LableInput
                    title='Адрес'
                    onChange={event => props.changeClientState({address: event.target.value})}
                    value={props.client.address}
                />
                <SelectFromList
                    title='Откуда клиент о нас узнал'
                    list={props.ad_campaign}
                    setElement={ad_campaign => props.changeClientState({ ad_campaign})}
                    current_object={props.client.ad_campaign}
                    noChoosed='Выберете тип'
                    disabled={false}
                    invisible={false}
                />
            </div>

            {props.client.juridical ? <ClientJuridicalInfo/> : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    client: state.client,
    statusPhoneList: state.view.statusPhoneList,
    ad_campaign: state.data.ad_campaign,
    statusAdCampaignClient: state.view.statusAdCampaignClient,
    inputClientNameChecked: state.view.inputClientNameChecked,
})

const mapDispatchToProps = {
    changeClientState,
    setVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientGenerallyInfo)
