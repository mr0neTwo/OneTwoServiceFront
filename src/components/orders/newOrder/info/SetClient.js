import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag, changeOrderFormS, changeVisibleState} from '../../../../Redux/actions'
import {showPhone} from '../../../general/utils'
import ClientEditor from '../../../Clients/ClientEditor/ClientEditor'
import LableInput from '../../../general/LableInput'
import {changeClientState} from '../../../../Redux/actions/clientAction'

const SetClient = (props) => {

    const [listClientsVisible, setListClientsVisible] = useState(false)
    const [listClientsPhoneVisible, setListClientsPhoneVisible] = useState(false)

    const clickHandel1 = (event) => {
        if (
            !event.path.map(el => el.id).includes('listFilterOfOrOrder') &&
            !event.path.map(el => el.id).includes('orderInputBoxOfOrder')
        ) {
            if (listClientsVisible) {
                setListClientsVisible(false)
            }
        }
    }

    const clickHandel2 = (event) => {
        if (
            !event.path.map(el => el.id).includes('orderInputBoxOfOrderPhone') &&
            !event.path.map(el => el.id).includes('listFilterOfOrOrderPhone')
        ) {
            if (listClientsPhoneVisible) {
                setListClientsPhoneVisible(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel1)
        window.addEventListener('click', clickHandel2)
        return () => {
            window.removeEventListener('click', clickHandel1)
            window.removeEventListener('click', clickHandel2)
        }
    })


    return (
        <div className='cleintForm'>

            <div className='formRow'>
                <div className='optionsTitle'>Имя клиента<span className='redStar'>*</span></div>

                <div className='blockInput'>
                    <div
                        id='orderInputBoxOfOrder'
                        className='orderInputBox'
                        onClick={() => setListClientsVisible(true)}
                        style={props.view.checkedOrderClient ? {borderColor: 'red'} : null}
                    >
                        <input
                            className='optionFilterInput'
                            onChange={event => props.changeClientState({filter_name: event.target.value})}
                            value={props.name}
                        />
                        <div
                            id='newClient'
                            className='simbolButton'
                            onClick={() => props.changeVisibleState({'statusClientEditor': true})}
                        >
                            +
                        </div>
                        <div className='simbolButton'>&#6662;</div>
                    </div>
                    {props.view.checkedOrderClient ?
                        <div className='errorMassageInput'>{'Необоходимо выбрать клиента'}</div> : null}

                    {listClientsVisible ?
                        <div className='listFilter' id='listFilterOfOrOrder'>
                            {props.clients.map(client => (
                                <div
                                    className='rowGropList'
                                    key={client.id}
                                    onClick={() => {
                                        props.changeOrderFormS(client, 'client')
                                        setListClientsVisible(false)
                                    }}
                                >
                                    <div>{client.name}</div>
                                    <div className='orderDate'>
                                        {client.phone[0] ? showPhone(client.phone[0].number) : null}
                                    </div>
                                </div>
                            ))}
                        </div> : null}

                </div>
            </div>

            <div className='formRow'>

                <div className='optionsTitle'>Телефон<span className='redStar'>*</span></div>
                <div className='blockInput'>

                    <div
                        id='orderInputBoxOfOrderPhone'
                        className='orderInputBox'
                        onClick={() => setListClientsPhoneVisible(true)}
                    >
                        <LableInput
                            className='w100'
                            inputClassName='optionFilterInput'
                            onChange={value => props.changeClientState({filter_phone: value})}
                            value={props.phone}
                            isPhone={true}
                        />
                        <div
                            id='newClient'
                            className='simbolButton'
                            onClick={() => props.changeVisibleState({'statusClientEditor': true})}
                        >
                            +
                        </div>
                        <div className='simbolButton'>&#6662;</div>
                    </div>


                    {listClientsPhoneVisible ?
                        <div className='listFilter' id='listFilterOfOrOrderPhone'>
                            {props.clients.map(client => (
                                <div
                                    className='rowGropList'
                                    key={client.id}
                                    onClick={() => {
                                        props.changeOrderFormS(client, 'client')
                                        setListClientsPhoneVisible(false)
                                    }}
                                >
                                    <div>{client.name}</div>
                                    <div className='orderDate'>
                                        {client.phone[0] ? showPhone(client.phone[0].number) : null}
                                    </div>
                                </div>
                            ))}
                        </div> : null}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    clients: state.client.clients,
    phone: state.client.filter_phone,
    name: state.client.filter_name,
    view: state.view,
    client: state.order.client
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeOrderFormS,
    changeClientState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetClient)